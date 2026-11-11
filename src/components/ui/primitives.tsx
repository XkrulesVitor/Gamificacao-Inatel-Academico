import clsx from "clsx";

/** Container padrão de página: padding lateral e espaçamento vertical. */
export function Page({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("animate-fade-up px-4 pb-10 pt-4", className)}>{children}</div>;
}

/** Cartão base (superfície escura sobre fundo preto). */
export function Card({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  return <As className={clsx("rounded-card border border-line bg-surface-1 p-4", className)}>{children}</As>;
}

/** Título de seção, no estilo dos rótulos cinza do menu do app real. */
export function SectionTitle({
  children,
  action,
  className,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mb-2 mt-6 flex items-center justify-between first:mt-0", className)}>
      <h2 className="text-[13px] font-semibold uppercase tracking-wide text-muted">{children}</h2>
      {action}
    </div>
  );
}

type PillTone = "primary" | "success" | "danger" | "warning" | "gold" | "neutral" | "xp" | "teal";

const pillTones: Record<PillTone, string> = {
  primary: "bg-primary-strong/90 text-white",
  success: "bg-success/15 text-success",
  danger: "bg-danger/15 text-danger",
  warning: "bg-warning/15 text-warning",
  gold: "bg-gold/15 text-gold",
  neutral: "bg-surface-3 text-muted",
  xp: "bg-xp/15 text-xp",
  teal: "bg-teal/30 text-[#a6d6df]",
};

/** Pílula/etiqueta (ex.: "FALTAS: 2/18", "CR: 81,4", "Novo"). */
export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: PillTone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        pillTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Barra de progresso acessível. value/max. */
export function ProgressBar({
  value,
  max = 1,
  tone = "brand",
  className,
  label,
}: {
  value: number;
  max?: number;
  tone?: "brand" | "gold" | "success" | "danger" | "xp" | "platinum";
  className?: string;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const tones = {
    brand: "bg-brand",
    gold: "bg-gradient-to-r from-[#f7c948] to-gold",
    success: "bg-success",
    danger: "bg-danger",
    xp: "bg-gradient-to-r from-brand to-xp",
    platinum: "bg-gradient-to-r from-[#b8f0fa] to-platinum",
  } as const;
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={label}
      className={clsx("h-2 w-full overflow-hidden rounded-full bg-surface-3", className)}
    >
      <div className={clsx("h-full rounded-full transition-[width] duration-700", tones[tone])} style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Avatar circular com iniciais (como os "C" laranja da tela Avisos). */
export function Avatar({
  label,
  color,
  className,
}: {
  label: string;
  /** cor CSS (hex) ou classe bg-* via className */
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={clsx("grid size-11 shrink-0 place-items-center rounded-full text-base font-semibold text-white", className)}
      style={color ? { backgroundColor: color } : undefined}
      aria-hidden
    >
      {label}
    </span>
  );
}

/** Botão primário no estilo do app real ("Autenticar", "Outro Usuário"). */
export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "flex h-12 w-full items-center justify-center gap-2 rounded-md border border-[#1e5fa0] bg-primary text-[15px] font-medium text-white transition active:scale-[0.99] enabled:hover:bg-[#0a52a0] disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Logotipo textual "Inatel" (itálico, azul) usado no app. */
export function InatelLogo({ className }: { className?: string }) {
  return (
    <span className={clsx("select-none font-extrabold italic tracking-tight text-brand", className)} aria-label="Inatel">
      Inatel
    </span>
  );
}
