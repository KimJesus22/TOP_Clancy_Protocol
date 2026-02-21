"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigError,
} from "@/src/lib/supabaseClient";

export default function BanditoLogin() {
  const [authMode, setAuthMode] = useState<"magic" | "password">("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setError(supabaseConfigError ?? "Supabase no configurado.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/classified`
        : undefined;

    const authError =
      authMode === "magic"
        ? (
            await supabase.auth.signInWithOtp({
              email,
              options: {
                emailRedirectTo: redirectTo,
              },
            })
          ).error
        : (
            await supabase.auth.signInWithPassword({
              email,
              password,
            })
          ).error;

    if (authError) {
      setError(authError.message);
      setIsSubmitting(false);
      return;
    }

    setMessage(
      authMode === "magic"
        ? "Enlace enviado. Revisa tu correo para acceder a Trench."
        : "Sesion iniciada correctamente.",
    );
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
        Accede con Magic Link o con correo y contrasena.
      </p>
      {!isSupabaseConfigured ? (
        <p className="mt-2 text-sm text-clancy-fire">
          Supabase no esta configurado. Revisa variables de entorno.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAuthMode("magic")}
            className={`rounded-md border px-3 py-1.5 text-xs transition-all duration-300 ${
              authMode === "magic"
                ? "border-clancy-trench bg-clancy-trench/15 text-clancy-trench"
                : "border-zinc-600/60 bg-black/40 text-zinc-300 hover:border-clancy-fire/70"
            }`}
          >
            Magic Link
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("password")}
            className={`rounded-md border px-3 py-1.5 text-xs transition-all duration-300 ${
              authMode === "password"
                ? "border-clancy-fire bg-clancy-fire/15 text-clancy-fire"
                : "border-zinc-600/60 bg-black/40 text-zinc-300 hover:border-clancy-fire/70"
            }`}
          >
            Correo + Contrasena
          </button>
        </div>

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
          disabled={!isSupabaseConfigured}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-zinc-600/60 bg-black/60 px-3 py-2 text-zinc-100 outline-none transition focus:border-clancy-fire/80 focus:shadow-[0_0_12px_rgba(255,46,46,0.22)]"
            placeholder="bandito@resistance.net"
          />
        </div>

        {authMode === "password" ? (
          <div>
            <label
              htmlFor="bandito-password"
              className="mb-2 block text-xs uppercase tracking-[0.12em] text-zinc-400"
            >
              Contrasena
            </label>
            <input
              id="bandito-password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-zinc-600/60 bg-black/60 px-3 py-2 text-zinc-100 outline-none transition focus:border-clancy-fire/80 focus:shadow-[0_0_12px_rgba(255,46,46,0.22)]"
              placeholder="Ingresa tu contrasena"
            />
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || !isSupabaseConfigured}
          className="w-full rounded-md border border-clancy-fire/70 bg-clancy-fire/20 px-4 py-2 font-mono text-sm uppercase tracking-[0.08em] text-clancy-fire transition hover:shadow-[0_0_14px_rgba(255,46,46,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Transmitiendo..."
            : authMode === "magic"
              ? "Solicitar Acceso a la Resistencia"
              : "Iniciar Sesion"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-clancy-trench">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-clancy-fire">{error}</p> : null}
    </motion.section>
  );
}
