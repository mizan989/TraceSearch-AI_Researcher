import React from "react";
import { Search, BrainCircuit, Link2 } from "lucide-react";

export function Features() {
  const steps = [
    {
      step: "01",
      title: "Search the Web",
      tagline: "Targeted multi-query retrieval",
      description:
        "Decomposes your question into complementary search queries across technical documentation, government reports, and authoritative news.",
      icon: Search,
    },
    {
      step: "02",
      title: "Analyze Sources",
      tagline: "Cross-source synthesis",
      description:
        "Extracts concrete data points, identifies consensus and uncertainty, and structures insights into an executive-ready brief.",
      icon: BrainCircuit,
    },
    {
      step: "03",
      title: "Trace Evidence",
      tagline: "Grounding without hallucination",
      description:
        "Every single finding is tied to verified URLs. Click any citation to inspect the original text snippet and open the source.",
      icon: Link2,
    },
  ];

  return (
    <section className="w-full max-w-[1080px] mx-auto py-10 sm:py-16 px-2 sm:px-4">
      <div className="text-center max-w-[620px] mx-auto mb-8 sm:mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-ocean-deep">
          How TraceSearch Works
        </span>
        <h2 className="font-h2 text-text-primary mt-2 tracking-tight">
          Research with verifiable provenance.
        </h2>
        <p className="text-sm text-text-secondary mt-2 leading-relaxed">
          Traditional AI gives you an unsupported answer. TraceSearch gives you an investigable trail to inspect the evidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="bg-surface border border-border rounded-xl p-5 sm:p-6 shadow-subtle hover:border-border-strong transition-colors text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold text-ocean-deep">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-md bg-surface-subtle border border-border flex items-center justify-center text-ocean-deep">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-h4 text-text-primary mb-1">
                  {item.title}
                </h3>
                <span className="text-xs font-medium text-ocean-deep block mb-3">
                  {item.tagline}
                </span>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
