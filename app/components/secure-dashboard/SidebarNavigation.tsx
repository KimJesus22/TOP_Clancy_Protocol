import { Command } from "lucide-react";
import { navItems } from "@/app/components/secure-dashboard/navItems";

export default function SidebarNavigation() {
  return (
    <aside
      aria-label="Navegacion principal"
      className="fixed inset-y-0 left-0 hidden w-72 border-r border-clancy-line/80 bg-clancy-surface/88 p-6 backdrop-blur-md md:flex md:flex-col"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
        Secure Panel
      </p>
      <h1 className="mt-2 font-mono text-xl tracking-[0.08em] text-clancy-ink">
        Clancy Dashboard
      </h1>
      <nav aria-label="Secciones del dashboard" className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              className="group flex items-center gap-3 rounded-md border border-clancy-line/75 bg-clancy-raised/75 px-3 py-2 text-sm text-clancy-muted backdrop-blur-md transition-all duration-300 hover:border-clancy-fire/70 hover:text-clancy-ink hover:shadow-[0_0_16px_rgba(255,46,46,0.22)] focus-visible:border-clancy-trench focus-visible:text-clancy-ink focus-visible:shadow-[0_0_16px_rgba(252,227,0,0.18)]"
            >
              <Icon className="h-4 w-4 text-clancy-trench transition-all duration-300 group-hover:text-clancy-fire" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
      <a
        href="/consola"
        className="mt-4 flex items-center gap-3 rounded-md border border-clancy-line/75 bg-clancy-raised/75 px-3 py-2 text-sm text-clancy-muted backdrop-blur-md transition-all duration-300 hover:border-clancy-trench hover:text-clancy-ink hover:shadow-[0_0_16px_rgba(252,227,0,0.28)] focus-visible:border-clancy-trench focus-visible:text-clancy-ink focus-visible:shadow-[0_0_16px_rgba(252,227,0,0.18)]"
      >
        <Command className="h-4 w-4 text-clancy-trench transition-all duration-300" />
        <span>Abrir Consola</span>
      </a>
      <p className="mt-2 font-mono text-[11px] text-zinc-500">Atajo: Ctrl + Shift + T</p>
    </aside>
  );
}
