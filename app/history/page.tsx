"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResearchSession } from "@/types/research";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Database, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function HistoryPage() {
  const [sessions, setSessions] = useState<ResearchSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/api/history");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setSessions(json.data);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Navbar />

      <main className="flex-1 w-full max-w-[1080px] mx-auto px-4 sm:px-8 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-ocean-deep uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Session History</span>
            </div>
            <h1 className="font-h2 text-text-primary tracking-tight">
              Past Research Sessions
            </h1>
          </div>

          <Link href="/">
            <Button variant="primary" size="sm" className="gap-1.5 w-full sm:w-auto">
              <Search className="w-3.5 h-3.5" />
              <span>New Research</span>
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-text-muted">
            Loading research archive...
          </div>
        ) : sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((item, idx) => (
              <Link
                key={item.id}
                href={`/research/${item.id}`}
                className="block group"
              >
                <div
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="bg-surface border border-border rounded-xl p-4 sm:p-5 hover:border-ocean-deep hover-lift animate-stagger-item shadow-subtle hover:shadow-floating transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs text-text-muted">
                      {formatDate(item.createdAt)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="ocean">
                        {item.sources?.length || 0} sources
                      </Badge>
                      <Badge variant="neutral">
                        {item.findings?.length || 0} findings
                      </Badge>
                    </div>
                  </div>

                  <h3 className="font-h4 text-text-primary group-hover:text-ocean-deep transition-colors mb-1.5 break-words">
                    {item.title || item.query}
                  </h3>

                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-3">
                    {item.summary || "No executive summary recorded."}
                  </p>

                  <div className="flex items-center justify-between gap-3 text-xs text-text-muted pt-2 border-t border-border/60">
                    <span className="truncate flex-1 min-w-0">
                      Query: &ldquo;{item.query}&rdquo;
                    </span>
                    <span className="flex items-center gap-1 text-ocean-deep font-medium group-hover:translate-x-0.5 transition-transform shrink-0">
                      <span>View report</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="max-w-[480px] mx-auto py-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border text-text-muted flex items-center justify-center mx-auto">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-h3 text-text-primary">No Recorded Sessions</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              You haven&apos;t conducted any research sessions during this session yet. Start by exploring a topic.
            </p>
            <div className="pt-2">
              <Link href="/">
                <Button variant="primary" size="md">
                  Conduct First Research
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
