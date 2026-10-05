"use client";

import React from "react";
import { ArrowUpRight, Scale, Cpu, TrendingUp, BookOpen, ShieldCheck, Compass } from "lucide-react";

interface UseCasesProps {
  onSelectQuery: (query: string) => void;
}

interface UseCaseItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  sampleQuery: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function UseCases({ onSelectQuery }: UseCasesProps) {
  const useCases: UseCaseItem[] = [
    {
      id: "public-interest",
      title: "Knowledge & Public Interest",
      tag: "Public Policy · Science · Civic",
      description:
        "Investigate regulations, environmental science, government statistics, and civic claims with authoritative grounding.",
      sampleQuery: "What changed in India's latest data protection rules?",
      icon: Scale,
    },
    {
      id: "open-innovation",
      title: "Open Innovation",
      tag: "Open Source · AI · Tech",
      description:
        "Discover emerging technologies, active open-source repositories, developer tools, and empirical benchmarks.",
      sampleQuery: "What are the most promising open-source LLM inference frameworks in 2026?",
      icon: Cpu,
    },
    {
      id: "market-intelligence",
      title: "Market Intelligence",
      tag: "Industry · Strategy · Analysis",
      description:
        "Understand competitive landscapes, commercialization roadmaps, corporate disclosures, and market shifts.",
      sampleQuery: "What is the future outlook for electric vehicle adoption in India?",
      icon: TrendingUp,
    },
    {
      id: "academic-research",
      title: "Academic & Scientific Research",
      tag: "Peer Review · Papers · Trials",
      description:
        "Connect findings across scientific literature, clinical trial data, preprints, and institutional studies.",
      sampleQuery: "What does the latest scientific evidence say about extreme heat and urban microclimates?",
      icon: BookOpen,
    },
    {
      id: "security-research",
      title: "Technical & Security Research",
      tag: "Protocols · Vulnerabilities · Architecture",
      description:
        "Investigate system architectures, cryptographic standards, CVE disclosures, and protocol tradeoffs.",
      sampleQuery: "How do passkeys and FIDO2 authentication mitigate voice deepfake social engineering?",
      icon: ShieldCheck,
    },
    {
      id: "local-discovery",
      title: "Travel & Local Discovery",
      tag: "Regional · Cultural · Logistics",
      description:
        "Research destinations, cultural preservation, regional infrastructure, and verified local experiences.",
      sampleQuery: "Historical preservation and urban planning initiatives in Kyoto",
      icon: Compass,
    },
  ];

  return (
    <section className="w-full max-w-[800px] mx-auto mt-12 pt-10 border-t border-border/80">
      <div className="text-center mb-6 px-2">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary tracking-tight">
          What can you research?
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-[560px] mx-auto leading-relaxed">
          From public policy and civic questions to open innovation and technical architectures, TraceSearch connects claims to primary evidence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {useCases.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectQuery(item.sampleQuery)}
              className="group flex flex-col justify-between text-left p-4 rounded-xl border border-border bg-surface hover:border-ocean-deep hover:bg-surface-subtle transition-all duration-200 shadow-subtle cursor-pointer outline-none focus:outline-none focus-visible:outline-2 focus-visible:outline-focus-ring active:scale-[0.99]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-4 h-4 text-text-muted group-hover:text-ocean-deep transition-colors shrink-0" />
                    <span className="text-sm font-semibold text-text-primary group-hover:text-ocean-deep transition-colors truncate">
                      {item.title}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-text-muted opacity-60 group-hover:opacity-100 group-hover:text-ocean-deep group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>

                <div className="text-[10px] font-medium text-ocean-deep/90 mb-2 uppercase tracking-wide">
                  {item.tag}
                </div>

                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between gap-2 text-[11px] text-text-muted group-hover:text-text-primary transition-colors">
                <span className="truncate">
                  e.g., &ldquo;{item.sampleQuery}&rdquo;
                </span>
                <span className="text-[10px] font-medium text-ocean-deep opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  Try prompt &rarr;
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
