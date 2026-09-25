export interface PlannedQuery {
  query: string;
  rationale: string;
}

export interface ResearchPlan {
  originalQuery: string;
  queries: PlannedQuery[];
}

export interface GeneratedFinding {
  title: string;
  content: string;
  sourceIds: string[];
  uncertainty?: string;
}

export interface StructuredSynthesisOutput {
  title: string;
  summary: string;
  findings: GeneratedFinding[];
  uncertainties: string[];
  followUpQuestions: string[];
}
