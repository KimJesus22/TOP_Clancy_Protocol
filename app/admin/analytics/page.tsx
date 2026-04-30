import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WalletAnalytics from "@/app/admin/analytics/WalletAnalytics";
import {
  banditoWalletUsers,
  recentWalletTransactions,
} from "@/app/admin/analytics/mockWalletAnalytics";
import { buildPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Admin Analytics",
  description:
    "Ruta secreta para monitorear la economia de Trench Wallet, saldos Banditos y transacciones recientes.",
  path: "/admin/analytics",
  keywords: ["admin analytics", "trench wallet", "banditos", "economia mock"],
  robots: {
    index: false,
    follow: false,
  },
});

export default function AdminAnalyticsPage() {
  if (process.env.ENABLE_ADMIN_ANALYTICS !== "true") {
    notFound();
  }

  return (
    <WalletAnalytics
      users={banditoWalletUsers}
      transactions={recentWalletTransactions}
    />
  );
}
