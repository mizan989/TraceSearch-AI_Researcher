import { ResearchSession, ResearchStatus } from "@/types/research";
import { planResearchQueries } from "@/lib/ai/planner";
import { searchWebMulti } from "@/lib/search/serpapi";
import { enrichSourcesWithContent } from "@/lib/search/scraper";
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
  onProgress?.("planning", "Understanding your question and generating research queries...", 15);
  const plan = await planResearchQueries(query);

  const searchQueries: SearchQuery[] = plan.queries.map((q, idx) => ({
    id: `sq_${idx + 1}`,
    researchSessionId: sessionId,
    query: q.query,
    provider: "serpapi",
    status: "completed",
    createdAt: now,
  }));

  // Step 2: Searching live Google via SerpApi
  onProgress?.(
    "searching",
    `Searching the live web across ${plan.queries.length} focused queries...`,
    40
  );
  const queryStrings = plan.queries.map((q) => q.query);
  const sources = await searchWebMulti(queryStrings, sessionId);

  // Step 3: Analyzing and reading article content
  onProgress?.(
    "analyzing",
    `Reading and cross-referencing evidence from ${sources.length} retrieved sources...`,
    65
  );
  const enrichedSources = await enrichSourcesWithContent(sources, 6);

  // Step 4: Generating grounded findings
  onProgress?.("generating", "Synthesizing findings and establishing evidence traces...", 85);
  const synthesis = await synthesizeResearch(query, enrichedSources);

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
    sources: enrichedSources,
    searchQueries,
  };

  onProgress?.("completed", "Research synthesis complete.", 100);

  return completedSession;
}
