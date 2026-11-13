"use client";

import clsx from "clsx";
import { fracao, percentual } from "@/components/gamificacao/dados";
import { MedalEmblem } from "@/components/gamificacao/medal-emblem";
import { fmtDiaMes } from "@/lib/format";
import { raridadeLabel } from "@/lib/mock/gamificacao";
import type { Medalha } from "@/lib/types";

/** Grade de medalhas de um grupo (conquistadas ou bloqueadas). */
export function Vitrine({
  itens,
  selecionadaId,
  onAbrir,
}: {
  itens: Medalha[];
  selecionadaId?: string;
  onAbrir: (m: Medalha) => void;
}) {
  return (
    <ul className="grid grid-cols-3 gap-x-1 gap-y-2 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
      {itens.map((m, i) => {
        const ativa = selecionadaId === m.id;
        return (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => onAbrir(m)}
              aria-pressed={selecionadaId !== undefined ? ativa : undefined}
              aria-label={
                m.desbloqueada
                  ? `${m.nome}, ${raridadeLabel[m.raridade]}, conquistada`
                  : `${m.nome}, bloqueada, ${percentual(m)}%`
              }
              className={clsx(
                "group flex h-full w-full flex-col items-center rounded-card px-1 pb-3 pt-2 text-center transition-[background-color,box-shadow] duration-200",
                ativa ? "bg-surface-1 shadow-card ring-1 ring-accent/50" : "hover:bg-surface-1/70",
              )}
            >
              <MedalEmblem
                raridade={m.raridade}
                icone={m.icone}
                bloqueada={!m.desbloqueada}
                progresso={fracao(m)}
                brilho="hover"
                atraso={Math.min(i * 0.05, 0.25)}
                className="size-[84px] transition-transform duration-200 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1 xl:size-[92px]"
              />
              <span
                className={clsx(
                  "mt-1 line-clamp-2 text-[13px] font-medium leading-tight",
                  m.desbloqueada ? "text-fg" : "text-muted",
                )}
              >
                {m.nome}
              </span>
              <span className="num mt-1 text-xs text-subtle">
                {m.desbloqueada ? (m.dataConquista ? fmtDiaMes(m.dataConquista) : "") : `${percentual(m)}%`}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
