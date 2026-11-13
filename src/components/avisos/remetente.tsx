import clsx from "clsx";
import { Landmark, Mail, Trophy, Wrench, type LucideIcon } from "lucide-react";

/** Chave para abrir um aviso específico ao chegar em /avisos (sem query string). */
export const AVISO_ABRIR_KEY = "inatel-academico:aviso-abrir";

type Tom = "accent" | "gold" | "neutral";

const remetentes: Record<string, { Icone: LucideIcon; tom: Tom }> = {
  CRA: { Icone: Landmark, tom: "accent" },
  "Suporte Estudantil": { Icone: Trophy, tom: "gold" },
  "Fab Lab": { Icone: Wrench, tom: "neutral" },
};

const tons: Record<Tom, string> = {
  accent: "bg-accent/12 text-accent ring-accent/20",
  gold: "bg-gold/14 text-gold-ink ring-gold/30",
  neutral: "bg-surface-2 text-muted ring-line-strong",
};

/** Selo do remetente: círculo com ícone e anel fino no tom do remetente. */
export function SeloRemetente({
  nome,
  tamanho = "md",
  className,
}: {
  nome: string;
  tamanho?: "sm" | "md";
  className?: string;
}) {
  const { Icone, tom } = remetentes[nome] ?? { Icone: Mail, tom: "neutral" as const };
  return (
    <span
      aria-hidden
      className={clsx(
        "grid shrink-0 place-items-center rounded-full ring-1 ring-inset",
        tons[tom],
        tamanho === "sm" ? "size-8" : "size-10",
        className,
      )}
    >
      <Icone className={tamanho === "sm" ? "size-4" : "size-[18px]"} strokeWidth={1.75} />
    </span>
  );
}
