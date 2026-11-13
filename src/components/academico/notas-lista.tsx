"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Award, ChevronRight, Clock } from "lucide-react";
import { Panel, SplitLayout } from "@/components/ui/primitives";
import { fmt1, fmtDiaMes } from "@/lib/format";
import { useCountUp } from "@/lib/use-count-up";
import { BarraAnimada } from "./barra-animada";
import { getDisciplina, provas } from "@/lib/mock/aluno";
import type { NotaDisciplina, Prova } from "@/lib/types";
import { classeNota } from "./utils";
import { ROTA_CONQUISTAS, SeloNota100 } from "./gamificacao-links";

type Campo = "np1" | "np2" | "nl";
const TIPO: Record<Campo, Prova["tipo"]> = { np1: "NP1", np2: "NP2", nl: "NL" };

/** Próxima prova marcada desse tipo na disciplina (a data aparece na nota pendente). */
function proximaProva(disciplina: string, campo: Campo): Prova | undefined {
  return provas
    .filter((p) => p.disciplina === disciplina && p.tipo === TIPO[campo])
    .sort((a, b) => a.data.localeCompare(b.data))[0];
}

/** Nota NP2/NP3 pendente: relógio e, se houver prova marcada, a data dela. */
function SemNota({ prova }: { prova?: Prova }) {
  return (
    <span className="inline-flex items-center justify-end gap-1.5 text-subtle">
      <span role="img" aria-label="Não lançada" title="Não lançada" className="inline-flex">
        <Clock className="size-3.5" strokeWidth={1.75} aria-hidden />
      </span>
      {prova && <span className="num text-xs">{fmtDiaMes(prova.data)}</span>}
    </span>
  );
}

/** NL só existe em disciplina com laboratório. */
const temLab = (disciplina: string) => Boolean(getDisciplina(disciplina)?.laboratorioId);

/** Valor de uma nota: `num`, vermelho abaixo de 60, medalha ao lado do 100. */
function NotaCampo({ nota, campo }: { nota: NotaDisciplina; campo: Campo }) {
  if (campo === "nl" && !temLab(nota.disciplina)) return null;
  const valor = nota[campo];
  if (valor === null) {
    return campo === "np2" ? <SemNota prova={proximaProva(nota.disciplina, campo)} /> : null;
  }
  return (
    <span className="inline-flex items-center justify-end gap-1">
      <span className={`num ${classeNota(valor)}`}>{valor}</span>
      {valor === 100 && <SeloNota100 />}
    </span>
  );
}

/** Média das notas lançadas (NP1, NP2 e NL). null se nada foi lançado. */
function mediaDe(n: NotaDisciplina): number | null {
  const lancadas = [n.np1, n.np2, n.nl].filter((v): v is number => v !== null);
  return lancadas.length ? lancadas.reduce((s, v) => s + v, 0) / lancadas.length : null;
}

/** Média com contagem no primeiro render. */
function MediaNum({ valor, className }: { valor: number; className?: string }) {
  const v = useCountUp(valor);
  return <span className={`num tracking-tight ${className ?? ""}`}>{fmt1(v)}</span>;
}

function Identidade({ codigo, nome }: { codigo: string; nome: string }) {
  return (
    <span className="block min-w-0">
      <span className="num block text-xs text-muted">{codigo}</span>
      <span className="block font-medium text-fg">{nome}</span>
    </span>
  );
}

function Par({ rotulo, campo, nota }: { rotulo: string; campo: Campo; nota: NotaDisciplina }) {
  if (campo === "nl" && !temLab(nota.disciplina)) return null;
  const vazia = nota[campo] === null;
  return (
    <span className={`inline-flex items-center gap-1.5 ${vazia ? "text-subtle" : ""}`}>
      {rotulo}
      <span className={vazia ? "" : "font-medium text-fg"}>
        <NotaCampo nota={nota} campo={campo} />
      </span>
    </span>
  );
}

