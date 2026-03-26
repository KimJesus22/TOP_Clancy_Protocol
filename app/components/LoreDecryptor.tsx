"use client";

import { useCallback, useEffect, useState } from "react";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigError,
} from "@/src/lib/supabaseClient";

type DemaMessage = {
  id: number;
  message_title: string;
  decrypted_content: string;
  threat_level: number;
};

function getReadableDemaError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error ?? "");
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("failed to fetch") ||
    normalizedMessage.includes("networkerror") ||
    normalizedMessage.includes("network request failed") ||
    normalizedMessage.includes("load failed")
  ) {
    return "Sin conexion al servidor de mensajes. Verifica la red o la configuracion de Supabase.";
  }

  if (
    normalizedMessage.includes("invalid api key") ||
    normalizedMessage.includes("jwt") ||
    normalizedMessage.includes("unauthorized") ||
    normalizedMessage.includes("forbidden")
  ) {
    return "No fue posible autenticar la conexion con el servidor de mensajes.";
  }

  if (normalizedMessage.includes("relation") || normalizedMessage.includes("does not exist")) {
    return "La tabla `dema_messages` no esta disponible en la base de datos.";
  }

  return "No se pudieron cargar los mensajes cifrados de DEMA.";
}

export default function LoreDecryptor() {
  const [messages, setMessages] = useState<DemaMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const loadMessages = useCallback(async (client: NonNullable<typeof supabase>) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: selectError } = await client
        .from("dema_messages")
        .select("id, message_title, decrypted_content, threat_level")
        .order("id", { ascending: true });

      if (selectError) {
        throw selectError;
      }

      setMessages((data ?? []) as DemaMessage[]);
    } catch (loadError) {
      setMessages([]);
      setError(getReadableDemaError(loadError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const client = supabase;

    if (!client) {
      setError(
        supabaseConfigError
          ? "Sin conexion al servidor de mensajes. Configura las variables publicas de Supabase."
          : "Supabase no esta configurado.",
      );
      setLoading(false);
      return;
    }

    let mounted = true;

    const syncMessages = async () => {
      await loadMessages(client);
    };

    syncMessages();

    const channel = client
      .channel("dema-messages-feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dema_messages" },
        () => {
          if (mounted) {
            syncMessages();
          }
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      client.removeChannel(channel);
    };
  }, [loadMessages, reloadKey]);

  return (
    <section className="rounded-xl border border-white/10 bg-black/40 p-6 shadow-[0_0_20px_rgba(255,46,46,0.14)] backdrop-blur-md">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
        Lore Decryptor
      </p>
      <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-white">
        Mensajes cifrados de DEMA
      </h2>

      {!isSupabaseConfigured ? (
        <p className="mt-3 text-sm text-clancy-fire">
          Supabase no esta configurado en este entorno.
        </p>
      ) : null}

      {loading ? <p className="mt-4 text-sm text-zinc-400">Cargando mensajes...</p> : null}
      {error ? (
        <div
          className="mt-4 rounded-lg border border-clancy-fire/35 bg-clancy-fire/10 p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm text-clancy-fire">{error}</p>
          {isSupabaseConfigured ? (
            <button
              type="button"
              onClick={() => setReloadKey((current) => current + 1)}
              className="mt-3 rounded-md border border-clancy-fire/45 px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-clancy-fire transition hover:bg-clancy-fire/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clancy-fire/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Reintentar conexion
            </button>
          ) : null}
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="mt-4 space-y-3">
          {messages.map((message) => (
            <article
              key={message.id}
              className="rounded-md border border-clancy-fire/30 bg-black/50 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-mono text-lg text-clancy-fire">
                  {message.message_title}
                </h3>
                <span className="rounded-full border border-clancy-trench/60 bg-clancy-trench/10 px-2 py-1 font-mono text-xs text-clancy-trench">
                  Threat {message.threat_level}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-200">{message.decrypted_content}</p>
            </article>
          ))}

          {messages.length === 0 ? (
            <p className="text-sm text-zinc-400">
              Sin mensajes. Inserta registros en `dema_messages`.
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
