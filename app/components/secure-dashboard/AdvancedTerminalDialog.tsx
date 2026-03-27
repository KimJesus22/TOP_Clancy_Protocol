import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { type RefObject } from "react";

type AdvancedTerminalDialogProps = {
  isOpen: boolean;
  secretFound: boolean;
  dialogRef: RefObject<HTMLElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  children: React.ReactNode;
};

export default function AdvancedTerminalDialog({
  isOpen,
  secretFound,
  dialogRef,
  closeButtonRef,
  onClose,
  children,
}: AdvancedTerminalDialogProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Cerrar consola"
            className="fixed inset-0 z-50 bg-[#101317]/84"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="advanced-console-title"
            className="fixed left-1/2 top-1/2 z-[60] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mb-3 flex items-center justify-between rounded-md border border-clancy-line/80 bg-clancy-surface/90 px-3 py-2 backdrop-blur-md">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-clancy-trench">
                  Consola Avanzada
                </p>
                <p id="advanced-console-title" className="text-xs text-gray-300">
                  Extra opcional para usuarios avanzados
                </p>
              </div>
              <div className="flex items-center gap-2">
                {secretFound ? (
                  <span className="rounded-full border border-clancy-trench/70 bg-clancy-trench/15 px-2 py-1 font-mono text-[11px] uppercase text-clancy-trench">
                    Secreto desbloqueado
                  </span>
                ) : null}
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Cerrar consola avanzada"
                  onClick={onClose}
                  className="rounded border border-clancy-line/75 bg-clancy-raised/75 p-1 text-clancy-muted transition-all duration-300 hover:border-clancy-fire/60 hover:text-clancy-fire hover:shadow-[0_0_12px_rgba(255,46,46,0.22)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            {children}
          </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
}
