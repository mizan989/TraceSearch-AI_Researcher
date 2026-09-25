import { Source } from "./source";
import { SearchQuery } from "./search";

export type ResearchStatus =
  | "idle"
  | "planning"
  | "searching"
  | "analyzing"
  | "generating"
  | "completed"
  | "error";

export interface Finding {
  id: string;
  researchSessionId: string;
  title: string;
  content: string;
  uncertainty?: string;
  sourceIds: string[];
  createdAt: string;
}

export interface FindingSource {
  findingId: string;
  sourceId: string;
  relationship?: string;
}

export interface ResearchSession {
  id: string;
  userId?: string;
  query: string;
  title: string;
  summary: string;
  status: ResearchStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  uncertainties?: string[];
  followUpQuestions?: string[];
  findings: Finding[];
  sources: Source[];
  searchQueries?: SearchQuery[];
}

export interface ResearchProgressUpdate {
  status: ResearchStatus;
  message: string;
  step: number;
  totalSteps: number;
  sourcesFound?: number;
  currentQuery?: string;
}

export interface ResearchRequest {
  query: string;
  mode?: "quick" | "deep";
}

export interface ResearchResponse {
  success: boolean;
  data?: ResearchSession;
  error?: {
    code: string;
    message: string;
  };
}
