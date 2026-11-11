import clsx from "clsx";
import {
  Award,
  Clock,
  ClipboardCheck,
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
import type { IconeMedalha, Medalha, Raridade } from "@/lib/types";

export const iconeMedalha: Record<IconeMedalha, LucideIcon> = {
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

/** Classes estáticas por raridade (Tailwind precisa enxergar as strings completas). */
export const estiloRaridade: Record<
  Raridade,
  { texto: string; anel: string; fundo: string; chip: string; glow: string }
> = {
  bronze: {
    texto: "text-bronze",
    anel: "border-bronze",
    fundo: "from-bronze/35 to-bronze/5",
    chip: "bg-bronze/15 text-bronze",
    glow: "shadow-[0_0_22px_-6px_var(--color-bronze)]",
  },
  prata: {
    texto: "text-silver",
    anel: "border-silver",
    fundo: "from-silver/30 to-silver/5",
    chip: "bg-silver/15 text-silver",
    glow: "shadow-[0_0_22px_-6px_var(--color-silver)]",
  },
  ouro: {
    texto: "text-gold",
    anel: "border-gold",
    fundo: "from-gold/35 to-gold/5",
    chip: "bg-gold/15 text-gold",
    glow: "shadow-[0_0_22px_-6px_var(--color-gold)]",
  },
  platina: {
    texto: "text-platinum",
    anel: "border-platinum",
    fundo: "from-platinum/35 to-platinum/5",
    chip: "bg-platinum/15 text-platinum",
    glow: "shadow-[0_0_22px_-6px_var(--color-platinum)]",
  },
};

const tamanhos = {
  sm: { caixa: "size-[68px]", borda: "border-[3px]", icone: "size-7", cadeado: "size-[22px] -bottom-0.5 -right-0.5", cad: "size-3" },
  md: { caixa: "size-14", borda: "border-[3px]", icone: "size-6", cadeado: "size-5 -bottom-0.5 -right-0.5", cad: "size-2.5" },
  lg: { caixa: "size-28", borda: "border-4", icone: "size-12", cadeado: "size-8 bottom-0 right-0", cad: "size-4" },
} as const;

/** Medalhão circular: anel na cor da raridade; bloqueada = monocromática + cadeado. */
export function MedalBadge({
  medalha,
  size = "sm",
  className,
}: {
  medalha: Medalha;
  size?: keyof typeof tamanhos;
  className?: string;
}) {
  const t = tamanhos[size];
  const r = estiloRaridade[medalha.raridade];
  const Icone = iconeMedalha[medalha.icone];
  const bloqueada = !medalha.desbloqueada;

  return (
    <span className={clsx("relative inline-grid shrink-0 place-items-center", t.caixa, className)} aria-hidden>
      <span
        className={clsx(
          "relative grid size-full place-items-center overflow-hidden rounded-full bg-gradient-to-b",
          t.borda,
          r.anel,
          r.fundo,
          r.texto,
          bloqueada ? "medal-locked" : r.glow,
        )}
      >
        <Icone className={t.icone} strokeWidth={2} />
        {!bloqueada && <span className="shine pointer-events-none absolute inset-0 rounded-full opacity-60" />}
      </span>
      {bloqueada && (
        <span
          className={clsx(
            "absolute grid place-items-center rounded-full border border-line-strong bg-surface-3 text-muted",
            t.cadeado,
          )}
        >
          <Lock className={t.cad} strokeWidth={2.5} />
        </span>
      )}
    </span>
  );
}

export function RaridadeChip({ raridade, children }: { raridade: Raridade; children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        estiloRaridade[raridade].chip,
      )}
    >
      {children}
    </span>
  );
}

/** Percentual de progresso (bloqueadas nunca arredondam para 100%). */
export function percentual(m: Medalha): number {
  if (m.desbloqueada) return 100;
  const p = (m.progresso.atual / m.progresso.meta) * 100;
  return Math.max(0, Math.min(99, Math.floor(p)));
}

const nf = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
export function textoProgresso(m: Medalha): string {
  const { atual, meta, unidade } = m.progresso;
  return `${nf.format(atual)} de ${nf.format(meta)} ${unidade.replace(/^de /, "")}`;
}
