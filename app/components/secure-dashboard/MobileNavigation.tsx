import { Command, Menu, X } from "lucide-react";
import { type RefObject } from "react";
import { navItems } from "@/app/components/secure-dashboard/navItems";

type MobileNavigationProps = {
  isOpen: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
  onClose: () => void;
};

export default function MobileNavigation({
  isOpen,
  triggerRef,
  panelRef,
  closeButtonRef,
  onOpen,
  onClose,
}: MobileNavigationProps) {
  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Abrir menu"
        className="fixed left-4 top-4 z-50 rounded-md border border-clancy-line/80 bg-clancy-surface/90 p-2 text-clancy-ink backdrop-blur-md transition-all duration-300 hover:border-clancy-fire/60 hover:text-clancy-fire hover:shadow-[0_0_14px_rgba(255,46,46,0.25)] md:hidden"
        onClick={onOpen}
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#101317]/86"
            aria-label="Cerrar menu"
            onClick={onClose}
          />
          <aside
            ref={panelRef}
            aria-label="Navegacion movil"
            className="relative h-full w-80 max-w-[88vw] border-r border-clancy-line/80 bg-clancy-surface/92 p-6 backdrop-blur-md"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-mono text-lg tracking-[0.08em] text-clancy-ink">Menu Seguro</h2>
              <button
                ref={closeButtonRef}
                type="button"
                className="rounded border border-clancy-line/75 bg-clancy-raised/75 p-1 text-clancy-muted transition-all duration-300 hover:border-clancy-fire/60 hover:text-clancy-fire hover:shadow-[0_0_12px_rgba(255,46,46,0.22)]"
                onClick={onClose}
                aria-label="Cerrar menu lateral"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav aria-label="Secciones del dashboard" className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-md border border-clancy-line/75 bg-clancy-raised/75 px-3 py-2 text-sm text-clancy-muted backdrop-blur-md transition-all duration-300 hover:border-clancy-fire/70 hover:text-clancy-ink hover:shadow-[0_0_14px_rgba(255,46,46,0.2)] focus-visible:border-clancy-trench focus-visible:text-clancy-ink focus-visible:shadow-[0_0_14px_rgba(252,227,0,0.18)]"
                  >
                    <Icon className="h-4 w-4 text-clancy-trench transition-all duration-300" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
            <a
              href="/consola"
              onClick={onClose}
              className="mt-4 flex w-full items-center gap-3 rounded-md border border-clancy-line/75 bg-clancy-raised/75 px-3 py-2 text-sm text-clancy-muted backdrop-blur-md transition-all duration-300 hover:border-clancy-trench hover:text-clancy-ink hover:shadow-[0_0_14px_rgba(252,227,0,0.22)] focus-visible:border-clancy-trench focus-visible:text-clancy-ink focus-visible:shadow-[0_0_14px_rgba(252,227,0,0.18)]"
            >
              <Command className="h-4 w-4 text-clancy-trench transition-all duration-300" />
              <span>Abrir Consola</span>
            </a>
            <p className="mt-2 font-mono text-[11px] text-zinc-500">Atajo: Ctrl + Shift + T</p>
          </aside>
        </div>
      ) : null}
    </>
  );
}
