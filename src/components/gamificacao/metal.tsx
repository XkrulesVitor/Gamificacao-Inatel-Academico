import clsx from "clsx";
import type { Raridade } from "@/lib/types";

/** Ease de saída usado em todo o módulo. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** color-mix curto para gradientes de metal. */
export function mix(cor: string, pct: number, com: "white" | "black"): string {
  return `color-mix(in oklab, ${cor} ${pct}%, ${com})`;
}

/**
 * Define `--m`, o tom do metal usado na ARTE (medalhas, moedas do top 3).
 * No tema claro os tokens de metal são escurecidos para servirem de texto, então a arte
 * clareia o token para continuar parecendo metal; no escuro usa o token direto.
 */
export const metalVar: Record<Raridade, string> = {
  bronze: "[--m:color-mix(in_oklab,var(--bronze)_74%,white)] dark:[--m:var(--bronze)]",
  prata: "[--m:color-mix(in_oklab,var(--silver)_50%,white)] dark:[--m:var(--silver)]",
  ouro: "[--m:color-mix(in_oklab,var(--gold)_90%,white)] dark:[--m:var(--gold)]",
  platina: "[--m:color-mix(in_oklab,var(--platinum)_42%,white)] dark:[--m:var(--platinum)]",
};

/** Ponto de cor da raridade (preenchimento, não texto). */
export const metalPonto: Record<Raridade, string> = {
  bronze: "bg-bronze",
  prata: "bg-silver",
  ouro: "bg-gold",
  platina: "bg-platinum",
};

export const metalPorPosicao: Record<1 | 2 | 3, Raridade> = { 1: "ouro", 2: "prata", 3: "bronze" };

/** Moeda metálica com número (top 3 e tabela de raridades). */
export function MoedaMetal({
  raridade,
  children,
  className,
}: {
  raridade: Raridade;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={clsx(
        "num relative grid shrink-0 place-items-center rounded-full font-semibold tracking-tight",
        metalVar[raridade],
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(circle at 35% 28%, ${mix("var(--m)", 50, "white")}, var(--m) 48%, ${mix("var(--m)", 68, "black")})`,
        boxShadow: `inset 0 0 0 1.5px ${mix("var(--m)", 62, "black")}, inset 0 2px 1px -1px ${mix("var(--m)", 30, "white")}, 0 1px 2px rgba(0,0,0,0.18)`,
        color: mix("var(--m)", 30, "black"),
      }}
    >
      {children}
    </span>
  );
}
