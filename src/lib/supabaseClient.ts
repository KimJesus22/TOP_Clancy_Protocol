import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Database = Record<string, never>;

type SupabaseEnvName = "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY";

const supabaseEnv: Record<SupabaseEnvName, string | undefined> = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

const missingVars = Object.entries(supabaseEnv)
  .filter(([, value]) => !value)
  .map(([key]) => key as SupabaseEnvName);

export const isSupabaseConfigured = missingVars.length === 0;

export const supabaseConfigError = isSupabaseConfigured
  ? null
  : `[Supabase] Missing environment variable(s): ${missingVars.join(", ")}.`;

export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(
      supabaseEnv.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  : null;
