export function cleanSearchQuery(query: string): string {
  // Strip special operator noise while preserving intent
  return query
    .replace(/[^\w\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function deduplicateQueries(queries: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const q of queries) {
    const cleaned = cleanSearchQuery(q);
    const key = cleaned.toLowerCase();
    if (cleaned.length > 2 && !seen.has(key)) {
      seen.add(key);
      result.push(cleaned);
    }
  }

  return result;
}
