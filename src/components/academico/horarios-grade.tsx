"use client";

import { Fragment, useState } from "react";
import { FlaskConical } from "lucide-react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Panel } from "@/components/ui/primitives";
import { HOJE } from "@/lib/format";
import { aulas, diasGrade, getDisciplina, getLaboratorio, horariosGrade } from "@/lib/mock/aluno";
import { useIsDesktop } from "@/lib/use-media";
import type { Aula, DiaSemana } from "@/lib/types";
import { isLaboratorio } from "./utils";

const DIA_CURTO: Record<DiaSemana, string> = { seg: "Seg", ter: "Ter", qua: "Qua", qui: "Qui", sex: "Sex", sab: "Sáb" };

/** Id do dia de hoje ("qua" no protótipo), ou null em fins de semana. */
function diaDeHoje(): DiaSemana | null {
  const dow = new Date(`${HOJE}T12:00:00`).getDay(); // 0 = domingo, 1 = segunda...
  return dow >= 1 && dow <= 6 ? diasGrade[dow - 1].id : null;
}

const hoje = diaDeHoje();

/** Próxima aula de hoje (primeira do dia na grade). */
const proximaHoje: Aula | undefined = hoje
  ? aulas.filter((a) => a.dia === hoje).sort((a, b) => a.hora.localeCompare(b.hora))[0]
  : undefined;

function aulaEm(dia: DiaSemana, hora: string): Aula | undefined {
  return aulas.find((a) => a.dia === dia && a.hora === hora);
}

function Linha({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-3 py-3">
      <dt className="text-sm text-muted">{rotulo}</dt>
      <dd className="text-[15px] text-fg">{children}</dd>
    </div>
  );
}

function DetalheAula({ aula }: { aula: Aula }) {
  const disciplina = getDisciplina(aula.disciplina);
  const lab = isLaboratorio(aula.turma);
  const laboratorio = lab && disciplina?.laboratorioId ? getLaboratorio(disciplina.laboratorioId) : undefined;
  const dia = diasGrade.find((d) => d.id === aula.dia)?.longo ?? "";

  return (
    <div className="space-y-4">
      <div>
        <p className="num text-xs text-muted">{aula.disciplina}</p>
        <p className="text-lg font-semibold text-fg">{disciplina?.nome ?? aula.disciplina}</p>
      </div>

      <dl className="divide-y divide-line">
        <Linha rotulo="Professor">{disciplina?.professor}</Linha>
        <Linha rotulo="Tipo">
          {lab ? "Laboratório" : "Teoria"}
          {laboratorio && <span className="block text-sm text-muted">{laboratorio.nome}</span>}
        </Linha>
        <Linha rotulo="Dia">{dia}</Linha>
        <Linha rotulo="Horário">
          <span className="num">{aula.hora}</span>
        </Linha>
      </dl>
    </div>
  );
}

