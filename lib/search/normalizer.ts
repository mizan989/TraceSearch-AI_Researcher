import { Source, SourceType } from "@/types/source";
import { extractDomain, isSafeExternalUrl } from "@/lib/utils";

export function categorizeSource(url: string, domain: string, title: string): SourceType {
  const d = domain.toLowerCase();
  const u = url.toLowerCase();
  const t = title.toLowerCase();

  // 1. Official & Government / Regulatory / International bodies
  if (
    d.endsWith(".gov") ||
    d.includes(".gov.") ||
    d.endsWith(".nic.in") ||
    d.endsWith(".mil") ||
    d.endsWith(".int") ||
    d.includes("nist.gov") ||
    d.includes("cisa.gov") ||
    d.includes("epa.gov") ||
    d.includes("who.int") ||
    d.includes("un.org") ||
    d.includes("worldbank.org") ||
    d.includes("imf.org") ||
    d.includes("oecd.org") ||
    d.includes("europa.eu") ||
    d.includes("w3.org") ||
    d.includes("ietf.org") ||
    d.includes("iso.org") ||
    d.includes("fidoalliance.org")
  ) {
    return "official";
  }

  // 2. Academic & Scientific Research Literature
  if (
    d.endsWith(".edu") ||
    d.includes(".ac.") ||
    d.includes("arxiv.org") ||
    d.includes("biorxiv.org") ||
    d.includes("medrxiv.org") ||
    d.includes("ncbi.nlm.nih.gov") ||
    d.includes("pubmed") ||
    d.includes("researchgate.net") ||
    d.includes("ieee.org") ||
    d.includes("acm.org") ||
    d.includes("nature.com") ||
    d.includes("science.org") ||
    d.includes("sciencedirect.com") ||
    d.includes("springer.com") ||
    d.includes("cell.com") ||
    d.includes("thelancet.com") ||
    d.includes("jstor.org") ||
    d.includes("openalex.org")
  ) {
    return "academic";
  }

  // 3. Technical, Open Source & Developer Ecosystems
  if (
    d.includes("github.com") ||
    d.includes("gitlab.com") ||
    d.includes("huggingface.co") ||
    d.includes("pypi.org") ||
    d.includes("npmjs.com") ||
    d.includes("crates.io") ||
    d.includes("stackoverflow.com") ||
    d.includes("developer.") ||
    d.includes("docs.") ||
    d.includes("api.") ||
    d.includes("mozilla.org") ||
    d.includes("rfc-editor.org") ||
    u.includes("/documentation/") ||
    u.includes("/docs/")
  ) {
    return "technical";
  }

  // 4. News & Journalism
  if (
    d.includes("reuters.com") ||
    d.includes("bloomberg.com") ||
    d.includes("wsj.com") ||
    d.includes("nytimes.com") ||
    d.includes("techcrunch.com") ||
    d.includes("wired.com") ||
    d.includes("theverge.com") ||
    d.includes("bbc.com") ||
    d.includes("forbes.com") ||
    d.includes("thehindu.com") ||
    d.includes("indianexpress.com") ||
    d.includes("theguardian.com") ||
    d.includes("apnews.com") ||
    d.includes("ft.com") ||
    d.includes("zdnet.com") ||
    d.includes("bleepingcomputer.com")
  ) {
    return "news";
  }

  // 5. Community & Discussion
  if (
    d.includes("reddit.com") ||
    d.includes("news.ycombinator.com") ||
    d.includes("discord.com") ||
    d.includes("forum") ||
    d.includes("community")
  ) {
    return "community";
  }

  // 6. Blogs & Commentary
  if (
    d.includes("medium.com") ||
    d.includes("substack.com") ||
    d.includes("blog.") ||
    u.includes("/blog/")
  ) {
    return "blog";
  }

  // 7. Companies
  if (
    t.includes("inc.") ||
    t.includes("corp") ||
    d.includes("microsoft.com") ||
    d.includes("google.com") ||
    d.includes("apple.com") ||
    d.includes("crowdstrike.com") ||
    d.includes("paloaltonetworks.com") ||
    d.includes("cloudflare.com")
  ) {
    return "company";
  }

  return "other";
}

export interface SerpApiOrganicResult {
  position?: number;
  title?: string;
  link?: string;
  snippet?: string;
  displayed_link?: string;
  date?: string;
  source?: string;
}

export function normalizeSerpApiResult(
  result: SerpApiOrganicResult,
  sessionId: string,
  index: number
): Source | null {
  const url = result.link?.trim();
  const title = result.title?.trim();

  if (!url || !title || !isSafeExternalUrl(url)) {
    return null;
  }

  const domain = extractDomain(url);
  const snippet = (result.snippet || "").trim();
  const sourceType = categorizeSource(url, domain, title);

  return {
    id: `src_${index + 1}`,
    researchSessionId: sessionId,
    title,
    url,
    domain,
    snippet,
    sourceType,
    retrievedAt: new Date().toISOString(),
  };
}
