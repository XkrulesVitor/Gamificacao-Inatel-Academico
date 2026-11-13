"use client";

import Link from "next/link";
import { ChevronRight, Medal, Trophy } from "lucide-react";
import { ProgressBar, Value } from "@/components/ui/primitives";
import { medalhas } from "@/lib/mock/gamificacao";
import { carregarRanking, meusPontos, minhaEntrada, nivelPorPontos } from "@/lib/ranking";
import { fmtInt, fmtPct } from "@/lib/format";

/** Medalha bloqueada com maior progresso. */
function proximaMedalha() {
  return medalhas
    .filter((m) => !m.desbloqueada && m.progresso.meta > 0)
    .map((m) => ({ m, pct: Math.min(1, m.progresso.atual / m.progresso.meta) }))
    .sort((a, b) => b.pct - a.pct)[0];
}

const botao =
  "inline-flex h-11 items-center justify-center gap-2 rounded-control border border-line-strong bg-surface-2 text-sm font-medium text-fg transition-colors duration-150 hover:bg-surface-3";

/** Atalho compacto da gamificação na home (recomendação da HTA). */
export function AtalhoGamificacao({ nome }: { nome: string }) {
  const pontos = meusPontos();
  const { atual, proximo } = nivelPorPontos(pontos);
  const posicao = minhaEntrada(carregarRanking())?.posicao;
  const prox = proximaMedalha();

  return (
    <section aria-label="Gamificação" className="rounded-card border border-line bg-surface-1 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold text-fg">Olá, {nome}</p>
        {posicao && (
          <p className="num text-sm text-muted">
            <span className="text-fg">{posicao}º</span> geral
          </p>
        )}
      </div>
      <p className="mt-0.5 text-sm text-muted">
        Nível {atual.numero} · {atual.titulo}
      </p>

      <div className="mt-3">
        <ProgressBar value={proximo ? pontos / proximo.minimo : 1} tone="accent" label="Progresso até o próximo nível" />
        {proximo && (
          <p className="mt-1.5 text-xs text-muted">
            <Value className="text-gold">{fmtInt(pontos)}</Value> / <Value>{fmtInt(proximo.minimo)}</Value> pts
          </p>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link href="/gamificacao/conquistas" className={botao}>
          <Medal className="size-4" strokeWidth={1.75} aria-hidden /> Conquistas
        </Link>
        <Link href="/gamificacao/ranking" className={botao}>
          <Trophy className="size-4" strokeWidth={1.75} aria-hidden /> Ranking
        </Link>
      </div>

      {prox && (
        <Link
          href="/gamificacao/conquistas"
          className="-mx-2 mt-2 flex min-h-11 items-center gap-2 rounded-control px-2 text-[13px] text-muted transition-colors duration-150 hover:bg-surface-2"
        >
          <span className="min-w-0 flex-1 truncate">
            Próxima: <span className="text-fg">{prox.m.nome}</span> <span className="num">{fmtPct(prox.pct)}</span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-subtle" strokeWidth={1.75} aria-hidden />
        </Link>
      )}
    </section>
  );
}
