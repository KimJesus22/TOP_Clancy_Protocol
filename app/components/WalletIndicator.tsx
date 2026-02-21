"use client";

import { Zap } from "lucide-react";
import { useTrenchWalletStore } from "@/src/store/trenchWalletStore";

export default function WalletIndicator() {
  const credits = useTrenchWalletStore((state) => state.credits);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
      <Zap className="h-4 w-4 text-clancy-trench" />
      <p className="font-mono text-xs text-white">Trench Wallet: {credits}</p>
    </div>
  );
}
