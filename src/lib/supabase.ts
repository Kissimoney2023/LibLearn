import {createClient, type SupabaseClient} from '@supabase/supabase-js';

/**
 * Supabase is OPTIONAL at build time and REQUIRED for real accounts.
 *
 * When the two env vars below are absent the app runs in local mode: accounts
 * and progress live in this browser only. That state is surfaced to the student
 * in the UI (see <BackendBanner />) rather than silently pretended away.
 *
 * Only the publishable anon key belongs here. It is safe in the browser
 * because row-level security governs access. The service-role key must never
 * appear in client code.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {persistSession: true, autoRefreshToken: true},
    })
  : null;
