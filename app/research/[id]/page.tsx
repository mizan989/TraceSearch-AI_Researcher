import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResearchSessionLoader } from "@/components/research/research-session-loader";
import { ResearchOrchestrator } from "@/lib/research/orchestrator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

        <ResearchSessionLoader initialSession={session} sessionId={id} />
      </main>

      <Footer />
    </div>
  );
}
