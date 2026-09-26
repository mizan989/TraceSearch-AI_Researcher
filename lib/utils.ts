import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | number | Date): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTime(dateString: string | number | Date): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

export function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function isSafeExternalUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith("https://") || trimmed.startsWith("http://");
}
