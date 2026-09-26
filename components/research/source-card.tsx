"use client";

import React from "react";
import { ExternalLink, Globe } from "lucide-react";
import { Source } from "@/types/source";
import { Badge } from "@/components/ui/badge";
import { cn, isSafeExternalUrl } from "@/lib/utils";

interface SourceCardProps {
  source: Source;
  index: number;
  isHighlighted?: boolean;
  onSelect?: (source: Source) => void;
}

export function SourceCard({
  source,
  index,
  isHighlighted = false,
  onSelect,
}: SourceCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  const badgeVariants: Record<string, "neutral" | "ocean" | "accent" | "warning"> = {
    official: "ocean",
    academic: "accent",
    technical: "neutral",
    news: "neutral",
    company: "neutral",
    blog: "neutral",
    community: "neutral",
    other: "neutral",
  };

  return (
    <div
      id={`source-${source.id}`}
      onClick={() => onSelect?.(source)}
      style={{ animationDelay: `${index * 50}ms` }}
      className={cn(
        "group relative bg-surface border rounded-xl p-4 transition-all duration-200 cursor-pointer text-left hover-lift active:scale-[0.99] animate-stagger-item",
        isHighlighted
          ? "border-ocean-deep ring-2 ring-ocean-deep/20 bg-surface-subtle shadow-floating"
          : "border-border hover:border-border-strong hover:shadow-subtle"
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-ocean-deep">
            Source {formattedIndex}
          </span>
          <Badge variant={badgeVariants[source.sourceType] || "neutral"}>
            {source.sourceType}
          </Badge>
        </div>

        {isSafeExternalUrl(source.url) && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open source: ${source.title}`}
            className="text-text-muted hover:text-ocean-deep transition-colors p-1 rounded hover:bg-surface-subtle"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <h4 className="text-sm font-semibold text-text-primary group-hover:text-ocean-deep transition-colors line-clamp-2 leading-snug">
        {source.title}
      </h4>

      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-text-muted">
        <Globe className="w-3 h-3 shrink-0" />
        <span className="truncate">{source.domain}</span>
      </div>

      {source.snippet && (
        <p className="mt-2 text-xs text-text-secondary line-clamp-3 leading-relaxed">
          {source.snippet}
        </p>
      )}
    </div>
  );
}
