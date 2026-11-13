import { useId } from "react";
import clsx from "clsx";
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

const metais: Record<Raridade, { cor: string; texto: string }> = {
  bronze: { cor: "var(--color-bronze)", texto: "text-bronze" },
  prata: { cor: "var(--color-silver)", texto: "text-silver" },
  ouro: { cor: "var(--color-gold)", texto: "text-gold" },
  platina: { cor: "var(--color-platinum)", texto: "text-platinum" },
};

/** Emblema da medalha: disco com anel no metal da raridade e ícone central. Bloqueada fica cinza com cadeado. */
export function MedalEmblem({
  raridade,
  icone,
  bloqueada,
  size = 56,
  className,
}: {
  raridade: Raridade;
  icone: IconeMedalha;
  bloqueada?: boolean;
  size?: number;
  className?: string;
}) {
  const gid = useId();
  const metal = metais[raridade];
  const Icone = icones[icone];
  const cadeado = Math.round(size * 0.36);
  return (
    <span className={clsx("relative inline-block shrink-0", className)} style={{ width: size, height: size }} aria-hidden>
      <span className={clsx("absolute inset-0 block", bloqueada && "opacity-60")}>
        <svg viewBox="0 0 64 64" width={size} height={size} className="block">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: metal.cor }} />
              <stop offset="1" style={{ stopColor: `color-mix(in oklab, ${metal.cor} 62%, black)` }} />
            </linearGradient>
          </defs>
          <circle
            cx="32"
            cy="32"
            r="29.5"
            fill="var(--color-surface-3)"
            stroke={bloqueada ? "var(--color-subtle)" : `url(#${gid})`}
            strokeWidth="3"
          />
          <circle
            cx="32"
            cy="32"
            r="24"
            fill="none"
            stroke={bloqueada ? "var(--color-subtle)" : metal.cor}
            strokeOpacity={bloqueada ? 0.4 : 0.3}
            strokeWidth="1"
          />
        </svg>
        <span className={clsx("absolute inset-0 grid place-items-center", bloqueada ? "text-subtle" : metal.texto)}>
          <Icone size={Math.round(size * 0.42)} strokeWidth={1.75} />
        </span>
      </span>
      {bloqueada && (
        <span
          className="absolute -bottom-0.5 -right-0.5 grid place-items-center rounded-full bg-surface-4 text-muted ring-2 ring-bg"
          style={{ width: cadeado, height: cadeado }}
        >
          <Lock size={Math.round(cadeado * 0.58)} strokeWidth={2} />
        </span>
      )}
    </span>
  );
}
