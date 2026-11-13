"use client";

import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

/**
 * Conta de 0 até `valor` uma vez ao montar (ou quando o valor muda).
 * Com prefers-reduced-motion, devolve o valor final direto.
 * Use para números-chave (pontos, posição, pontuação), não para tabelas inteiras.
 */
export function useCountUp(valor: number, duracao = 0.9): number {
  const reduzir = useReducedMotion();
  const [atual, setAtual] = useState(reduzir ? valor : 0);
  useEffect(() => {
    if (reduzir) return;
    const ctrl = animate(0, valor, {
      duration: duracao,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setAtual(v),
    });
    return () => ctrl.stop();
  }, [valor, duracao, reduzir]);
  return reduzir ? valor : atual;
}
