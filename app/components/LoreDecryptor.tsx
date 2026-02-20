"use client";

import { useEffect, useState } from "react";
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

export default function LoreDecryptor() {
  const [messages, setMessages] = useState<DemaMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setError(supabaseConfigError ?? "Supabase no configurado.");
      setLoading(false);
      return;
    }

    let mounted = true;

    const loadMessages = async () => {
      const { data, error: selectError } = await supabase
        .from("dema_messages")
        .select("id, message_title, decrypted_content, threat_level")
        .order("id", { ascending: true });

      if (!mounted) return;

      if (selectError) {
        setError(selectError.message);
        setLoading(false);
        return;
      }

      setMessages((data ?? []) as DemaMessage[]);
      setLoading(false);
    };

    loadMessages();

    const channel = supabase
      .channel("dema-messages-feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dema_messages" },
        () => {
          loadMessages();
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="rounded-xl border border-clancy-fire/35 bg-black/45 p-6 shadow-[0_0_20px_rgba(255,46,46,0.14)]">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
        Lore Decryptor
      </p>
      <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-clancy-fire">
        Mensajes cifrados de DEMA
      </h2>

      {!isSupabaseConfigured ? (
        <p className="mt-3 text-sm text-clancy-fire">
          Supabase no esta configurado en este entorno.
        </p>
      ) : null}

      {loading ? <p className="mt-4 text-sm text-zinc-400">Cargando mensajes...</p> : null}
      {error ? <p className="mt-4 text-sm text-clancy-fire">Error: {error}</p> : null}

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
