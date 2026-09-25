"use client";

import React from "react";
import { CheckCircle2, Circle, Loader2, Sparkles, Globe, Brain, Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResearchProgressProps {
  status: "idle" | "planning" | "searching" | "analyzing" | "generating" | "completed" | "error";
  query: string;
}

interface StepItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const STEPS: StepItem[] = [
  {
    id: "planning",
    label: "Planning research",
    icon: Sparkles,
    description: "Decomposing your question into targeted search queries",
  },
  {
    id: "searching",
    label: "Searching the web",
    icon: Globe,
    description: "Gathering authoritative sources and technical documentation",
  },
  {
    id: "analyzing",
    label: "Analyzing sources",
    icon: Brain,
    description: "Cross-referencing claims and evaluating evidence",
  },
  {
    id: "generating",
    label: "Connecting evidence",
    icon: Network,
    description: "Structuring findings and establishing source attribution",
  },
];

const STEP_INDEX_MAP: Record<string, number> = {
  planning: 0,
  searching: 1,
  analyzing: 2,
  generating: 3,
  completed: 4,
};

export function ResearchProgress({ status, query }: ResearchProgressProps) {
  const currentStepIndex = STEP_INDEX_MAP[status] ?? 0;

  return (
    <div className="w-full bg-surface border border-border rounded-xl p-4 sm:p-8 animate-fade-in shadow-subtle">
      <div className="max-w-[760px] mx-auto">
        <div className="mb-5 sm:mb-6">
          <span className="text-xs font-medium text-ocean-deep uppercase tracking-wider">
            Active Investigation
          </span>
          <h3 className="font-h3 text-text-primary mt-1 line-clamp-2 break-words">
            &ldquo;{query}&rdquo;
          </h3>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {STEPS.map((step, idx) => {
            const isDone = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx && status !== "completed";

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-lg border transition-all duration-300",
                  isCurrent
                    ? "bg-surface-subtle border-ocean-deep/30 shadow-subtle"
                    : isDone
                    ? "bg-surface border-border opacity-90"
                    : "bg-surface/50 border-border/40 opacity-40"
                )}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-ocean-deep" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-ocean-deep animate-spin" />
                  ) : (
                    <Circle className="w-5 h-5 text-text-muted" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text-primary">
                      {step.label}
                    </span>
                    {isCurrent && (
                      <span className="text-xs text-ocean-deep font-medium animate-pulse">
                        In progress
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
