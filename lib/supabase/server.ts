export interface SupabaseServerConfig {
  url?: string;
  serviceKey?: string;
}

export function getSupabaseServerConfig(): SupabaseServerConfig {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}
