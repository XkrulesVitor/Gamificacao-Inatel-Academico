"use client";

import { useState } from "react";
import clsx from "clsx";
import { Clock, MapPin } from "lucide-react";
import { Badge, Panel, SectionHeading, SplitLayout } from "@/components/ui/primitives";
import { diasAte, fmtDataLonga } from "@/lib/format";
import { getDisciplina } from "@/lib/mock/aluno";
import type { Prova } from "@/lib/types";
import { partesData, rotuloDias } from "./utils";

interface Grupo {
  chave: string;
  titulo: string;
  itens: Prova[];
}

const chaveProva = (p: Prova) => `${p.disciplina}-${p.data}-${p.tipo}`;

function Linha({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-3 py-3">
      <dt className="text-sm text-muted">{rotulo}</dt>
      <dd className="text-[15px] text-fg">{children}</dd>
    </div>
  );
}

function DetalheProva({ prova }: { prova: Prova }) {
  const d = getDisciplina(prova.disciplina);
  return (
    <div className="space-y-4">
      <div>
        <p className="num text-xs text-muted">{prova.disciplina}</p>
        <p className="text-lg font-semibold text-fg">{d?.nome ?? prova.disciplina}</p>
      </div>
      <dl className="divide-y divide-line">
        <Linha rotulo="Tipo">
          <Badge>{prova.tipo}</Badge>
        </Linha>
        <Linha rotulo="Data">{fmtDataLonga(prova.data)}</Linha>
        <Linha rotulo="Horário">
          <span className="num">{prova.hora}</span>
        </Linha>
        <Linha rotulo="Local">{prova.local}</Linha>
        <Linha rotulo="Quando">{rotuloDias(prova.data)}</Linha>
      </dl>
    </div>
  );
}

/** Provas por mês, uma linha por prova. Desktop: clicar seleciona e mostra o detalhe ao lado. */
export function ProvasLista({ provas }: { provas: Prova[] }) {
  const ordenadas = [...provas].sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora));
  const proxima = ordenadas.find((p) => diasAte(p.data) >= 0) ?? ordenadas[0];
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const exibida = ordenadas.find((p) => chaveProva(p) === selecionada) ?? proxima;

  const grupos: Grupo[] = [];
  for (const prova of ordenadas) {
    const partes = partesData(prova.data);
    const atual = grupos[grupos.length - 1];
    if (atual && atual.chave === partes.chaveMes) {
      atual.itens.push(prova);
    } else {
      grupos.push({ chave: partes.chaveMes, titulo: `${partes.mesLongo} de ${partes.ano}`, itens: [prova] });
    }
  }

  return (
    <SplitLayout
      main={
        <div className="space-y-6">
          {grupos.map((grupo) => (
            <section key={grupo.chave}>
              <SectionHeading>{grupo.titulo}</SectionHeading>
              <Panel className="overflow-hidden">
                <ul className="divide-y divide-line">
                  {grupo.itens.map((prova) => {
                    const d = getDisciplina(prova.disciplina);
                    const ativa = exibida !== undefined && chaveProva(prova) === chaveProva(exibida);
                    const destaque = prova === proxima;
                    const { dia, mesCurto } = partesData(prova.data);
                    return (
                      <li key={chaveProva(prova)}>
                        <button
                          type="button"
                          aria-pressed={ativa}
                          onClick={() => setSelecionada(chaveProva(prova))}
                          className={clsx(
                            "flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-surface-2 lg:px-5",
                            ativa && "bg-surface-2",
                          )}
                        >
                          <span className="grid w-14 shrink-0 place-items-center rounded-control bg-surface-2 py-2">
                            <span className="num text-2xl font-bold leading-none text-fg">{dia}</span>
                            <span className="mt-1 text-xs text-muted">{mesCurto}</span>
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="num block text-xs text-muted">{prova.disciplina}</span>
                            <span className="block font-medium text-fg">{d?.nome ?? prova.disciplina}</span>
                            <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                              <Badge>{prova.tipo}</Badge>
                              <span className="num inline-flex items-center gap-1">
                                <Clock className="size-3.5" strokeWidth={1.75} aria-hidden />
                                {prova.hora}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden />
                                {prova.local}
                              </span>
                              <span
                                className={clsx(
                                  "whitespace-nowrap lg:hidden",
                                  destaque ? "font-medium text-accent" : "text-muted",
                                )}
                              >
                                {rotuloDias(prova.data)}
                              </span>
                            </span>
                          </span>

                          <span
                            className={clsx(
                              "hidden shrink-0 whitespace-nowrap text-sm lg:block",
                              destaque ? "font-medium text-accent" : "text-muted",
                            )}
                          >
                            {rotuloDias(prova.data)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Panel>
            </section>
          ))}
        </div>
      }
      aside={<Panel className="p-5">{exibida && <DetalheProva prova={exibida} />}</Panel>}
      asideClassName="hidden self-start lg:block"
    />
  );
}
