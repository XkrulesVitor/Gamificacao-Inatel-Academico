import clsx from "clsx";
import { fmt1 } from "@/lib/format";
import type { Coeficientes } from "@/lib/types";

const MIN = 70;
const MAX = 90;
const MARCAS = [70, 75, 80, 85, 90];

/** Posição vertical (%) de um valor de CR na escala 70 a 90. */
const posicao = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;

/**
 * Histórico do CR em barras CSS. Escala 70 a 90, grade fina, rótulo em cada barra,
 * linha tracejada na meta da medalha (dourado: é conquista).
 */
export function HistoricoCR({ historico, meta }: { historico: Coeficientes["historicoCR"]; meta: number }) {
  const ultimo = historico.length - 1;
  return (
    <div
      role="img"
      aria-label={`Histórico do CR: ${historico.map((h) => `${h.periodo} período, ${fmt1(h.cr)}`).join("; ")}. Meta da medalha: ${meta}.`}
    >
      <div className="flex gap-3">
        <div className="relative h-56 w-7 shrink-0 lg:h-80" aria-hidden>
          {MARCAS.map((v) => (
            <span
              key={v}
              className="absolute right-0 translate-y-1/2 text-xs leading-none tabular-nums text-subtle"
              style={{ bottom: `${posicao(v)}%` }}
            >
              {v}
            </span>
          ))}
        </div>

        <div className="relative h-56 min-w-0 flex-1 lg:h-80" aria-hidden>
          {MARCAS.map((v) => (
            <div key={v} className="absolute inset-x-0 border-t border-line" style={{ bottom: `${posicao(v)}%` }} />
          ))}

          <div className="absolute inset-0 flex justify-around gap-3">
            {historico.map((h, i) => (
              <div key={h.periodo} className="relative h-full max-w-14 flex-1">
                <div
                  className={clsx("absolute inset-x-0 bottom-0 rounded-t-md", i === ultimo ? "bg-accent" : "bg-surface-4")}
                  style={{ height: `${posicao(h.cr)}%` }}
                />
                <span
                  className="absolute inset-x-0 text-center text-xs font-semibold tabular-nums text-fg"
                  style={{ bottom: `calc(${posicao(h.cr)}% + 6px)` }}
                >
                  {fmt1(h.cr)}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 border-t border-dashed border-gold" style={{ bottom: `${posicao(meta)}%` }}>
            <span className="absolute right-0 -translate-y-full pb-0.5 text-xs font-semibold tabular-nums text-gold">{meta}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-around gap-3 pl-10" aria-hidden>
        {historico.map((h) => (
          <span key={h.periodo} className="max-w-14 flex-1 text-center text-xs text-muted">
            {h.periodo}
          </span>
        ))}
      </div>
    </div>
  );
}
