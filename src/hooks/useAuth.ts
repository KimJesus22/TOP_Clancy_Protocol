"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  isSupabaseConfigured,
  supabase,
  supabaseConfigError,
} from "@/src/lib/supabaseClient";

type AuthResult = {
  success: boolean;
  message?: string;
  error?: string;
};

function getRedirectTo() {
  return typeof window !== "undefined" ? `${window.location.origin}/classified` : undefined;
}

export function useAuth() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signInWithMagicLink = async (email: string): Promise<AuthResult> => {
    if (!supabase) {
      return {
        success: false,
        error: supabaseConfigError ?? "Supabase no configurado.",
      };
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: getRedirectTo(),
      },
    });

    setIsSubmitting(false);

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: "Enlace enviado. Revisa tu correo para acceder a Trench.",
    };
  };

  const signInWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    if (!supabase) {
      return {
        success: false,
        error: supabaseConfigError ?? "Supabase no configurado.",
      };
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      return { success: false, error: error.message };
    }

    router.push("/classified");
    router.refresh();

    return {
      success: true,
      message: "Sesion iniciada correctamente.",
    };
  };

  const register = async (email: string, password: string): Promise<AuthResult> => {
    if (!supabase) {
      return {
        success: false,
        error: supabaseConfigError ?? "Supabase no configurado.",
      };
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getRedirectTo(),
      },
    });

    setIsSubmitting(false);

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: "Registro creado. Verifica tu correo para confirmar la cuenta.",
    };
  };

  return {
    isSubmitting,
    isSupabaseConfigured,
    signInWithEmail,
    signInWithMagicLink,
    register,
  };
}