function DetalheNota({ nota }: { nota: NotaDisciplina }) {
  const d = getDisciplina(nota.disciplina);
  const media = mediaDe(nota);
  const tem100 = [nota.np1, nota.np2, nota.nl].includes(100);
  const campos: { campo: Campo; rotulo: string }[] = [
    { campo: "np1", rotulo: "NP1" },
    { campo: "np2", rotulo: "NP2" },
    ...(temLab(nota.disciplina) ? [{ campo: "nl" as const, rotulo: "NL (laboratório)" }] : []),
  ];

  return (
    <Panel className="space-y-4 p-5 shadow-card">
      <div>
        <p className="num text-xs text-muted">{nota.disciplina}</p>
        <p className="text-lg font-semibold tracking-tight text-fg">{d?.nome ?? nota.disciplina}</p>
        {d && <p className="mt-0.5 text-sm text-muted">{d.professor}</p>}
      </div>

      <dl className="divide-y divide-line">
        {campos.map(({ campo, rotulo }) => (
          <div key={campo} className="flex items-center justify-between gap-3 py-3">
            <dt className="text-sm text-muted">{rotulo}</dt>
            <dd className="text-[15px] font-medium text-fg">
              <NotaCampo nota={nota} campo={campo} />
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-3 py-3">
          <dt className="text-sm text-muted">Média parcial</dt>
          <dd className="text-[15px] font-semibold text-fg">{media === null ? null : <MediaNum valor={media} />}</dd>
        </div>
      </dl>
      {media !== null && <BarraAnimada key={nota.disciplina} value={media} max={100} label="Média parcial" />}

      {tem100 && (
        <Link
          href={ROTA_CONQUISTAS}
          className="flex min-h-11 items-center gap-2 text-[15px] font-medium text-fg transition-colors hover:text-accent"
        >
          <Award className="size-5 shrink-0 text-gold-ink" strokeWidth={1.75} aria-hidden />
          <span className="min-w-0 flex-1">Medalha Nota 100</span>
          <ChevronRight className="size-4 text-muted" strokeWidth={1.75} aria-hidden />
        </Link>
      )}
    </Panel>
  );
}

export function NotasLista({ notas }: { notas: NotaDisciplina[] }) {
  const [codigo, setCodigo] = useState("S05");
  const selecionada = notas.find((n) => n.disciplina === codigo) ?? notas[0];

  return (
    <>
      <div className="hidden lg:block">
        <SplitLayout
          main={
            <Panel className="overflow-hidden shadow-card">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">Notas por disciplina</caption>
                <thead className="text-xs font-medium text-muted">
                  <tr className="border-b border-line">
                    <th scope="col" className="px-5 py-3 font-medium">Disciplina</th>
                    <th scope="col" className="px-3 py-3 font-medium">Professor</th>
                    <th scope="col" className="w-24 px-3 py-3 text-right font-medium">NP1</th>
                    <th scope="col" className="w-24 px-3 py-3 text-right font-medium">NP2</th>
                    <th scope="col" className="w-20 px-3 py-3 text-right font-medium">NL</th>
                    <th scope="col" className="w-20 px-5 py-3 text-right font-medium">Média</th>
                  </tr>
                </thead>
                <tbody>
                  {notas.map((n) => {
                    const d = getDisciplina(n.disciplina);
                    const media = mediaDe(n);
                    const ativa = n.disciplina === selecionada.disciplina;
                    return (
                      <tr
                        key={n.disciplina}
                        className={`border-t border-line transition-colors duration-150 hover:bg-surface-2 ${ativa ? "bg-surface-2 shadow-[inset_2px_0_0_var(--accent)]" : ""}`}
                      >
                        <th scope="row" className="px-5 py-3.5 text-left font-normal">
                          <button
                            type="button"
                            aria-pressed={ativa}
                            onClick={() => setCodigo(n.disciplina)}
                            className="block w-full text-left"
                          >
                            <Identidade codigo={n.disciplina} nome={d?.nome ?? n.disciplina} />
                          </button>
                        </th>
                        <td className="whitespace-nowrap px-3 py-3.5 text-muted">{d?.professor}</td>
                        <td className="px-3 py-3.5 text-right"><NotaCampo nota={n} campo="np1" /></td>
                        <td className="px-3 py-3.5 text-right"><NotaCampo nota={n} campo="np2" /></td>
                        <td className="px-3 py-3.5 text-right"><NotaCampo nota={n} campo="nl" /></td>
                        <td className="px-5 py-3.5 text-right font-semibold">
                          {media === null ? null : <MediaNum valor={media} className="text-fg" />}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Panel>
          }
          aside={<DetalheNota nota={selecionada} />}
          asideClassName="self-start"
        />
      </div>

      <Panel className="shadow-card lg:hidden">
        <ul className="divide-y divide-line">
          {notas.map((n) => {
            const d = getDisciplina(n.disciplina);
            const media = mediaDe(n);
            return (
              <li key={n.disciplina} className="px-4 py-3.5">
                <div className="flex items-start justify-between gap-4">
                  <Identidade codigo={n.disciplina} nome={d?.nome ?? n.disciplina} />
                  <div className="shrink-0 text-right">
                    {media === null ? null : (
                      <p className="text-2xl font-semibold leading-none text-fg">
                        <MediaNum valor={media} />
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted">Média</p>
                  </div>
                </div>
                <p className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted">
                  {(["np1", "np2", "nl"] as const)
                    .filter((c) => c !== "nl" || temLab(n.disciplina))
                    .map((c, i) => (
                      <Fragment key={c}>
                        {i > 0 && (
                          <span aria-hidden className="text-subtle">
                            ·
                          </span>
                        )}
                        <Par rotulo={c.toUpperCase()} campo={c} nota={n} />
                      </Fragment>
                    ))}
                </p>
              </li>
            );
          })}
        </ul>
      </Panel>
    </>
  );
}
