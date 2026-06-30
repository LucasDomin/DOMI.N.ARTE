import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Optional Supabase integration.
 *
 * The whole platform works WITHOUT Supabase (Postgres via Drizzle + base64
 * fallback for uploads). When you provide the env vars below, image/video
 * uploads are routed to Supabase Storage and become production-grade.
 *
 * Required env (see .env.example):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY        (public, browser-safe)
 *   SUPABASE_SERVICE_ROLE_KEY            (server-only, for uploads/admin)
 *   SUPABASE_STORAGE_BUCKET              (defaults to "dominarte")
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
export const SUPABASE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "dominarte";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const isSupabaseStorageConfigured = Boolean(
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
);

/** Browser-safe client (anon key). Returns null when not configured. */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}

/** Server-side privileged client (service role). Returns null when not configured. */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!isSupabaseStorageConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
