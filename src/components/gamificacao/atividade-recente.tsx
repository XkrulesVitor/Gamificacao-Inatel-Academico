import { Award, CalendarCheck, ClipboardCheck, FileCheck, Users, type LucideIcon } from "lucide-react";
import { IconBubble } from "@/components/ui/primitives";
import { fmtDiaMes } from "@/lib/format";
import { historicoPontos } from "@/lib/mock/gamificacao";
import type { RegistroPontos } from "@/lib/types";

const iconePorTipo: Record<RegistroPontos["tipo"], LucideIcon> = {
  medalha: Award,
  nota: FileCheck,
  presenca: CalendarCheck,
  entrega: ClipboardCheck,
  colaboracao: Users,
};

/** Extrato curto de pontos. */
export function AtividadeRecente({ limite = 6 }: { limite?: number }) {
  return (
    <ul className="divide-y divide-line">
      {historicoPontos.slice(0, limite).map((r) => {
        const Icone = iconePorTipo[r.tipo];
        return (
          <li key={r.id} className="flex items-center gap-3 py-2.5">
            <IconBubble tone={r.tipo === "medalha" ? "gold" : "neutral"} className="size-8">
              <Icone className="size-4" strokeWidth={1.75} />
            </IconBubble>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[14px] leading-snug text-fg">{r.descricao}</p>
              <p className="num text-xs text-subtle">{fmtDiaMes(r.data)}</p>
            </div>
            <span className="num text-[14px] font-semibold text-gold-ink">+{r.pontos}</span>
          </li>
        );
      })}
    </ul>
  );
}
