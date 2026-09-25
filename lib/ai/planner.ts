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
    if (validated.success && validated.data.queries.length > 0) {
      return {
        originalQuery: question,
        queries: validated.data.queries,
      };
    }

    console.warn("[Planner] Validation failed for AI output, using heuristic plan:", validated.error);
    return getHeuristicResearchPlan(question);
  } catch (error) {
    console.warn("[Planner] Using heuristic query decomposition:", error instanceof Error ? error.message : error);
    return getHeuristicResearchPlan(question);
  }
}

/**
 * Clean heuristic decomposition based strictly on the user's actual question.
 */
function getHeuristicResearchPlan(question: string): ResearchPlan {
  const clean = question.replace(/[?.,!]/g, "").trim();

  return {
    originalQuery: question,
    queries: [
      {
        query: `${clean} overview and key facts`,
        rationale: "Capture the core background, definition, and foundational facts.",
      },
      {
        query: `${clean} latest developments and analysis`,
        rationale: "Discover current updates, real-world data points, and recent findings.",
      },
      {
        query: `${clean} perspectives and implications`,
        rationale: "Examine differing viewpoints, caveats, and future implications.",
      },
    ],
  };
}
