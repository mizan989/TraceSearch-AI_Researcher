import { generateGeminiJSON } from "./gemini";
import { getPlanningPrompt } from "./prompts";
import { ResearchPlanSchema } from "@/lib/validation/ai-output";
import { ResearchPlan } from "@/types/ai";

export async function planResearchQueries(question: string): Promise<ResearchPlan> {
  const prompt = getPlanningPrompt(question);

  try {
    const raw = await generateGeminiJSON<{ queries: Array<{ query: string; rationale: string }> }>(
      prompt
    );

    const validated = ResearchPlanSchema.safeParse(raw);
    if (validated.success) {
      return {
        originalQuery: question,
        queries: validated.data.queries,
      };
    }

    console.warn("[Planner] Validation failed for AI output, falling back to heuristic plan:", validated.error);
    return getHeuristicResearchPlan(question);
  } catch (error) {
    console.warn("[Planner] Using fallback heuristic research planner:", error instanceof Error ? error.message : error);
    return getHeuristicResearchPlan(question);
  }
}

/**
 * Heuristic planning when AI provider is unreachable or in demo mode.
 */
function getHeuristicResearchPlan(question: string): ResearchPlan {
  const clean = question.replace(/[?.,!]/g, "").trim();
  const lower = clean.toLowerCase();

  if (lower.includes("cyber") || lower.includes("security")) {
    return {
      originalQuery: question,
      queries: [
        {
          query: "AI cybersecurity defense automation NIST CISA guidelines",
          rationale: "Gather official technical guidance and government frameworks on AI defense.",
        },
        {
          query: "autonomous exploit generation malware LLM breakout time report",
          rationale: "Evaluate attacker methodologies and zero-day exploitation speed.",
        },
        {
          query: "passkeys phishing deepfake authentication enterprise resilience",
          rationale: "Investigate modern authentication standards and biometric defense resilience.",
        },
      ],
    };
  }

  return {
    originalQuery: question,
    queries: [
      {
        query: `${clean} overview state and key developments`,
        rationale: "Capture the foundational background and current status.",
      },
      {
        query: `${clean} trends adoption analysis industry report`,
        rationale: "Identify real-world metrics, adoption rates, and key challenges.",
      },
      {
        query: `${clean} future outlook risks and implications`,
        rationale: "Examine future predictions, unresolved challenges, and risk factors.",
      },
    ],
  };
}
