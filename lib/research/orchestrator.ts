import { ResearchSession } from "@/types/research";
import { runResearchPipeline, PipelineProgressCallback } from "./pipeline";
import { saveSessionToStorage, getSessionFromStorage } from "@/lib/supabase/queries";

export class ResearchOrchestrator {
  /**
   * Starts and executes a research task from question to structured report.
   */
  public static async executeResearch(
    query: string,
    onProgress?: PipelineProgressCallback
  ): Promise<ResearchSession> {
    const session = await runResearchPipeline(query, onProgress);

    // Persist session if storage/database is available
    try {
      await saveSessionToStorage(session);
    } catch (err) {
      console.warn("[Orchestrator] Non-fatal error persisting session:", err);
    }

    return session;
  }

  /**
   * Retrieves an existing research session by ID.
   */
  public static async getResearch(id: string): Promise<ResearchSession | null> {
    return getSessionFromStorage(id);
  }
}
