"use client";

import clsx from "clsx";
import { Crown, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, Badge, Value } from "@/components/ui/primitives";
import { usePrefs } from "@/components/configuracoes/prefs";
import { fmt1, fmtInt, fmtPct, iniciais } from "@/lib/format";
import type { EntradaRanking } from "@/lib/types";

const metais = {
  1: "text-gold ring-gold",
  2: "text-silver ring-silver",
  3: "text-bronze ring-bronze",
} as const;

const colunas =
  "grid-cols-[28px_36px_minmax(0,1fr)_auto] xl:grid-cols-[28px_36px_minmax(0,1fr)_96px_96px_80px_110px]";

/** Lista de posições (linhas, sem cards). Reordena com animação curta ao trocar o filtro. */
export function ListaRanking({ entradas }: { entradas: EntradaRanking[] }) {
  const { prefs } = usePrefs();
  return (
    <div role="table" aria-label="Ranking">
      <div
        role="row"
        className={clsx("hidden gap-3 border-b border-line px-3 pb-2 text-xs text-subtle xl:grid", colunas)}
      >
        <span role="columnheader">Pos.</span>
        <span role="columnheader" className="sr-only">
          Aluno
        </span>
        <span role="columnheader" className="col-start-3">
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
      <div role="rowgroup">
        {entradas.map((e) => (
          <motion.div
            key={e.aluno.matricula}
            role="row"
            layout="position"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={clsx(
              "grid min-h-[56px] items-center gap-3 rounded-lg px-3 py-2",
              colunas,
              e.souEu
                ? "bg-accent/10 ring-1 ring-accent/40"
                : clsx("border-b border-line hover:bg-surface-1", e.posicao <= 3 && "bg-surface-1"),
            )}
          >
            <span role="cell">
              {e.posicao <= 3 ? (
                <span
                  className={clsx(
                    "num grid size-7 place-items-center rounded-full text-[13px] font-semibold ring-1",
                    metais[e.posicao as 1 | 2 | 3],
                  )}
                >
                  {e.posicao}
                </span>
              ) : (
                <span className="num text-sm text-muted">{e.posicao}</span>
              )}
            </span>
            <span role="cell">
              <Avatar label={iniciais(e.aluno.nome)} eu={e.souEu} size="sm" />
            </span>
            <span role="cell" className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="truncate text-[15px] font-medium text-fg">{e.aluno.nome}</span>
                {e.posicao === 1 && <Crown className="size-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-label="Primeiro lugar" />}
                {e.souEu && <Badge tone="accent">Você</Badge>}
                {e.souEu && !prefs.exibirNome && (
                  <EyeOff
                    className="size-4 shrink-0 text-subtle"
                    strokeWidth={1.75}
                    aria-label="Nome oculto para colegas"
                  />
                )}
              </span>
              <span className="block truncate text-xs text-subtle">
                {e.aluno.curso} · {e.aluno.periodo}º período
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
      </div>
    </div>
  );
}
