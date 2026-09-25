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

export default async function ResearchReportPage({ params }: PageProps) {
  const { id } = await params;
  const session = await ResearchOrchestrator.getResearch(id);

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-text-secondary">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Research</span>
            </Button>
          </Link>
        </div>

        {session ? (
          <ResearchView session={session} />
        ) : (
          <div className="max-w-[500px] mx-auto py-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border text-text-muted flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="font-h3 text-text-primary">Report Not Found</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              The research session you requested may have expired or is not stored locally.
            </p>
            <div className="pt-2">
              <Link href="/">
                <Button variant="primary" size="md">
                  Start New Research
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
