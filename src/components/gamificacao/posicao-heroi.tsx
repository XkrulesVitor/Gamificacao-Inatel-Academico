"use client";

import clsx from "clsx";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { GraficoEvolucao } from "@/components/gamificacao/grafico-evolucao";
import { Avatar } from "@/components/ui/primitives";
import { fmt1, iniciais } from "@/lib/format";
import { evolucaoRanking } from "@/lib/mock/gamificacao";
import { useCountUp } from "@/lib/use-count-up";
import type { EntradaRanking } from "@/lib/types";

export function nomeCurto(nome: string): string {
  const p = nome.trim().split(/\s+/);
  return p.length > 1 ? `${p[0]} ${p[p.length - 1]}` : p[0];
}

/** Variação da última semana do ranking geral (S11 para S12). */
function variacao(): number {
  const n = evolucaoRanking.length;
  if (n < 2) return 0;
  return evolucaoRanking[n - 2].posicao - evolucaoRanking[n - 1].posicao;
}

function Variacao() {
  const v = variacao();
  if (v === 0)
    return (
      <span className="inline-flex h-7 items-center gap-1 rounded-full bg-surface-3 px-2.5 text-[13px] font-medium text-muted">
        <Minus className="size-3.5" strokeWidth={2} aria-hidden />
        Estável
      </span>
    );
  const subiu = v > 0;
  return (
    <span
      className={clsx(
        "inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-[13px] font-semibold",
        subiu ? "bg-success/12 text-success" : "bg-surface-3 text-muted",
      )}
    >
      {subiu ? <ArrowUp className="size-3.5" strokeWidth={2.25} aria-hidden /> : <ArrowDown className="size-3.5" strokeWidth={2.25} aria-hidden />}
      {subiu ? "Subiu" : "Caiu"} <span className="num">{Math.abs(v)}</span>
      <span className="font-normal opacity-80">desde S11</span>
    </span>
  );
}

function LinhaDisputa({ e }: { e: EntradaRanking }) {
  return (
    <li
      className={clsx(
        "flex h-11 items-center gap-3 rounded-control px-2.5",
        e.souEu && "bg-accent/10 ring-1 ring-inset ring-accent/35",
      )}
    >
      <span className={clsx("num w-6 text-sm", e.souEu ? "font-semibold text-fg" : "text-muted")}>{e.posicao}º</span>
      <Avatar label={iniciais(e.aluno.nome)} eu={e.souEu} size="sm" className="!size-7 !text-[11px]" />
      <span className={clsx("min-w-0 flex-1 truncate text-sm text-fg", e.souEu && "font-semibold")}>
        {e.souEu ? "Você" : nomeCurto(e.aluno.nome)}
      </span>
      <span className={clsx("num text-sm", e.souEu ? "font-semibold text-fg" : "text-muted")}>{fmt1(e.pontuacao)}</span>
    </li>
  );
}

function VaoDisputa({ texto, valor, cima }: { texto: string; valor: number; cima?: boolean }) {
  return (
    <li className="flex h-6 items-center gap-2 pl-[22px] text-xs text-muted">
      <span className="h-full w-px bg-line-strong" aria-hidden />
      {cima ? (
        <ArrowUp className="size-3 text-accent" strokeWidth={2.25} aria-hidden />
      ) : (
        <ArrowDown className="size-3 text-subtle" strokeWidth={2.25} aria-hidden />
      )}
      <span>
        <span className="num font-semibold text-fg">{fmt1(valor)} pts</span> {texto}
      </span>
    </li>
  );
}

/** Escada da disputa: quem está acima, você e quem está abaixo, com a distância entre cada um. */
function Disputa({ ranking, eu }: { ranking: EntradaRanking[]; eu: EntradaRanking }) {
  const i = ranking.findIndex((e) => e.souEu);
  const acima = ranking[i - 1];
  const abaixo = ranking[i + 1];
  return (
    <ol aria-label="Disputa">
      {acima ? (
        <>
          <LinhaDisputa e={acima} />
          <VaoDisputa cima texto="para passar" valor={acima.pontuacao - eu.pontuacao} />
        </>
      ) : (
        <li className="flex h-8 items-center px-2.5 text-xs font-medium text-gold-ink">Você lidera</li>
      )}
      <LinhaDisputa e={eu} />
      {abaixo && (
        <>
          <VaoDisputa texto="de vantagem" valor={eu.pontuacao - abaixo.pontuacao} />
          <LinhaDisputa e={abaixo} />
        </>
      )}
    </ol>
  );
}

