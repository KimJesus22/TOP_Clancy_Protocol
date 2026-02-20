import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Database = Record<string, never>;

function getEnvVar(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `[Supabase] Missing environment variable: ${name}. ` +
        "Check your .env or .env.local configuration.",
    );
  }

  return value;
}

const supabaseUrl = getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
const supabaseAnonKey = getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);
