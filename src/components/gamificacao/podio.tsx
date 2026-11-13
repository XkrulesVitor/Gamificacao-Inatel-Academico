"use client";

import clsx from "clsx";
import { Crown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { metalPorPosicao, MoedaMetal } from "@/components/gamificacao/metal";
import { nomeCurto } from "@/components/gamificacao/posicao-heroi";
import { fmt1 } from "@/lib/format";
import type { EntradaRanking } from "@/lib/types";

/** Ordem visual do pódio: 2º, 1º, 3º. */
const ORDEM = [1, 0, 2];

/**
 * Top 3 em cartões compactos com moeda de metal. O 1º é mais alto, tem coroa, moeda maior
 * e um véu dourado leve no fundo e na borda; 2º e 3º ficam neutros. Nada de blocos com degradê.
 */
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
              "relative flex min-w-0 flex-col items-center rounded-card border px-2 text-center sm:px-3",
              primeiro
                ? "bg-[color-mix(in_oklab,var(--gold)_7%,var(--surface-1))] pb-4 pt-3 shadow-pop dark:bg-[color-mix(in_oklab,var(--gold)_9%,var(--surface-1))] sm:pb-5"
                : "bg-surface-1 pb-3 pt-3.5 shadow-card sm:pt-4",
              e.souEu
                ? "border-accent/60 ring-1 ring-accent/40"
                : primeiro
                  ? "border-gold/45"
                  : "border-line",
            )}
          >
            <motion.span
              key={e.aluno.matricula}
              initial={reduzir ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex w-full min-w-0 flex-col items-center"
            >
              {primeiro && <Crown className="mb-1 size-4 text-gold-ink sm:size-[18px]" strokeWidth={1.75} aria-label="Primeiro lugar" />}
              <MoedaMetal
                raridade={metalPorPosicao[pos]}
                className={primeiro ? "size-12 text-xl sm:size-14 sm:text-[22px]" : "size-9 text-[15px] sm:size-10"}
              >
                {pos}
              </MoedaMetal>
              <span
                className={clsx(
                  "mt-2 line-clamp-2 min-h-[2.5em] text-[13px] leading-tight text-fg sm:min-h-0 sm:text-sm",
                  primeiro ? "font-semibold" : "font-medium",
                )}
              >
                {e.souEu ? "Você" : nomeCurto(e.aluno.nome)}
              </span>
              <span className="mt-0.5 hidden truncate text-xs text-subtle sm:block">
                {e.aluno.curso} · {e.aluno.periodo}º período
              </span>
              <span
                className={clsx(
                  "num mt-1.5 font-semibold tracking-tight text-fg",
                  primeiro ? "text-lg sm:text-[22px]" : "text-base sm:text-lg",
                )}
              >
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
