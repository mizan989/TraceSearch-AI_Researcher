export class AIProviderError extends Error {
  constructor(message: string, public readonly statusCode?: number) {
    super(message);
    this.name = "AIProviderError";
  }
}

/**
 * Calls the Gemini API with structured JSON output expectation.
 */
export async function generateGeminiJSON<T>(
  prompt: string,
  systemInstruction?: string
): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new AIProviderError("GEMINI_API_KEY is not configured", 401);
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

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

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      // 25 second timeout
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(`[Gemini] HTTP ${res.status}: ${errText}`);
      throw new AIProviderError(`Gemini returned status ${res.status}`, res.status);
    }

    const data = await res.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      console.error("[Gemini] Empty candidate response:", JSON.stringify(data));
      throw new AIProviderError("Gemini returned empty content");
    }

    // Strip markdown formatting if any was returned despite json mode
    const cleanedText = candidateText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    return JSON.parse(cleanedText) as T;
  } catch (error) {
    if (error instanceof AIProviderError) {
      throw error;
    }
    console.error("[Gemini] Request failed:", error);
    throw new AIProviderError(
      error instanceof Error ? error.message : "Failed to generate structured AI response"
    );
  }
}
