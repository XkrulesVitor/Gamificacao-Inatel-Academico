"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { Crown } from "lucide-react";
import { usePrefs } from "@/components/configuracoes/prefs";
import { fmt1, iniciais } from "@/lib/format";
import type { EntradaRanking } from "@/lib/types";

const cfg = {
  1: { altura: "h-24", cor: "text-gold", borda: "border-gold", fundo: "from-gold/35 to-gold/5", avatar: "size-16 text-xl" },
  2: { altura: "h-16", cor: "text-silver", borda: "border-silver", fundo: "from-silver/30 to-silver/5", avatar: "size-14 text-lg" },
  3: { altura: "h-12", cor: "text-bronze", borda: "border-bronze", fundo: "from-bronze/35 to-bronze/5", avatar: "size-14 text-lg" },
} as const;

/** Pódio top 3 na ordem visual 2º · 1º · 3º. */
export function Podio({ entradas }: { entradas: EntradaRanking[] }) {
  const [p1, p2, p3] = entradas;
  if (!p1 || !p2 || !p3) return null;
  return (
    <ol aria-label="Pódio" className="grid grid-cols-3 items-end gap-2">
      {[p2, p1, p3].map((e) => (
        <Coluna key={e.aluno.matricula} e={e} />
      ))}
    </ol>
  );
}

function Coluna({ e }: { e: EntradaRanking }) {
  const c = cfg[e.posicao as 1 | 2 | 3];
  const { prefs } = usePrefs();
  const oculto = e.souEu && !prefs.exibirNome;
  return (
    <motion.li
      layout="position"
      className="flex min-w-0 flex-col items-center"
      aria-label={`${e.posicao}º lugar, ${e.aluno.nome}${e.souEu ? " (você)" : ""}, ${fmt1(e.pontuacao)} pontos`}
    >
      <div className="relative">
        {e.posicao === 1 && (
          <Crown className="absolute -top-5 left-1/2 size-6 -translate-x-1/2 fill-gold text-gold" aria-hidden />
        )}
        <span
          className={clsx(
            "grid place-items-center rounded-full border-[3px] font-bold text-white",
            c.avatar,
            c.borda,
            e.souEu && "ring-2 ring-brand ring-offset-2 ring-offset-bg",
          )}
          style={{ backgroundColor: e.aluno.avatarCor }}
          aria-hidden
        >
          {iniciais(e.aluno.nome)}
        </span>
      </div>
      <p className="mt-1.5 w-full truncate text-center text-[13px] font-semibold text-fg">
        {e.souEu ? "Você" : e.aluno.nome.split(" ")[0]}
      </p>
      {oculto && <p className="text-[10px] leading-tight text-muted">Nome oculto p/ colegas</p>}
      <p className={clsx("text-base font-extrabold leading-tight", c.cor)}>{fmt1(e.pontuacao)}</p>
      <div
        className={clsx(
          "mt-1.5 grid w-full place-items-center rounded-t-xl border border-b-0 bg-gradient-to-b text-2xl font-extrabold",
          c.altura,
          c.borda,
          c.fundo,
          c.cor,
        )}
        aria-hidden
      >
        {e.posicao}º
      </div>
    </motion.li>
  );
}
