"use client";

import React, { useState } from "react";
import { Finding } from "@/types/research";
import { Source } from "@/types/source";
import { ExternalLink, Network, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceMapProps {
  findings: Finding[];
  sources: Source[];
  onSelectSource?: (sourceId: string) => void;
}

export function EvidenceMap({ findings, sources, onSelectSource }: EvidenceMapProps) {
  const [selectedFindingId, setSelectedFindingId] = useState<string>(
    findings[0]?.id || ""
  );

  const sourceMap = new Map(sources.map((s) => [s.id, s]));
  const currentFinding = findings.find((f) => f.id === selectedFindingId) || findings[0];

  const connectedSources = currentFinding
    ? currentFinding.sourceIds
        .map((id) => sourceMap.get(id))
        .filter((s): s is Source => s !== undefined)
    : [];

  return (
    <div className="w-full bg-surface border border-border rounded-xl p-4 sm:p-6 shadow-subtle transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-ocean-deep shrink-0" />
          <h4 className="text-sm font-semibold text-text-primary">
            Evidence Trace Map
          </h4>
        </div>
        <span className="text-xs text-text-muted hidden sm:inline">
          Interactive Claim to Source Graph
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left column: Findings selector */}
        <div className="md:col-span-5 space-y-2">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
            Select Finding
          </span>
          {findings.map((f, idx) => {
            const isSelected = f.id === (currentFinding?.id || "");
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFindingId(f.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer flex items-start gap-2.5",
                  isSelected
                    ? "bg-ocean-deep text-white border-ocean-deep shadow-subtle"
                    : "bg-surface-subtle text-text-primary border-border hover:border-border-strong hover:bg-surface"
                )}
              >
                <span className={cn(
                  "font-mono font-bold mt-0.5 px-1.5 py-0.5 rounded text-[10px] shrink-0",
                  isSelected ? "bg-white/20 text-white" : "bg-surface border border-border text-ocean-deep"
                )}>
                  0{idx + 1}
                </span>
                <span className="line-clamp-2 leading-tight flex-1">
                  {f.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right column: Trace tree and evidence list */}
        <div className="md:col-span-7 bg-surface-subtle rounded-xl p-3.5 sm:p-5 border border-border">
          {currentFinding ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs text-text-muted">
                <span className="flex items-center gap-1 font-semibold text-ocean-deep">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  Verified Traceability
                </span>
                <span>{connectedSources.length} Supporting Sources</span>
              </div>

              <div className="p-3 bg-surface rounded-lg border border-border text-xs leading-relaxed text-text-secondary">
                <span className="font-semibold text-text-primary block mb-1">
                  Finding Statement:
                </span>
                <p className="line-clamp-3">{currentFinding.content}</p>
              </div>

              {/* Connecting branch visual */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
                  Grounding Evidence Trail
                </span>

                {connectedSources.length > 0 ? (
                  connectedSources.map((source) => (
                    <div
                      key={source.id}
                      className="group flex items-start gap-3 p-3 bg-surface rounded-lg border border-border hover:border-ocean-deep/50 transition-colors"
                    >
                      <div className="mt-1 w-2 h-2 rounded-full bg-ocean-deep shrink-0 ring-4 ring-ocean-deep/10" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="text-xs font-semibold text-text-primary truncate max-w-[180px] sm:max-w-none">
                            {source.title}
                          </span>
                          <span className="text-[10px] font-mono text-ocean-deep px-1.5 py-0.2 rounded bg-ocean-deep/10 uppercase shrink-0">
                            {source.sourceType}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1 text-[11px] text-text-muted mt-0.5">
                          <span>{source.domain}</span>
                          <span>·</span>
                          <span className="truncate max-w-[120px] sm:max-w-[200px]">{source.url}</span>
                        </div>
                        {source.snippet && (
                          <p className="text-[11px] text-text-secondary mt-1.5 line-clamp-2 italic">
                            &ldquo;{source.snippet}&rdquo;
                          </p>
                        )}
                      </div>

                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSource?.(source.id);
                        }}
                        className="p-1 text-text-muted hover:text-ocean-deep transition-colors shrink-0"
                        title="Open external source"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-text-muted italic p-2">
                    No external sources directly mapped to this statement.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-text-muted">
              Select a finding to trace its sources.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
