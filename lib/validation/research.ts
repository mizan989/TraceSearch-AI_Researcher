import { z } from "zod";

export const ResearchRequestSchema = z.object({
  query: z
    .string()
    .trim()
    .min(3, "Research question must be at least 3 characters long.")
    .max(500, "Research question must not exceed 500 characters."),
  mode: z.enum(["quick", "deep"]).optional().default("quick"),
});

export type ValidatedResearchRequest = z.infer<typeof ResearchRequestSchema>;
