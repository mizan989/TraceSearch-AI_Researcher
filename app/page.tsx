"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { DemoQueries } from "@/components/landing/demo-queries";
import { ResearchInput } from "@/components/research/research-input";
import { ResearchProgress } from "@/components/research/research-progress";
import { ResearchView } from "@/components/research/research-view";
import { ResearchSession, ResearchStatus } from "@/types/research";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [currentQuery, setCurrentQuery] = useState("");
  const [status, setStatus] = useState<ResearchStatus>("idle");
  const [session, setSession] = useState<ResearchSession | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startResearch = async (query: string) => {
    setCurrentQuery(query);
    setStatus("planning");
    setErrorMessage(null);
    setSession(null);

    // Staged visual progress progression for responsive perceived speed
    const t1 = setTimeout(() => setStatus("searching"), 1200);
    const t2 = setTimeout(() => setStatus("analyzing"), 2600);
    const t3 = setTimeout(() => setStatus("generating"), 4200);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const rawText = await res.text().catch(() => "");
        if (res.status === 504 || rawText.includes("TIMEOUT")) {
          throw new Error("The research query timed out on the server. Please try a more specific question or try again.");
        }
        throw new Error(`Server returned an error (${res.status}). Please try again.`);
      }

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || "Failed to complete research task.");
      }

      setSession(json.data);
      setStatus("completed");
    } catch (err) {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during research. Please try again."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setSession(null);
    setErrorMessage(null);
    setCurrentQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-ocean-deep/15">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-6 sm:py-12">
        {status === "idle" && (
          <div className="space-y-8 animate-fade-in">
            <Hero />

            <div className="max-w-[760px] mx-auto">
              <ResearchInput
                onSubmit={startResearch}
                placeholder="Ask any complex research question..."
                autoFocus
              />

              <DemoQueries onSelectQuery={startResearch} />
            </div>
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
          <div className="max-w-[620px] mx-auto py-12 text-center space-y-4 animate-fade-in px-2">
            <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-h3 text-text-primary">Research Interrupted</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {errorMessage}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <Button variant="outline" size="md" onClick={handleReset} className="w-full sm:w-auto">
                Change Question
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => startResearch(currentQuery)}
                className="gap-2 w-full sm:w-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Research</span>
              </Button>
            </div>
          </div>
        )}

        {status === "completed" && session && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="text-xs text-text-muted">
                Active Research Session
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs text-ocean-deep hover:text-ocean-deep-hover"
              >
                Start New Research
              </Button>
            </div>

            <ResearchView
              session={session}
              onNewSearch={(nextQuery) => startResearch(nextQuery)}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
