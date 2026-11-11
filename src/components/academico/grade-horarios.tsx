"use client";

import { Fragment, useState } from "react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { HOJE } from "@/lib/format";
import { aulas, diasGrade, getDisciplina, getLaboratorio, horariosGrade } from "@/lib/mock/aluno";
import type { Aula, DiaSemana } from "@/lib/types";
import { isLaboratorio } from "./utils";

/** Id do dia de hoje ("qua" no protótipo), ou null em fins de semana. */
function diaDeHoje(): DiaSemana | null {
  const dow = new Date(`${HOJE}T12:00:00`).getDay(); // 0 = domingo, 1 = segunda...
  return dow >= 1 && dow <= 6 ? diasGrade[dow - 1].id : null;
}

function aulaEm(dia: DiaSemana, hora: string): Aula | undefined {
  return aulas.find((a) => a.dia === dia && a.hora === hora);
}

function DetalheAula({ aula }: { aula: Aula }) {
  const disciplina = getDisciplina(aula.disciplina);
  const lab = isLaboratorio(aula.turma);
  const laboratorio = lab && disciplina?.laboratorioId ? getLaboratorio(disciplina.laboratorioId) : undefined;
  const dia = diasGrade.find((d) => d.id === aula.dia)?.longo ?? "";

  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-semibold text-fg">
          {aula.disciplina} - {disciplina?.nome ?? ""}
        </p>
        <p className="text-sm text-muted">Turma {aula.turma}</p>
      </div>

      <dl className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface-1 text-[15px]">
        <div className="flex flex-col gap-0.5 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Professor</dt>
          <dd className="text-fg">{disciplina?.professor ?? "—"}</dd>
        </div>
        <div className="flex flex-col gap-0.5 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Tipo</dt>
          <dd className="text-fg">
            {lab ? "Laboratório" : "Teoria"}
            {laboratorio && <span className="block text-sm text-muted">{laboratorio.nome}</span>}
          </dd>
        </div>
        <div className="flex flex-col gap-0.5 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Dia</dt>
          <dd className="text-fg">{dia}</dd>
        </div>
        <div className="flex flex-col gap-0.5 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Horário</dt>
          <dd className="text-fg">{aula.hora}</dd>
        </div>
      </dl>
    </div>
  );
}

/**
 * Grade semanal reproduzindo o print "Horários de Aula": cabeçalho preto com HORA e dias,
 * coluna de horários azul, células cinzas com a turma. Cabe em 390px sem rolagem horizontal.
 */
export function GradeHorarios() {
  const [selecionada, setSelecionada] = useState<Aula | null>(null);
  const hoje = diaDeHoje();

  return (
    <div className="-mx-4">
      <div className="grid grid-cols-[56px_repeat(6,minmax(0,1fr))] gap-[2px] bg-black">
        <div className="flex h-10 items-center justify-center bg-black text-[12px] font-bold text-fg">HORA</div>
        {diasGrade.map((d) => {
          const eHoje = d.id === hoje;
          return (
            <div
              key={d.id}
              className={`flex h-10 items-center justify-center text-[13px] font-bold ${
                eHoje ? "bg-surface-2 text-brand" : "bg-black text-fg"
              }`}
            >
              <span aria-hidden>{d.curto}</span>
              <span className="sr-only">{d.longo}</span>
            </div>
          );
        })}

        {horariosGrade.map((hora) => (
          <Fragment key={hora}>
            <div className="flex h-12 items-center justify-center bg-hour text-[12px] font-semibold text-white">{hora}</div>
            {diasGrade.map((d) => {
              const aula = aulaEm(d.id, hora);
              const eHoje = d.id === hoje;
              const destaqueHoje = eHoje ? "ring-1 ring-inset ring-white/60" : "";
              if (!aula) {
                return <div key={d.id} className={`h-12 bg-cell ${destaqueHoje}`} aria-hidden />;
              }
              const disciplina = getDisciplina(aula.disciplina);
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelecionada(aula)}
                  aria-label={`${aula.disciplina} ${aula.turma}, ${d.longo}, ${hora}. Ver detalhes`}
                  title={disciplina?.nome}
                  className={`h-12 bg-cell px-0.5 text-[12px] font-semibold text-white transition active:brightness-125 ${destaqueHoje}`}
                >
                  {aula.disciplina} - {aula.turma}
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>

      <p className="mt-3 px-4 text-center text-xs text-muted">L = laboratório · A = teoria</p>

      <BottomSheet open={selecionada !== null} onClose={() => setSelecionada(null)} title="Detalhes da aula">
        {selecionada && <DetalheAula aula={selecionada} />}
      </BottomSheet>
    </div>
  );
}
