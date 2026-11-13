"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import clsx from "clsx";
import { bottomTabs, rotaAtiva } from "@/lib/nav";

/** Barra inferior do mobile com 5 destinos. Oculta no desktop. */
export function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Atalhos"
      className="shrink-0 border-t border-line bg-surface-1/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="grid h-16 grid-cols-5">
        {bottomTabs.map((t) => {
          const ativo = rotaAtiva(pathname, t.href, t.match);
          const Icone = t.icon;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={ativo ? "page" : undefined}
                className={clsx(
                  "relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors duration-150",
                  ativo ? "text-fg" : "text-subtle hover:text-muted",
                )}
              >
                <span className="relative grid h-7 w-12 place-items-center">
                  {ativo && (
                    <motion.span
                      layoutId="tab-ativa"
                      className="absolute inset-0 rounded-full bg-accent/15"
                      transition={{ type: "spring", stiffness: 520, damping: 40 }}
                    />
                  )}
                  <Icone className={clsx("relative size-5", ativo && "text-accent")} strokeWidth={1.75} aria-hidden />
                </span>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
