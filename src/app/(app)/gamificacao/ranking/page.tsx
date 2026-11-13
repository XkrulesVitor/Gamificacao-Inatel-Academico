"use client";

import { Fragment, useMemo, useState } from "react";
import { FlaskConical } from "lucide-react";
import { Calculo } from "@/components/gamificacao/calculo";
import { ListaRanking } from "@/components/gamificacao/lista-ranking";
import { Podio } from "@/components/gamificacao/podio";
import { PosicaoHeroi } from "@/components/gamificacao/posicao-heroi";
import { Chip, ChipGroup, Page, Panel, SectionHeading, SplitLayout } from "@/components/ui/primitives";
import { carregarRanking, minhaEntrada, opcoesFiltro } from "@/lib/ranking";

export default function RankingPage() {
  const [filtroId, setFiltroId] = useState("geral");
  const opcao = opcoesFiltro.find((o) => o.id === filtroId) ?? opcoesFiltro[0];
  const ranking = useMemo(() => carregarRanking(opcao.filtro), [opcao]);
  const eu = minhaEntrada(ranking);
  const geral = opcao.filtro.tipo === "geral";

  const calculo = (
    <>
      <SectionHeading>Cálculo</SectionHeading>
      <Calculo eu={eu} geral={geral} />
    </>
  );

  const main = (
    <>
      <section aria-label="Top 3">
        <Podio entradas={ranking} />
      </section>
      {ranking.length > 3 && (
        <div className="mt-5">
          <ListaRanking entradas={ranking.slice(3)} />
        </div>
      )}
      {ranking.length === 0 && <p className="py-10 text-center text-sm text-muted">Nenhum aluno neste filtro</p>}
      {eu && <Panel className="mt-8 p-4 lg:hidden">{calculo}</Panel>}
    </>
  );

  const aside = eu ? <Panel className="p-5">{calculo}</Panel> : null;

  return (
    <Page className="pt-5 lg:pt-6">
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

      <div className="mt-4">
        <PosicaoHeroi ranking={ranking} eu={eu} geral={geral} contexto={opcao.descricao} />
      </div>

      <SplitLayout
        className="mt-6 lg:mt-8"
        main={main}
        aside={aside}
        asideClassName="hidden lg:block lg:top-[72px] xl:top-[80px]"
      />
    </Page>
  );
}
