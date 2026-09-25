import { ResearchSession } from "@/types/research";
import { getSupabaseServerConfig } from "./server";

// In-memory session cache for server runtime / demo resiliency
const globalSessionCache = new Map<string, ResearchSession>();

export async function saveSessionToStorage(session: ResearchSession): Promise<void> {
  // Always cache in-memory for instant recall during server runtime
  globalSessionCache.set(session.id, session);

  const { url, serviceKey } = getSupabaseServerConfig();
  if (!url || !serviceKey) {
    return;
  }

  try {
    const res = await fetch(`${url}/rest/v1/research_sessions`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        id: session.id,
        query: session.query,
        title: session.title,
        summary: session.summary,
        status: session.status,
        session_data: session,
        updated_at: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.warn(`[Supabase] Failed to persist session (${res.status})`);
    }
  } catch (err) {
    console.warn("[Supabase] Failed to write session to Supabase:", err);
  }
}

export async function getSessionFromStorage(id: string): Promise<ResearchSession | null> {
  // Check memory cache first
  if (globalSessionCache.has(id)) {
    return globalSessionCache.get(id) || null;
  }

  const { url, serviceKey } = getSupabaseServerConfig();
  if (!url || !serviceKey) {
    return null;
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/research_sessions?id=eq.${encodeURIComponent(id)}&select=*`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const session = data[0].session_data as ResearchSession;
      if (session) {
        globalSessionCache.set(id, session);
        return session;
      }
    }
  } catch (err) {
    console.warn("[Supabase] Error reading session from Supabase:", err);
  }

  return null;
}

export async function listRecentSessionsFromStorage(limit = 20): Promise<ResearchSession[]> {
  const sessions = Array.from(globalSessionCache.values());
  sessions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return sessions.slice(0, limit);
}
