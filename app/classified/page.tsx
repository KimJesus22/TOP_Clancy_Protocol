"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import BanditoLogin from "../components/BanditoLogin";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigError,
} from "@/src/lib/supabaseClient";

export default function ClassifiedPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(data.session);
      setIsLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      {isLoading ? (
        <p className="font-mono text-sm uppercase tracking-[0.12em] text-zinc-400">
          Verificando credenciales...
        </p>
      ) : null}

      {!isLoading && !isSupabaseConfigured ? (
        <section className="w-full max-w-2xl rounded-xl border border-clancy-fire/45 bg-black/70 p-6">
          <h1 className="font-mono text-xl text-clancy-fire">
            Supabase no configurado
          </h1>
          <p className="mt-2 text-sm text-zinc-300">
            {supabaseConfigError ?? "Faltan variables de entorno."}
          </p>
        </section>
      ) : null}

      {!isLoading && isSupabaseConfigured && !session ? <BanditoLogin /> : null}

      {!isLoading && isSupabaseConfigured && session ? (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl rounded-xl border border-clancy-trench/50 bg-black/70 p-8 shadow-[0_0_26px_rgba(252,227,0,0.22)]"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-clancy-trench">
            DEMA Core Access
          </p>
          <h1 className="mt-2 font-mono text-3xl text-clancy-fire">
            Bienvenido a Trench. Acceso concedido al servidor de DEMA.
          </h1>
          <p className="mt-3 text-sm text-zinc-300">
            Sesion activa como: {session.user.email}
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-6 rounded-md border border-clancy-fire/70 bg-clancy-fire/20 px-4 py-2 font-mono text-sm uppercase tracking-[0.08em] text-clancy-fire transition hover:shadow-[0_0_14px_rgba(255,46,46,0.28)]"
          >
            Cerrar sesion
          </button>
        </motion.section>
      ) : null}
    </main>
  );
}
