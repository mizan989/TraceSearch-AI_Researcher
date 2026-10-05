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
  const lower = clean.toLowerCase();

  // Public interest & civic policy queries
  if (
    lower.includes("policy") ||
    lower.includes("rule") ||
    lower.includes("government") ||
    lower.includes("law") ||
    lower.includes("air quality") ||
    lower.includes("climate") ||
    lower.includes("census") ||
    lower.includes("official data") ||
    lower.includes("health") ||
    lower.includes("delhi") ||
    lower.includes("data protection")
  ) {
    return {
      originalQuery: question,
      queries: [
        {
          query: `${clean} official government regulation data`,
          rationale: "Target primary official government documentation, regulatory gazettes, and public reports.",
        },
        {
          query: `${clean} scientific studies institutional analysis`,
          rationale: "Gather empirical peer-reviewed studies and authoritative institutional research.",
        },
        {
          query: `${clean} practical impact public implications`,
          rationale: "Examine practical effects, differing interpretations, and civic implications.",
        },
      ],
    };
  }

  // Open innovation & emerging technology queries
  if (
    lower.includes("open-source") ||
    lower.includes("open source") ||
    lower.includes("alternative") ||
    lower.includes("framework") ||
    lower.includes("github") ||
    lower.includes("llm") ||
    lower.includes("inference") ||
    lower.includes("battery") ||
    lower.includes("emerging") ||
    lower.includes("technical landscape")
  ) {
    return {
      originalQuery: question,
      queries: [
        {
          query: `${clean} github official documentation repository`,
          rationale: "Locate primary project repositories, official documentation, and source code.",
        },
        {
          query: `${clean} benchmarks performance comparison`,
          rationale: "Analyze empirical benchmarks, throughput data, and comparative evaluations.",
        },
        {
          query: `${clean} architectural tradeoffs current limitations`,
          rationale: "Identify real-world limitations, ecosystem maturity, and hardware compatibility.",
        },
      ],
    };
  }

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
