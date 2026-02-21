import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "default" | "blurryface";

type PurchaseResult = {
  success: boolean;
  reason?: "insufficient_credits";
};

type TrenchWalletState = {
  credits: number;
  usedCodes: string[];
  unlockedThemes: ThemeMode[];
  activeTheme: ThemeMode;
  addCredits: (amount: number) => void;
  redeemCode: (code: string, reward?: number) => boolean;
  purchaseTheme: (theme: ThemeMode, cost: number) => PurchaseResult;
  setActiveTheme: (theme: ThemeMode) => void;
};

export const useTrenchWalletStore = create<TrenchWalletState>()(
  persist(
    (set, get) => ({
      credits: 0,
      usedCodes: [],
      unlockedThemes: ["default"],
      activeTheme: "default",
      addCredits: (amount) => {
        if (amount <= 0) return;
        const { credits } = get();
        set({ credits: credits + amount });
      },
      redeemCode: (code, reward = 50) => {
        const normalized = code.trim().toUpperCase();
        if (!normalized) return false;

        const { usedCodes, credits } = get();
        if (usedCodes.includes(normalized)) {
          return false;
        }

        set({
          credits: credits + reward,
          usedCodes: [...usedCodes, normalized],
        });
        return true;
      },
      purchaseTheme: (theme, cost) => {
        const { credits, unlockedThemes } = get();

        if (unlockedThemes.includes(theme)) {
          set({ activeTheme: theme });
          return { success: true };
        }

        if (credits < cost) {
          return { success: false, reason: "insufficient_credits" };
        }

        set({
          credits: credits - cost,
          unlockedThemes: [...unlockedThemes, theme],
          activeTheme: theme,
        });

        return { success: true };
      },
      setActiveTheme: (theme) => {
        const { unlockedThemes } = get();
        if (!unlockedThemes.includes(theme)) return;
        set({ activeTheme: theme });
      },
    }),
    {
      name: "trench-wallet",
    },
  ),
);
