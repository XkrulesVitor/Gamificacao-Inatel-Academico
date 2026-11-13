"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navItens, rotaAtiva } from "@/lib/nav";
import { avisos } from "@/lib/mock/aluno";

const naoLidos = avisos.filter((a) => !a.lido).length;

/** Menu de 6 itens (drawer do mobile e sidebar do desktop). */
export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className="space-y-0.5 px-3 py-3">
      {navItens.map((item, i) => {
        const ativo = rotaAtiva(pathname, item.href, item.match);
        const Icone = item.icon;
        const ultimo = i === navItens.length - 1;
        return (
          <li key={item.href} className={clsx(ultimo && "mt-3 border-t border-line pt-3")}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={ativo ? "page" : undefined}
              className={clsx(
                "group relative flex h-11 items-center gap-3.5 rounded-control px-3 text-[15px] transition-colors duration-150",
                ativo
                  ? "bg-sidebar-active font-medium text-fg"
                  : "text-sidebar-fg hover:bg-sidebar-active/60",
              )}
            >
              {ativo && <span className="absolute inset-y-2.5 left-0 w-[3px] rounded-full bg-accent" aria-hidden />}
              <Icone
                className={clsx("size-5 shrink-0 transition-colors", ativo ? "text-accent" : "text-sidebar-muted group-hover:text-sidebar-fg")}
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="flex-1 truncate">{item.label}</span>
              {item.href === "/avisos" && naoLidos > 0 && (
                <span className="num grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[11px] font-semibold text-on-primary">
                  {naoLidos}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
