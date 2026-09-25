export type SourceType =
  | "official"
  | "news"
  | "academic"
  | "company"
  | "technical"
  | "blog"
  | "community"
  | "other";

export interface Source {
  id: string;
  researchSessionId: string;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  sourceType: SourceType;
  retrievedAt: string;
}

export interface RawSearchResult {
  title: string;
  link: string;
  snippet: string;
  source?: string;
  displayed_link?: string;
  date?: string;
}
