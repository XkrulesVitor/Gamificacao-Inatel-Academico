"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ProgressBar } from "@/components/ui/primitives";

/** Vira true no primeiro quadro após montar (com movimento reduzido, já nasce true). */
export function useMontado(): boolean {
  const reduzir = useReducedMotion();
  const [montado, setMontado] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMontado(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return reduzir ? true : montado;
}

/** ProgressBar que começa em 0 e enche até o valor ao aparecer. */
export function BarraAnimada(props: React.ComponentProps<typeof ProgressBar>) {
  const montado = useMontado();
  return <ProgressBar {...props} value={montado ? props.value : 0} />;
}
