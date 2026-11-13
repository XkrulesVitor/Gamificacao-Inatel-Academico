"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/gamificacao/metal";

const ALTURA = 132;
const TOPO = 20;
const BASE = 24;
const ESQ = 14;
const DIR = 16;
/** Eixo invertido: 1º no topo, 10º na base. */
const PIOR = 10;

/** Evolução semanal da posição. A linha desenha uma vez; a faixa tracejada marca o Top 3. */
export function GraficoEvolucao({ dados }: { dados: { semana: string; posicao: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [largura, setLargura] = useState(0);
  const reduzir = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setLargura(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = dados.length;
  const x = (i: number) => ESQ + (i * (largura - ESQ - DIR)) / Math.max(1, n - 1);
  const y = (p: number) => TOPO + ((Math.min(p, PIOR) - 1) / (PIOR - 1)) * (ALTURA - TOPO - BASE);
  const pontos = dados.map((d, i) => [x(i), y(d.posicao)] as const);
  const linha = pontos.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
  const fundo = `${linha} L${pontos[n - 1]?.[0].toFixed(1)} ${ALTURA - BASE} L${pontos[0]?.[0].toFixed(1)} ${ALTURA - BASE} Z`;
  const yTop3 = y(3);
  const descricao = dados.map((d) => `${d.semana}: ${d.posicao}º`).join(", ");

  return (
    <div ref={ref} className="w-full" style={{ height: ALTURA }}>
      {largura > 0 && (
        <svg width={largura} height={ALTURA} role="img" aria-label={`Evolução da posição no geral. ${descricao}`} className="block overflow-visible">
          <defs>
            <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "var(--accent)" }} stopOpacity="0.18" />
              <stop offset="1" style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
            </linearGradient>
          </defs>

          <line x1={ESQ} x2={largura - DIR} y1={ALTURA - BASE} y2={ALTURA - BASE} style={{ stroke: "var(--line)" }} />
          <line
            x1={ESQ}
            x2={largura - DIR}
            y1={yTop3}
            y2={yTop3}
            style={{ stroke: "var(--gold)" }}
            strokeOpacity="0.7"
            strokeDasharray="3 4"
          />
          <text x={ESQ} y={yTop3 - 6} className="text-[11px] font-medium" style={{ fill: "var(--gold-ink)" }}>
            Top 3
          </text>

          <motion.path
            d={fundo}
            fill={`url(#${uid}-area)`}
            initial={{ opacity: reduzir ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          />
          <motion.path
            d={linha}
            fill="none"
            style={{ stroke: "var(--accent)" }}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduzir ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          />

          {dados.map((d, i) => {
            const [px, py] = pontos[i];
            const ultimo = i === n - 1;
            return (
              <g key={d.semana}>
                <motion.circle
                  cx={px}
                  cy={py}
                  r={ultimo ? 5 : 3}
                  style={{ fill: ultimo ? "var(--accent)" : "var(--surface-1)", stroke: "var(--accent)" }}
                  strokeWidth={ultimo ? 0 : 1.75}
                  initial={reduzir ? false : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: 0.15 + i * 0.09 }}
                />
                {ultimo && (
                  <circle cx={px} cy={py} r="9" fill="none" style={{ stroke: "var(--accent)" }} strokeOpacity="0.3" strokeWidth="1.5" />
                )}
                <text
                  x={px}
                  y={py - (ultimo ? 13 : 9)}
                  textAnchor="middle"
                  className={ultimo ? "num text-[13px] font-semibold" : "num text-[11px]"}
                  style={{ fill: ultimo ? "var(--fg)" : "var(--muted)" }}
                >
                  {d.posicao}º
                </text>
                <text x={px} y={ALTURA - 6} textAnchor="middle" className="num text-[11px]" style={{ fill: "var(--subtle)" }}>
                  {d.semana}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
