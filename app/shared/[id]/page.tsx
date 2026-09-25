import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResearchView } from "@/components/research/research-view";
import { ResearchOrchestrator } from "@/lib/research/orchestrator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SharedResearchPage({ params }: PageProps) {
  const { id } = await params;
  const session = await ResearchOrchestrator.getResearch(id);

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-text-secondary">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Explore TraceSearch</span>
            </Button>
          </Link>

          <span className="text-xs text-ocean-deep font-medium bg-ocean-deep/10 px-2.5 py-1 rounded-full">
            Shared Research Report
          </span>
        </div>

        {session ? (
          <ResearchView session={session} />
        ) : (
          <div className="max-w-[500px] mx-auto py-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border text-text-muted flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="font-h3 text-text-primary">Shared Report Unavailable</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              This shared link could not be located or may have been cleared.
            </p>
            <div className="pt-2">
              <Link href="/">
                <Button variant="primary" size="md">
                  Conduct Fresh Research
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
