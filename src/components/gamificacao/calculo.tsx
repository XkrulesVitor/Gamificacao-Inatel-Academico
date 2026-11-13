import { ArrowRight } from "lucide-react";
import { fmt1, fmtInt, fmtPct } from "@/lib/format";
import { MINHA_MATRICULA } from "@/lib/mock/gamificacao";
import { fatorPresenca, rankingBruto } from "@/lib/ranking";
import type { EntradaRanking } from "@/lib/types";

const nf2 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Termo({ valor, rotulo, forte }: { valor: React.ReactNode; rotulo: string; forte?: boolean }) {
  return (
    <span className="mt-[15px] flex flex-col items-center">
      <span className={`num text-[19px] leading-7 tracking-tight ${forte ? "font-semibold text-fg" : "text-fg"}`}>{valor}</span>
      <span className="text-[11px] leading-4 text-subtle">{rotulo}</span>
    </span>
  );
}

function Op({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className="mt-[15px] text-[17px] leading-7 text-subtle">
      {children}
    </span>
  );
}

/** Fórmula com os números do aluno: fração de verdade, fator de presença e o efeito da normalização. */
export function Calculo({ eu, geral }: { eu: EntradaRanking | undefined; geral: boolean }) {
  if (!eu) return null;
  const posBruta = rankingBruto().findIndex((a) => a.matricula === MINHA_MATRICULA) + 1;
  const mostrarBruto = geral && posBruta > 0;
  return (
    <div>
      <div
        role="math"
        aria-label={`(${fmtInt(eu.pontos)} pontos dividido por ${eu.creditos} créditos) vezes ${nf2.format(eu.fatorPresenca)} de presença${eu.peso !== 1 ? ` vezes peso ${fmt1(eu.peso)}` : ""}, igual a ${fmt1(eu.pontuacao)} pontos`}
        className="flex flex-wrap items-start justify-center gap-x-2 gap-y-2 rounded-control bg-surface-2 px-3 py-3.5"
      >
        <span className="flex flex-col items-center" aria-hidden>
          <span className="num text-[19px] leading-6 tracking-tight text-fg">{fmtInt(eu.pontos)}</span>
          <span className="my-1 h-px w-full min-w-11 bg-fg/50" />
          <span className="num text-[19px] leading-6 tracking-tight text-fg">{eu.creditos}</span>
          <span className="text-[11px] leading-4 text-subtle">pontos ÷ créditos</span>
        </span>
        <Op>×</Op>
        <Termo valor={nf2.format(eu.fatorPresenca)} rotulo="presença" />
        {eu.peso !== 1 && (
          <>
            <Op>×</Op>
            <Termo valor={fmt1(eu.peso)} rotulo="peso" />
          </>
        )}
        <span className="flex items-start gap-x-2">
          <Op>=</Op>
          <Termo valor={fmt1(eu.pontuacao)} rotulo="pts" forte />
        </span>
      </div>

      <dl className="mt-3 divide-y divide-line text-[13px]">
        <div className="flex items-center justify-between gap-3 py-2.5">
          <dt className="text-muted">Fator de presença</dt>
          <dd className="num text-fg">
            0,5 + {fmtPct(eu.presenca)} = <span className="font-semibold">{nf2.format(fatorPresenca(eu.presenca))}</span>
          </dd>
        </div>
        {mostrarBruto && (
          <div className="flex items-center justify-between gap-3 py-2.5">
            <dt className="text-muted">Sem normalização</dt>
            <dd className="num flex items-center gap-1.5 text-fg">
              <span className="text-muted">{posBruta}º</span>
              <ArrowRight className="size-3.5 text-subtle" strokeWidth={1.75} aria-label="para" />
              <span className="font-semibold">{eu.posicao}º</span>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
