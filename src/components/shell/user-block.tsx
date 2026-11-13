"use client";

import Link from "next/link";
import { CircleUserRound, Medal } from "lucide-react";
import { useSession } from "@/components/session-provider";
import { meusPontos, nivelPorPontos } from "@/lib/ranking";
import { fmtInt } from "@/lib/format";

/** Cabeçalho do menu do app real: degradê azul, ícone de perfil, nome e e-mail, mais o nível. */
export function UserBlock({ onNavigate }: { onNavigate?: () => void }) {
  const { aluno } = useSession();
  const pontos = meusPontos();
  const { atual } = nivelPorPontos(pontos);
  return (
    <div className="bg-gradient-to-r from-[#17457f] to-[#0b63d6] px-5 pb-4 pt-5">
      <CircleUserRound className="size-12 text-white" strokeWidth={1.5} aria-hidden />
      <p className="mt-2 truncate text-base font-semibold leading-tight text-white">{aluno.nome}</p>
      <p className="mt-0.5 truncate text-[13px] text-white/75">{aluno.email}</p>
      <Link
        href="/gamificacao/conquistas"
        onClick={onNavigate}
        className="mt-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-black/25 px-2.5 text-xs font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-black/35"
      >
        <Medal className="size-3.5 text-gold" strokeWidth={2} aria-hidden />
        Nível {atual.numero}
        <span className="num text-white/70">{fmtInt(pontos)} pts</span>
      </Link>
    </div>
  );
}
