import { Source } from "@/types/source";

/**
 * Extracts readable article text from raw HTML by removing scripts, styles, and navigational chrome.
 */
function extractArticleText(html: string): string {
  try {
    // Remove scripts, styles, svgs, noscripts, iframes, navs, headers, footers
    let text = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
      .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, " ")
      .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, " ")
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, " ")
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, " ")
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ");

    // Replace paragraph breaks and headings with newlines
    text = text
      .replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|li|tr|section|article)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n");

    // Strip all remaining HTML tags
    text = text.replace(/<[^>]+>/g, " ");

    // Decode common HTML entities
    text = text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");

    // Collapse excessive whitespace while preserving paragraph breaks
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 30); // Filter out short button labels, menu items

    const combined = lines.join("\n\n");
    // Limit to first 2500 characters of meaningful content per source to stay fast and within model context
    return combined.slice(0, 2500).trim();
  } catch {
    return "";
  }
}

/**
 * Fetches page content for a single source with strict timeout and error protection.
 */
async function scrapeSingleSource(source: Source): Promise<Source> {
  // Only attempt scraping http/https web pages
  if (!source.url.startsWith("http://") && !source.url.startsWith("https://")) {
    return source;
  }

  // Skip binary/file downloads
  const lowerUrl = source.url.toLowerCase();
  if (
    lowerUrl.endsWith(".pdf") ||
    lowerUrl.endsWith(".zip") ||
    lowerUrl.endsWith(".exe") ||
    lowerUrl.endsWith(".dmg")
  ) {
    return source;
  }

  try {
    const res = await fetch(source.url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 TraceSearch/1.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7",
      },
      // Strict 4.5s timeout per source to keep the pipeline responsive
      signal: AbortSignal.timeout(4500),
    });

    if (!res.ok) {
      return source;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
      return source;
    }

    const html = await res.text();
    const extracted = extractArticleText(html);

    if (extracted.length > 80) {
      return {
        ...source,
        fullContent: extracted,
      };
    }

    return source;
  } catch {
    // If scraping fails (CORS, Cloudflare, timeout), fall back gracefully to the organic snippet
    return source;
  }
}

/**
 * Enriches sources by scraping real article content for the top candidates concurrently.
 */
export async function enrichSourcesWithContent(
  sources: Source[],
  maxToScrape = 6
): Promise<Source[]> {
  if (sources.length === 0) return [];

  // Scrape top candidates concurrently
  const targets = sources.slice(0, maxToScrape);
  const remaining = sources.slice(maxToScrape);

  const scrapePromises = targets.map((s) => scrapeSingleSource(s));
  const results = await Promise.allSettled(scrapePromises);

  const enrichedTargets: Source[] = results.map((res, idx) =>
    res.status === "fulfilled" ? res.value : targets[idx]
  );

  return [...enrichedTargets, ...remaining];
}
