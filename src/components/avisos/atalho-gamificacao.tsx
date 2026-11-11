"use client";

import Link from "next/link";
import { ChevronRight, Lock, Medal, Trophy } from "lucide-react";
import { ProgressBar } from "@/components/ui/primitives";
import { medalhas } from "@/lib/mock/gamificacao";
import { carregarRanking, meusPontos, minhaEntrada, nivelPorPontos } from "@/lib/ranking";
import { fmtInt, fmtPct } from "@/lib/format";

/** Medalha ainda bloqueada com maior % de progresso (teaser "Quase lá"). */
function medalhaQuaseLa() {
  return medalhas
    .filter((m) => !m.desbloqueada && m.progresso.meta > 0)
    .map((m) => ({ m, pct: Math.min(1, m.progresso.atual / m.progresso.meta) }))
    .sort((a, b) => b.pct - a.pct)[0];
}

/**
 * Atalho da gamificação na home (recomendação da HTA): consulta rápida de nível,
 * pontos e posição sem passar pelo menu.
 */
export function AtalhoGamificacao({ nome }: { nome: string }) {
  const pontos = meusPontos();
  const { atual, proximo, progresso, faltam } = nivelPorPontos(pontos);
  const posicao = minhaEntrada(carregarRanking())?.posicao;
  const quase = medalhaQuaseLa();

  return (
    <section
      aria-label="Resumo de conquistas"
      className="relative overflow-hidden rounded-card border border-brand/30 bg-gradient-to-br from-[#12315a] via-[#0c1b33] to-surface-1 p-4 shadow-lg shadow-black/40"
    >
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full bg-gold/10 blur-2xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xl font-bold text-white">Olá, {nome}!</p>
          <p className="mt-0.5 text-sm font-medium text-gold">
            Nível {atual.numero} · {atual.titulo}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-extrabold leading-none text-white">
            {fmtInt(pontos)} <span className="text-sm font-semibold text-muted">pts</span>
          </p>
          {posicao && (
            <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
              <Trophy className="size-3" aria-hidden /> {posicao}º lugar geral
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-3">
        <ProgressBar value={progresso} tone="xp" label="Progresso até o próximo nível" />
        <p className="mt-1.5 text-xs text-muted">
          {proximo
            ? `Faltam ${fmtInt(faltam)} pts para o nível ${proximo.numero} · ${proximo.titulo}`
            : "Nível máximo alcançado"}
        </p>
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2">
        <Link
          href="/gamificacao/conquistas"
          className="flex h-11 items-center justify-center gap-1.5 rounded-md bg-primary-strong text-sm font-semibold text-white transition active:scale-[0.98] hover:bg-brand"
        >
          <Medal className="size-4" aria-hidden /> Conquistas
        </Link>
        <Link
          href="/gamificacao/ranking"
          className="flex h-11 items-center justify-center gap-1.5 rounded-md border border-line-strong bg-white/5 text-sm font-semibold text-white transition active:scale-[0.98] hover:bg-white/10"
        >
          <Trophy className="size-4 text-gold" aria-hidden /> Ranking
        </Link>
      </div>

      {quase && (
        <Link
          href="/gamificacao/conquistas"
          className="relative mt-3 flex min-h-11 items-center gap-2 rounded-md bg-black/30 px-3 py-2 text-[13px] text-muted transition hover:bg-black/40"
        >
          <Lock className="size-4 shrink-0 text-subtle" aria-hidden />
          <span className="min-w-0 flex-1 truncate">
            Quase lá: <span className="font-semibold text-white">{quase.m.nome}</span> — {fmtPct(quase.pct)}
          </span>
          <ChevronRight className="size-4 shrink-0 text-subtle" aria-hidden />
        </Link>
      )}
    </section>
  );
}
