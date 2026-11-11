"use client";

import { CheckCircle2, Target } from "lucide-react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Pill, ProgressBar } from "@/components/ui/primitives";
import { fmtData } from "@/lib/format";
import type { Medalha } from "@/lib/types";
import { MedalBadge, RaridadeChip, estiloRaridade, percentual, textoProgresso } from "./medalha-badge";
import { raridadeLabel } from "@/lib/mock/gamificacao";

/** Cartão explicativo da medalha (HTA: progresso percentual + regra pendente). */
export function MedalhaSheet({
  medalha,
  open,
  onClose,
}: {
  medalha: Medalha | null;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title={medalha?.nome ?? "Medalha"} hideTitle>
      {medalha && <Conteudo m={medalha} />}
    </BottomSheet>
  );
}

function Conteudo({ m }: { m: Medalha }) {
  const pct = percentual(m);
  const bloqueada = !m.desbloqueada;
  const tom = m.raridade === "ouro" ? "gold" : m.raridade === "platina" ? "platinum" : "brand";

  return (
    <div className="pb-2">
      <div className="flex flex-col items-center text-center">
        <div className="animate-pop">
          <MedalBadge medalha={m} size="lg" />
        </div>
        <h3 className="mt-3 text-xl font-bold text-fg">{m.nome}</h3>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-muted">
          {bloqueada ? "Medalha bloqueada" : "Medalha conquistada"}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          <RaridadeChip raridade={m.raridade}>{raridadeLabel[m.raridade]}</RaridadeChip>
          <Pill>{m.categoria}</Pill>
          <Pill tone="xp">+{m.pontos} pts</Pill>
        </div>
        <p className="mt-3 text-[15px] leading-snug text-muted">{m.descricao}</p>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-surface-1 p-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Regra de desbloqueio</p>
        <p className="mt-1 text-[15px] leading-snug text-fg">{m.requisito}</p>
      </div>

      <div className="mt-3 rounded-xl border border-line bg-surface-1 p-3.5">
        <div className="flex items-end justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Progresso</p>
          <p className={`text-3xl font-extrabold leading-none ${bloqueada ? "text-fg" : estiloRaridade[m.raridade].texto}`}>
            {pct}%
          </p>
        </div>
        <ProgressBar
          className="mt-2.5 h-2.5"
          value={pct}
          max={100}
          tone={bloqueada ? tom : "success"}
          label={`Progresso de ${m.nome}`}
        />
        <p className="mt-2 text-sm text-muted">{textoProgresso(m)}</p>
      </div>

      {bloqueada && m.pendente && (
        <div className="mt-3 rounded-xl border border-warning/40 bg-warning/10 p-3.5">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-warning">
            <Target className="size-3.5" aria-hidden /> O que falta
          </p>
          <p className="mt-1 text-[15px] leading-snug text-fg">{m.pendente}</p>
        </div>
      )}

      {!bloqueada && (
        <div className="mt-3 rounded-xl border border-success/40 bg-success/10 p-3.5">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-success">
            <CheckCircle2 className="size-3.5" aria-hidden /> Conquistada
          </p>
          <p className="mt-1 text-[15px] leading-snug text-fg">
            {m.dataConquista ? `Em ${fmtData(m.dataConquista)}` : "Conquistada"}
            {m.origem ? ` · ${m.origem}` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
