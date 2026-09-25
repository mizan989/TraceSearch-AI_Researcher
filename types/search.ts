export type SearchQueryStatus = "pending" | "completed" | "failed";

export interface SearchQuery {
  id: string;
  researchSessionId: string;
  query: string;
  provider: string;
  status: SearchQueryStatus;
  createdAt: string;
}

export interface SerpApiSearchParameters {
  q: string;
  num?: number;
  gl?: string;
  hl?: string;
  engine?: string;
}
