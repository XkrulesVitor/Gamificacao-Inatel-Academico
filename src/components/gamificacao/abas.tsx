"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Award, Trophy } from "lucide-react";

const abas = [
  { href: "/gamificacao/conquistas", rotulo: "Conquistas", Icone: Award },
  { href: "/gamificacao/ranking", rotulo: "Ranking", Icone: Trophy },
] as const;

/** Abas superiores (sticky) com indicador animado. */
export function AbasGamificacao() {
  const pathname = usePathname();
  return (
    <nav aria-label="Seções de gamificação" className="sticky top-0 z-10 border-b border-line bg-bg">
      <ul className="grid grid-cols-2">
        {abas.map(({ href, rotulo, Icone }) => {
          const ativa = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={ativa ? "page" : undefined}
                className={clsx(
                  "relative flex h-12 items-center justify-center gap-2 text-[15px] font-semibold outline-none transition-colors focus-visible:bg-surface-2 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand",
                  ativa ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                <Icone className="size-4" aria-hidden />
                {rotulo}
                {ativa && (
                  <motion.span
                    layoutId="aba-gamificacao"
                    className="absolute inset-x-6 bottom-0 h-[3px] rounded-t-full bg-brand"
                    transition={{ type: "spring", stiffness: 500, damping: 36 }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
