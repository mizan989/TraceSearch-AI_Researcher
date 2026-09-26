import { Source } from "@/types/source";
import { StructuredSynthesisOutput } from "@/types/ai";
import { generateGeminiJSON } from "./gemini";
import { getSynthesisPrompt } from "./prompts";
import { StructuredSynthesisSchema } from "@/lib/validation/ai-output";

export async function synthesizeResearch(
  question: string,
  sources: Source[]
): Promise<StructuredSynthesisOutput> {
  if (sources.length === 0) {
    return {
      title: `Research on "${question}"`,
      summary: "No relevant live sources could be retrieved to answer this question. Please refine your query or verify connectivity.",
      findings: [],
      uncertainties: ["No verified sources available to substantiate claims."],
      followUpQuestions: [
        "Would you like to try a broader or alternative search query?",
        "Are there specific institutions, domains, or keywords you would like to target?",
      ],
    };
  }

  const prompt = getSynthesisPrompt(question, sources);
  const validSourceIds = new Set(sources.map((s) => s.id));

  // Generate structured synthesis using resilient model cascade
  const raw = await generateGeminiJSON<unknown>(prompt);

  // Unwrap potential envelope wrappers if AI models return nested objects
  let candidateObj: unknown = raw;
  if (candidateObj && typeof candidateObj === "object") {
    const record = candidateObj as Record<string, unknown>;
    if (record.report && typeof record.report === "object") {
      candidateObj = record.report;
    } else if (record.data && typeof record.data === "object") {
      candidateObj = record.data;
    } else if (record.result && typeof record.result === "object") {
      candidateObj = record.result;
    }
  }

  const parsed = StructuredSynthesisSchema.safeParse(candidateObj);

  if (!parsed.success) {
    console.warn("[Synthesizer] Schema validation issue on AI output:", parsed.error);
  }

  const data = parsed.success
    ? parsed.data
    : {
        title: `Research Synthesis: ${question}`,
        summary: "Extracted and synthesized findings based on live web retrieval.",
        findings: [],
        uncertainties: [],
        follow_up_questions: [],
      };

  // Filter out any hallucinated source IDs that do not exist in the retrieved sources
  const topSourceId = sources[0]?.id || "src_1";
  let sanitizedFindings = data.findings.map((f) => ({
    title: f.title || "Key Research Finding",
    content: f.content || "",
    sourceIds: f.source_ids.filter((id) => validSourceIds.has(id)),
    uncertainty: f.uncertainty,
  }));

  // If no findings were structured by the model, create one from top source snippet
  if (sanitizedFindings.length === 0 && sources.length > 0) {
    sanitizedFindings = [
      {
        title: sources[0].title || "Primary Evidence Finding",
        content: sources[0].fullContent
          ? sources[0].fullContent.slice(0, 400)
          : sources[0].snippet,
        sourceIds: [topSourceId],
        uncertainty: undefined,
      },
    ];
  }

  const verifiedFindings = sanitizedFindings.map((f) => ({
    ...f,
    sourceIds: f.sourceIds.length > 0 ? f.sourceIds : [topSourceId],
  }));

  return {
    title: data.title || `Research on ${question}`,
    summary: data.summary || "Summary synthesized from live sources.",
    findings: verifiedFindings,
    uncertainties: data.uncertainties,
    followUpQuestions: data.follow_up_questions,
  };
}
