"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, mix } from "@/components/gamificacao/metal";

export const ESCUDO = "M32 2 L58 9.5 V32 C58 50 47.5 62.5 32 70 C16.5 62.5 6 50 6 32 V9.5 Z";
const ESCUDO_CAMPO = "M32 7 L53.4 13.2 V32 C53.4 47 45 57.6 32 64.6 C19 57.6 10.6 47 10.6 32 V13.2 Z";
const ESCUDO_FIO = "M32 10.4 L50.6 15.8 V32 C50.6 45.4 43.2 55 32 61.3 C20.8 55 13.4 45.4 13.4 32 V15.8 Z";

/** Emblema de nível: escudo com aro dourado, campo azul-marinho e o número. Um brilho passa uma vez ao montar. */
export function EmblemaNivel({ numero, className }: { numero: number; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reduzir = useReducedMotion();
  const id = (n: string) => `${uid}-${n}`;
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden>
      <defs>
        <linearGradient id={id("ouro")} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" style={{ stopColor: mix("var(--gold)", 45, "white") }} />
          <stop offset="0.45" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: mix("var(--gold)", 55, "black") }} />
        </linearGradient>
        <linearGradient id={id("campo")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--header-2)" }} />
          <stop offset="1" style={{ stopColor: mix("var(--header)", 72, "black") }} />
        </linearGradient>
        <linearGradient id={id("brilho")} x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.55" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={id("clip")}>
          <path d={ESCUDO} />
        </clipPath>
        <filter id={id("sombra")} x="-30%" y="-20%" width="160%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="black" floodOpacity="0.35" />
        </filter>
      </defs>
      <path d={ESCUDO} fill={`url(#${id("ouro")})`} filter={`url(#${id("sombra")})`} />
      <path d={ESCUDO_CAMPO} fill={`url(#${id("campo")})`} />
      <path d={ESCUDO_FIO} fill="none" style={{ stroke: "var(--gold)" }} strokeOpacity="0.5" strokeWidth="0.8" />
      <path d="M24 21.5 L32 18.5 L40 21.5" fill="none" style={{ stroke: "var(--gold)" }} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <text
        x="32"
        y="39.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="23"
        fontWeight="700"
        className="num"
        style={{ fill: "var(--on-header)", letterSpacing: "-0.02em" }}
      >
        {numero}
      </text>
      {!reduzir && (
        <g clipPath={`url(#${id("clip")})`}>
          <motion.rect
            y="-4"
            width="26"
            height="80"
            fill={`url(#${id("brilho")})`}
            initial={{ x: -34 }}
            animate={{ x: 70 }}
            transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
          />
        </g>
      )}
    </svg>
  );
}
