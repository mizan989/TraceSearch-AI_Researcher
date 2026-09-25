"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResearchInputProps {
  initialValue?: string;
  isLoading?: boolean;
  onSubmit: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function ResearchInput({
  initialValue = "",
  isLoading = false,
  onSubmit,
  placeholder = "Enter your research question (e.g. How is artificial intelligence changing cybersecurity in 2026?)...",
  autoFocus = false,
}: ResearchInputProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSubmit(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full relative bg-surface border border-border rounded-xl p-3.5 sm:p-5 shadow-subtle transition-colors duration-200 focus-within:border-ocean-deep outline-none focus:outline-none ring-0 focus:ring-0"
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        <Sparkles className="w-5 h-5 text-ocean-deep shrink-0 mt-1 opacity-80" />
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          autoFocus={autoFocus}
          disabled={isLoading}
          className="w-full resize-none bg-transparent text-text-primary placeholder:text-text-muted text-base sm:text-lg outline-none focus:outline-none border-none ring-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 leading-relaxed disabled:opacity-60"
        />
      </div>

      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border/60 flex items-center justify-between gap-3 text-xs text-text-muted">
        <div className="hidden sm:flex items-center gap-1.5">
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-surface-subtle border border-border text-[11px] font-mono">
            Enter ↵
          </kbd>
          <span>to submit</span>
        </div>

        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          size="md"
          variant="primary"
          className="rounded-md px-4 py-2 w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              <span>Researching...</span>
            </>
          ) : (
            <>
              <span>Start Research</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
