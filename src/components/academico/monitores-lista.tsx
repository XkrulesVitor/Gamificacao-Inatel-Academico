"use client";

import { useState } from "react";
import clsx from "clsx";
import { monitores } from "@/lib/mock/aluno";

const codigos = [...new Set(monitores.map((m) => m.disciplina))].sort();

/** Lista de monitores com chips de filtro por disciplina, no layout do print "Monitores". */
export function MonitoresLista() {
  const [filtro, setFiltro] = useState<string>("Todas");
  const lista = filtro === "Todas" ? monitores : monitores.filter((m) => m.disciplina === filtro);
  const opcoes = ["Todas", ...codigos];

  return (
    <div className="space-y-4">
      <div role="group" aria-label="Filtrar por disciplina" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {opcoes.map((op) => {
          const ativo = op === filtro;
          return (
            <button
              key={op}
              type="button"
              aria-pressed={ativo}
              onClick={() => setFiltro(op)}
              className={clsx(
                "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition",
                ativo ? "border-primary-strong bg-primary text-white" : "border-line bg-surface-2 text-muted hover:text-fg",
              )}
            >
              {op}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {lista.map((m, i) => (
          <article key={`${m.disciplina}-${m.nome}-${m.dia}-${i}`} className="overflow-hidden rounded-md bg-surface-2">
            <header className="px-4 py-3 text-center">
              <p className="text-[17px] text-fg">{m.disciplina}</p>
              <p className="text-[17px] text-fg">{m.nome}</p>
            </header>
            <div className="grid grid-cols-3 gap-px bg-line-strong text-center">
              <div className="bg-surface-3 py-2 text-sm font-bold text-fg">Dia</div>
              <div className="bg-surface-3 py-2 text-sm font-bold text-fg">Horário</div>
              <div className="bg-surface-3 py-2 text-sm font-bold text-fg">Local</div>

              <div className="flex items-center justify-center bg-teal px-1 py-3 text-sm text-white">{m.dia}</div>
              <div className="flex items-center justify-center bg-cell px-1 py-3 text-sm text-white">{m.horario}</div>
              <div className="flex items-center justify-center bg-cell px-1 py-3 text-sm text-white">{m.local}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
