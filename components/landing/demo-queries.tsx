"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface DemoQueriesProps {
  onSelectQuery: (query: string) => void;
}

export function DemoQueries({ onSelectQuery }: DemoQueriesProps) {
  const sampleQueries = [
    {
      title: "AI and Cybersecurity in 2026",
      query: "How is artificial intelligence changing cybersecurity in 2026?",
      tag: "Flagship Demo",
    },
    {
      title: "Passkeys and Deepfakes",
      query: "How do passkeys and FIDO2 authentication mitigate voice deepfake social engineering?",
      tag: "Identity & Security",
    },
    {
      title: "Solid-State Batteries",
      query: "What are the latest breakthroughs in solid-state battery commercialization?",
      tag: "Clean Tech",
    },
    {
      title: "Electric Vehicle Adoption",
      query: "What is the future outlook for electric vehicle adoption in India?",
      tag: "Market Research",
    },
  ];

  return (
    <div className="w-full max-w-[800px] mx-auto mt-6">
      <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3 justify-center">
        <Sparkles className="w-3.5 h-3.5 text-ocean-deep" />
        <span>Or start with a curated research prompt:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {sampleQueries.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectQuery(item.query)}
            style={{ animationDelay: `${idx * 70}ms` }}
            className="animate-stagger-item hover-lift flex flex-col text-left p-3.5 rounded-xl border border-border bg-surface hover:border-ocean-deep hover:bg-surface-subtle transition-all duration-200 group shadow-subtle cursor-pointer outline-none focus:outline-none focus-visible:outline-2 focus-visible:outline-focus-ring active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-text-primary group-hover:text-ocean-deep transition-colors">
                {item.title}
              </span>
              <span className="text-[10px] font-medium text-ocean-deep bg-ocean-deep/10 px-2 py-0.5 rounded-full">
                {item.tag}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="text-xs text-text-secondary truncate flex-1 min-w-0">
                {item.query}
              </span>
              <ArrowRight className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
