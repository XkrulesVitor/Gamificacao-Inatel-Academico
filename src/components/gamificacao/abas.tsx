"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const abas = [
  { href: "/gamificacao/conquistas", rotulo: "Conquistas" },
  { href: "/gamificacao/ranking", rotulo: "Ranking" },
] as const;

/** Abas superiores sticky com indicador sublinhado. */
export function AbasGamificacao() {
  const pathname = usePathname();
  return (
    <nav aria-label="Seções de gamificação" className="sticky top-0 z-20 border-b border-line bg-bg">
      <ul className="mx-auto flex max-w-[1240px] px-4 lg:px-8">
        {abas.map(({ href, rotulo }) => {
          const ativa = pathname.startsWith(href);
          return (
            <li key={href} className="flex-1 lg:flex-none">
              <Link
                href={href}
                aria-current={ativa ? "page" : undefined}
                className={clsx(
                  "relative flex h-12 items-center justify-center text-[15px] font-medium transition-colors duration-150 lg:px-6",
                  ativa ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {rotulo}
                {ativa && (
                  <motion.span
                    layoutId="aba-gamificacao"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-accent"
                    transition={{ duration: 0.2, ease: "easeOut" }}
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
