"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { pontosPorRaridade, raridadeLabel } from "@/lib/mock/gamificacao";
import type { Raridade } from "@/lib/types";
import { RaridadeChip } from "./medalha-badge";

const raridades: Raridade[] = ["bronze", "prata", "ouro", "platina"];

const comoGanhar = [
  "Ser assíduo nas aulas e nos laboratórios (presença e sequências sem falta).",
  "Entregar relatórios e atividades no prazo.",
  "Alcançar boas notas e um CR de destaque.",
  "Participar de monitorias e ajudar colegas em trabalhos em grupo.",
  "Subir no ranking normalizado do curso ou geral.",
];

/** Ajuda "Como funcionam as medalhas" (heurística 10 de Nielsen). */
export function AjudaMedalhasSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Como funcionam as medalhas">
      <p className="text-[15px] leading-snug text-muted">
        Cada medalha tem uma regra clara. Toque em qualquer uma para ver seu progresso e o que falta para desbloquear.
      </p>

      <h3 className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Raridades e pontos
      </h3>
      <ul className="overflow-hidden rounded-xl border border-line bg-surface-1">
        {raridades.map((r) => (
          <li key={r} className="flex items-center justify-between border-b border-line px-3.5 py-3 last:border-b-0">
            <RaridadeChip raridade={r}>{raridadeLabel[r]}</RaridadeChip>
            <span className="text-[15px] font-bold text-gold">+{pontosPorRaridade[r]} pts</span>
          </li>
        ))}
      </ul>

      <h3 className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Como ganhar pontos
      </h3>
      <ul className="space-y-2">
        {comoGanhar.map((t) => (
          <li key={t} className="flex gap-2 text-[15px] leading-snug text-fg">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
            {t}
          </li>
        ))}
      </ul>

      <p className="mt-4 rounded-xl bg-surface-3/60 p-3 text-sm leading-snug text-muted">
        Medalhas em tons de cinza com cadeado ainda estão bloqueadas; as coloridas já são suas.
      </p>
    </BottomSheet>
  );
}
