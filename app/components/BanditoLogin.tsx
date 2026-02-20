"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

export default function BanditoLogin() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/classified`
        : undefined;

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (authError) {
      setError(authError.message);
      setIsSubmitting(false);
      return;
    }

    setMessage("Enlace enviado. Revisa tu correo para acceder a Trench.");
    setIsSubmitting(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-xl border border-clancy-fire/45 bg-black/70 p-6 shadow-[0_0_24px_rgba(255,46,46,0.25)]"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-clancy-trench">
        DEMA Security Layer
      </p>
      <h1 className="mt-2 font-mono text-2xl text-clancy-fire">
        Bandito Login
      </h1>
      <p className="mt-3 text-sm text-zinc-300">
        Ingresa tu correo para recibir un Magic Link de acceso seguro.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="bandito-email"
            className="mb-2 block text-xs uppercase tracking-[0.12em] text-zinc-400"
          >
            Correo Electronico
          </label>
          <input
            id="bandito-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-zinc-600/60 bg-black/60 px-3 py-2 text-zinc-100 outline-none transition focus:border-clancy-fire/80 focus:shadow-[0_0_12px_rgba(255,46,46,0.22)]"
            placeholder="bandito@resistance.net"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md border border-clancy-fire/70 bg-clancy-fire/20 px-4 py-2 font-mono text-sm uppercase tracking-[0.08em] text-clancy-fire transition hover:shadow-[0_0_14px_rgba(255,46,46,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Transmitiendo..."
            : "Solicitar Acceso a la Resistencia"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-clancy-trench">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-clancy-fire">{error}</p> : null}
    </motion.section>
  );
}
