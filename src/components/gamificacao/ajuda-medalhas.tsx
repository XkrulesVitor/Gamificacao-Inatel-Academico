"use client";

import { useEffect, useRef, useState } from "react";
import { CircleHelp } from "lucide-react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { useIsDesktop } from "@/lib/use-media";
import { pontosPorRaridade, raridadeLabel } from "@/lib/mock/gamificacao";

const metalTexto = { bronze: "text-bronze", prata: "text-silver", ouro: "text-gold", platina: "text-platinum" } as const;

function Conteudo() {
  return (
    <div>
      <dl className="grid grid-cols-4 gap-2 text-center">
        {(Object.keys(pontosPorRaridade) as (keyof typeof pontosPorRaridade)[]).map((r) => (
          <div key={r} className="rounded-control bg-surface-3 py-2.5">
            <dt className={`text-[13px] font-semibold ${metalTexto[r]}`}>{raridadeLabel[r]}</dt>
            <dd className="num mt-0.5 text-[15px] text-fg">{pontosPorRaridade[r]}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[13px] leading-snug text-muted">
        Cada medalha soma os pontos da raridade. Notas, presença, entregas e monitorias também geram pontos.
      </p>
    </div>
  );
}

/** Botão de ajuda: popover no desktop, bottom sheet no mobile. */
export function AjudaMedalhas() {
  const [aberto, setAberto] = useState(false);
  const desktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto || !desktop) return;
    const fora = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("mousedown", fora);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", fora);
      document.removeEventListener("keydown", esc);
    };
  }, [aberto, desktop]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label="Como funcionam as medalhas"
        aria-expanded={aberto}
        onClick={() => setAberto((v) => !v)}
        className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg lg:size-9"
      >
        <CircleHelp className="size-5" strokeWidth={1.75} />
      </button>
      {desktop && aberto && (
        <div className="absolute right-0 top-11 z-30 w-[340px] rounded-card border border-line-strong bg-surface-2 p-4">
          <Conteudo />
        </div>
      )}
      {!desktop && (
        <BottomSheet open={aberto} onClose={() => setAberto(false)} title="Como funcionam as medalhas">
          <Conteudo />
        </BottomSheet>
      )}
    </div>
  );
}
