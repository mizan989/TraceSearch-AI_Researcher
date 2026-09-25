"use client";

import React from "react";
import { AlertCircle, Link2 } from "lucide-react";
import { Finding } from "@/types/research";
import { Source } from "@/types/source";
import { formatFindingNumber } from "@/lib/research/findings";
import { cn } from "@/lib/utils";

interface FindingCardProps {
  finding: Finding;
  index: number;
  sources: Source[];
  activeSourceId?: string | null;
  onCitationClick: (sourceId: string) => void;
  onSelectFinding?: (findingId: string) => void;
  isSelected?: boolean;
}

export function FindingCard({
  finding,
  index,
  sources,
  activeSourceId,
  onCitationClick,
  onSelectFinding,
  isSelected = false,
}: FindingCardProps) {
  const sourceMap = new Map(sources.map((s) => [s.id, s]));
  const matchedSources = finding.sourceIds
    .map((id) => sourceMap.get(id))
    .filter((s): s is Source => s !== undefined);

  return (
    <article
      id={`finding-${finding.id}`}
      onClick={() => onSelectFinding?.(finding.id)}
      style={{ animationDelay: `${index * 80}ms` }}
      className={cn(
        "group relative bg-surface border rounded-xl p-4 sm:p-6 lg:p-7 transition-all duration-200 animate-stagger-item hover-lift",
        isSelected
          ? "border-ocean-deep ring-2 ring-ocean-deep/10 shadow-floating"
          : "border-border hover:border-border-strong shadow-subtle"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="font-mono text-sm font-semibold text-ocean-deep">
          {formatFindingNumber(index)}
        </span>
        {finding.uncertainty && (
          <div className="flex items-center gap-1.5 text-xs text-warning bg-warning/10 px-2 py-0.5 rounded-md border border-warning/20">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span className="font-medium">Uncertainty noted</span>
          </div>
        )}
      </div>

      <h3 className="font-h3 text-text-primary mb-3 tracking-tight leading-snug break-words">
        {finding.title}
      </h3>

      <div className="text-text-secondary leading-relaxed font-body text-sm sm:text-base space-y-3">
        <p>{finding.content}</p>
      </div>

      {finding.uncertainty && (
        <div className="mt-4 p-3 bg-surface-subtle border-l-2 border-warning text-xs text-text-secondary rounded-r-md">
          <span className="font-semibold text-text-primary mr-1">Caveat:</span>
          {finding.uncertainty}
        </div>
      )}

      {matchedSources.length > 0 && (
        <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-border flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider mr-1 flex items-center gap-1">
            <Link2 className="w-3 h-3 text-ocean-deep" />
            Evidence:
          </span>

          {matchedSources.map((source) => {
            const isSourceActive = activeSourceId === source.id;
            return (
              <button
                key={source.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCitationClick(source.id);
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all duration-150 cursor-pointer outline-none focus:outline-none focus-visible:outline-2 focus-visible:outline-focus-ring active:scale-95 active:translate-y-[0.5px]",
                  isSourceActive
                    ? "bg-ocean-deep text-white border-ocean-deep shadow-subtle"
                    : "bg-surface-subtle text-text-secondary border-border hover:border-ocean-deep hover:text-text-primary"
                )}
              >
                <span className="truncate max-w-[120px] sm:max-w-[180px]">{source.domain}</span>
                <span className="text-[10px] opacity-75 font-mono">
                  #{source.id.replace("src_", "")}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </article>
  );
}
