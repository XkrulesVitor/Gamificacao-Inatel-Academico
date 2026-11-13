"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { AjudaMedalhas } from "@/components/gamificacao/ajuda-medalhas";
import { AtividadeRecente } from "@/components/gamificacao/atividade-recente";
import { MedalDetail, percentual } from "@/components/gamificacao/medal-detail";
import { MedalEmblem } from "@/components/gamificacao/medal-emblem";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Chip, ChipGroup, Page, Panel, ProgressBar, SectionHeading, SplitLayout } from "@/components/ui/primitives";
import { medalhas } from "@/lib/mock/gamificacao";
import { useIsDesktop, useMedia } from "@/lib/use-media";
import type { Medalha } from "@/lib/types";

type Filtro = "todas" | "conquistadas" | "bloqueadas";

const conquistadas = medalhas.filter((m) => m.desbloqueada);
const bloqueadas = medalhas.filter((m) => !m.desbloqueada);
const proxima: Medalha | undefined = [...bloqueadas].sort(
  (a, b) => b.progresso.atual / b.progresso.meta - a.progresso.atual / a.progresso.meta,
)[0];

const filtros: { id: Filtro; rotulo: string; total: number }[] = [
  { id: "todas", rotulo: "Todas", total: medalhas.length },
  { id: "conquistadas", rotulo: "Conquistadas", total: conquistadas.length },
  { id: "bloqueadas", rotulo: "Bloqueadas", total: bloqueadas.length },
];

export default function ConquistasPage() {
  const desktop = useIsDesktop();
  const largo = useMedia("(min-width: 1280px)");
  const tamanho = largo ? 72 : desktop ? 56 : 60;
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [selId, setSelId] = useState<string | undefined>(proxima?.id ?? medalhas[0]?.id);
  const [sheetId, setSheetId] = useState<string | undefined>();
  const [sheetAberto, setSheetAberto] = useState(false);

  const lista = useMemo(
    () => (filtro === "todas" ? medalhas : filtro === "conquistadas" ? conquistadas : bloqueadas),
    [filtro],
  );
  const selecionada = medalhas.find((m) => m.id === selId);
  const noSheet = medalhas.find((m) => m.id === sheetId);

  function abrir(m: Medalha) {
    if (desktop) {
      setSelId(m.id);
    } else {
      setSheetId(m.id);
      setSheetAberto(true);
    }
  }

  const main = (
    <>
      <div className="flex items-center justify-between gap-2">
        <ChipGroup label="Filtrar medalhas" className="!mx-0 flex-1 !gap-1.5 !px-0">
          {filtros.map((f) => (
            <Chip key={f.id} selected={filtro === f.id} onClick={() => setFiltro(f.id)} className="max-lg:!gap-1 max-lg:!px-2 max-lg:!text-[12.5px]">
              {f.rotulo}
              <span className="num text-muted">{f.total}</span>
            </Chip>
          ))}
        </ChipGroup>
        <AjudaMedalhas />
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-x-2 gap-y-3 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
        {lista.map((m) => {
          const ativa = desktop && selId === m.id;
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => abrir(m)}
                aria-pressed={desktop ? ativa : undefined}
                aria-label={m.desbloqueada ? m.nome : `${m.nome}, bloqueada, ${percentual(m)}%`}
                className={clsx(
                  "flex h-full w-full flex-col items-center rounded-xl px-1.5 pb-3 pt-3 text-center transition-colors duration-150 hover:bg-surface-2",
                  ativa && "bg-surface-1 ring-2 ring-accent",
                )}
              >
                <MedalEmblem raridade={m.raridade} icone={m.icone} bloqueada={!m.desbloqueada} size={tamanho} />
                <span
                  className={clsx(
                    "mt-2 line-clamp-2 text-[13px] font-medium leading-tight",
                    m.desbloqueada ? "text-fg" : "text-muted",
                  )}
                >
                  {m.nome}
                </span>
                {!m.desbloqueada && (
                  <ProgressBar
                    value={m.progresso.atual}
                    max={m.progresso.meta}
                    tone="muted"
                    className="mt-2 h-1 max-w-[64px]"
                    label={`Progresso de ${m.nome}`}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {proxima && (
        <section className="mt-7 lg:hidden">
          <SectionHeading>Próxima</SectionHeading>
          <button
            type="button"
            onClick={() => abrir(proxima)}
            className="flex min-h-[64px] w-full items-center gap-3 rounded-card border border-line bg-surface-1 px-3 py-2.5 text-left"
          >
            <MedalEmblem raridade={proxima.raridade} icone={proxima.icone} bloqueada size={44} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-medium text-fg">{proxima.nome}</span>
              <ProgressBar
                value={proxima.progresso.atual}
                max={proxima.progresso.meta}
                tone="muted"
                className="mt-2 h-1"
                label={`Progresso de ${proxima.nome}`}
              />
            </span>
            <span className="num text-lg font-semibold text-fg">{percentual(proxima)}%</span>
          </button>
        </section>
      )}

      <section className="mt-7">
        <SectionHeading>Atividade recente</SectionHeading>
        <AtividadeRecente />
      </section>
    </>
  );

  const aside = <Panel className="p-5">{selecionada && <MedalDetail medalha={selecionada} noSheet />}</Panel>;

  return (
    <Page className="pt-4 lg:pt-6">
      <SplitLayout main={main} aside={aside} asideClassName="hidden lg:block lg:top-[72px]" />
      <BottomSheet open={sheetAberto} onClose={() => setSheetAberto(false)} title="Medalha" hideTitle>
        {noSheet && <MedalDetail medalha={noSheet} />}
      </BottomSheet>
    </Page>
  );
}
