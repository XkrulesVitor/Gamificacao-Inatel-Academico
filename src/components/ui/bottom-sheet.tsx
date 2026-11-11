"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Portal } from "@/components/ui/portal";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  /** Título acessível (exibido no topo do sheet) */
  title: string;
  /** Esconde o título visualmente (mantém para leitores de tela) */
  hideTitle?: boolean;
  children: React.ReactNode;
}

/**
 * Cartão explicativo que sobe da base da tela (padrão mobile).
 * Fica preso à moldura do app (#app-frame). Fecha com ESC, toque no fundo ou botão X.
 */
export function BottomSheet({ open, onClose, title, hideTitle, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Fecha se o componente for desmontado/oculto (navegação). Ref evita depender de onClose estável.
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });
  useLayoutEffect(() => () => onCloseRef.current(), []);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <div className="absolute inset-0 z-50 flex items-end" role="dialog" aria-modal="true" aria-label={title}>
            <motion.button
              type="button"
              aria-label="Fechar"
              className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="app-scroll relative max-h-[88%] w-full rounded-t-[28px] border-t border-line-strong bg-surface-2 px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-3 shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 600) onClose();
              }}
            >
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line-strong" aria-hidden />
              <div className="mb-2 flex items-start justify-between gap-3">
                <h2 className={hideTitle ? "sr-only" : "text-lg font-bold text-fg"}>{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="-mr-1 ml-auto grid size-9 place-items-center rounded-full bg-surface-3 text-muted transition hover:text-fg"
                  aria-label="Fechar"
                >
                  <X className="size-4" />
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
