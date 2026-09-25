import { ResearchSession, ResearchStatus } from "@/types/research";
import { planResearchQueries } from "@/lib/ai/planner";
import { searchWebMulti } from "@/lib/search/serpapi";
import { synthesizeResearch } from "@/lib/ai/synthesizer";
import { transformGeneratedFindings } from "./findings";
import { SearchQuery } from "@/types/search";

export interface PipelineProgressCallback {
  (status: ResearchStatus, message: string, progress: number): void;
}

export async function runResearchPipeline(
  query: string,
  onProgress?: PipelineProgressCallback
): Promise<ResearchSession> {
  const sessionId = `rs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  // Step 1: Planning
  onProgress?.("planning", "Understanding your question and generating research queries...", 20);
  const plan = await planResearchQueries(query);

  const searchQueries: SearchQuery[] = plan.queries.map((q, idx) => ({
    id: `sq_${idx + 1}`,
    researchSessionId: sessionId,
    query: q.query,
    provider: "serpapi",
    status: "completed",
    createdAt: now,
  }));

  // Step 2: Searching
  onProgress?.(
    "searching",
    `Searching the web across ${plan.queries.length} focused queries...`,
    45
  );
  const queryStrings = plan.queries.map((q) => q.query);
  const sources = await searchWebMulti(queryStrings, sessionId);

  // Step 3: Analyzing
  onProgress?.(
    "analyzing",
    `Analyzing and cross-referencing ${sources.length} sources...`,
    70
  );

  // Step 4: Generating
  onProgress?.("generating", "Synthesizing findings and establishing evidence traces...", 85);
  const synthesis = await synthesizeResearch(query, sources);

  const findings = transformGeneratedFindings(synthesis.findings, sessionId);

  // Step 5: Completed
  const completedSession: ResearchSession = {
    id: sessionId,
    query,
    title: synthesis.title,
    summary: synthesis.summary,
    status: "completed",
    createdAt: now,
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    uncertainties: synthesis.uncertainties,
    followUpQuestions: synthesis.followUpQuestions,
    findings,
    sources,
    searchQueries,
  };

  onProgress?.("completed", "Research synthesis complete.", 100);

  return completedSession;
}
