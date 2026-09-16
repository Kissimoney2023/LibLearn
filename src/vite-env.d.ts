/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Supabase project URL. Absent in local mode. */
  readonly VITE_SUPABASE_URL?: string;
  /** Supabase publishable anon key. Safe in the browser under RLS. */
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Base URL of the AI endpoint. Defaults to same-origin /api. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
