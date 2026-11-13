"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useSession } from "@/components/session-provider";
import { usePrefs } from "@/components/configuracoes/prefs";
import { AulasHoje } from "./aulas-hoje";
import { AvisosRecentes } from "./avisos-recentes";
import { CartaoGamificacao } from "./cartao-gamificacao";
import { Saudacao } from "./saudacao";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Início (wireframe da aula): saudação com alertas, aulas de hoje, gamificação e avisos.
 * Entrada: os blocos sobem em sequência curta (4 × 70 ms), uma vez.
 */
export function TelaInicio() {
  const { aluno } = useSession();
  const { prefs } = usePrefs();
  const reduzir = useReducedMotion();

  const container: Variants = {
    oculto: {},
    visivel: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
  };
  const item: Variants = {
    oculto: { opacity: 0, y: reduzir ? 0 : 12 },
    visivel: { opacity: 1, y: 0, transition: { duration: reduzir ? 0.2 : 0.5, ease: EASE } },
  };

  return (
    <motion.div
      initial="oculto"
      animate="visivel"
      variants={container}
      className="mx-auto grid w-full max-w-[1240px] gap-6 px-4 pb-10 pt-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-6 lg:pb-14 lg:pt-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-8 xl:px-8 xl:pt-8"
    >
      <div className="flex min-w-0 flex-col gap-6">
        <motion.div variants={item}>
          <Saudacao nome={aluno.primeiroNome} />
        </motion.div>
        <motion.div variants={item}>
          <AulasHoje />
        </motion.div>
      </div>
      <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-6 lg:self-start xl:top-8">
        {/* Configurações > "Gamificação no Início" */}
        {prefs.mostrarAtalho && (
          <motion.div variants={item}>
            <CartaoGamificacao />
          </motion.div>
        )}
        <motion.div variants={item}>
          <AvisosRecentes />
        </motion.div>
      </aside>
    </motion.div>
  );
}
