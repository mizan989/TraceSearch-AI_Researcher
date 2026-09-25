import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft, Cookie, ShieldCheck, Database, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Cookie Policy | TraceSearch",
  description: "Cookie policy and local data storage practices for TraceSearch.",
};

export default function CookiesPage() {
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
              <Cookie className="w-4 h-4" />
              <span>Legal and Privacy</span>
            </div>
            <h1 className="font-h1 text-text-primary tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-xs text-text-muted">
              Effective Date: September 2026 · Last Updated: September 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">1. What Are Cookies?</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              Cookies and local storage technologies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently, save user preferences, and provide functional session continuity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">2. How TraceSearch Uses Storage</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              TraceSearch operates under a privacy-first approach. We strictly limit our use of device storage to functional, essential utilities required to provide an optimal search and research experience:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
                <span className="font-semibold text-text-primary flex items-center gap-1.5 text-xs">
                  <Sliders className="w-3.5 h-3.5 text-ocean-deep shrink-0" />
                  Preferences
                </span>
                <p className="text-xs text-text-secondary leading-normal">
                  Saves your chosen visual theme (Light or Dark mode) so your selection persists across page visits.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
                <span className="font-semibold text-text-primary flex items-center gap-1.5 text-xs">
                  <Database className="w-3.5 h-3.5 text-ocean-deep shrink-0" />
                  Research History
                </span>
                <p className="text-xs text-text-secondary leading-normal">
                  Retains recent research query summaries locally in your browser storage so you can easily review past analyses.
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
                <span className="font-semibold text-text-primary flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-ocean-deep shrink-0" />
                  Consent Choice
                </span>
                <p className="text-xs text-text-secondary leading-normal">
                  Remembers your cookie banner acknowledgment so you are not repeatedly prompted on subsequent visits.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">3. Zero Advertising or Tracking Cookies</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              TraceSearch does not use third-party marketing cookies, cross-site trackers, or commercial profiling cookies. We do not sell your research telemetry or share browsing behaviors with advertising platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">4. Controlling Your Preferences</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              You can control or clear cookies and local storage directly through your browser settings. Most modern web browsers allow you to view stored cookies, delete them selectively, or block storage entirely. Disabling local storage may reset your theme preference and clear locally cached search history.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-h3 text-text-primary">5. Contact and Inquiries</h2>
            <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
              If you have any questions or feedback regarding our cookie policy or data protection measures, please reach out to us at{" "}
              <a
                href="mailto:mizanmuhammad20@gmail.com"
                className="text-ocean-deep hover:underline font-medium"
              >
                mizanmuhammad20@gmail.com
              </a>.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
