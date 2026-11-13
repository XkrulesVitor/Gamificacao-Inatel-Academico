import clsx from "clsx";

/*
 * Primitivos v2. Regras de uso:
 * - Listas e tabelas antes de cards. Card só para agrupar um bloco real (painel, resumo).
 * - Nunca card dentro de card.
 * - Títulos em sentence case. Nada de rótulo em CAIXA ALTA acima de título.
 * - Ícones lucide com strokeWidth={1.75}.
 */

/** Container de página. Mobile: coluna única com padding 16. Desktop: largura máxima e padding 32. */
export function Page({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1240px] px-4 pb-10 pt-4 lg:px-6 lg:pb-14 lg:pt-6 xl:px-8 xl:pt-8", className)}>
      {children}
    </div>
  );
}

/**
 * Layout de duas colunas do desktop: conteúdo principal + painel lateral fixo (360px).
 * No mobile vira coluna única (o painel vem depois, ou é escondido pela página).
 */
export function SplitLayout({
  main,
  aside,
  className,
  asideClassName,
}: {
  main: React.ReactNode;
  aside: React.ReactNode;
  className?: string;
  asideClassName?: string;
}) {
  return (
    <div
      className={clsx(
        "grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-8",
        className,
      )}
    >
      <div className="min-w-0">{main}</div>
      <aside className={clsx("min-w-0 lg:sticky lg:top-6 lg:self-start xl:top-8", asideClassName)}>{aside}</aside>
    </div>
  );
}

/** Painel: superfície única para agrupar um bloco. */
export function Panel({
  children,
  className,
  as: As = "section",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "aside";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <As {...rest} className={clsx("rounded-card border border-line bg-surface-1 shadow-card", className)}>
      {children}
    </As>
  );
}

/** Título de seção (sentence case, sem caixa alta). Ação opcional à direita. */
export function SectionHeading({
  children,
  action,
  className,
  as: As = "h2",
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={clsx("mb-3 flex items-center justify-between gap-3", className)}>
      <As className="text-[15px] font-semibold text-fg lg:text-base">{children}</As>
      {action}
    </div>
  );
}

type BadgeTone = "neutral" | "accent" | "gold" | "danger";

const badgeTones: Record<BadgeTone, string> = {
  neutral: "bg-surface-3 text-muted",
  accent: "bg-accent/15 text-accent",
  gold: "bg-gold/15 text-gold-ink",
  danger: "bg-danger/15 text-danger",
};

/** Etiqueta curta (status, raridade, "Novo"). */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-full px-2.5 text-xs font-semibold",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Chip selecionável (filtros). Use dentro de <ChipGroup>. */
export function Chip({
  selected,
  children,
  className,
  ...props
}: { selected?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      {...props}
      className={clsx(
        "inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-[13px] font-medium transition-colors duration-150",
        selected
          ? "border-accent/60 bg-accent/15 text-fg"
          : "border-line-strong bg-transparent text-muted hover:border-surface-4 hover:text-fg",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Linha de chips: rola na horizontal no mobile, quebra linha no desktop. */
export function ChipGroup({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={clsx("no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0", className)}
    >
      {children}
    </div>
  );
}

/** Barra de progresso. value/max. */
export function ProgressBar({
  value,
  max = 1,
  tone = "accent",
  className,
  label,
}: {
  value: number;
  max?: number;
  tone?: "accent" | "gold" | "danger" | "muted";
  className?: string;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const tones = {
    accent: "bg-accent",
    gold: "bg-gold",
    danger: "bg-danger",
    muted: "bg-subtle",
  } as const;
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={label}
      className={clsx("h-1.5 w-full overflow-hidden rounded-full bg-surface-4 dark:bg-surface-3", className)}
    >
      <div
        className={clsx("h-full rounded-full transition-[width] duration-500 ease-out", tones[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Avatar neutro com iniciais. `eu` destaca o usuário logado em azul. */
export function Avatar({
  label,
  eu,
  size = "md",
  className,
}: {
  label: string;
  eu?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-14 text-base" } as const;
  return (
    <span
      aria-hidden
      className={clsx(
        "grid shrink-0 place-items-center rounded-full font-semibold",
        eu ? "bg-primary text-on-primary" : "bg-surface-3 text-muted",
        sizes[size],
        className,
      )}
    >
      {label}
    </span>
  );
}

/** Círculo com ícone (substitui avatares de letra em listas como Avisos). */
export function IconBubble({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "accent";
  className?: string;
}) {
  const tones = {
    neutral: "bg-surface-3 text-muted",
    gold: "bg-gold/15 text-gold",
    accent: "bg-accent/15 text-accent",
  } as const;
  return (
    <span aria-hidden className={clsx("grid size-10 shrink-0 place-items-center rounded-full", tones[tone], className)}>
      {children}
    </span>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary shadow-sm enabled:hover:bg-primary-hover",
  secondary: "border border-line-strong bg-surface-2 text-fg enabled:hover:bg-surface-3",
  ghost: "text-accent enabled:hover:bg-accent/10",
};

/** Botão. `primary` segue o botão do app real ("Autenticar", "Outro Usuário"). */
export function Button({
  variant = "primary",
  className,
  ...props
}: { variant?: ButtonVariant } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        "inline-flex h-11 items-center justify-center gap-2 rounded-control px-4 text-[15px] font-medium transition-colors duration-150 active:scale-[0.99] disabled:opacity-50",
        buttonVariants[variant],
        className,
      )}
    />
  );
}

/** Compatibilidade: botão primário largo do login. */
export function PrimaryButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button variant="primary" className={clsx("h-12 w-full", className)} {...props} />;
}

/** Logotipo textual "Inatel" (itálico, azul), como no app. */
export function InatelLogo({ className }: { className?: string }) {
  return (
    <span className={clsx("select-none font-extrabold italic tracking-tight text-brand", className)} aria-label="Inatel">
      Inatel
    </span>
  );
}

/** Valor com unidade discreta: 87,0 pts */
export function Value({
  children,
  unit,
  className,
}: {
  children: React.ReactNode;
  unit?: string;
  className?: string;
}) {
  return (
    <span className={clsx("num whitespace-nowrap", className)}>
      {children}
      {unit && <span className="ml-1 text-[0.7em] font-medium text-muted">{unit}</span>}
    </span>
  );
}

