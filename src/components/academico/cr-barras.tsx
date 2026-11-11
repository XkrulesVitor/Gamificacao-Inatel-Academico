import { fmt1 } from "@/lib/format";
import type { Coeficientes } from "@/lib/types";

/** Gráfico de barras simples em CSS (escala 0–100), com rótulo de valor em cada barra. */
export function CRBarras({ historico }: { historico: Coeficientes["historicoCR"] }) {
  const ultimo = historico.length - 1;
  return (
    <div
      className="flex h-48 items-end justify-around gap-3"
      role="img"
      aria-label={`Histórico do CR: ${historico.map((h) => `${h.periodo} período ${fmt1(h.cr)}`).join(", ")}`}
    >
      {historico.map((h, i) => (
        <div key={h.periodo} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
          <span className="text-xs font-semibold tabular-nums text-fg">{fmt1(h.cr)}</span>
          <div
            className={`w-full max-w-12 rounded-t-md ${i === ultimo ? "bg-gold" : "bg-brand"}`}
            style={{ height: `${(h.cr / 100) * 130}px` }}
          />
          <span className="text-xs text-muted">{h.periodo}</span>
        </div>
      ))}
    </div>
  );
}
