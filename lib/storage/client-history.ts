"use client";

import { ResearchSession } from "@/types/research";

const HISTORY_STORAGE_KEY = "tracesearch_user_history";
const MAX_STORED_SESSIONS = 30;

/**
 * Saves a completed research session to the user's private browser storage.
 */
export function saveLocalSession(session: ResearchSession): void {
  if (typeof window === "undefined" || !session || !session.id) return;

  try {
    const existing = getLocalSessions();
    // Prevent duplicate entries
    const filtered = existing.filter((s) => s.id !== session.id);
    const updated = [session, ...filtered].slice(0, MAX_STORED_SESSIONS);

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("[ClientHistory] Failed to save session to local storage:", err);
  }
}

/**
 * Retrieves the user's private research history from browser storage.
 */
export function getLocalSessions(): ResearchSession[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("[ClientHistory] Failed to read history from local storage:", err);
    return [];
  }
}

/**
 * Clears the user's local research history from browser storage.
 */
export function clearLocalSessions(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (err) {
    console.warn("[ClientHistory] Failed to clear history from local storage:", err);
  }
}
