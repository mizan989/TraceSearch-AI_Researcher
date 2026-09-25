import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResearchLoading() {
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
            <Skeleton className="w-9 h-9 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main Research Skeleton */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8">
        {/* Back Link Skeleton */}
        <Skeleton className="w-32 h-8 rounded-md" />

        {/* Research Header Skeleton */}
        <div className="p-6 rounded-2xl border border-border bg-surface space-y-4 shadow-subtle">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="w-24 h-5 rounded-full" />
            <Skeleton className="w-28 h-6 rounded-full" />
          </div>
          <Skeleton className="w-4/5 h-8 rounded-lg" />
          <Skeleton className="w-1/2 h-4 rounded-md" />

          {/* Angles Pills Skeleton */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton className="w-28 h-6 rounded-full" />
            <Skeleton className="w-36 h-6 rounded-full" />
            <Skeleton className="w-32 h-6 rounded-full" />
          </div>
        </div>

        {/* Layout Grid: Findings + Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Findings Column Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-36 h-6 rounded-md" />
              <Skeleton className="w-20 h-5 rounded-md" />
            </div>

            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-border bg-surface space-y-3.5 shadow-subtle"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="w-2/3 h-5 rounded-md" />
                  <Skeleton className="w-16 h-5 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="w-full h-4 rounded" />
                  <Skeleton className="w-11/12 h-4 rounded" />
                  <Skeleton className="w-4/5 h-4 rounded" />
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <Skeleton className="w-20 h-6 rounded-full" />
                  <Skeleton className="w-24 h-6 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Sources Column Skeleton */}
          <div className="space-y-4">
            <Skeleton className="w-28 h-6 rounded-md" />
            {[1, 2, 3, 4].map((src) => (
              <div
                key={src}
                className="p-4 rounded-xl border border-border bg-surface space-y-2.5 shadow-subtle"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="w-32 h-4 rounded" />
                </div>
                <Skeleton className="w-5/6 h-4 rounded" />
                <Skeleton className="w-2/3 h-3 rounded" />
              </div>
            ))}
          </div>
        </div>
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
