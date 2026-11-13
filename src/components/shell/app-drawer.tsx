"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Power } from "lucide-react";
import { useEffect } from "react";
import { useSession } from "@/components/session-provider";
import { Portal } from "@/components/ui/portal";
import { NavList } from "@/components/shell/nav-list";
import { UserBlock } from "@/components/shell/user-block";

/** Menu lateral do mobile (o mesmo do app real). Fica oculto no desktop, onde a sidebar é fixa. */
export function AppDrawer({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const router = useRouter();
  const { sair } = useSession();

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onFechar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto, onFechar]);

  return (
    <Portal>
      <AnimatePresence>
        {aberto && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.button
              type="button"
              aria-label="Fechar menu"
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onFechar}
            />
            <motion.nav
              aria-label="Menu principal"
              className="app-scroll absolute inset-y-0 left-0 w-[84%] max-w-[312px] bg-drawer pt-[env(safe-area-inset-top)] shadow-[8px_0_32px_rgba(0,0,0,0.5)]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 34, stiffness: 380 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.5, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 || info.velocity.x < -500) onFechar();
              }}
            >
              <UserBlock onNavigate={onFechar} />
              <NavList onNavigate={onFechar} />
              <div className="py-2 pb-[calc(16px+env(safe-area-inset-bottom))]">
                <button
                  type="button"
                  onClick={() => {
                    onFechar();
                    sair();
                    router.replace("/");
                  }}
                  className="flex h-12 w-full items-center gap-5 px-5 text-left text-base text-[#e4e4e7] transition-colors hover:bg-white/[0.04]"
                >
                  <Power className="size-5 text-[#c9c9cf]" strokeWidth={1.75} aria-hidden />
                  Sair
                </button>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
