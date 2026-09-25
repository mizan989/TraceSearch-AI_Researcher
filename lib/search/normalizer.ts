import { Source, SourceType } from "@/types/source";
import { extractDomain } from "@/lib/utils";

export function categorizeSource(url: string, domain: string, title: string): SourceType {
  const d = domain.toLowerCase();
  const u = url.toLowerCase();
  const t = title.toLowerCase();

  if (d.endsWith(".gov") || d.endsWith(".mil") || d.includes("nist.gov") || d.includes("cisa.gov") || d.includes("fidoalliance.org") || d.includes("w3.org") || d.includes("who.int") || d.includes("europa.eu")) {
    return "official";
  }
  if (d.endsWith(".edu") || d.includes("arxiv.org") || d.includes("researchgate") || d.includes("ieee.org") || d.includes("acm.org") || d.includes("nature.com") || d.includes("sciencedirect")) {
    return "academic";
  }
  if (d.includes("github.com") || d.includes("stackoverflow.com") || d.includes("developer.") || d.includes("docs.") || d.includes("gitlab.com") || u.includes("/documentation/") || u.includes("/docs/")) {
    return "technical";
  }
  if (d.includes("reuters.com") || d.includes("bloomberg.com") || d.includes("wsj.com") || d.includes("nytimes.com") || d.includes("techcrunch.com") || d.includes("wired.com") || d.includes("theverge.com") || d.includes("bbc.com") || d.includes("forbes.com") || d.includes("zdnet.com") || d.includes("bleepingcomputer.com")) {
    return "news";
  }
  if (d.includes("reddit.com") || d.includes("news.ycombinator.com") || d.includes("discord.com") || d.includes("forum") || d.includes("community")) {
    return "community";
  }
  if (d.includes("medium.com") || d.includes("substack.com") || d.includes("blog.") || u.includes("/blog/")) {
    return "blog";
  }
  if (t.includes("inc.") || t.includes("corp") || d.includes("microsoft.com") || d.includes("google.com") || d.includes("apple.com") || d.includes("crowdstrike.com") || d.includes("paloaltonetworks.com") || d.includes("cloudflare.com")) {
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

  if (!url || !title) {
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
