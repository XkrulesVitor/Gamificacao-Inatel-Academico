"use client";

import clsx from "clsx";
import { CalendarCheck, Target } from "lucide-react";
import { fracao, percentual, textoProgresso } from "@/components/gamificacao/dados";
import { MedalEmblem } from "@/components/gamificacao/medal-emblem";
import { metalPonto } from "@/components/gamificacao/metal";
import { fmtData } from "@/lib/format";
import { raridadeLabel } from "@/lib/mock/gamificacao";
import type { Medalha } from "@/lib/types";

export { percentual };

/** Detalhe da medalha: painel lateral (desktop) e bottom sheet (mobile). */
export function MedalDetail({ medalha: m, noSheet }: { medalha: Medalha; noSheet?: boolean }) {
  const pct = percentual(m);
  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <MedalEmblem
          key={m.id}
          raridade={m.raridade}
          icone={m.icone}
          bloqueada={!m.desbloqueada}
          progresso={fracao(m)}
          brilho="montar"
          atraso={0.1}
          className="size-[132px]"
        />
        <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-fg">{m.nome}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-muted">
          <span aria-hidden className={clsx("size-2 rounded-full", metalPonto[m.raridade])} />
          {raridadeLabel[m.raridade]} · {m.categoria} · <span className="num">{m.pontos} pts</span>
        </p>
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <h4 className="text-[13px] font-medium text-muted">Regra</h4>
        <p className="mt-1 text-[15px] leading-snug text-fg">{m.requisito}</p>
      </div>

      {m.desbloqueada ? (
        <div className="mt-4 flex items-start gap-3 rounded-control bg-gold/10 p-3">
          <CalendarCheck className="mt-0.5 size-[18px] shrink-0 text-gold-ink" strokeWidth={1.75} aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-medium text-fg">
              Conquistada em <span className="num">{m.dataConquista ? fmtData(m.dataConquista) : ""}</span>
            </p>
            {m.origem && <p className="mt-0.5 text-[13px] text-muted">{m.origem}</p>}
          </div>
          <span className="num shrink-0 text-[14px] font-semibold text-gold-ink">+{m.pontos}</span>
        </div>
      ) : (
        <>
          <div className="mt-4 flex items-baseline justify-between gap-3">
            <span className="num text-[32px] font-semibold leading-none tracking-tight text-fg">
              {pct}
              <span className="text-lg font-medium text-muted">%</span>
            </span>
            <span className="num text-right text-[13px] text-muted">{textoProgresso(m)}</span>
          </div>
          {m.pendente && (
            <p
              className={clsx(
                "mt-3 flex items-start gap-2.5 rounded-control p-3 text-[14px] leading-snug text-fg",
                noSheet ? "bg-surface-2" : "bg-surface-3",
              )}
            >
              <Target className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
              {m.pendente}
            </p>
          )}
        </>
      )}
    </div>
  );
}
