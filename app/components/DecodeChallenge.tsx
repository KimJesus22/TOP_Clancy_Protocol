"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { useTrenchWalletStore } from "@/src/store/trenchWalletStore";

const SECRET_CODES = new Set(["SAHLOFOLINA", "KEONS"]);

export default function DecodeChallenge() {
  const redeemCode = useTrenchWalletStore((state) => state.redeemCode);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) return;

    if (!SECRET_CODES.has(normalized)) {
      setSuccess(false);
      setMessage("Codigo invalido. Sigue buscando señales.");
      return;
    }

    const redeemed = redeemCode(normalized, 50);
    if (!redeemed) {
      setSuccess(false);
      setMessage("Codigo ya canjeado anteriormente.");
      return;
    }

    setSuccess(true);
    setMessage("Acceso confirmado: +50 creditos transferidos al Trench Wallet.");
    setCode("");
    setTimeout(() => setSuccess(false), 1200);
  };

  return (
    <section className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
        Decode Challenge
      </p>
      <h3 className="mt-2 font-mono text-xl text-white">Terminal de codigos secretos</h3>
      <p className="mt-2 text-sm text-gray-300">
        Ingresa claves de resistencia para ganar creditos.
      </p>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-clancy-fire/70 focus:shadow-[0_0_12px_rgba(255,46,46,0.22)]"
          placeholder="Ej: SAHLOFOLINA"
        />
        <button
          type="submit"
          className="rounded-md border border-white/10 bg-black/30 px-4 py-2 font-mono text-sm text-gray-300 transition-all duration-300 hover:border-clancy-trench hover:text-white hover:shadow-[0_0_14px_rgba(252,227,0,0.25)]"
        >
          Decodificar
        </button>
      </form>

      {message ? (
        <p className={`mt-3 text-sm ${success ? "text-clancy-trench" : "text-clancy-fire"}`}>
          {message}
        </p>
      ) : null}

      {success ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0"
        >
          {[...Array(10)].map((_, index) => (
            <motion.span
              key={index}
              className={`absolute h-2 w-2 rounded-full ${index % 2 === 0 ? "bg-clancy-fire" : "bg-clancy-trench"}`}
              initial={{
                x: "50%",
                y: "50%",
                scale: 0.2,
                opacity: 1,
              }}
              animate={{
                x: `${10 + (index * 9) % 80}%`,
                y: `${15 + (index * 11) % 70}%`,
                scale: 1.2,
                opacity: 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      ) : null}
    </section>
  );
}
