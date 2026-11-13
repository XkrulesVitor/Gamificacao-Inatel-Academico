"use client";

import clsx from "clsx";
import { ChevronRight, Target } from "lucide-react";
import { fracao, percentual, textoProgresso } from "@/components/gamificacao/dados";
import { MedalEmblem } from "@/components/gamificacao/medal-emblem";
import { metalPonto } from "@/components/gamificacao/metal";
import { raridadeLabel } from "@/lib/mock/gamificacao";
import { useCountUp } from "@/lib/use-count-up";
import type { Medalha } from "@/lib/types";

/** Destaque da medalha mais perto de ser desbloqueada. O anel desenha e o percentual conta junto. */
export function ProximaConquista({
  medalha: m,
  onAbrir,
  ativa,
}: {
  medalha: Medalha;
  onAbrir: () => void;
  ativa?: boolean;
}) {
  const pct = useCountUp(percentual(m), 0.8);
  return (
    <button
      type="button"
      onClick={onAbrir}
      aria-label={`Próxima conquista: ${m.nome}, ${percentual(m)}%`}
      className={clsx(
        "group relative block w-full rounded-card border bg-surface-1 p-4 text-left shadow-card transition-[border-color,box-shadow] duration-200 hover:border-line-strong lg:p-5",
        ativa ? "border-accent/60 ring-1 ring-accent/40" : "border-line",
      )}
    >
      <span className="flex items-center gap-4 lg:gap-6">
        <MedalEmblem
          raridade={m.raridade}
          icone={m.icone}
          bloqueada
          progresso={fracao(m)}
          className="size-[92px] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 lg:size-[112px]"
        />
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="block text-[17px] font-semibold leading-tight tracking-tight text-fg lg:text-xl">{m.nome}</span>
              <span className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
                <span aria-hidden className={clsx("size-2 rounded-full", metalPonto[m.raridade])} />
                {raridadeLabel[m.raridade]} · <span className="num">{m.pontos} pts</span>
              </span>
            </span>
            <span className="num hidden shrink-0 text-right leading-none sm:block">
              <span className="text-[34px] font-semibold tracking-tight text-fg">{Math.round(pct)}</span>
              <span className="text-lg font-medium text-muted">%</span>
              <span className="mt-1.5 block text-xs font-normal text-muted">{textoProgresso(m)}</span>
            </span>
          </span>
          <span className="num mt-2 flex items-baseline gap-2 sm:hidden">
            <span className="text-[26px] font-semibold leading-none tracking-tight text-fg">
              {Math.round(pct)}
              <span className="text-base font-medium text-muted">%</span>
            </span>
            <span className="text-xs text-muted">{textoProgresso(m)}</span>
          </span>
          {m.pendente && (
            <span className="mt-3 hidden items-start gap-2 border-t border-line pt-3 text-[14px] leading-snug text-fg sm:flex">
              <Target className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
              {m.pendente}
            </span>
          )}
        </span>
        <ChevronRight className="size-5 shrink-0 text-subtle sm:hidden" strokeWidth={1.75} aria-hidden />
      </span>
      {m.pendente && (
        <span className="mt-3 flex items-start gap-2 border-t border-line pt-3 text-[14px] leading-snug text-fg sm:hidden">
          <Target className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
          {m.pendente}
        </span>
      )}
    </button>
  );
}
