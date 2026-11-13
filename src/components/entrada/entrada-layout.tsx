"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { InatelLogo } from "@/components/ui/primitives";

export const PERFIL_KEY = "inatel-academico:perfil";

const EASE = [0.16, 1, 0.3, 1] as const;
const RODAPE = "Protótipo acadêmico · dados fictícios";

/** As ondas desenham só na primeira tela de entrada da visita (não repetem ao ir de Perfis para Login). */
let ondasDesenhadas = false;

/** Barra superior própria das telas de entrada no celular (sem menu), como no app real. */
export function BarraEntrada({ voltar }: { voltar?: string }) {
  return (
    <header className="shrink-0 bg-gradient-to-r from-header to-header-2 pt-[env(safe-area-inset-top)] lg:hidden">
      <div className="flex h-14 items-center gap-2 px-4 text-on-header">
        {voltar && (
          <Link
            href={voltar}
            aria-label="Voltar para Perfis Salvos"
            className="-ml-2 grid size-11 place-items-center rounded-full transition-colors duration-150 hover:bg-white/10 active:bg-white/15"
          >
            <ArrowLeft className="size-6" strokeWidth={1.75} />
          </Link>
        )}
        <span className="text-xl">Acadêmico</span>
      </div>
    </header>
  );
}

/**
 * Painel de marca do desktop: azul-marinho, logo e ondas concêntricas finas
 * (telecomunicações) saindo do canto. Sem frases.
 */
function PainelMarca() {
  const reduzir = useReducedMotion();
  const [primeira] = useState(() => !ondasDesenhadas);
  useEffect(() => {
    ondasDesenhadas = true;
  }, []);
  const animar = primeira && !reduzir;
  const raios = [90, 170, 250, 330, 410, 490, 570, 650, 730, 810];
  return (
    <aside
      aria-label="Inatel Acadêmico"
      className="relative hidden w-[44%] max-w-[680px] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-header via-header to-header-2 px-14 py-12 lg:flex xl:px-16"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full text-white"
        viewBox="0 0 600 900"
        preserveAspectRatio="xMaxYMax slice"
      >
        {raios.map((r, i) => (
          <motion.circle
            key={r}
            cx="600"
            cy="900"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity={0.13 - i * 0.011}
            initial={animar ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.1 + i * 0.05, ease: EASE }}
          />
        ))}
        {/* Três pontos de sinal sobre as ondas */}
        {[
          [600 - 330 * Math.cos(0.9), 900 - 330 * Math.sin(0.9)],
          [600 - 490 * Math.cos(0.62), 900 - 490 * Math.sin(0.62)],
          [600 - 650 * Math.cos(1.12), 900 - 650 * Math.sin(1.12)],
        ].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="currentColor"
            fillOpacity={0.35}
            initial={animar ? { opacity: 0, scale: 0.4 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.12, ease: EASE }}
          />
        ))}
      </svg>

      <div className="relative" />

      <div className="relative">
        <InatelLogo className="block text-[76px] leading-none !text-white xl:text-[88px]" />
        <p className="mt-3 text-2xl text-on-header-muted">Acadêmico</p>
      </div>

      <p className="relative text-xs text-on-header-muted/80">{RODAPE}</p>
    </aside>
  );
}

const lista: Variants = {
  oculto: {},
  visivel: { transition: { staggerChildren: 0.06 } },
};

/** Bloco do conteúdo de entrada que sobe em sequência curta (só opacidade com movimento reduzido). */
export function Surge({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduzir = useReducedMotion();
  const item: Variants = {
    oculto: { opacity: 0, y: reduzir ? 0 : 10 },
    visivel: { opacity: 1, y: 0, transition: { duration: reduzir ? 0.2 : 0.45, ease: EASE } },
  };
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Estrutura comum das telas de entrada.
 * Celular: barra "Acadêmico", coluna central e rodapé discreto (fiel ao app real).
 * Desktop: painel de marca à esquerda e o conteúdo à direita.
 */
export function EntradaLayout({ voltar, children }: { voltar?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 bg-bg">
      <PainelMarca />
      <div className="flex min-w-0 flex-1 flex-col">
        <BarraEntrada voltar={voltar} />
        <main className="app-scroll flex flex-1 flex-col px-6 pb-[env(safe-area-inset-bottom)] lg:px-12">
          {voltar && (
            <div className="hidden pt-8 lg:block">
              <Link
                href={voltar}
                className="-ml-3 inline-flex h-10 items-center gap-2 rounded-control px-3 text-sm font-medium text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
              >
                <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden />
                Perfis Salvos
              </Link>
            </div>
          )}
          <motion.div
            initial="oculto"
            animate="visivel"
            variants={lista}
            className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-8 lg:max-w-[380px]"
          >
            {children}
          </motion.div>
          <footer className="pb-5 text-center text-xs text-subtle lg:hidden">{RODAPE}</footer>
        </main>
      </div>
    </div>
  );
}
