"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "./button";

const STORAGE_KEY = "tracesearch_cookies_consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Show after brief subtle delay so it feels natural
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is unavailable in iframe or private mode
    }
  }, []);

  const handleConsent = (choice: "accepted" | "essential") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Ignore storage errors
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-slide-up"
    >
      <div className="p-4 sm:p-5 rounded-2xl border border-border bg-surface/95 backdrop-blur-md shadow-floating text-left space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-text-primary">
            <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-ocean-deep shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-tight">
                Cookie Preferences
              </h3>
              <span className="text-[11px] text-text-muted">
                Essential storage &amp; preferences
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleConsent("essential")}
            aria-label="Dismiss cookie banner"
            className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed">
          We use local storage and essential cookies to preserve your theme preferences and recent research sessions. We never use advertising or third-party tracking cookies.{" "}
          <Link
            href="/cookies"
            className="text-ocean-deep hover:underline font-medium inline-flex items-center gap-0.5"
          >
            Read Cookie Policy &rarr;
          </Link>
        </p>

        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleConsent("accepted")}
            className="flex-1 text-xs py-1.5"
          >
            Accept All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleConsent("essential")}
            className="flex-1 text-xs py-1.5"
          >
            Essential Only
          </Button>
        </div>
      </div>
    </aside>
  );
}