/** Todas as pontuações do filtro numa régua: o Top 3 em dourado, você em azul. */
function FaixaPontuacao({ ranking }: { ranking: EntradaRanking[] }) {
  if (ranking.length < 2) return null;
  const max = ranking[0].pontuacao;
  const min = ranking[ranking.length - 1].pontuacao;
  const x = (v: number) => (max === min ? 50 : ((v - min) / (max - min)) * 100);
  const eu = ranking.find((e) => e.souEu);
  const corte = ranking[Math.min(2, ranking.length - 1)].pontuacao;
  return (
    <div className="pt-2">
      <div className="relative mx-2 h-[76px]">
        <div
          aria-hidden
          className="absolute inset-y-[22px] rounded-control bg-gold/12 ring-1 ring-inset ring-gold/25"
          style={{ left: `${x(corte)}%`, right: 0 }}
        />
        <span
          className="absolute top-0 -translate-x-full whitespace-nowrap pr-1 text-[11px] font-medium text-gold-ink"
          style={{ left: "100%" }}
        >
          Top 3
        </span>
        <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
        {[...ranking].reverse().map((e) => (
          <span
            key={e.aluno.matricula}
            aria-hidden
            className={clsx(
              "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
              e.souEu
                ? "z-[2] size-3.5 bg-accent ring-4 ring-accent/20"
                : e.posicao <= 3
                  ? "z-[1] size-2.5 bg-gold ring-2 ring-surface-1"
                  : "size-2 bg-subtle ring-2 ring-surface-1",
            )}
            style={{ left: `${x(e.pontuacao)}%` }}
          />
        ))}
        {eu && (
          <span
            className="absolute bottom-0 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-fg"
            style={{ left: `${Math.min(88, Math.max(12, x(eu.pontuacao)))}%` }}
          >
            Você
          </span>
        )}
      </div>
      <div className="num mt-1 flex justify-between text-[11px] text-subtle">
        <span>{fmt1(min)}</span>
        <span>{fmt1(max)}</span>
      </div>
    </div>
  );
}

/** Herói do Ranking: posição contando (do fim da lista até a sua), variação, evolução e disputa. */
export function PosicaoHeroi({
  ranking,
  eu,
  geral,
  contexto,
}: {
  ranking: EntradaRanking[];
  eu: EntradaRanking | undefined;
  geral: boolean;
  contexto: string;
}) {
  const total = ranking.length;
  const subida = useCountUp(eu ? total - eu.posicao : 0, 0.8);
  const pontuacao = useCountUp(eu?.pontuacao ?? 0, 0.8);

  if (!eu)
    return (
      <section className="rounded-card border border-line bg-surface-1 p-5 text-sm text-muted shadow-card">
        Sem posição neste filtro
      </section>
    );

  const posicao = Math.round(total - subida);

  return (
    <section
      aria-label="Sua posição"
      className={clsx(
        "grid gap-5 rounded-card border border-line bg-surface-1 p-4 shadow-card sm:p-5 xl:gap-0 xl:p-6",
        "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px]",
      )}
    >
      <div className="min-w-0 xl:pr-6">
        <h2 className="text-[15px] font-semibold text-fg">Sua posição</h2>
        <div className="mt-2 flex items-end justify-between gap-3 xl:block">
          <p className="flex items-baseline gap-2">
            <span className="num text-[56px] font-semibold leading-[0.9] tracking-[-0.03em] text-fg lg:text-[64px]">
              {posicao}
              <span className="text-[0.55em] tracking-normal">º</span>
            </span>
            <span className="num text-sm text-muted">de {total}</span>
          </p>
          <p className="num whitespace-nowrap text-right xl:mt-3 xl:text-left">
            <span className="text-2xl font-semibold tracking-tight text-fg">{fmt1(pontuacao)}</span>
            <span className="ml-1 text-[13px] font-medium text-muted">pts</span>
          </p>
        </div>
        <div className="mt-3">{geral ? <Variacao /> : <p className="text-[13px] text-muted">{contexto}</p>}</div>
      </div>

      <div className="min-w-0 border-t border-line pt-4 md:border-t-0 md:pt-0 xl:border-l xl:px-6">
        {geral ? (
          <>
            <h3 className="text-[13px] font-medium text-muted">Evolução no geral</h3>
            <div className="mt-1">
              <GraficoEvolucao dados={evolucaoRanking} />
            </div>
          </>
        ) : (
          <>
            <h3 className="text-[13px] font-medium text-muted">Pontuação no filtro</h3>
            <FaixaPontuacao ranking={ranking} />
          </>
        )}
      </div>

      <div
        className={clsx(
          "min-w-0 border-t border-line pt-4 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0",
          "md:col-span-2 xl:col-span-1",
        )}
      >
        <h3 className="mb-2 text-[13px] font-medium text-muted">Disputa</h3>
        <Disputa ranking={ranking} eu={eu} />
      </div>
    </section>
  );
}
