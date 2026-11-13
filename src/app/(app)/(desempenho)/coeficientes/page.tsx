import { ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Page, Panel, SectionHeading } from "@/components/ui/primitives";
import { BarraAnimada } from "@/components/academico/barra-animada";
import { CRResumo } from "@/components/academico/cr-resumo";
import { HistoricoCR } from "@/components/academico/cr-historico";
import { ROTA_CONQUISTAS } from "@/components/academico/gamificacao-links";
import { fmtPct } from "@/lib/format";
import { coeficientes } from "@/lib/mock/aluno";

const META_CR_MEDALHA = 85;

export default function CoeficientesPage() {
  const { cr, historicoCR } = coeficientes;

  return (
    <Page className="space-y-4 lg:space-y-6">
      <CRResumo dados={coeficientes} />

      <Panel className="p-5 shadow-card">
        <SectionHeading>Histórico do CR</SectionHeading>
        <HistoricoCR historico={historicoCR} meta={META_CR_MEDALHA} />
      </Panel>

      <Link
        href={ROTA_CONQUISTAS}
        className="flex items-center gap-3 rounded-card border border-line bg-surface-1 px-4 py-3.5 shadow-card transition-colors duration-150 hover:bg-surface-2 lg:px-5"
      >
        <GraduationCap className="size-5 shrink-0 text-gold-ink" strokeWidth={1.75} aria-hidden />
        <span className="min-w-0 flex-1 whitespace-nowrap text-[15px] font-medium text-fg">Medalha CR &gt; {META_CR_MEDALHA}</span>
        <span className="w-16 shrink-0 lg:w-40">
          <BarraAnimada value={cr} max={META_CR_MEDALHA} tone="gold" label={`Progresso até CR ${META_CR_MEDALHA}`} />
        </span>
        <span className="num w-10 shrink-0 text-right text-sm text-muted">{fmtPct(cr / META_CR_MEDALHA)}</span>
        <ChevronRight className="size-5 shrink-0 text-muted" strokeWidth={1.75} aria-hidden />
      </Link>
    </Page>
  );
}
