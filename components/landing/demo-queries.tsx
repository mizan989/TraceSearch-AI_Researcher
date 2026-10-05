"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoQueriesProps {
  onSelectQuery: (query: string) => void;
}

interface QueryItem {
  title: string;
  query: string;
  tag: string;
  category: "public-interest" | "open-innovation" | "technology";
}

export function DemoQueries({ onSelectQuery }: DemoQueriesProps) {
  const [activeTab, setActiveTab] = useState<string>("curated");

  const allQueries: QueryItem[] = [
    {
      title: "India Data Protection Rules",
      query: "What changed in India's latest data protection rules?",
      tag: "Public Policy",
      category: "public-interest",
    },
    {
      title: "Open-Source LLM Inference",
      query: "What are the most promising open-source LLM inference frameworks in 2026?",
      tag: "Open Innovation",
      category: "open-innovation",
    },
    {
      title: "AI and Cybersecurity in 2026",
      query: "How is artificial intelligence changing cybersecurity in 2026?",
      tag: "Flagship Demo",
      category: "technology",
    },
    {
      title: "Solid-State Batteries",
      query: "What are the latest breakthroughs in solid-state battery commercialization?",
      tag: "Clean Tech",
      category: "technology",
    },
    {
      title: "Delhi Air Quality Trends",
      query: "How has air quality in Delhi changed over the last decade?",
      tag: "Environment",
      category: "public-interest",
    },
    {
      title: "Extreme Heat Science",
      query: "What does the latest scientific evidence say about extreme heat?",
      tag: "Climate Science",
      category: "public-interest",
    },
    {
      title: "Economic Claim Fact Check",
      query: "Is this viral claim about India's economy supported by official data?",
      tag: "Fact Checking",
      category: "public-interest",
    },
    {
      title: "Stripe Open-Source Alternatives",
      query: "What open-source alternatives exist to Stripe for a small SaaS?",
      tag: "Open Source",
      category: "open-innovation",
    },
    {
      title: "Next-Gen CAPTCHA Systems",
      query: "What technologies could replace traditional CAPTCHA systems?",
      tag: "Emerging Tech",
      category: "open-innovation",
    },
    {
      title: "Sodium-Ion Batteries",
      query: "How are researchers approaching sodium-ion batteries?",
      tag: "Clean Innovation",
      category: "open-innovation",
    },
    {
      title: "Passkeys and Deepfakes",
      query: "How do passkeys and FIDO2 authentication mitigate voice deepfake social engineering?",
      tag: "Security",
      category: "technology",
    },
    {
      title: "Electric Vehicle Adoption",
      query: "What is the future outlook for electric vehicle adoption in India?",
      tag: "Market Research",
      category: "technology",
    },
  ];

  const tabs = [
    { id: "curated", label: "Curated" },
    { id: "public-interest", label: "Public Interest" },
    { id: "open-innovation", label: "Open Innovation" },
    { id: "technology", label: "Tech & Security" },
  ];

  const displayedQueries =
    activeTab === "curated"
      ? allQueries.slice(0, 4)
      : allQueries.filter((q) => q.category === activeTab).slice(0, 4);

  return (
    <div className="w-full max-w-[800px] mx-auto mt-6">
      {/* Category Filter Pills */}
      <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Sparkles className="w-3.5 h-3.5 text-ocean-deep shrink-0" />
          <span>Curated research prompts:</span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer shrink-0 border",
                  isActive
                    ? "bg-ocean-deep text-white border-ocean-deep shadow-subtle"
                    : "bg-surface text-text-secondary border-border hover:border-border-strong hover:text-text-primary"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Query Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {displayedQueries.map((item, idx) => (
          <button
            key={`${activeTab}-${idx}`}
            type="button"
            onClick={() => onSelectQuery(item.query)}
            style={{ animationDelay: `${idx * 60}ms` }}
            className="animate-stagger-item hover-lift flex flex-col text-left p-3.5 rounded-xl border border-border bg-surface hover:border-ocean-deep hover:bg-surface-subtle transition-all duration-200 group shadow-subtle cursor-pointer outline-none focus:outline-none focus-visible:outline-2 focus-visible:outline-focus-ring active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-text-primary group-hover:text-ocean-deep transition-colors truncate pr-2">
                {item.title}
              </span>
              <span className="text-[10px] font-medium text-ocean-deep bg-ocean-deep/10 px-2 py-0.5 rounded-full shrink-0">
                {item.tag}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="text-xs text-text-secondary line-clamp-2 sm:truncate flex-1 min-w-0 font-normal">
                {item.query}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-text-muted opacity-40 group-hover:opacity-100 group-hover:text-ocean-deep group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
