"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Panel } from "@/components/ui/primitives";
import { fmt1 } from "@/lib/format";
import { useCountUp } from "@/lib/use-count-up";
import type { Coeficientes } from "@/lib/types";
import { BarraAnimada } from "./barra-animada";

/** Resumo do topo: CR (com variação), CRA e créditos. CR e CRA contam no primeiro render. */
export function CRResumo({ dados }: { dados: Coeficientes }) {
  const { cr, crPeriodoAnterior, cra, creditosCursados, creditosTotais } = dados;
  const variacao = cr - crPeriodoAnterior;
  const sobe = variacao >= 0;
  const Seta = sobe ? TrendingUp : TrendingDown;
  const crVivo = useCountUp(cr);
  const craVivo = useCountUp(cra);

  return (
    <Panel className="grid grid-cols-3 divide-x divide-line shadow-card">
      <div className="min-w-0 space-y-2 p-4 lg:p-5">
        <p className="text-sm text-muted">CR</p>
        <p className="flex flex-wrap items-baseline gap-x-2 text-3xl font-bold leading-none tracking-tight text-fg lg:text-4xl">
          <span className="num">{fmt1(crVivo)}</span>
          <span className="num inline-flex items-center gap-1 text-base font-medium tracking-normal text-muted">
            <Seta className="size-4 text-accent" strokeWidth={1.75} aria-hidden />
            {sobe ? "+" : "-"}
            {fmt1(Math.abs(variacao))}
          </span>
        </p>
      </div>

      <div className="min-w-0 space-y-2 p-4 lg:p-5">
        <p className="text-sm text-muted">CRA</p>
        <p className="num text-3xl font-bold leading-none tracking-tight text-fg lg:text-4xl">{fmt1(craVivo)}</p>
      </div>

      <div className="min-w-0 space-y-2 p-4 lg:p-5">
        <p className="text-sm text-muted">Créditos</p>
        <p className="num text-3xl font-bold leading-none tracking-tight text-fg lg:text-4xl">
          {creditosCursados}
          <span className="text-base font-medium text-muted">/{creditosTotais}</span>
        </p>
        <BarraAnimada value={creditosCursados} max={creditosTotais} label="Créditos cursados" />
      </div>
    </Panel>
  );
}
