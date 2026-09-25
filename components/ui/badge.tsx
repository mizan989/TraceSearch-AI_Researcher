import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "ocean" | "accent" | "warning" | "error";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    neutral:
      "bg-surface-subtle text-text-secondary border border-border",
    ocean:
      "bg-ocean-deep/10 text-ocean-deep border border-ocean-deep/20 dark:bg-ocean-deep/20 dark:text-ocean-deep",
    accent:
      "bg-villa-nova/30 text-text-primary border border-siren-song/40 dark:bg-villa-nova/10",
    warning:
      "bg-warning/10 text-warning border border-warning/20",
    error:
      "bg-error/10 text-error border border-error/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
