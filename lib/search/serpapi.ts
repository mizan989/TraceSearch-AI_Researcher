import { Source } from "@/types/source";
import { normalizeSerpApiResult, SerpApiOrganicResult } from "./normalizer";
import { filterAndDeduplicateSources } from "./filter";

export interface SerpApiResponse {
  organic_results?: SerpApiOrganicResult[];
  error?: string;
}

export class SearchProviderError extends Error {
  constructor(message: string, public readonly statusCode?: number) {
    super(message);
    this.name = "SearchProviderError";
  }
}

/**
 * Executes a single search via SerpApi with retry logic on transient network errors.
 */
export async function executeSingleSearch(
  query: string,
  sessionId: string,
  baseIndex = 0
): Promise<Source[]> {
  const apiKey = process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    throw new SearchProviderError(
      "Live search provider key (SERPAPI_API_KEY) is not configured in environment.",
      401
    );
  }

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", query);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("num", "10");

  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        // Timeout after 15 seconds
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.error(`[SerpApi] HTTP ${res.status}: ${errText}`);
        if (attempts < maxAttempts && res.status >= 500) {
          // Retry on server-side 5xx errors
          await new Promise((r) => setTimeout(r, 1000));
          continue;
        }
        throw new SearchProviderError(`Search provider returned status ${res.status}`, res.status);
      }

      const data = (await res.json()) as SerpApiResponse;

      if (data.error) {
        console.error(`[SerpApi] Error in payload: ${data.error}`);
        throw new SearchProviderError(data.error);
      }

      const organic = data.organic_results || [];
      const sources: Source[] = [];

      organic.forEach((item, idx) => {
        const normalized = normalizeSerpApiResult(item, sessionId, baseIndex + idx);
        if (normalized) {
          sources.push(normalized);
        }
      });

      return sources;
    } catch (error) {
      if (error instanceof SearchProviderError) {
        throw error;
      }
      if (attempts >= maxAttempts) {
        console.error("[SerpApi] Network or parse failure:", error);
        throw new SearchProviderError(
          error instanceof Error ? error.message : "Failed to retrieve search results from provider."
        );
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return [];
}

/**
 * Executes multiple complementary searches concurrently and normalizes/deduplicates the results.
 */
export async function searchWebMulti(
  queries: string[],
  sessionId: string
): Promise<Source[]> {
  if (queries.length === 0) {
    return [];
  }

  // Execute concurrently per performance guidelines
  const searchPromises = queries.map((q, idx) =>
    executeSingleSearch(q, sessionId, idx * 10)
  );

  const results = await Promise.allSettled(searchPromises);
  const combinedSources: Source[] = [];

  for (const res of results) {
    if (res.status === "fulfilled") {
      combinedSources.push(...res.value);
    } else {
      console.warn("[SerpApi] Individual sub-query failed:", res.reason);
    }
  }

  // If all sub-queries failed and produced 0 sources, throw error
  if (combinedSources.length === 0 && results.some((r) => r.status === "rejected")) {
    const firstError = results.find((r) => r.status === "rejected") as PromiseRejectedResult;
    throw firstError?.reason || new SearchProviderError("Failed to fetch live web sources.");
  }

  return filterAndDeduplicateSources(combinedSources, 15);
}
