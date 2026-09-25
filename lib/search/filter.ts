import { Source } from "@/types/source";

export function filterAndDeduplicateSources(sources: Source[], maxSources = 15): Source[] {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const filtered: Source[] = [];

  for (const src of sources) {
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

    // Keep source
    filtered.push({
      ...src,
      url: cleanUrl,
    });

    if (filtered.length >= maxSources) {
      break;
    }
  }

  // Re-index IDs so they are sequential (src_1, src_2, etc.)
  return filtered.map((s, idx) => ({
    ...s,
    id: `src_${idx + 1}`,
  }));
}
