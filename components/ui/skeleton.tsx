import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-surface-subtle/70 border border-border/40 relative overflow-hidden",
        shimmer && "animate-pulse",
        className
      )}
      {...props}
    />
  );
}
