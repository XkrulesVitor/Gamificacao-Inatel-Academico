import { Fragment } from "react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { Value } from "@/components/ui/primitives";
import { fmt1, fmtInt } from "@/lib/format";
import { MINHA_MATRICULA } from "@/lib/mock/gamificacao";
import { fatorPresenca, rankingBruto } from "@/lib/ranking";
import type { EntradaRanking } from "@/lib/types";

export function nomeCurto(nome: string): string {
  const p = nome.trim().split(/\s+/);
  return p.length > 1 ? `${p[0]} ${p[p.length - 1]}` : p[0];
}

const nf2 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function vizinhos(ranking: EntradaRanking[]) {
  const i = ranking.findIndex((e) => e.souEu);
  return { acima: ranking[i - 1], abaixo: ranking[i + 1] };
}

/** Número grande da posição, com total e pontuação. */
export function SuaPosicao({ eu, total, compacto }: { eu: EntradaRanking | undefined; total: number; compacto?: boolean }) {
  if (!eu) return <p className="text-sm text-muted">Sem posição neste filtro</p>;
  return (
    <div className="flex items-end justify-between gap-3">
      <p className="flex items-baseline gap-2">
        <span className={`num font-semibold leading-none text-fg ${compacto ? "text-4xl" : "text-5xl"}`}>{eu.posicao}º</span>
        <span className="num text-sm text-muted">de {total}</span>
      </p>
      <Value unit="pts" className={`font-semibold text-fg ${compacto ? "text-xl" : "text-2xl"}`}>
        {fmt1(eu.pontuacao)}
      </Value>
    </div>
  );
}

/** Quem está logo acima e logo abaixo, com a diferença de pontos. */
export function Disputa({ ranking, eu }: { ranking: EntradaRanking[]; eu: EntradaRanking | undefined }) {
  if (!eu) return null;
  const { acima, abaixo } = vizinhos(ranking);
  if (!acima && !abaixo) return null;
  return (
    <ul className="divide-y divide-line">
      {acima && (
        <li className="flex items-center gap-2.5 py-2.5">
          <ArrowUp className="size-4 shrink-0 text-muted" strokeWidth={1.75} aria-label="Acima" />
          <span className="min-w-0 flex-1 truncate text-sm text-fg">{nomeCurto(acima.aluno.nome)}</span>
          <span className="num text-sm font-semibold text-fg">+{fmt1(acima.pontuacao - eu.pontuacao)}</span>
        </li>
      )}
      {abaixo && (
        <li className="flex items-center gap-2.5 py-2.5">
          <ArrowDown className="size-4 shrink-0 text-muted" strokeWidth={1.75} aria-label="Abaixo" />
          <span className="min-w-0 flex-1 truncate text-sm text-fg">{nomeCurto(abaixo.aluno.nome)}</span>
          <span className="num text-sm font-semibold text-fg">−{fmt1(eu.pontuacao - abaixo.pontuacao)}</span>
        </li>
      )}
    </ul>
  );
}

type Termo = { v: string; l: string; forte?: boolean } | { op: string };

/** Fórmula como equação, com rótulo pequeno sob cada termo. */
export function Calculo({ eu, geral }: { eu: EntradaRanking | undefined; geral: boolean }) {
  if (!eu) return null;
  const termos: Termo[] = [
    { op: "(" },
    { v: fmtInt(eu.pontos), l: "pontos" },
    { op: "÷" },
    { v: fmtInt(eu.creditos), l: "créditos" },
    { op: ")" },
    { op: "×" },
    { v: nf2.format(fatorPresenca(eu.presenca)), l: "presença" },
    ...(eu.peso !== 1 ? ([{ op: "×" }, { v: fmt1(eu.peso), l: "peso" }] as Termo[]) : []),
    { op: "=" },
    { v: fmt1(eu.pontuacao), l: "pts", forte: true },
  ];
  const posBruta = rankingBruto().findIndex((a) => a.matricula === MINHA_MATRICULA) + 1;
  const mostrarBruto = geral && posBruta > 0;
  return (
    <div>
      <div className="flex flex-wrap items-start gap-x-1 gap-y-2" role="math" aria-label="Cálculo da pontuação">
        {termos.map((t, i) =>
          "op" in t ? (
            <span key={i} className="text-[16px] leading-6 text-subtle">
              {t.op}
            </span>
          ) : (
            <Fragment key={i}>
              <span className="flex flex-col items-center">
                <span className={`num text-[16px] leading-6 ${t.forte ? "font-semibold text-fg" : "text-fg"}`}>{t.v}</span>
                <span className="text-[11px] leading-4 text-subtle">{t.l}</span>
              </span>
            </Fragment>
          ),
        )}
      </div>
      {mostrarBruto && (
        <p className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[13px] text-muted">
          Sem normalização
          <span className="num flex items-center gap-1.5 font-semibold text-fg">
            {posBruta}º
            <ArrowRight className="size-3.5 text-muted" strokeWidth={1.75} aria-label="para" />
            {eu.posicao}º
          </span>
        </p>
      )}
    </div>
  );
}
