import clsx from "clsx";
import { CalendarCheck, Target } from "lucide-react";
import { MedalEmblem } from "@/components/gamificacao/medal-emblem";
import { ProgressBar } from "@/components/ui/primitives";
import { fmtData } from "@/lib/format";
import { raridadeLabel } from "@/lib/mock/gamificacao";
import type { Medalha } from "@/lib/types";

const nf = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

export function percentual(m: Medalha): number {
  if (m.desbloqueada) return 100;
  const p = Math.floor((m.progresso.atual / m.progresso.meta) * 100);
  return Math.max(0, Math.min(99, p));
}

/** Texto "33 de 34 aulas de lab". Unidades que começam com "de" ficam depois dos números. */
function textoProgresso(m: Medalha): string {
  const { atual, meta, unidade } = m.progresso;
  return `${nf.format(atual)} de ${nf.format(meta)} ${unidade.replace(/^de /, "")}`;
}

/** Detalhe da medalha. Usado no painel lateral (desktop) e no bottom sheet (mobile). */
export function MedalDetail({ medalha: m, noSheet }: { medalha: Medalha; noSheet?: boolean }) {
  const pct = percentual(m);
  return (
    <div>
      <div className="flex items-center gap-4">
        <MedalEmblem raridade={m.raridade} icone={m.icone} bloqueada={!m.desbloqueada} size={88} />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight text-fg">{m.nome}</h3>
          <p className="mt-1 text-[13px] text-muted">
            {raridadeLabel[m.raridade]} · {m.categoria} · <span className="num">{m.pontos} pts</span>
          </p>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-snug text-fg">{m.requisito}</p>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className={clsx("num text-3xl font-semibold leading-none", m.desbloqueada ? "text-gold" : "text-fg")}>
            {pct}%
          </span>
          <span className="num text-right text-[13px] text-muted">{textoProgresso(m)}</span>
        </div>
        <ProgressBar
          value={pct}
          max={100}
          tone="accent"
          label={`Progresso da medalha ${m.nome}`}
          className="mt-2.5 bg-surface-4"
        />
      </div>

      {m.desbloqueada ? (
        <p className="mt-4 flex items-start gap-2 text-[13px] text-muted">
          <CalendarCheck className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
          <span>
            <span className="num">{m.dataConquista ? fmtData(m.dataConquista) : ""}</span>
            {m.origem ? ` · ${m.origem}` : ""}
          </span>
        </p>
      ) : (
        m.pendente && (
          <p
            className={clsx(
              "mt-4 flex items-start gap-2.5 rounded-control p-3 text-[14px] leading-snug text-fg",
              noSheet ? "bg-surface-2" : "bg-surface-3",
            )}
          >
            <Target className="mt-0.5 size-4 shrink-0 text-muted" strokeWidth={1.75} aria-hidden />
            {m.pendente}
          </p>
        )
      )}
    </div>
  );
}
