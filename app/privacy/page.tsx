import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft, Shield, Eye, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy | TraceSearch",
  description: "Privacy policy and data handling practices for TraceSearch.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Navbar />

      <main className="flex-1 w-full max-w-[840px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-text-secondary">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Research</span>
            </Button>
          </Link>
        </div>

        <article className="space-y-8 animate-fade-in text-left">
          <header className="border-b border-border pb-6 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-ocean-deep uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Legal and Privacy</span>
            </div>
            <h1 className="font-h1 text-text-primary tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-text-muted">
              Effective Date: September 2026 · Last Updated: September 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">1. Overview</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              TraceSearch (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is an AI-powered web research engine designed to provide verifiable, evidence-grounded answers. We believe in privacy by design and only collect information essential to executing your research tasks and presenting source-traced findings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">2. Information We Process</h2>
            <div className="space-y-3 text-sm sm:text-base text-text-secondary leading-relaxed">
              <div className="p-4 bg-surface rounded-xl border border-border space-y-1.5">
                <span className="font-semibold text-text-primary flex items-center gap-1.5 text-sm">
                  <Eye className="w-4 h-4 text-ocean-deep" />
                  Search Queries
                </span>
                <p className="text-xs sm:text-sm text-text-secondary">
                  When you submit a research prompt, the question is processed to plan search angles, retrieve external web sources, and synthesize key findings with verified citations.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-border space-y-1.5">
                <span className="font-semibold text-text-primary flex items-center gap-1.5 text-sm">
                  <Database className="w-4 h-4 text-ocean-deep" />
                  Research Artifacts
                </span>
                <p className="text-xs sm:text-sm text-text-secondary">
                  Generated findings, executive summaries, source URLs, and extracted textual quotes are stored so you can revisit past sessions in your History ledger and share findings via permalinks.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">3. External Processing & Third Parties</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              To conduct live web investigations, TraceSearch integrates with authoritative external services:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-text-secondary leading-relaxed pl-2">
              <li>
                <strong className="text-text-primary">Search Providers (e.g. SerpApi / Google Search):</strong> Queries are forwarded to retrieve relevant public web documentation and source snippets.
              </li>
              <li>
                <strong className="text-text-primary">Large Language Models (e.g. Google Gemini API):</strong> Formulates structured findings, cross-examines source snippets, and maps claims to citations.
              </li>
            </ul>
            <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
              External service providers process data in accordance with their respective privacy and enterprise API terms. We do not sell or monetize your individual research queries.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">4. Shared Reports and Public Links</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              TraceSearch allows you to generate public shareable links (e.g. <code>/shared/[id]</code>). Any report you deliberately share is accessible to individuals who have the link. Avoid including sensitive personal or confidential information in shared research prompts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">5. Cookies and Local Preferences</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              We utilize browser local storage solely to retain your appearance preferences (light or dark mode) and temporary session state. We do not use third-party tracking pixels or commercial ad retargeting cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">6. Contact Information</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              If you have questions, feedback, or concerns regarding this Privacy Policy or your data, you can contact the creator at:
            </p>
            <div className="p-4 bg-surface rounded-xl border border-border text-xs sm:text-sm text-text-secondary">
              <span className="font-semibold text-text-primary block mb-0.5">Md Mizan</span>
              <a
                href="mailto:mizanmuhammad20@gmail.com"
                className="text-ocean-deep hover:underline font-mono"
              >
                mizanmuhammad20@gmail.com
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
