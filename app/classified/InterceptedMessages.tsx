import { createSupabaseServerClient } from "@/src/lib/supabaseServer";

type InterceptRecord = {
  id: number;
  message_title: string;
  decrypted_content: string;
  threat_level: number;
};

function AccessDenied() {
  return (
    <section className="rounded-xl border border-clancy-fire/45 bg-black/80 p-6 shadow-[0_0_24px_rgba(255,46,46,0.24)]">
      <p className="font-mono text-sm uppercase tracking-[0.12em] text-clancy-fire">
        ACCESO DENEGADO - VIOLACION DE PROTOCOLO DEMA
      </p>
    </section>
  );
}

export default async function InterceptedMessages() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return <AccessDenied />;
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return <AccessDenied />;
  }

  const { data, error } = await supabase
    .from("dema_intercepts")
    .select("id, message_title, decrypted_content, threat_level")
    .order("id", { ascending: false });

  if (error) {
    return <AccessDenied />;
  }

  const messages = (data ?? []) as InterceptRecord[];

  return (
    <section className="rounded-xl border border-clancy-trench/45 bg-black/85 p-6 shadow-[0_0_24px_rgba(40,255,120,0.12)]">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-clancy-trench">
        Intercepted Messages
      </p>
      <h2 className="mt-2 font-mono text-2xl text-[#22c55e]">
        Consola de Intercepciones
      </h2>

      <div className="mt-5 space-y-3">
        {messages.map((message) => (
          <article
            key={message.id}
            className="rounded-md border border-[#22c55e]/35 bg-black p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-mono text-lg text-[#22c55e]">
                {message.message_title}
              </h3>
              <span className="rounded-full border border-clancy-fire/70 bg-clancy-fire/10 px-2 py-1 font-mono text-xs text-clancy-fire">
                Threat {message.threat_level}
              </span>
            </div>
            <p className="mt-2 font-mono text-sm text-zinc-300">
              {message.decrypted_content}
            </p>
          </article>
        ))}

        {messages.length === 0 ? (
          <p className="font-mono text-sm text-zinc-500">
            Sin registros en dema_intercepts.
          </p>
        ) : null}
      </div>
    </section>
  );
}
