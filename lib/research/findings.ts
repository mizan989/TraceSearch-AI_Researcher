import { Finding } from "@/types/research";
import { GeneratedFinding } from "@/types/ai";

export function formatFindingNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function transformGeneratedFindings(
  rawFindings: GeneratedFinding[],
  sessionId: string
): Finding[] {
  return rawFindings.map((f, idx) => ({
    id: `finding_${idx + 1}`,
    researchSessionId: sessionId,
    title: f.title,
    content: f.content,
    uncertainty: f.uncertainty,
    sourceIds: f.sourceIds || [],
    createdAt: new Date().toISOString(),
  }));
}
