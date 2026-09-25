"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-md border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong active:scale-95 transition-all duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-2 focus-visible:outline-focus-ring ${className}`}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </button>
  );
}
