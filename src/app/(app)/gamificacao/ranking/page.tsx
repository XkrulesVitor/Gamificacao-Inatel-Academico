"use client";

import { Fragment, useMemo, useState } from "react";
import { ChevronDown, FlaskConical } from "lucide-react";
import { ListaRanking } from "@/components/gamificacao/lista-ranking";
import { Calculo, Disputa, SuaPosicao } from "@/components/gamificacao/posicao-painel";
import { Chip, ChipGroup, Page, Panel, SectionHeading, SplitLayout } from "@/components/ui/primitives";
import { carregarRanking, minhaEntrada, opcoesFiltro } from "@/lib/ranking";

export default function RankingPage() {
  const [filtroId, setFiltroId] = useState("geral");
  const [calculoAberto, setCalculoAberto] = useState(false);
  const opcao = opcoesFiltro.find((o) => o.id === filtroId) ?? opcoesFiltro[0];
  const ranking = useMemo(() => carregarRanking(opcao.filtro), [opcao]);
  const eu = minhaEntrada(ranking);
  const geral = opcao.filtro.tipo === "geral";
  const lab = opcao.grupo === "Laboratórios";

  const main = (
    <>
      <ChipGroup label="Filtro do ranking" className="scroll-px-4 items-center">
        {opcoesFiltro.map((o, i) => (
          <Fragment key={o.id}>
            {i > 0 && o.grupo !== opcoesFiltro[i - 1].grupo && (
              <span aria-hidden className="mx-1 h-5 w-px shrink-0 self-center bg-line-strong" />
            )}
            <Chip
              selected={o.id === filtroId}
              onClick={(ev) => {
                setFiltroId(o.id);
                ev.currentTarget.scrollIntoView({ inline: "nearest", block: "nearest" });
              }}
            >
              {o.grupo === "Laboratórios" && <FlaskConical className="size-3.5" strokeWidth={1.75} aria-hidden />}
              {o.label}
            </Chip>
          </Fragment>
        ))}
      </ChipGroup>
      <p className="mt-2 h-4 text-xs text-muted">{lab ? opcao.descricao : ""}</p>

      <Panel className="mt-3 p-4 lg:hidden">
        <SuaPosicao eu={eu} total={ranking.length} compacto />
        <div className="mt-2">
          <Disputa ranking={ranking} eu={eu} />
        </div>
      </Panel>

      {ranking.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">Nenhum aluno neste filtro</p>
      ) : (
        <div className="mt-5">
          <ListaRanking entradas={ranking} />
        </div>
      )}

      <section className="mt-6 border-t border-line pt-2 lg:hidden">
        <button
          type="button"
          onClick={() => setCalculoAberto((v) => !v)}
          aria-expanded={calculoAberto}
          className="flex h-11 w-full items-center justify-between text-[15px] font-semibold text-fg"
        >
          Cálculo
          <ChevronDown
            className={`size-5 text-muted transition-transform duration-200 ${calculoAberto ? "rotate-180" : ""}`}
            strokeWidth={1.75}
          />
        </button>
        {calculoAberto && (
          <div className="pb-3 pt-1">
            <Calculo eu={eu} geral={geral} />
          </div>
        )}
      </section>
    </>
  );

  const aside = (
    <Panel className="divide-y divide-line">
      <div className="p-5">
        <SectionHeading>Sua posição</SectionHeading>
        <SuaPosicao eu={eu} total={ranking.length} />
      </div>
      {eu && (
        <div className="px-5 pb-2 pt-4">
          <SectionHeading className="mb-1">Disputa</SectionHeading>
          <Disputa ranking={ranking} eu={eu} />
        </div>
      )}
      {eu && (
        <div className="p-5">
          <SectionHeading>Cálculo</SectionHeading>
          <Calculo eu={eu} geral={geral} />
        </div>
      )}
    </Panel>
  );

  return (
    <Page className="pt-4 lg:pt-6">
      <SplitLayout main={main} aside={aside} asideClassName="hidden lg:block lg:top-[72px]" />
    </Page>
  );
}
