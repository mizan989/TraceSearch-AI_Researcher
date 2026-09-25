import { Finding } from "@/types/research";
import { Source } from "@/types/source";

export interface ResolvedFindingEvidence {
  findingId: string;
  findingTitle: string;
  sources: Source[];
}

export function mapFindingCitations(
  findings: Finding[],
  sources: Source[]
): Map<string, Source[]> {
  const sourceMap = new Map<string, Source>();
  for (const s of sources) {
    sourceMap.set(s.id, s);
  }

  const mapping = new Map<string, Source[]>();

  for (const finding of findings) {
    const matchedSources: Source[] = [];
    for (const srcId of finding.sourceIds) {
      const src = sourceMap.get(srcId);
      if (src) {
        matchedSources.push(src);
      }
    }
    mapping.set(finding.id, matchedSources);
  }

  return mapping;
}

export function getSourcesForFinding(
  finding: Finding,
  sources: Source[]
): Source[] {
  const sourceMap = new Map(sources.map((s) => [s.id, s]));
  return finding.sourceIds
    .map((id) => sourceMap.get(id))
    .filter((s): s is Source => s !== undefined);
}
