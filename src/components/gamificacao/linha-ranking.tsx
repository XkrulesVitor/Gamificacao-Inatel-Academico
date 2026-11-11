"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { EyeOff } from "lucide-react";
import { usePrefs } from "@/components/configuracoes/prefs";
import { Avatar } from "@/components/ui/primitives";
import { fmt1, fmtInt, fmtPct, iniciais } from "@/lib/format";
import type { EntradaRanking } from "@/lib/types";

/** Linha do ranking; a do usuário recebe destaque forte (borda/fundo brand + selo "Você"). */
export function LinhaRanking({ e }: { e: EntradaRanking }) {
  const { prefs } = usePrefs();
  const oculto = e.souEu && !prefs.exibirNome;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      data-eu={e.souEu ? "true" : undefined}
      aria-current={e.souEu ? "true" : undefined}
      className={clsx(
        "flex scroll-mb-24 scroll-mt-16 items-center gap-3 rounded-card border px-3 py-2.5",
        e.souEu ? "border-brand bg-brand/15 ring-1 ring-brand" : "border-line bg-surface-1",
      )}
    >
      <span className={clsx("w-7 shrink-0 text-center text-base font-bold", e.souEu ? "text-fg" : "text-muted")}>
        {e.posicao}º
      </span>
      <Avatar label={iniciais(e.aluno.nome)} color={e.aluno.avatarCor} />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5">
          <span className="truncate text-[15px] font-semibold text-fg">{e.aluno.nome}</span>
          {e.souEu && (
            <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-white">Você</span>
          )}
        </p>
        {oculto && (
          <p className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-surface-3 px-2 py-0.5 text-[11px] text-muted">
            <EyeOff className="size-3" aria-hidden /> Nome oculto para colegas
          </p>
        )}
        <p className="text-xs text-muted">
          {e.aluno.curso} · {e.aluno.periodo}º período
        </p>
        <p className="text-[11px] text-subtle">
          <span className="text-muted">
            {fmtInt(e.pontos)} pts · {e.creditos} cr · {fmtPct(e.presenca)} labs
          </span>
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className={clsx("text-xl font-extrabold leading-tight", e.souEu ? "text-fg" : "text-gold")}>
          {fmt1(e.pontuacao)}
        </p>
        <p className="text-[11px] text-muted">pts pond.</p>
      </div>
    </motion.li>
  );
}
