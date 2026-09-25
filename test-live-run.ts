import { runResearchPipeline } from "./lib/research/pipeline";
import { Source } from "./types/source";
import { Finding, ResearchSession } from "./types/research";

async function runTest(question: string): Promise<void> {
  console.log("\n=======================================================");
  console.log("TESTING QUERY:", question);
  console.log("=======================================================");

  try {
    const session: ResearchSession = await runResearchPipeline(
      question,
      (status: string, msg: string, prog: number) => {
        console.log(`[${prog}%] [${status}] ${msg}`);
      }
    );

    console.log("\n--- RESULT ---");
    console.log("Title:", session.title);
    console.log("Summary:", session.summary);
    console.log(`Retrieved ${session.sources.length} sources.`);
    console.log("Top 3 Sources:");
    session.sources.slice(0, 3).forEach((s: Source) => {
      console.log(`  - [${s.id}] ${s.title} (${s.domain})`);
      console.log(`    URL: ${s.url}`);
      console.log(
        `    Scraped Content Length: ${s.fullContent ? s.fullContent.length : "None (Snippet used)"}`
      );
    });

    console.log(`\nGenerated ${session.findings.length} findings:`);
    session.findings.forEach((f: Finding, idx: number) => {
      console.log(`\nFinding ${idx + 1}: ${f.title}`);
      console.log(`Content: ${f.content}`);
      console.log(`Sources: ${f.sourceIds.join(", ")}`);
      if (f.uncertainty) console.log(`Uncertainty: ${f.uncertainty}`);
    });
  } catch (err) {
    console.error("TEST FAILED:", err);
  }
}

async function main(): Promise<void> {
  await runTest("Who won the ICC Men's T20 World Cup in 2024 and who was player of the tournament?");
}

main();
