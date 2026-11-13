"use client";

import clsx from "clsx";
import { EyeOff } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePrefs } from "@/components/configuracoes/prefs";
import { Avatar, Badge, Value } from "@/components/ui/primitives";
import { fmt1, fmtInt, fmtPct, iniciais } from "@/lib/format";
import type { EntradaRanking } from "@/lib/types";

const colunas = "grid-cols-[28px_32px_minmax(0,1fr)_auto] xl:grid-cols-[32px_32px_minmax(0,1fr)_88px_80px_72px_104px]";

/** Lista de posições (linhas, sem cards). Reordena com animação curta ao trocar o filtro. */
export function ListaRanking({ entradas }: { entradas: EntradaRanking[] }) {
  const { prefs } = usePrefs();
  const reduzir = useReducedMotion();
  return (
    <div role="table" aria-label="Ranking">
      <div role="row" className={clsx("hidden gap-3 border-b border-line px-3 pb-2 text-xs text-subtle xl:grid", colunas)}>
        <span role="columnheader">Pos.</span>
        <span role="columnheader" className="col-span-2">
          Aluno
        </span>
        <span role="columnheader" className="text-right">
          Pontos
        </span>
        <span role="columnheader" className="text-right">
          Créditos
        </span>
        <span role="columnheader" className="text-right">
          Labs
        </span>
        <span role="columnheader" className="text-right">
          Pontuação
        </span>
      </div>
      <div role="rowgroup" className="relative">
        <AnimatePresence initial={false} mode="popLayout">
          {entradas.map((e) => (
            <motion.div
              key={e.aluno.matricula}
              role="row"
              layout={reduzir ? false : "position"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={clsx(
                "grid min-h-[56px] items-center gap-3 px-3 py-2",
                colunas,
                e.souEu
                  ? "relative z-[1] rounded-control bg-accent/10 ring-1 ring-inset ring-accent/40"
                  : "border-b border-line transition-colors duration-150 hover:bg-surface-1",
              )}
            >
              <span role="cell" className={clsx("num text-sm", e.souEu ? "font-semibold text-fg" : "text-muted")}>
                {e.posicao}º
              </span>
              <span role="cell">
                <Avatar label={iniciais(e.aluno.nome)} eu={e.souEu} size="sm" />
              </span>
              <span role="cell" className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="truncate text-[15px] font-medium text-fg">{e.aluno.nome}</span>
                  {e.souEu && !prefs.exibirNome && (
                    <EyeOff className="size-4 shrink-0 text-subtle" strokeWidth={1.75} aria-label="Nome oculto para colegas" />
                  )}
                </span>
                <span className="flex min-w-0 items-center gap-1.5 text-xs text-subtle">
                  {e.souEu && (
                    <Badge tone="accent" className="h-[18px] px-1.5 text-[11px]">
                      Você
                    </Badge>
                  )}
                  <span className="truncate">
                    {e.aluno.curso} · {e.aluno.periodo}º período
                  </span>
                </span>
              </span>
              <span role="cell" className="num hidden text-right text-sm text-muted xl:block">
                {fmtInt(e.pontos)}
              </span>
              <span role="cell" className="num hidden text-right text-sm text-muted xl:block">
                {e.creditos}
              </span>
              <span role="cell" className="num hidden text-right text-sm text-muted xl:block">
                {fmtPct(e.presenca)}
              </span>
              <span role="cell" className="text-right">
                <Value unit="pts" className="text-[15px] font-semibold text-fg">
                  {fmt1(e.pontuacao)}
                </Value>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
