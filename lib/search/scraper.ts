import { Source } from "@/types/source";
import dns from "node:dns/promises";

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
 * Validates whether an IP address belongs to private, loopback, link-local,
 * cloud metadata, multicast, or reserved networks.
 */
function isPrivateOrBlockedIp(ip: string): boolean {
  if (!ip) return true;

  let normalizedIp = ip.toLowerCase().trim();
  // Strip IPv4-mapped IPv6 prefix
  if (normalizedIp.startsWith("::ffff:")) {
    normalizedIp = normalizedIp.slice(7);
  }

  // IPv4 validation
  const parts = normalizedIp.split(".").map(Number);
  if (parts.length === 4 && parts.every((p) => !isNaN(p) && p >= 0 && p <= 255)) {
    const [b0, b1, b2] = parts;
    // 127.0.0.0/8 (Loopback)
    if (b0 === 127) return true;
    // 10.0.0.0/8 (Private)
    if (b0 === 10) return true;
    // 172.16.0.0/12 (Private)
    if (b0 === 172 && b1 >= 16 && b1 <= 31) return true;
    // 192.168.0.0/16 (Private)
    if (b0 === 192 && b1 === 168) return true;
    // 169.254.0.0/16 (Link-local / Cloud metadata, e.g. AWS/GCP 169.254.169.254)
    if (b0 === 169 && b1 === 254) return true;
    // 0.0.0.0/8 (Current network)
    if (b0 === 0) return true;
    // 100.64.0.0/10 (Carrier-grade NAT)
    if (b0 === 100 && b1 >= 64 && b1 <= 127) return true;
    // Test networks (RFC 5737)
    if (b0 === 192 && b1 === 0 && b2 === 2) return true; // TEST-NET-1
    if (b0 === 198 && b1 === 51 && b2 === 100) return true; // TEST-NET-2
    if (b0 === 203 && b1 === 0 && b2 === 113) return true; // TEST-NET-3
    // 224.0.0.0/4 Multicast and 240.0.0.0/4 Reserved
    if (b0 >= 224) return true;
    return false;
  }

  // IPv6 validation
  if (normalizedIp === "::1" || normalizedIp === "::") return true;
  // fe80::/10 link-local
  if (
    normalizedIp.startsWith("fe8") ||
    normalizedIp.startsWith("fe9") ||
    normalizedIp.startsWith("fea") ||
    normalizedIp.startsWith("feb")
  ) {
    return true;
  }
  // fc00::/7 unique local addresses (ULA)
  if (normalizedIp.startsWith("fc") || normalizedIp.startsWith("fd")) {
    return true;
  }
  // ff00::/8 multicast
  if (normalizedIp.startsWith("ff")) {
    return true;
  }

  return false;
}

/**
 * Validates that an outbound scrape URL targets a public, safe web server
 * and blocks private, loopback, link-local, cloud metadata, and wildcard DNS domains.
 */
function isSafeScrapeUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);

    // Protocol must strictly be http: or https:
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    const host = parsed.hostname.toLowerCase().trim();

    // Block localhost, loopback names, and known wildcard DNS rebinding domains
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
      host.endsWith(".arpa") ||
      host.endsWith(".home") ||
      host.endsWith(".test") ||
      host.endsWith(".example") ||
      host.endsWith(".invalid") ||
      // Block known wildcard DNS resolution services
      host.endsWith(".nip.io") ||
      host.endsWith(".sslip.io") ||
      host.endsWith(".xip.io") ||
      host.endsWith(".traefik.me") ||
      host.endsWith(".localtest.me") ||
      host.endsWith(".vcap.me") ||
      host.includes("127.0.0.1") ||
      host.includes("169.254.") ||
      host.includes("localhost")
    ) {
      return false;
    }

    // Check direct numerical IP addresses
    if (isPrivateOrBlockedIp(host)) {
      return false;
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
 * Asynchronously verifies that the destination URL and its resolved DNS addresses
 * do not point to internal, private, loopback, or cloud metadata endpoints.
 */
async function isSafeDestination(rawUrl: string): Promise<boolean> {
  if (!isSafeScrapeUrl(rawUrl)) {
    return false;
  }

  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.toLowerCase().trim();

    // If host is already an IPv4 address, it passed isPrivateOrBlockedIp above
    const ipv4Parts = host.split(".").map(Number);
    if (ipv4Parts.length === 4 && ipv4Parts.every((p) => !isNaN(p))) {
      return true;
    }

    // Pre-resolve hostname via DNS to prevent DNS rebinding attacks
    const addresses = await dns.lookup(host, { all: true });
    if (!addresses || addresses.length === 0) {
      return false;
    }

    for (const record of addresses) {
      if (isPrivateOrBlockedIp(record.address)) {
        return false;
      }
    }

    return true;
  } catch {
    // DNS resolution failure or network lookup error
    return false;
  }
}

/**
 * Fetches page content for a single source with strict timeout and error protection.
 */
async function scrapeSingleSource(source: Source): Promise<Source> {
  // Validate URL scheme and pre-resolve DNS against private destinations (SSRF defense)
  if (!(await isSafeDestination(source.url))) {
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
        if (await isSafeDestination(resolvedUrl)) {
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
