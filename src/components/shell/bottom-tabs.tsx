"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { bottomTabs, rotaAtiva } from "@/lib/nav";

/** Barra inferior do mobile com 4 atalhos. Oculta no desktop. */
export function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Atalhos"
      className="shrink-0 border-t border-line bg-surface-1 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid h-16 grid-cols-4">
        {bottomTabs.map((t) => {
          const ativo = rotaAtiva(pathname, t.href);
          const Icone = t.icon;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={ativo ? "page" : undefined}
                className={clsx(
                  "flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors duration-150",
                  ativo ? "text-fg" : "text-subtle hover:text-muted",
                )}
              >
                <span
                  className={clsx(
                    "grid h-7 w-12 place-items-center rounded-full transition-colors duration-150",
                    ativo && "bg-accent/15",
                  )}
                >
                  <Icone className={clsx("size-5", ativo && "text-accent")} strokeWidth={1.75} aria-hidden />
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
