"use client";

import { useEffect } from "react";
import { useTrenchWalletStore } from "@/src/store/trenchWalletStore";

export default function ThemeApplier() {
  const activeTheme = useTrenchWalletStore((state) => state.activeTheme);

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);

  return null;
}
