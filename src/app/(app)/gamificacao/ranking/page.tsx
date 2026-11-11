"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Scale } from "lucide-react";
import { DisputaCard } from "@/components/gamificacao/disputa-card";
import { FiltroRanking } from "@/components/gamificacao/filtro-ranking";
import { FormulaCard } from "@/components/gamificacao/formula-card";
import { LinhaRanking } from "@/components/gamificacao/linha-ranking";
import { Podio } from "@/components/gamificacao/podio";
import { SectionTitle } from "@/components/ui/primitives";
import { fmt1 } from "@/lib/format";
import { MINHA_MATRICULA } from "@/lib/mock/gamificacao";
import { carregarRanking, minhaEntrada, opcoesFiltro, rankingBruto } from "@/lib/ranking";

export default function RankingPage() {
  const [filtroId, setFiltroId] = useState("geral");
  const opcao = opcoesFiltro.find((o) => o.id === filtroId) ?? opcoesFiltro[0];
  const ranking = useMemo(() => carregarRanking(opcao.filtro), [opcao]);
  const eu = minhaEntrada(ranking);
  const restantes = ranking.slice(3);
  const listaRef = useRef<HTMLUListElement>(null);

  // Posição sem normalização (só faz sentido no filtro geral)
  const posicaoBruta = rankingBruto().findIndex((a) => a.matricula === MINHA_MATRICULA) + 1;

  // Ao trocar o filtro, garante que a linha do usuário continue visível (container: #app-scroll)
  // (compara com o filtro anterior em vez de um flag "primeira vez", que falha no StrictMode)
  const filtroAnterior = useRef(filtroId);
  useEffect(() => {
    if (filtroAnterior.current === filtroId) return;
    filtroAnterior.current = filtroId;
    const t = setTimeout(() => {
      listaRef.current?.querySelector('[data-eu="true"]')?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, [filtroId]);

  return (
    <div className="animate-fade-up px-4 pt-4">
      <div className="space-y-3">
        <FiltroRanking valor={opcao} onChange={setFiltroId} />
        <FormulaCard eu={eu} />
      </div>

      {ranking.length === 0 ? (
        <p className="mt-6 rounded-card border border-line bg-surface-1 p-4 text-center text-muted">
          Nenhum aluno neste filtro.
        </p>
      ) : (
        <>
          <SectionTitle className="mt-6">Pódio</SectionTitle>
          <div className="pt-5">
            <Podio entradas={ranking} />
          </div>

          {eu && (
            <div className="mt-5">
              <DisputaCard ranking={ranking} eu={eu} />
            </div>
          )}

          {filtroId === "geral" && eu && posicaoBruta > 0 && (
            <div className="mt-3 flex items-start gap-3 rounded-card border border-xp/40 bg-xp/10 p-3.5">
              <Scale className="mt-0.5 size-5 shrink-0 text-xp" aria-hidden />
              <p className="text-sm leading-snug text-muted">
                <strong className="font-semibold text-fg">Justiça na disputa: </strong>
                {posicaoBruta === eu.posicao ? (
                  <>sua posição é a mesma com ou sem normalização ({eu.posicao}º).</>
                ) : (
                  <>
                    sem normalização você estaria em{" "}
                    <strong className="text-fg">{posicaoBruta}º</strong>; ao considerar créditos e presença em labs, você
                    está em <strong className="text-fg">{eu.posicao}º</strong>.
                  </>
                )}
              </p>
            </div>
          )}

          <SectionTitle>Classificação</SectionTitle>
          <ul ref={listaRef} className="space-y-2" aria-label={`Classificação — ${opcao.label}`}>
            {restantes.map((e) => (
              <LinhaRanking key={e.aluno.matricula} e={e} />
            ))}
          </ul>
        </>
      )}

      <div className="sticky bottom-0 z-10 -mx-4 mt-4 border-t border-line-strong bg-surface-2 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
        {eu ? (
          <p className="flex items-center justify-between gap-2 text-sm text-muted" aria-live="polite">
            <span>
              Sua posição ·{" "}
              <strong className="text-base font-bold text-fg">
                {eu.posicao}º de {ranking.length}
              </strong>
            </span>
            <strong className="text-base font-extrabold text-gold">{fmt1(eu.pontuacao)} pts</strong>
          </p>
        ) : (
          <p className="text-sm text-muted">Você não aparece neste filtro.</p>
        )}
      </div>
    </div>
  );
}
