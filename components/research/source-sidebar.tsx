"use client";

import React, { useState } from "react";
import { Source } from "@/types/source";
import { SourceCard } from "./source-card";
import { Database, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceSidebarProps {
  sources: Source[];
  activeSourceId?: string | null;
  onSelectSource?: (source: Source) => void;
}

export function SourceSidebar({
  sources,
  activeSourceId,
  onSelectSource,
}: SourceSidebarProps) {
  const [selectedType, setSelectedType] = useState<string>("all");

  const categories: Array<{ id: string; label: string }> = [
    { id: "all", label: "All" },
    { id: "official", label: "Official" },
    { id: "academic", label: "Academic" },
    { id: "technical", label: "Technical" },
    { id: "news", label: "News" },
  ];

  const filteredSources = sources.filter((s) => {
    if (selectedType === "all") return true;
    return s.sourceType === selectedType;
  });

  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-ocean-deep" />
          <h3 className="font-semibold text-sm text-text-primary">
            Retrieved Sources ({sources.length})
          </h3>
        </div>
        <span className="text-xs text-text-muted">
          Server-Verified
        </span>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <Filter className="w-3 h-3 text-text-muted shrink-0 mr-1" />
        {categories.map((cat) => {
          const isActive = selectedType === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedType(cat.id)}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer shrink-0",
                isActive
                  ? "bg-ocean-deep text-white border-ocean-deep"
                  : "bg-surface text-text-secondary border-border hover:border-border-strong"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sources list */}
      <div className="space-y-3 max-h-[500px] lg:max-h-[750px] overflow-y-auto pr-1">
        {filteredSources.length > 0 ? (
          filteredSources.map((source, idx) => (
            <SourceCard
              key={source.id}
              source={source}
              index={idx}
              isHighlighted={activeSourceId === source.id}
              onSelect={onSelectSource}
            />
          ))
        ) : (
          <div className="p-6 text-center text-xs text-text-muted bg-surface-subtle rounded-lg border border-border">
            No sources match this category.
          </div>
        )}
      </div>
    </aside>
  );
}
