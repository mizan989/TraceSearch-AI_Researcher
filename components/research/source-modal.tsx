"use client";

import React from "react";
import { Source } from "@/types/source";
import { X, ExternalLink, Globe, Calendar, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, isSafeExternalUrl } from "@/lib/utils";

interface SourceModalProps {
  source: Source | null;
  onClose: () => void;
}

export function SourceModal({ source, onClose }: SourceModalProps) {
  if (!source) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[620px] max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-xl shadow-floating p-5 sm:p-7 text-left space-y-5 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 pr-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-ocean-deep uppercase">
                {source.id}
              </span>
              <Badge variant="ocean">{source.sourceType}</Badge>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary leading-snug">
              {source.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors shrink-0 outline-none focus:outline-none"
            aria-label="Close source preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 py-3 border-y border-border text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-ocean-deep shrink-0" />
            <span className="font-medium text-text-primary">Domain:</span>
            <span className="truncate">{source.domain}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-ocean-deep shrink-0" />
            <span className="font-medium text-text-primary">Retrieved:</span>
            <span>{formatDate(source.retrievedAt)}</span>
          </div>

          <div className="flex items-center gap-2 text-ocean-deep">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="font-medium">Verification:</span>
            <span>Server-verified origin</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
            Extracted Evidence Snippet
          </span>
          <div className="p-3.5 sm:p-4 bg-surface-subtle rounded-lg border border-border text-xs sm:text-sm text-text-primary leading-relaxed">
            &ldquo;{source.snippet || "No textual snippet available."}&rdquo;
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-border/40">
          <span className="text-[11px] text-text-muted truncate max-w-full sm:max-w-[260px]">
            {source.url}
          </span>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={onClose}>
              Done
            </Button>
            {isSafeExternalUrl(source.url) && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-8 px-3 text-xs font-medium rounded-sm bg-ocean-deep text-white hover:bg-ocean-deep-hover transition-colors shadow-subtle shrink-0 outline-none"
              >
                <span>Visit Origin</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
