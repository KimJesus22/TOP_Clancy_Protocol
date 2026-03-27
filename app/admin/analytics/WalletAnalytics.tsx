import {
  Activity,
  ShoppingBag,
  Sigma,
  Users,
} from "lucide-react";
import {
  calculateMeanBalance,
  calculateMedianBalance,
  calculateModeReward,
  type BanditoWalletRecord,
  type WalletTransactionRecord,
} from "@/src/lib/walletAnalytics";

type WalletAnalyticsProps = {
  users: BanditoWalletRecord[];
  transactions: WalletTransactionRecord[];
};

function formatCredits(value: number) {
  return new Intl.NumberFormat("es-MX", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 1,
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
  }).format(value);
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date(value));
}

export default function WalletAnalytics({
  users,
  transactions,
}: WalletAnalyticsProps) {
  const meanBalance = calculateMeanBalance(users);
  const medianBalance = calculateMedianBalance(users);
  const modeReward = calculateModeReward(transactions);

  const stats = [
    {
      id: "mean",
      label: "Media de saldos",
      value: `${formatCredits(meanBalance)} creditos`,
      caption: "Promedio total entre los 50 Banditos monitoreados.",
      icon: Sigma,
      accent: "text-clancy-fire",
    },
    {
      id: "median",
      label: "Mediana de saldos",
      value: `${formatCredits(medianBalance)} creditos`,
      caption: "Valor central para detectar atipicos sin sesgo por ballenas.",
      icon: Activity,
      accent: "text-clancy-trench",
    },
    {
      id: "mode",
      label: "Moda de recompensas",
      value: modeReward,
      caption: "Articulo mas comprado dentro del flujo reciente de la tienda.",
      icon: ShoppingBag,
      accent: "text-clancy-ink",
    },
  ];

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-6 md:p-10">
      <section className="rounded-2xl border border-clancy-line/85 bg-clancy-surface/88 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.32)] backdrop-blur-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-clancy-trench">
              Admin Analytics
            </p>
            <h1 className="mt-2 font-mono text-3xl text-clancy-ink md:text-4xl">
              Monitoreo secreto de Trench Wallet
            </h1>
            <p className="mt-3 text-sm text-clancy-muted md:text-base">
              Vista interna para analizar la economia de Banditos, aislar cuentas
              atipicas y detectar tendencias de consumo en recompensas y tienda.
            </p>
          </div>

          <div className="rounded-xl border border-clancy-line/80 bg-clancy-raised/78 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-clancy-trench" />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-muted">
                  Banditos auditados
                </p>
                <p className="font-mono text-xl text-clancy-ink">{users.length}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.id}
                className="rounded-xl border border-clancy-line/85 bg-clancy-raised/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_28px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-clancy-muted">
                      {stat.label}
                    </p>
                    <p className="mt-3 font-mono text-2xl text-clancy-ink">
                      {stat.value}
                    </p>
                  </div>
                  <span className="rounded-xl border border-clancy-line/80 bg-clancy-surface/82 p-3">
                    <Icon className={`h-5 w-5 ${stat.accent}`} />
                  </span>
                </div>
                <p className="mt-4 text-sm text-clancy-muted">{stat.caption}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-clancy-line/85 bg-clancy-raised/76 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <header className="flex items-center justify-between gap-3 border-b border-clancy-line/70 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-clancy-trench">
                  Saldos activos
                </p>
                <h2 className="mt-2 font-mono text-xl text-clancy-ink">
                  Topologia de usuarios Banditos
                </h2>
              </div>
              <span className="rounded-full border border-clancy-fire/40 bg-clancy-fire/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.08em] text-clancy-fire">
                50 registros mock
              </span>
            </header>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left">
                    <th className="px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-clancy-muted">
                      Codename
                    </th>
                    <th className="px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-clancy-muted">
                      Sector
                    </th>
                    <th className="px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-clancy-muted">
                      Rango
                    </th>
                    <th className="px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-clancy-muted">
                      Creditos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="rounded-xl border border-clancy-line/80 bg-clancy-surface/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      <td className="rounded-l-xl px-3 py-3 font-mono text-sm text-clancy-ink">
                        {user.codename}
                      </td>
                      <td className="px-3 py-3 text-sm text-clancy-muted">{user.sector}</td>
                      <td className="px-3 py-3 text-sm text-clancy-muted">{user.rank}</td>
                      <td className="rounded-r-xl px-3 py-3 font-mono text-sm text-clancy-fire">
                        {formatCredits(user.credits)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-2xl border border-clancy-line/85 bg-clancy-raised/76 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <header className="border-b border-clancy-line/70 pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-clancy-trench">
                Flujo de transacciones
              </p>
              <h2 className="mt-2 font-mono text-xl text-clancy-ink">
                Movimientos recientes
              </h2>
            </header>

            <div className="mt-5 space-y-3">
              {transactions.map((transaction) => (
                <article
                  key={transaction.id}
                  className="rounded-xl border border-clancy-line/80 bg-clancy-surface/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm text-clancy-ink">
                        {transaction.codename}
                      </p>
                      <p className="mt-1 text-sm text-clancy-muted">{transaction.item}</p>
                    </div>
                    <span className="rounded-full border border-clancy-line/75 bg-clancy-raised/72 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-clancy-trench">
                      {transaction.channel}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="font-mono text-sm text-clancy-fire">
                      -{formatCredits(transaction.creditsSpent)} creditos
                    </p>
                    <p className="font-mono text-xs text-clancy-muted">
                      {formatTimestamp(transaction.occurredAt)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
