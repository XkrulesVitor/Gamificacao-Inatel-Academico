"use client";

import { useState } from "react";
import { Chip, ChipGroup, Panel } from "@/components/ui/primitives";
import { getDisciplina, monitores } from "@/lib/mock/aluno";

const codigos = [...new Set(monitores.map((m) => m.disciplina))].sort();

/** Monitores: tabela no desktop, lista agrupada por disciplina no mobile. Filtro por chips. */
export function MonitoresLista() {
  const [filtro, setFiltro] = useState<string>("Todas");
  const lista = filtro === "Todas" ? monitores : monitores.filter((m) => m.disciplina === filtro);
  const grupos = codigos
    .map((codigo) => ({ codigo, nome: getDisciplina(codigo)?.nome ?? codigo, itens: lista.filter((m) => m.disciplina === codigo) }))
    .filter((g) => g.itens.length > 0);

  return (
    <div className="space-y-5">
      <ChipGroup label="Filtrar por disciplina">
        {["Todas", ...codigos].map((op) => (
          <Chip key={op} selected={op === filtro} onClick={() => setFiltro(op)}>
            {op}
          </Chip>
        ))}
      </ChipGroup>

      <Panel className="hidden overflow-hidden shadow-card lg:block">
        <table className="w-full text-left text-[15px]">
          <caption className="sr-only">Monitores</caption>
          <thead className="text-xs font-medium text-muted">
            <tr className="border-b border-line">
              <th scope="col" className="px-5 py-3 font-medium">Disciplina</th>
              <th scope="col" className="px-3 py-3 font-medium">Monitor</th>
              <th scope="col" className="px-3 py-3 font-medium">Dia</th>
              <th scope="col" className="px-3 py-3 font-medium">Horário</th>
              <th scope="col" className="px-5 py-3 font-medium">Local</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((m, i) => (
              <tr key={`${m.disciplina}-${m.nome}-${m.dia}-${i}`} className="border-t border-line transition-colors duration-150 hover:bg-surface-2">
                <th scope="row" className="px-5 py-3.5 text-left font-normal">
                  <span className="num block text-xs text-muted">{m.disciplina}</span>
                  <span className="block font-medium text-fg">{getDisciplina(m.disciplina)?.nome ?? m.disciplina}</span>
                </th>
                <td className="px-3 py-3.5 text-fg">{m.nome}</td>
                <td className="px-3 py-3.5 text-muted">{m.dia}</td>
                <td className="num px-3 py-3.5 text-muted">{m.horario}</td>
                <td className="px-5 py-3.5 text-muted">{m.local}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <div className="space-y-4 lg:hidden">
        {grupos.map((g) => (
          <Panel key={g.codigo} className="overflow-hidden shadow-card">
            <header className="border-b border-line bg-surface-2 px-4 py-3">
              <p className="text-sm font-semibold text-fg">
                <span className="num">{g.codigo}</span> · {g.nome}
              </p>
            </header>
            <ul className="divide-y divide-line">
              {g.itens.map((m, i) => (
                <li key={`${m.nome}-${m.dia}-${i}`} className="px-4 py-3">
                  <p className="font-medium text-fg">{m.nome}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {m.dia.replace("-feira", "")} · <span className="num">{m.horario}</span> · {m.local}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </div>
  );
}
