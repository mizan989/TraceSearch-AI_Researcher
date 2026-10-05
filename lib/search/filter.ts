import { Source, SourceType } from "@/types/source";

/**
 * Returns an authority tier score to prioritize official, academic,
 * and primary technical repositories while maintaining organic diversity.
 */
function getSourceAuthorityWeight(type: SourceType): number {
  switch (type) {
    case "official":
      return 50;
    case "academic":
      return 45;
    case "technical":
      return 35;
    case "news":
      return 25;
    case "company":
      return 15;
    case "blog":
      return 5;
    case "community":
      return 3;
    case "other":
    default:
      return 1;
  }
}

export function filterAndDeduplicateSources(sources: Source[], maxSources = 15): Source[] {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const uniqueCandidates: Array<{ source: Source; score: number }> = [];

  const total = sources.length;

  for (let i = 0; i < sources.length; i++) {
    const src = sources[i];
    if (!src.url || !src.title) continue;

    // Normalize URL: remove hash, trailing slash, tracking params
    let cleanUrl = src.url;
    try {
      const u = new URL(src.url);
      u.hash = "";
      u.searchParams.delete("utm_source");
      u.searchParams.delete("utm_medium");
      u.searchParams.delete("utm_campaign");
      cleanUrl = u.toString().replace(/\/$/, "");
    } catch {
      // keep original
    }

    const normalizedTitle = src.title.toLowerCase().trim();

    if (seenUrls.has(cleanUrl) || seenTitles.has(normalizedTitle)) {
      continue;
    }

    seenUrls.add(cleanUrl);
    seenTitles.add(normalizedTitle);

    // Score combines authority tier + retrieval position signal
    const authorityScore = getSourceAuthorityWeight(src.sourceType);
    const positionScore = (total - i) / Math.max(total, 1);
    const totalScore = authorityScore + positionScore;

    uniqueCandidates.push({
      source: {
        ...src,
        url: cleanUrl,
      },
      score: totalScore,
    });
  }

  // Sort by priority score so authoritative primary sources surface to the top for scraping & synthesis
  uniqueCandidates.sort((a, b) => b.score - a.score);

  const selected = uniqueCandidates.slice(0, maxSources).map((c) => c.source);

  // Re-index IDs so they are sequential (src_1, src_2, etc.)
  return selected.map((s, idx) => ({
    ...s,
    id: `src_${idx + 1}`,
  }));
}

