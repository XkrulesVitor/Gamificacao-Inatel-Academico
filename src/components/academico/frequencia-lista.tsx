"use client";

import Link from "next/link";
import { ChevronRight, FlaskConical, Medal } from "lucide-react";
import { Panel } from "@/components/ui/primitives";
import { useCountUp } from "@/lib/use-count-up";
import { BarraAnimada } from "./barra-animada";
import { ROTA_CONQUISTAS } from "./gamificacao-links";
import { fmtPct } from "@/lib/format";
import { getDisciplina, presencaLabConsolidada } from "@/lib/mock/aluno";
import type { FrequenciaDisciplina } from "@/lib/types";

type Lab = NonNullable<FrequenciaDisciplina["lab"]>;

/** Painel de presença em laboratórios: total, percentual, barra e link para a medalha. */
export function LabsPainel() {
  const { dadas, presencas, taxa } = presencaLabConsolidada;
  const contado = Math.round(useCountUp(presencas));
  return (
    <Panel className="space-y-4 p-5 shadow-card">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-fg lg:text-base">Laboratórios</h2>
        <span className="num text-sm text-muted">{fmtPct(taxa)}</span>
      </div>
      <p className="num text-4xl font-bold leading-none tracking-tight text-fg">
        {contado}
        <span className="text-muted">/{dadas}</span>
      </p>
      <BarraAnimada value={presencas} max={dadas} label={`Presença em laboratórios: ${presencas} de ${dadas}`} />
      <Link
        href={ROTA_CONQUISTAS}
        className="flex min-h-11 items-center gap-2 text-[15px] font-medium text-fg transition-colors hover:text-accent"
      >
        <Medal className="size-5 shrink-0 text-gold-ink" strokeWidth={1.75} aria-hidden />
        <span className="min-w-0 flex-1">Frequência Plena em Labs</span>
        <ChevronRight className="size-4 text-muted" strokeWidth={1.75} aria-hidden />
      </Link>
    </Panel>
  );
}

/** Uso do limite de faltas: vermelho a partir de 80%, neutro antes. */
function tomUso(faltas: number, limite: number): "danger" | "muted" {
  return limite > 0 && faltas / limite >= 0.8 ? "danger" : "muted";
}

function Identidade({ codigo }: { codigo: string }) {
  const d = getDisciplina(codigo);
  return (
    <div className="min-w-0">
      <p className="num text-xs text-muted">{codigo}</p>
      <p className="truncate font-medium text-fg">{d?.nome ?? codigo}</p>
    </div>
  );
}

function LabPresenca({ lab }: { lab: Lab }) {
  return (
    <span className="num inline-flex items-center gap-2 text-sm text-fg">
      <FlaskConical className="size-4 text-muted" strokeWidth={1.75} aria-hidden />
      {lab.presencas}/{lab.aulasDadas}
    </span>
  );
}

export function FrequenciaLista({ itens }: { itens: FrequenciaDisciplina[] }) {
  return (
    <>
      <Panel className="hidden overflow-hidden shadow-card lg:block">
        <table className="w-full text-left text-[15px]">
          <caption className="sr-only">Faltas por disciplina</caption>
          <thead className="text-xs font-medium text-muted">
            <tr className="border-b border-line">
              <th scope="col" className="px-5 py-3 font-medium">Disciplina</th>
              <th scope="col" className="px-3 py-3 font-medium">Faltas</th>
              <th scope="col" className="px-3 py-3 font-medium">Uso do limite</th>
              <th scope="col" className="px-5 py-3 font-medium">Laboratório</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.disciplina} className="border-t border-line transition-colors duration-150 hover:bg-surface-2">
                <th scope="row" className="px-5 py-3.5 text-left font-normal">
                  <Identidade codigo={item.disciplina} />
                </th>
                <td className="num px-3 py-3.5">
                  <span className="text-fg">{item.faltas}</span>
                  <span className="text-muted">/{item.limiteFaltas}</span>
                </td>
                <td className="px-3 py-3.5">
                  <BarraAnimada
                    value={item.faltas}
                    max={item.limiteFaltas}
                    tone={tomUso(item.faltas, item.limiteFaltas)}
                    className="w-40"
                    label={`Uso do limite de faltas de ${item.disciplina}`}
                  />
                </td>
                <td className="px-5 py-3.5">{item.lab && <LabPresenca lab={item.lab} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel className="shadow-card lg:hidden">
        <ul className="divide-y divide-line">
          {itens.map((item) => (
            <li key={item.disciplina} className="space-y-3 px-4 py-3.5">
              <div className="flex items-start justify-between gap-3">
                <Identidade codigo={item.disciplina} />
                <p className="num shrink-0 text-base font-semibold text-fg">
                  {item.faltas}
                  <span className="font-normal text-muted">/{item.limiteFaltas}</span>
                </p>
              </div>
              <BarraAnimada
                value={item.faltas}
                max={item.limiteFaltas}
                tone={tomUso(item.faltas, item.limiteFaltas)}
                label={`Uso do limite de faltas de ${item.disciplina}`}
              />
              {item.lab && <LabPresenca lab={item.lab} />}
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
