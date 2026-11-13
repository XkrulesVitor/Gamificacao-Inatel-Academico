"use client";

import { useId } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import {
  Award,
  ClipboardCheck,
  Clock,
  Crown,
  Flame,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Lock,
  Rocket,
  Sunrise,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { EASE, metalVar, mix } from "@/components/gamificacao/metal";
import type { IconeMedalha, Raridade } from "@/lib/types";

const icones: Record<IconeMedalha, LucideIcon> = {
  Award,
  FlaskConical,
  GraduationCap,
  Rocket,
  Sunrise,
  ClipboardCheck,
  Trophy,
  Clock,
  Flame,
  Users,
  HeartHandshake,
  Crown,
};

/* Geometria no viewBox 100×100: disco no terço superior, fita (conquistada) ou anel (bloqueada) em volta. */
const CX = 50;
const CY = 42;
const R_ARO = 30;
const R_PAREDE = 26.4;
const R_FACE = 24.8;
const R_ANEL = 37;

const FITA_E = "M38.5 57 L49 61 L39.5 96.5 L34.6 90.6 L28.4 94.6 Z";
const FITA_D = "M61.5 57 L51 61 L60.5 96.5 L65.4 90.6 L71.6 94.6 Z";

/**
 * Emblema da medalha.
 * Conquistada: disco metálico com aro, parede interna, face abaulada, ícone gravado e fita azul-marinho.
 * Bloqueada: disco cinza, anel de progresso em volta (o anel é o dado) e cadeado discreto no fecho.
 * O tamanho vem de `size` (px) ou de classes de largura e altura em `className`.
 */
export function MedalEmblem({
  raridade,
  icone,
  bloqueada,
  progresso = 0,
  size,
  className,
  brilho = false,
  atraso = 0,
}: {
  raridade: Raridade;
  icone: IconeMedalha;
  bloqueada?: boolean;
  /** 0..1, desenhado como anel quando bloqueada */
  progresso?: number;
  size?: number;
  className?: string;
  /** "hover": brilho passa no hover/foco do `group` pai. "montar": passa uma vez ao aparecer. */
  brilho?: false | "hover" | "montar";
  /** atraso (s) do desenho do anel */
  atraso?: number;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reduzir = useReducedMotion();
  const Icone = icones[icone];
  const p = Math.max(0, Math.min(1, progresso));
  const id = (n: string) => `${uid}-${n}`;

  return (
    <span
      aria-hidden
      className={clsx("relative inline-block shrink-0", !bloqueada && metalVar[raridade], className)}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg viewBox="0 0 100 100" className="block size-full overflow-visible">
        <defs>
          <filter id={id("sombra")} x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="1.6" stdDeviation="1.5" floodColor="black" floodOpacity={bloqueada ? 0.1 : 0.26} />
          </filter>
          {bloqueada ? (
            <>
              <linearGradient id={id("aro")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: "var(--surface-2)" }} />
                <stop offset="1" style={{ stopColor: "var(--line-strong)" }} />
              </linearGradient>
              <linearGradient id={id("face")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: "var(--surface-3)" }} />
                <stop offset="1" style={{ stopColor: "var(--surface-2)" }} />
              </linearGradient>
            </>
          ) : (
            <>
              <linearGradient id={id("aro")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: mix("var(--m)", 42, "white") }} />
                <stop offset="0.5" style={{ stopColor: "var(--m)" }} />
                <stop offset="1" style={{ stopColor: mix("var(--m)", 52, "black") }} />
              </linearGradient>
              <linearGradient id={id("parede")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: mix("var(--m)", 48, "black") }} />
                <stop offset="1" style={{ stopColor: mix("var(--m)", 55, "white") }} />
              </linearGradient>
              <radialGradient id={id("face")} cx="0.38" cy="0.28" r="0.85">
                <stop offset="0" style={{ stopColor: mix("var(--m)", 52, "white") }} />
                <stop offset="0.55" style={{ stopColor: "var(--m)" }} />
                <stop offset="1" style={{ stopColor: mix("var(--m)", 74, "black") }} />
              </radialGradient>
              <linearGradient id={id("fita")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: "var(--header-2)" }} />
                <stop offset="1" style={{ stopColor: "var(--header)" }} />
              </linearGradient>
              <clipPath id={id("fe")}>
                <path d={FITA_E} />
              </clipPath>
              <clipPath id={id("fd")}>
                <path d={FITA_D} />
              </clipPath>
            </>
          )}
        </defs>

        {bloqueada ? (
          <>
            <circle cx={CX} cy={CY} r={R_ANEL} fill="none" className="[stroke:var(--surface-4)] dark:[stroke:var(--surface-3)]" strokeWidth="3.2" />
            {p > 0 && (
              <g transform={`rotate(-90 ${CX} ${CY})`}>
                <motion.circle
                  cx={CX}
                  cy={CY}
                  r={R_ANEL}
                  fill="none"
                  style={{ stroke: "var(--accent)" }}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  initial={reduzir ? { pathLength: p, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: p, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.8, ease: EASE, delay: atraso },
                    opacity: { duration: 0.01, delay: atraso },
                  }}
                />
              </g>
            )}
            <g filter={`url(#${id("sombra")})`}>
              <circle cx={CX} cy={CY} r={R_ARO} fill={`url(#${id("aro")})`} />
            </g>
            <circle cx={CX} cy={CY} r={R_FACE} fill={`url(#${id("face")})`} />
            <circle cx={CX} cy={CY} r={R_FACE} fill="none" style={{ stroke: "var(--line-strong)" }} strokeWidth="0.8" />
            <Icone x={CX - 12} y={CY - 12} size={24} strokeWidth={1.75} style={{ color: "var(--subtle)" }} />
            <circle cx={CX} cy={CY + R_ANEL} r="8.6" style={{ fill: "var(--surface-1)", stroke: "var(--line-strong)" }} strokeWidth="1.1" />
            <Lock x={CX - 5} y={CY + R_ANEL - 5.4} size={10} strokeWidth={2.4} style={{ color: "var(--muted)" }} />
          </>
        ) : (
          <>
            <g filter={`url(#${id("sombra")})`}>
              <path d={FITA_E} fill={`url(#${id("fita")})`} />
              <path d={FITA_D} fill={`url(#${id("fita")})`} />
            </g>
            <g clipPath={`url(#${id("fe")})`}>
              <path d="M43.6 58 L33.9 97" style={{ stroke: "var(--m)" }} strokeWidth="2.6" />
            </g>
            <g clipPath={`url(#${id("fd")})`}>
              <path d="M56.4 58 L66.1 97" style={{ stroke: "var(--m)" }} strokeWidth="2.6" />
            </g>
            <g filter={`url(#${id("sombra")})`}>
              <circle cx={CX} cy={CY} r={R_ARO} fill={`url(#${id("aro")})`} />
            </g>
            <circle cx={CX} cy={CY} r={R_PAREDE} fill={`url(#${id("parede")})`} />
            <circle cx={CX} cy={CY} r={R_FACE} fill={`url(#${id("face")})`} />
            <circle
              cx={CX}
              cy={CY}
              r={21.8}
              fill="none"
              style={{ stroke: mix("var(--m)", 45, "black") }}
              strokeOpacity="0.35"
              strokeWidth="0.8"
            />
            <ellipse cx={CX} cy={CY - 12.5} rx="14" ry="6" fill="white" opacity="0.2" />
            <Icone
              x={CX - 12}
              y={CY - 12 + 0.9}
              size={24}
              strokeWidth={2}
              style={{ color: mix("var(--m)", 45, "white") }}
              opacity={0.75}
            />
            <Icone x={CX - 12} y={CY - 12} size={24} strokeWidth={2} style={{ color: mix("var(--m)", 36, "black") }} />
          </>
        )}
      </svg>
      {!bloqueada && brilho && (
        <span
          className={clsx(
            "sheen pointer-events-none absolute left-[20%] top-[12%] size-[60%] rounded-full",
            brilho === "montar"
              ? "animate-sheen"
              : "opacity-0 group-hover:animate-sheen group-hover:opacity-100 group-focus-visible:animate-sheen group-focus-visible:opacity-100",
          )}
          style={brilho === "montar" ? { animationDelay: "350ms" } : undefined}
        />
      )}
    </span>
  );
}
