"use client";

import React, { useState } from "react";
import { ResearchSession } from "@/types/research";
import { Source } from "@/types/source";
import { FindingCard } from "./finding-card";
import { SourceSidebar } from "./source-sidebar";
import { EvidenceMap } from "./evidence-map";
import { UncertaintyBanner } from "./uncertainty-banner";
import { FollowUpSection } from "./follow-up-section";
import { SourceModal } from "./source-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Check, Calendar, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ResearchViewProps {
  session: ResearchSession;
  onNewSearch?: (query: string) => void;
}

export function ResearchView({ session, onNewSearch }: ResearchViewProps) {
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [selectedSourceForModal, setSelectedSourceForModal] = useState<Source | null>(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCitationClick = (sourceId: string) => {
    setActiveSourceId(sourceId);
    // Find the element and scroll into view smoothly
    const elem = document.getElementById(`source-${sourceId}`);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCopyReport = async () => {
    const text = `# ${session.title}\n\n## Executive Summary\n${session.summary}\n\n## Key Findings\n` +
      session.findings
        .map(
          (f, idx) =>
            `### 0${idx + 1} - ${f.title}\n${f.content}\nSources: ${f.sourceIds.join(", ")}\n`
        )
        .join("\n") +
      `\n## Sources\n` +
      session.sources
        .map((s, idx) => `${idx + 1}. [${s.title}](${s.url}) (${s.domain})`)
        .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/shared/${session.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="w-full space-y-10 animate-fade-in pb-16">
      {/* Session Title and Summary Header */}
      <section className="bg-surface border border-border rounded-xl p-4 sm:p-8 shadow-subtle text-left transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="ocean">Completed Research</Badge>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(session.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyReport}
              className="gap-1.5 flex-1 sm:flex-initial"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-ocean-deep" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Report</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-1.5 flex-1 sm:flex-initial"
            >
              {shared ? (
                <>
                  <Check className="w-3.5 h-3.5 text-ocean-deep" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share URL</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted mb-1">
            <Search className="w-3 h-3 text-ocean-deep shrink-0" />
            <span className="font-semibold text-text-primary">Original Query:</span>
            <span className="break-words">&ldquo;{session.query}&rdquo;</span>
          </div>
          <h1 className="font-h2 sm:font-h1 text-text-primary tracking-tight leading-tight mt-1 break-words">
            {session.title}
          </h1>
        </div>

        <div className="pt-4 border-t border-border">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">
            Executive Summary
          </span>
          <p className="font-body text-base text-text-secondary leading-relaxed max-w-[800px]">
            {session.summary}
          </p>
        </div>
      </section>

      {/* Main 2-column workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Key Findings */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-h3 text-text-primary tracking-tight">
              Key Findings ({session.findings.length})
            </h2>
            <span className="text-xs text-text-muted">
              Ranked by cross-source evidence
            </span>
          </div>

          <div className="space-y-5">
            {session.findings.map((finding, idx) => (
              <FindingCard
                key={finding.id}
                finding={finding}
                index={idx}
                sources={session.sources}
                activeSourceId={activeSourceId}
                onCitationClick={handleCitationClick}
              />
            ))}
          </div>

          {/* Evidence Trace Map */}
          <div className="pt-4">
            <EvidenceMap
              findings={session.findings}
              sources={session.sources}
              onSelectSource={(srcId) => {
                const s = session.sources.find((item) => item.id === srcId);
                if (s) setSelectedSourceForModal(s);
              }}
            />
          </div>

          {/* Uncertainty banner if present */}
          {session.uncertainties && session.uncertainties.length > 0 && (
            <UncertaintyBanner uncertainties={session.uncertainties} />
          )}

          {/* Follow-up Section */}
          {session.followUpQuestions && session.followUpQuestions.length > 0 && (
            <FollowUpSection
              questions={session.followUpQuestions}
              onSelectQuestion={(q) => onNewSearch?.(q)}
            />
          )}
        </div>

        {/* Right Column: Source Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-20">
          <div className="bg-surface border border-border rounded-xl p-4 sm:p-5 shadow-subtle">
            <SourceSidebar
              sources={session.sources}
              activeSourceId={activeSourceId}
              onSelectSource={(s) => setSelectedSourceForModal(s)}
            />
          </div>
        </div>
      </div>

      {/* Source detail modal */}
      <SourceModal
        source={selectedSourceForModal}
        onClose={() => setSelectedSourceForModal(null)}
      />
    </div>
  );
}
