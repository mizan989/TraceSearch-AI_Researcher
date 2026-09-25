import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      {/* Top Navbar Skeleton */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-28 h-5 rounded-md" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="w-20 h-8 rounded-md hidden sm:block" />
            <Skeleton className="w-20 h-8 rounded-md hidden sm:block" />
            <Skeleton className="w-9 h-9 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main Skeleton Content */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
        {/* Hero Section Skeleton */}
        <section className="text-center max-w-[760px] mx-auto space-y-4">
          <Skeleton className="w-40 h-6 rounded-full mx-auto" />
          <Skeleton className="w-3/4 max-w-[480px] h-10 sm:h-12 rounded-xl mx-auto" />
          <Skeleton className="w-1/2 max-w-[320px] h-4 rounded-md mx-auto" />

          {/* Search Box Skeleton */}
          <div className="pt-4 max-w-[680px] mx-auto">
            <Skeleton className="w-full h-14 sm:h-16 rounded-2xl shadow-subtle" />
          </div>

          {/* Suggestion Chips Skeleton */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Skeleton className="w-28 h-7 rounded-full" />
            <Skeleton className="w-36 h-7 rounded-full" />
            <Skeleton className="w-32 h-7 rounded-full" />
          </div>
        </section>

        {/* Feature / Findings Grid Skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-4">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="p-5 rounded-xl border border-border bg-surface space-y-3 shadow-subtle"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-16 h-5 rounded-full" />
              </div>
              <Skeleton className="w-3/4 h-5 rounded-md" />
              <div className="space-y-2 pt-1">
                <Skeleton className="w-full h-3.5 rounded" />
                <Skeleton className="w-5/6 h-3.5 rounded" />
                <Skeleton className="w-2/3 h-3.5 rounded" />
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="w-full border-t border-border py-6 mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          <Skeleton className="w-44 h-4 rounded" />
          <Skeleton className="w-32 h-4 rounded" />
        </div>
      </footer>
    </div>
  );
}
