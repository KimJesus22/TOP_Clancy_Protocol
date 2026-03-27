import type { Metadata } from "next";
import WalletAnalytics from "./WalletAnalytics";
import {
  banditoWalletUsers,
  recentWalletTransactions,
} from "./mockWalletAnalytics";
import { buildPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Admin Analytics",
  description:
    "Ruta secreta para monitorear la economia de Trench Wallet, saldos Banditos y transacciones recientes.",
  path: "/admin/analytics",
  keywords: ["admin analytics", "trench wallet", "banditos", "economia mock"],
});

export default function AdminAnalyticsPage() {
  return (
    <WalletAnalytics
      users={banditoWalletUsers}
      transactions={recentWalletTransactions}
    />
  );
}
