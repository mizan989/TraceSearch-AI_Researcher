import React from "react";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="text-center pt-6 sm:pt-10 pb-4 sm:pb-6 max-w-[800px] mx-auto animate-fade-in px-2">
      <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-4">
        <Badge variant="ocean">Live Web Research</Badge>
        <span className="text-xs text-text-muted hidden xs:inline">·</span>
        <span className="text-xs text-text-muted tracking-wide">Evidence-Grounded Intelligence</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-text-primary leading-[1.15] sm:leading-[1.12]">
        Turn complex questions into verified research.
      </h1>

      <p className="text-sm sm:text-lg text-text-secondary mt-3 sm:mt-4 max-w-[620px] mx-auto leading-relaxed font-normal">
        TraceSearch searches the live web, cross-references sources with AI, and lets you trace important findings directly back to their evidence.
      </p>
    </section>
  );
}
