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
  hideTitle?: boolean;
  children: React.ReactNode;
}

/**
 * Detalhe que sobe da base da tela. Uso: MOBILE. No desktop prefira um painel lateral
 * (SplitLayout) e não abra o sheet (veja useIsDesktop). Fecha com ESC, fundo, X ou arrastar.
 */
export function BottomSheet({ open, onClose, title, hideTitle, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });
  useLayoutEffect(() => () => onCloseRef.current(), []);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-label={title}>
            <motion.button
              type="button"
              aria-label="Fechar"
              className="absolute inset-0 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onClose}
            />
            <motion.div
              className="app-scroll relative max-h-[88dvh] w-full max-w-lg rounded-t-[22px] border-t border-line-strong bg-surface-2 px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-2.5"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 34, stiffness: 380 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 600) onClose();
              }}
            >
              <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-line-strong" aria-hidden />
              <div className="mb-3 flex min-h-9 items-center justify-between gap-3">
                <h2 className={hideTitle ? "sr-only" : "text-base font-semibold text-fg"}>{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="-mr-2 ml-auto grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-3 hover:text-fg"
                  aria-label="Fechar"
                >
                  <X className="size-5" strokeWidth={1.75} />
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
