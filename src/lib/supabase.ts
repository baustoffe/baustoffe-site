import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

/**
 * Get the Supabase client. Lazily initialized — safe for Next.js prerendering
 * where env vars may not be available at module-evaluation time.
 */
export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    _supabase = createClient(url, key);
  }
  return _supabase;
}

/**
 * Legacy export — a Proxy that lazily delegates to getSupabase().
 * Existing code using `supabase.from(...)` continues to work without changes.
 */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    return Reflect.get(getSupabase(), prop);
  },
});
