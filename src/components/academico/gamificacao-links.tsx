import Link from "next/link";
import { Award, ChevronRight, Medal } from "lucide-react";

/** Rota do módulo de gamificação onde as medalhas ligadas às telas acadêmicas aparecem. */
export const ROTA_CONQUISTAS = "/gamificacao/conquistas";

/** Ícone de medalha ao lado de uma nota 100, leva às Conquistas. */
export function SeloNota100() {
  return (
    <Link
      href={ROTA_CONQUISTAS}
      aria-label="Medalha Nota 100"
      title="Medalha Nota 100"
      className="-m-2 inline-grid size-8 shrink-0 place-items-center rounded-full p-2 text-gold-ink transition-colors hover:bg-gold/15"
    >
      <Award className="size-4" strokeWidth={1.75} aria-hidden />
    </Link>
  );
}

/** Link discreto para as Conquistas, com ícone de medalha dourado. */
export function LinkConquista({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href={ROTA_CONQUISTAS}
      className="inline-flex min-h-11 items-center gap-2 rounded-control pr-2 text-[15px] font-medium text-fg transition-colors hover:text-accent"
    >
      <Medal className="size-5 shrink-0 text-gold-ink" strokeWidth={1.75} aria-hidden />
      {children}
      <ChevronRight className="size-4 text-muted" strokeWidth={1.75} aria-hidden />
    </Link>
  );
}
