"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem("tracesearch_theme");
    return stored === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("theme-change", callback);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getThemeSnapshot, () => "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem("tracesearch_theme", newTheme);
      window.dispatchEvent(new Event("theme-change"));
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
