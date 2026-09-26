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
 * Validates that an outbound scrape URL targets a public, safe web server
 * and blocks private, loopback, link-local, and cloud metadata IP ranges.
 */
function isSafeScrapeUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);

    // Protocol must strictly be http: or https:
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    const host = parsed.hostname.toLowerCase().trim();

    // Block localhost and loopback names
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host === "0.0.0.0" ||
      host === "[::]" ||
      host.endsWith(".localhost") ||
      host.endsWith(".local") ||
      host.endsWith(".internal") ||
      host.endsWith(".lan") ||
      host.endsWith(".corp") ||
      host.endsWith(".arpa")
    ) {
      return false;
    }

    // Check IPv4 private and link-local ranges
    const ipv4Parts = host.split(".").map(Number);
    if (ipv4Parts.length === 4 && ipv4Parts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) {
      const [b0, b1] = ipv4Parts;
      // 127.0.0.0/8 (Loopback)
      if (b0 === 127) return false;
      // 10.0.0.0/8 (Private)
      if (b0 === 10) return false;
      // 172.16.0.0/12 (Private)
      if (b0 === 172 && b1 >= 16 && b1 <= 31) return false;
      // 192.168.0.0/16 (Private)
      if (b0 === 192 && b1 === 168) return false;
      // 169.254.0.0/16 (Link-local / Cloud metadata, e.g. AWS 169.254.169.254)
      if (b0 === 169 && b1 === 254) return false;
      // 0.0.0.0/8 (Current network)
      if (b0 === 0) return false;
      // 100.64.0.0/10 (Carrier-grade NAT)
      if (b0 === 100 && b1 >= 64 && b1 <= 127) return false;
    }

    // Disallow non-standard ports to prevent internal port scanning
    if (parsed.port && parsed.port !== "80" && parsed.port !== "443" && parsed.port !== "") {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Fetches page content for a single source with strict timeout and error protection.
 */
async function scrapeSingleSource(source: Source): Promise<Source> {
  // Validate URL scheme and block private/loopback/metadata destinations (SSRF defense)
  if (!isSafeScrapeUrl(source.url)) {
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
    let res = await fetch(source.url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 TraceSearch/1.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7",
      },
      // Strict 2s timeout per source to keep the pipeline responsive and within server limits
      signal: AbortSignal.timeout(2000),
      redirect: "manual",
    });

    // If redirected, ensure target location is validated before following
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (location) {
        const resolvedUrl = new URL(location, source.url).toString();
        if (isSafeScrapeUrl(resolvedUrl)) {
          res = await fetch(resolvedUrl, {
            method: "GET",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 TraceSearch/1.0",
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7",
            },
            signal: AbortSignal.timeout(2000),
            redirect: "error",
          });
        } else {
          return source;
        }
      } else {
        return source;
      }
    }

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
  maxToScrape = 3
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
