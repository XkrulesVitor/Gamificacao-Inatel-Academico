"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import clsx from "clsx";
import type { SubNavItem } from "@/lib/nav";

/**
 * Abas de seção (Desempenho, Agenda e Conquistas e Ranking): segmentadas, sticky no topo da
 * área de rolagem, com indicador que desliza entre as abas.
 */
export function SectionTabs({ itens, label, layoutId }: { itens: SubNavItem[]; label: string; layoutId: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1240px] gap-1 px-4 lg:px-6 xl:px-8">
        {itens.map((t) => {
          const ativo = pathname === t.href || pathname.startsWith(t.href + "/");
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={ativo ? "page" : undefined}
              className={clsx(
                "relative flex h-12 items-center px-3 text-[15px] font-medium transition-colors duration-150",
                ativo ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {t.label}
              {ativo && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 520, damping: 40 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
