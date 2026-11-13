"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navSections, rotaAtiva } from "@/lib/nav";

/** Seções do menu (mesma lista no drawer do mobile e na sidebar do desktop). */
export function NavList({ onNavigate, compact }: { onNavigate?: () => void; compact?: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {navSections.map((secao) => (
        <div key={secao.titulo} className={clsx("border-b border-white/[0.07]", compact ? "py-1.5" : "py-2")}>
          <p className={clsx("px-5 pb-1 text-[13px] text-[#b4b4ba]", compact ? "pt-2" : "pt-3")}>{secao.titulo}</p>
          <ul>
            {secao.itens.map((item) => {
              const ativo = rotaAtiva(pathname, item.href, item.match);
              const Icone = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={ativo ? "page" : undefined}
                    className={clsx(
                      "group relative flex items-center gap-4 px-5 xl:gap-5 transition-colors duration-150",
                      compact ? "h-10 text-[14px] xl:text-[15px]" : "h-12 text-base",
                      ativo ? "bg-white/[0.08] text-white" : "text-[#e4e4e7] hover:bg-white/[0.04]",
                    )}
                  >
                    <Icone
                      className={clsx("size-5 shrink-0", ativo ? "text-accent" : "text-[#c9c9cf]")}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
