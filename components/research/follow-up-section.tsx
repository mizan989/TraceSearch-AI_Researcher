"use client";

import React from "react";
import { ArrowRight, HelpCircle } from "lucide-react";

interface FollowUpSectionProps {
  questions?: string[];
  onSelectQuestion: (question: string) => void;
}

export function FollowUpSection({ questions, onSelectQuestion }: FollowUpSectionProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-subtle transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-4 h-4 text-ocean-deep" />
        <h4 className="text-sm font-semibold text-text-primary">
          Suggested Follow-Up Investigations
        </h4>
      </div>

      <p className="text-xs text-text-muted mb-4">
        Explore related dimensions, verify secondary claims, or examine adjacent developments:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectQuestion(q)}
            style={{ animationDelay: `${idx * 60}ms` }}
            className="hover-lift animate-stagger-item flex items-center justify-between text-left p-3 rounded-lg border border-border bg-surface-subtle hover:border-ocean-deep hover:bg-surface text-xs font-medium text-text-primary transition-all duration-200 group cursor-pointer active:scale-[0.98]"
          >
            <span className="line-clamp-2 pr-2">{q}</span>
            <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-ocean-deep group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
