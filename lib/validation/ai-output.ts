import { z } from "zod";

export const PlannedQuerySchema = z.object({
  query: z.string().min(2),
  rationale: z.string().default(""),
});

export const ResearchPlanSchema = z.object({
  queries: z.array(PlannedQuerySchema).min(1).max(4),
});

export const GeneratedFindingSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(5),
  source_ids: z.array(z.string()).default([]),
  uncertainty: z.string().optional(),
});

export const StructuredSynthesisSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  findings: z.array(GeneratedFindingSchema).min(1),
  uncertainties: z.array(z.string()).default([]),
  follow_up_questions: z.array(z.string()).default([]),
});

export type ValidatedResearchPlan = z.infer<typeof ResearchPlanSchema>;
export type ValidatedSynthesisOutput = z.infer<typeof StructuredSynthesisSchema>;
