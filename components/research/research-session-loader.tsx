"use client";

import React, { useEffect, useState } from "react";
import { ResearchSession } from "@/types/research";
import { ResearchView } from "@/components/research/research-view";
import { getLocalSessions } from "@/lib/storage/client-history";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ResearchSessionLoaderProps {
  initialSession: ResearchSession | null;
  sessionId: string;
}

export function ResearchSessionLoader({
  initialSession,
  sessionId,
}: ResearchSessionLoaderProps) {
  const [session, setSession] = useState<ResearchSession | null>(initialSession);
  const [checkedLocal, setCheckedLocal] = useState(false);

  useEffect(() => {
    if (!initialSession && sessionId) {
      try {
        const local = getLocalSessions();
        const found = local.find((s) => s.id === sessionId);
        if (found) {
          setSession(found);
        }
      } catch (err) {
        console.warn("[SessionLoader] Failed to read local storage:", err);
      }
    }
    setCheckedLocal(true);
  }, [initialSession, sessionId]);

  if (session) {
    return <ResearchView session={session} />;
  }

  if (!checkedLocal) {
    return (
      <div className="py-16 text-center text-xs text-text-muted">
        Loading research session...
      </div>
    );
  }

  return (
    <div className="max-w-[500px] mx-auto py-16 text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border text-text-muted flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h2 className="font-h3 text-text-primary">Report Not Found</h2>
      <p className="text-xs text-text-secondary leading-relaxed">
        The research session you requested was not found or is no longer stored locally.
      </p>
      <div className="pt-2">
        <Link href="/">
          <Button variant="primary" size="md">
            Start New Research
          </Button>
        </Link>
      </div>
    </div>
  );
}
