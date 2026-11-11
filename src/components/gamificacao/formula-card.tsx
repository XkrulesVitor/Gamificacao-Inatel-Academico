"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calculator, ChevronDown } from "lucide-react";
import { fmt1, fmtInt } from "@/lib/format";
import { FORMULA_TEXTO } from "@/lib/ranking";
import type { EntradaRanking } from "@/lib/types";

const nf2 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nfPeso = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });

/** Card expansível "Como é calculado" com a conta do próprio aluno no filtro atual. */
export function FormulaCard({ eu }: { eu?: EntradaRanking }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();

  return (
    <div className="rounded-card border border-line bg-surface-1">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls={id}
        className="flex min-h-12 w-full items-center gap-3 rounded-card px-3.5 py-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <Calculator className="size-5 shrink-0 text-xp" aria-hidden />
        <span className="flex-1 text-[15px] font-semibold text-fg">Como é calculado</span>
        <ChevronDown className={`size-5 text-muted transition-transform ${aberto ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-3.5 pb-3.5">
              <p className="rounded-xl bg-surface-3/60 p-3 text-sm font-medium leading-snug text-fg">{FORMULA_TEXTO}</p>
              {eu && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Seu cálculo</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-fg">
                    ({fmtInt(eu.pontos)} ÷ {eu.creditos}) × {nf2.format(eu.fatorPresenca)}
                    {eu.peso !== 1 && <> × {nfPeso.format(eu.peso)} (peso do lab)</>} ={" "}
                    <strong className="text-lg font-extrabold text-gold">{fmt1(eu.pontuacao)}</strong>
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Fator de presença: 0,50 + {Math.round(eu.presenca * 100)}% de presença em labs (varia de 0,50 a 1,50).
                  </p>
                </div>
              )}
              <p className="text-sm leading-snug text-muted">
                <strong className="font-semibold text-fg">Por que é justo?</strong> Dividir pelos créditos evita
                favorecer quem cursa mais matérias, e o fator de presença dá peso maior à assiduidade nos laboratórios.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
