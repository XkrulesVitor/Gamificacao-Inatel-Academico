import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

/** Rota do módulo de gamificação onde as medalhas ligadas às telas acadêmicas aparecem. */
export const ROTA_CONQUISTAS = "/gamificacao/conquistas";

/** Selo dourado pequeno (ex.: "Medalha Nota 100") que leva às Conquistas. */
export function SeloMedalha({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={ROTA_CONQUISTAS}
      className={clsx(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 text-sm font-semibold text-gold transition hover:bg-gold/25",
        className,
      )}
    >
      <span aria-hidden>🏅</span>
      {children}
    </Link>
  );
}

/** Faixa de link para as Conquistas, com texto e seta. */
export function LinkConquista({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href={ROTA_CONQUISTAS}
      className="flex min-h-11 items-center justify-between gap-3 rounded-card border border-gold/30 bg-gold/10 px-4 py-3 text-sm font-medium text-fg transition hover:bg-gold/15"
    >
      <span className="min-w-0">{children}</span>
      <ChevronRight className="size-5 shrink-0 text-gold" aria-hidden />
    </Link>
  );
}
