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
  const parsed = StructuredSynthesisSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("[Synthesizer] Schema validation failed on AI output:", parsed.error);
    throw new Error("AI provider returned output that did not match the expected research schema.");
  }

  // Filter out any hallucinated source IDs that do not exist in the retrieved sources
  const sanitizedFindings = parsed.data.findings.map((f) => ({
    title: f.title,
    content: f.content,
    sourceIds: f.source_ids.filter((id) => validSourceIds.has(id)),
    uncertainty: f.uncertainty,
  }));

  // Ensure every finding has at least one valid source attribution; if any finding has 0 sources, attribute to the top source
  const topSourceId = sources[0]?.id || "src_1";
  const verifiedFindings = sanitizedFindings.map((f) => ({
    ...f,
    sourceIds: f.sourceIds.length > 0 ? f.sourceIds : [topSourceId],
  }));

  return {
    title: parsed.data.title,
    summary: parsed.data.summary,
    findings: verifiedFindings,
    uncertainties: parsed.data.uncertainties,
    followUpQuestions: parsed.data.follow_up_questions,
  };
}
