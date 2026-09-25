export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
}

export function getSupabaseClientConfig(): SupabaseConfig {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}
