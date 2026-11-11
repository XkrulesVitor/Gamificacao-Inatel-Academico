"use client";

import clsx from "clsx";
import { useState } from "react";
import { Check, ChevronDown, ListFilter } from "lucide-react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { opcoesFiltro, type OpcaoFiltro } from "@/lib/ranking";

const grupos: OpcaoFiltro["grupo"][] = ["Visão", "Laboratórios"];

/** Menu suspenso de filtro (botão que abre um BottomSheet de opções agrupadas). */
export function FiltroRanking({
  valor,
  onChange,
}: {
  valor: OpcaoFiltro;
  onChange: (id: string) => void;
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-haspopup="dialog"
        aria-expanded={aberto}
        className="flex min-h-14 w-full items-center gap-3 rounded-card border border-line-strong bg-surface-1 px-3.5 py-2.5 text-left outline-none transition active:bg-surface-2 focus-visible:ring-2 focus-visible:ring-brand"
      >
        <ListFilter className="size-5 shrink-0 text-brand" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Filtrar por</span>
          <span className="block truncate text-[15px] font-semibold text-fg">{valor.label}</span>
          <span className="block truncate text-xs text-muted">{valor.descricao}</span>
        </span>
        <ChevronDown className="size-5 shrink-0 text-muted" aria-hidden />
      </button>

      <BottomSheet open={aberto} onClose={() => setAberto(false)} title="Filtrar ranking">
        <div role="radiogroup" aria-label="Filtro do ranking" className="space-y-4 pb-2">
          {grupos.map((g) => (
            <div key={g}>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">{g}</p>
              <ul className="overflow-hidden rounded-xl border border-line bg-surface-1">
                {opcoesFiltro
                  .filter((o) => o.grupo === g)
                  .map((o) => {
                    const sel = o.id === valor.id;
                    return (
                      <li key={o.id} className="border-b border-line last:border-b-0">
                        <button
                          type="button"
                          role="radio"
                          aria-checked={sel}
                          onClick={() => {
                            onChange(o.id);
                            setAberto(false);
                          }}
                          className={clsx(
                            "flex min-h-14 w-full items-center gap-3 px-3.5 py-2.5 text-left outline-none transition focus-visible:bg-surface-3",
                            sel ? "bg-brand/15" : "active:bg-surface-2",
                          )}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-[15px] font-semibold text-fg">{o.label}</span>
                            <span className="block text-xs text-muted">{o.descricao}</span>
                          </span>
                          {sel && <Check className="size-5 shrink-0 text-brand" aria-hidden />}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