/** Desktop: detalhe da aula selecionada numa faixa acima da grade (a grade usa a largura toda). */
function FaixaAula({ aula }: { aula: Aula }) {
  const disciplina = getDisciplina(aula.disciplina);
  const lab = isLaboratorio(aula.turma);
  const laboratorio = lab && disciplina?.laboratorioId ? getLaboratorio(disciplina.laboratorioId) : undefined;
  const dia = diasGrade.find((d) => d.id === aula.dia)?.longo ?? "";
  const fatos: [string, React.ReactNode][] = [
    ["Professor", disciplina?.professor],
    ["Tipo", laboratorio ? laboratorio.nome : lab ? "Laboratório" : "Teoria"],
    ["Quando", <span key="q" className="num">{`${dia}, ${aula.hora}`}</span>],
  ];
  return (
    <Panel className="mb-4 hidden items-center gap-8 px-5 py-4 shadow-card lg:flex" aria-live="polite">
      <div className="min-w-0 shrink-0">
        <p className="num text-xs text-muted">{aula.disciplina}</p>
        <p className="text-base font-semibold tracking-tight text-fg">{disciplina?.nome ?? aula.disciplina}</p>
      </div>
      <dl className="flex min-w-0 flex-1 flex-wrap gap-x-8 gap-y-2 border-l border-line pl-8">
        {fatos.map(([rotulo, valor]) => (
          <div key={rotulo} className="min-w-0">
            <dt className="text-xs text-muted">{rotulo}</dt>
            <dd className="truncate text-sm text-fg">{valor}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

/**
 * Grade semanal do print "Horários de Aula": cabeçalho preto, coluna de horas azul-marinho,
 * células cinzas. Laboratório mostra o ícone e a turma. Mobile: toque abre BottomSheet.
 * Desktop: grade na largura toda e faixa de detalhe acima (padrão: próxima aula de hoje).
 */
export function HorariosGrade() {
  const isDesktop = useIsDesktop();
  const [selecionada, setSelecionada] = useState<Aula | null>(null);
  const [sheetAberto, setSheetAberto] = useState(false);

  const exibida = selecionada ?? proximaHoje ?? null;

  function selecionar(aula: Aula) {
    setSelecionada(aula);
    if (!isDesktop) setSheetAberto(true);
  }

  return (
    <>
      {exibida && <FaixaAula aula={exibida} />}
      <div
          className="-mx-4 -mt-4 grid grid-cols-[52px_repeat(6,minmax(0,1fr))] gap-[2px] bg-line-strong lg:mx-0 lg:mt-0 lg:grid-cols-[96px_repeat(6,minmax(0,1fr))] lg:overflow-hidden lg:rounded-card lg:border lg:border-line-strong lg:shadow-card">
            <div className="flex h-10 items-center justify-center bg-header text-xs font-bold text-on-header lg:text-[13px]">HORA</div>
            {diasGrade.map((d) => {
              const eHoje = d.id === hoje;
              return (
                <div
                  key={d.id}
                  className="relative flex h-10 items-center justify-center bg-header text-[11px] font-bold text-on-header lg:text-[13px]"
                >
                  <span aria-hidden>{DIA_CURTO[d.id]}</span>
                  <span className="sr-only">{d.longo}</span>
                  {eHoje && <span aria-hidden className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gold" />}
                </div>
              );
            })}

            {horariosGrade.map((hora) => {
              const vazia = !diasGrade.some((d) => aulaEm(d.id, hora));
              return (
              <Fragment key={hora}>
                <div
                  className={`flex items-center justify-center bg-navy-deep font-semibold text-on-header ${
                    vazia ? "h-6 text-[11px] opacity-80 lg:h-8 lg:text-xs" : "h-12 text-xs lg:h-16 lg:text-[13px]"
                  }`}
                >
                  {hora}
                </div>
                {diasGrade.map((d) => {
                  const aula = aulaEm(d.id, hora);
                  const eHoje = d.id === hoje;
                  if (!aula) {
                    return (
                      <div
                        key={d.id}
                        aria-hidden
                        className={vazia ? "h-6 bg-surface-1 lg:h-8" : `h-12 lg:h-16 ${eHoje ? "bg-surface-3" : "bg-surface-2"}`}
                      />
                    );
                  }
                  const disciplina = getDisciplina(aula.disciplina);
                  const lab = isLaboratorio(aula.turma);
                  const ativa = aula === exibida;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => selecionar(aula)}
                      aria-label={`${aula.disciplina} ${aula.turma}, ${d.longo}, ${hora}`}
                      aria-pressed={ativa}
                      className={`flex h-12 w-full flex-col items-center justify-center overflow-hidden bg-surface-1 px-0.5 text-center transition-colors duration-150 hover:bg-surface-2 dark:bg-surface-4 dark:hover:bg-surface-3 focus-visible:z-10 lg:h-16 lg:items-start lg:justify-center lg:px-2 lg:text-left ${
                        ativa ? "ring-2 ring-inset ring-accent" : ""
                      }`}
                    >
                      <span className="block max-w-full truncate text-xs font-semibold text-fg lg:text-[13px]">{aula.disciplina}</span>
                      <span className="hidden text-[11px] leading-tight text-muted lg:line-clamp-2 lg:[overflow-wrap:normal] lg:[word-break:normal]">{disciplina?.nome}</span>
                      {lab && (
                        <span className="flex items-center gap-1 text-[11px] text-muted">
                          <FlaskConical className="size-3" strokeWidth={1.75} aria-hidden />
                          {aula.turma}
                        </span>
                      )}
                    </button>
                  );
                })}
              </Fragment>
              );
            })}
      </div>

      <BottomSheet open={sheetAberto} onClose={() => setSheetAberto(false)} title="Detalhes da aula" hideTitle>
        {selecionada && <DetalheAula aula={selecionada} />}
      </BottomSheet>
    </>
  );
}
