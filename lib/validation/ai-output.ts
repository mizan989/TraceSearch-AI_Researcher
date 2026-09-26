import { z } from "zod";

export const PlannedQuerySchema = z.object({
  query: z.string().min(2),
  rationale: z.string().default(""),
});

export const ResearchPlanSchema = z.object({
  queries: z.array(PlannedQuerySchema).min(1).max(6),
});

export const GeneratedFindingSchema = z
  .object({
    title: z.string().optional().default("Key Finding"),
    content: z.string().optional().default(""),
    source_ids: z.union([z.array(z.string()), z.string().transform((s) => [s])]).optional().default([]),
    sourceIds: z.union([z.array(z.string()), z.string().transform((s) => [s])]).optional(),
    uncertainty: z.string().optional(),
  })
  .transform((val) => ({
    title: val.title || "Key Finding",
    content: val.content || "",
    source_ids: val.source_ids.length > 0 ? val.source_ids : val.sourceIds || [],
    uncertainty: val.uncertainty,
  }));

export const StructuredSynthesisSchema = z
  .object({
    title: z.string().optional().default("Research Synthesis"),
    summary: z.string().optional().default(""),
    findings: z.array(GeneratedFindingSchema).optional().default([]),
    uncertainties: z.array(z.string()).optional().default([]),
    follow_up_questions: z.array(z.string()).optional(),
    followUpQuestions: z.array(z.string()).optional(),
  })
  .transform((val) => ({
    title: val.title || "Research Synthesis",
    summary: val.summary || "",
    findings: val.findings || [],
    uncertainties: val.uncertainties || [],
    follow_up_questions: val.follow_up_questions || val.followUpQuestions || [],
  }));

export type ValidatedResearchPlan = z.infer<typeof ResearchPlanSchema>;
export type ValidatedSynthesisOutput = z.infer<typeof StructuredSynthesisSchema>;
