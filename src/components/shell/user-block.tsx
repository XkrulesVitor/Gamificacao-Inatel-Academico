"use client";

import Link from "next/link";
import { CircleUserRound, Medal } from "lucide-react";
import { useSession } from "@/components/session-provider";
import { meusPontos, nivelPorPontos } from "@/lib/ranking";
import { fmtInt, iniciais } from "@/lib/format";

/** Cabeçalho do drawer (mobile), herdado do app real: degradê azul, perfil, nome, e-mail e nível. */
export function UserBlock({ onNavigate }: { onNavigate?: () => void }) {
  const { aluno } = useSession();
  const pontos = meusPontos();
  const { atual } = nivelPorPontos(pontos);
  return (
    <div className="bg-gradient-to-br from-header to-header-2 px-5 pb-4 pt-5">
      <CircleUserRound className="size-11 text-on-header" strokeWidth={1.5} aria-hidden />
      <p className="mt-2 truncate text-base font-semibold leading-tight text-on-header">{aluno.nome}</p>
      <p className="mt-0.5 truncate text-[13px] text-on-header-muted">{aluno.email}</p>
      <Link
        href="/gamificacao/conquistas"
        onClick={onNavigate}
        className="mt-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-white/10 px-2.5 text-xs font-semibold text-on-header ring-1 ring-white/15 transition-colors hover:bg-white/15"
      >
        <Medal className="size-3.5 text-gold" strokeWidth={2} aria-hidden />
        Nível {atual.numero}
        <span className="num text-on-header-muted">{fmtInt(pontos)} pts</span>
      </Link>
    </div>
  );
}

/** Cartão compacto do aluno no rodapé da sidebar (desktop). */
export function UserCard() {
  const { aluno } = useSession();
  const pontos = meusPontos();
  const { atual, proximo } = nivelPorPontos(pontos);
  const pct = proximo ? Math.min(1, pontos / proximo.minimo) : 1;
  const r = 19;
  const c = 2 * Math.PI * r;
  return (
    <Link
      href="/gamificacao/conquistas"
      className="flex items-center gap-3 rounded-card p-2.5 transition-colors hover:bg-sidebar-active"
      aria-label={`${aluno.nome}, nível ${atual.numero}, ${fmtInt(pontos)} pontos`}
    >
      <span className="relative grid size-11 shrink-0 place-items-center" aria-hidden>
        <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
          <circle cx="22" cy="22" r={r} fill="none" stroke="var(--surface-3)" strokeWidth="3" />
          <circle
            cx="22"
            cy="22"
            r={r}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
          />
        </svg>
        <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-on-primary">
          {iniciais(aluno.nome)}
        </span>
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-fg">{aluno.nome}</span>
        <span className="block truncate text-xs text-sidebar-muted">
          {aluno.matricula} · Nível {atual.numero}
        </span>
      </span>
    </Link>
  );
}
