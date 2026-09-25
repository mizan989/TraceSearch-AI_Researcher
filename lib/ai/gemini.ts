export class AIProviderError extends Error {
  constructor(message: string, public readonly statusCode?: number) {
    super(message);
    this.name = "AIProviderError";
  }
}

/**
 * Calls the Gemini API with structured JSON output expectation and resilient model fallback.
 */
export async function generateGeminiJSON<T>(
  prompt: string,
  systemInstruction?: string
): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new AIProviderError("GEMINI_API_KEY is not configured", 401);
  }

  // Model cascade: try configured model, then active resilient alternatives
  const configuredModel = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
  const candidateModels = Array.from(
    new Set([configuredModel, "gemini-3-flash-preview", "gemini-3.1-flash-lite", "gemini-flash-latest"])
  );

  const requestBody: {
    contents: Array<{ parts: Array<{ text: string }> }>;
    systemInstruction?: { parts: Array<{ text: string }> };
    generationConfig: {
      temperature: number;
      responseMimeType: string;
    };
  } = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  };

  if (systemInstruction) {
    requestBody.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  let lastError: Error | null = null;

  for (const model of candidateModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        // 25 second timeout per model call
        signal: AbortSignal.timeout(25000),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.warn(`[Gemini] Model ${model} returned HTTP ${res.status}: ${errText}`);

        // If high demand spike (503) or rate limit (429), try next model
        if (res.status === 503 || res.status === 429 || res.status === 404) {
          lastError = new AIProviderError(`Gemini model ${model} error ${res.status}`, res.status);
          continue;
        }

        throw new AIProviderError(`Gemini returned status ${res.status}: ${errText}`, res.status);
      }

      const data = await res.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText) {
        console.warn(`[Gemini] Empty candidate response from ${model}`);
        lastError = new AIProviderError(`Empty content from ${model}`);
        continue;
      }

      // Strip markdown code fences if any were returned despite json mode
      const cleanedText = candidateText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      return JSON.parse(cleanedText) as T;
    } catch (error) {
      if (error instanceof AIProviderError && error.statusCode && error.statusCode < 500 && error.statusCode !== 429 && error.statusCode !== 404) {
        throw error;
      }
      console.warn(`[Gemini] Error with model ${model}:`, error instanceof Error ? error.message : error);
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw new AIProviderError(
    lastError ? lastError.message : "All Gemini model candidates failed to generate response",
    500
  );
}
