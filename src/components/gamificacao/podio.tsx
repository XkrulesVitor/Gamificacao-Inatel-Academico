"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import { metalPorPosicao, MoedaMetal } from "@/components/gamificacao/metal";
import { nomeCurto } from "@/components/gamificacao/posicao-heroi";
import { fmt1 } from "@/lib/format";
import type { EntradaRanking } from "@/lib/types";

/** Ordem visual do pódio: 2º, 1º, 3º. O 1º fica um degrau acima, sem blocos esticados. */
const ORDEM = [1, 0, 2];

/** Top 3 em cartões compactos com moeda de metal. */
export function Podio({ entradas }: { entradas: EntradaRanking[] }) {
  const reduzir = useReducedMotion();
  const top = entradas.slice(0, 3);
  if (top.length === 0) return null;
  return (
    <ol aria-label="Top 3" className="grid grid-cols-3 items-end gap-2 sm:gap-3">
      {ORDEM.filter((i) => top[i]).map((i) => {
        const e = top[i];
        const pos = e.posicao as 1 | 2 | 3;
        const primeiro = pos === 1;
        return (
          <li
            key={pos}
            className={clsx(
              "relative flex min-w-0 flex-col items-center rounded-card border bg-surface-1 px-2 pb-3 text-center shadow-card sm:px-3",
              primeiro ? "pt-5 sm:pt-6" : "pt-3.5 sm:pt-4",
              e.souEu ? "border-accent/60 ring-1 ring-accent/40" : "border-line",
            )}
          >
            <motion.span
              key={e.aluno.matricula}
              initial={reduzir ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex w-full min-w-0 flex-col items-center"
            >
              <MoedaMetal
                raridade={metalPorPosicao[pos]}
                className={primeiro ? "size-11 text-lg sm:size-12" : "size-9 text-[15px] sm:size-10"}
              >
                {pos}
              </MoedaMetal>
              <span className="mt-2 line-clamp-2 min-h-[2.5em] text-[13px] sm:min-h-0 font-medium leading-tight text-fg sm:text-sm">
                {e.souEu ? "Você" : nomeCurto(e.aluno.nome)}
              </span>
              <span className="mt-0.5 hidden truncate text-xs text-subtle sm:block">
                {e.aluno.curso} · {e.aluno.periodo}º período
              </span>
              <span className="num mt-1.5 text-base font-semibold tracking-tight text-fg sm:text-lg">
                {fmt1(e.pontuacao)}
                <span className="ml-0.5 text-[11px] font-medium text-muted">pts</span>
              </span>
            </motion.span>
          </li>
        );
      })}
    </ol>
  );
}
