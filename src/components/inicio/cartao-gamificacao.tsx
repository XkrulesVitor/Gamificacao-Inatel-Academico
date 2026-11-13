"use client";

import { useId } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUp, Medal, Minus, Trophy } from "lucide-react";
import { MedalEmblem } from "@/components/gamificacao/medal-emblem";
import { fmtInt, fmtPct } from "@/lib/format";
import { carregarRanking, meusPontos, minhaEntrada, nivelPorPontos } from "@/lib/ranking";
import { useCountUp } from "@/lib/use-count-up";
import { medalhaMaisPerto, variacaoSemana } from "./dados";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Anel de nível: o ouro completa até o progresso para o próximo nível. */
function AnelNivel({ numero, progresso }: { numero: number; progresso: number }) {
  const reduzir = useReducedMotion();
  const gid = useId();
  const r = 27;
  const c = 2 * Math.PI * r;
  const final = c * (1 - progresso);
  return (
    <span className="relative grid size-16 shrink-0 place-items-center" aria-hidden>
      <svg viewBox="0 0 64 64" className="absolute inset-0 size-16 -rotate-90">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--gold)" }} />
            <stop offset="1" style={{ stopColor: "color-mix(in oklab, var(--gold) 70%, white)" }} />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduzir ? final : c }}
          animate={{ strokeDashoffset: final }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        />
      </svg>
      <span className="num text-[22px] font-semibold tracking-tight text-on-header">{numero}</span>
    </span>
  );
}

/** Ondas concêntricas discretas (Inatel, telecomunicações) no canto do bloco azul. */
function Ondas() {
  return (
    <svg aria-hidden viewBox="0 0 200 160" className="pointer-events-none absolute -right-10 -top-12 h-48 w-60 text-white">
      {[36, 64, 92, 120, 148].map((r, i) => (
        <circle key={r} cx="170" cy="20" r={r} fill="none" stroke="currentColor" strokeOpacity={0.09 - i * 0.012} strokeWidth="1" />
      ))}
    </svg>
  );
}

const botao =
  "inline-flex h-11 items-center justify-center gap-2 rounded-control border border-line-strong bg-surface-2 text-sm font-medium text-fg transition-[background-color,border-color,transform] duration-150 hover:border-subtle/50 hover:bg-surface-3 active:scale-[0.98]";

/** Resumo da gamificação na Início: nível, pontos, posição com a variação da semana e próxima medalha. */
export function CartaoGamificacao() {
  const pontos = meusPontos();
  const { atual, proximo } = nivelPorPontos(pontos);
  const progresso = proximo ? Math.min(1, pontos / proximo.minimo) : 1;
  const ranking = carregarRanking();
  const eu = minhaEntrada(ranking);
  const variacao = variacaoSemana();
  const medalha = medalhaMaisPerto();
  const contados = useCountUp(pontos, 1.1);

  const Seta = !variacao || variacao.delta === 0 ? Minus : variacao.delta > 0 ? ArrowUp : ArrowDown;

  return (
    <section aria-label="Conquistas e ranking" className="overflow-hidden rounded-card border border-line bg-surface-1 shadow-card">
      <div className="relative overflow-hidden bg-gradient-to-br from-header to-header-2 px-5 pb-5 pt-5">
        <Ondas />
        <div className="relative flex items-center gap-4">
          <AnelNivel numero={atual.numero} progresso={progresso} />
          <div className="min-w-0">
            <p className="truncate text-[13px] text-on-header-muted">
              Nível {atual.numero} · {atual.titulo}
            </p>
            <p className="mt-0.5 flex items-baseline gap-1.5 text-on-header">
              <span className="num text-[34px] font-semibold leading-none tracking-tight">{fmtInt(Math.round(contados))}</span>
              <span className="text-sm font-medium text-on-header-muted">pts</span>
            </p>
            {proximo && (
              <p className="num mt-1.5 text-[13px] text-on-header-muted">
                {fmtInt(proximo.minimo - pontos)} pts para o nível {proximo.numero}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="divide-y divide-line px-5">
        {eu && (
          <div className="flex items-end justify-between gap-3 py-4">
            <div>
              <p className="text-[13px] text-muted">Ranking geral</p>
              <p className="mt-1 flex items-baseline gap-1.5">
                <span className="num text-[28px] font-semibold leading-none tracking-tight text-fg">{eu.posicao}º</span>
                <span className="num text-sm text-muted">de {ranking.length}</span>
              </p>
            </div>
            {variacao && (
              <div className="text-right">
                <p
                  className={
                    variacao.delta > 0
                      ? "inline-flex items-center gap-1 text-[13px] font-semibold text-success"
                      : "inline-flex items-center gap-1 text-[13px] font-semibold text-muted"
                  }
                >
                  <Seta className="size-3.5" strokeWidth={2.25} aria-hidden />
                  {variacao.delta > 0
                    ? `subiu ${variacao.delta}`
                    : variacao.delta < 0
                      ? `caiu ${-variacao.delta}`
                      : "manteve"}
                </p>
                <p className="num mt-0.5 text-xs text-subtle">
                  {variacao.anterior}º na semana anterior
                </p>
              </div>
            )}
          </div>
        )}

        {medalha && (
          <div className="flex items-center gap-3.5 py-3.5">
            <MedalEmblem
              raridade={medalha.medalha.raridade}
              icone={medalha.medalha.icone}
              bloqueada
              progresso={medalha.pct}
              className="-mb-2 size-[60px] shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-muted">Próxima medalha</p>
              <p className="mt-0.5 truncate text-[15px] font-medium text-fg">{medalha.medalha.nome}</p>
              <p className="num mt-0.5 text-xs text-muted">
                {fmtInt(medalha.medalha.progresso.atual)}/{fmtInt(medalha.medalha.progresso.meta)}{" "}
                {medalha.medalha.progresso.unidade} · {fmtPct(medalha.pct)}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-line px-5 py-4">
        <Link href="/gamificacao/conquistas" className={botao}>
          <Medal className="size-4 text-gold-ink" strokeWidth={1.75} aria-hidden /> Conquistas
        </Link>
        <Link href="/gamificacao/ranking" className={botao}>
          <Trophy className="size-4 text-gold-ink" strokeWidth={1.75} aria-hidden /> Ranking
        </Link>
      </div>
    </section>
  );
}
