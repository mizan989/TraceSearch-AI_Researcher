"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResearchInput } from "@/components/research/research-input";
import { ResearchProgress } from "@/components/research/research-progress";
import { ResearchView } from "@/components/research/research-view";
import { ResearchSession, ResearchStatus } from "@/types/research";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

function ResearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [status, setStatus] = useState<ResearchStatus>("idle");
  const [session, setSession] = useState<ResearchSession | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startResearch = async (query: string) => {
    setCurrentQuery(query);
    setStatus("planning");
    setErrorMessage(null);
    setSession(null);

    const t1 = setTimeout(() => setStatus("searching"), 1200);
    const t2 = setTimeout(() => setStatus("analyzing"), 2600);
    const t3 = setTimeout(() => setStatus("generating"), 4200);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || "Failed to complete research.");
      }

      setSession(json.data);
      setStatus("completed");
    } catch (err) {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Research execution failed."
      );
    }
  };

  const hasTriggeredRef = React.useRef(false);

  useEffect(() => {
    if (initialQuery && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      const timer = setTimeout(() => {
        startResearch(initialQuery);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialQuery]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 py-8 sm:py-12">
      {status === "idle" && (
        <div className="max-w-[760px] mx-auto py-12 space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="font-h2 text-text-primary">Research Workspace</h1>
            <p className="text-sm text-text-secondary">
              Input a question to initiate live web search, multi-source analysis, and citation tracing.
            </p>
          </div>

          <ResearchInput
            initialValue={currentQuery}
            onSubmit={startResearch}
            autoFocus
          />
        </div>
      )}

      {(status === "planning" ||
        status === "searching" ||
        status === "analyzing" ||
        status === "generating") && (
        <div className="max-w-[760px] mx-auto py-8">
          <ResearchProgress status={status} query={currentQuery} />
        </div>
      )}

      {status === "error" && (
        <div className="max-w-[620px] mx-auto py-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-h3 text-text-primary">Research Error</h3>
          <p className="text-sm text-text-secondary">{errorMessage}</p>
          <div className="pt-2 flex justify-center gap-3">
            <Button variant="outline" onClick={() => setStatus("idle")}>
              Reset
            </Button>
            <Button variant="primary" onClick={() => startResearch(currentQuery)}>
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Retry
            </Button>
          </div>
        </div>
      )}

      {status === "completed" && session && (
        <ResearchView
          session={session}
          onNewSearch={(q) => startResearch(q)}
        />
      )}
    </div>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-xs text-text-muted">Loading research workspace...</div>}>
          <ResearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
