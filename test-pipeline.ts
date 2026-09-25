import { runResearchPipeline } from "./lib/research/pipeline";
import { Source } from "./types/source";
import { Finding, ResearchSession } from "./types/research";

async function main(): Promise<void> {
  const query = "Latest discoveries by the James Webb Space Telescope in 2026";
  console.log("Testing search and synthesis pipeline for query:", query);

  try {
    const session: ResearchSession = await runResearchPipeline(
      query,
      (status: string, msg: string, prog: number) => {
        console.log(`[${prog}%] [${status}] ${msg}`);
      }
    );

    console.log("\n=== RESEARCH RESULT ===");
    console.log("Title:", session.title);
    console.log("Summary:", session.summary);
    console.log("Sources count:", session.sources.length);
    console.log(
      "Sources sample:",
      session.sources.slice(0, 3).map((s: Source) => ({
        id: s.id,
        title: s.title,
        domain: s.domain,
        url: s.url,
      }))
    );
    console.log("\nFindings count:", session.findings.length);
    console.log(
      "Findings details:",
      JSON.stringify(
        session.findings.map((f: Finding) => ({
          title: f.title,
          content: f.content,
          sourceIds: f.sourceIds,
        })),
        null,
        2
      )
    );
  } catch (err) {
    console.error("Pipeline failed with error:", err);
  }
}

main();
