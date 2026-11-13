import { ChevronRight, GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Page, Panel, ProgressBar, SectionHeading } from "@/components/ui/primitives";
import { HistoricoCR } from "@/components/academico/cr-historico";
import { ROTA_CONQUISTAS } from "@/components/academico/gamificacao-links";
import { fmt1, fmtPct } from "@/lib/format";
import { coeficientes } from "@/lib/mock/aluno";

const META_CR_MEDALHA = 85;

export default function CoeficientesPage() {
  const { cr, crPeriodoAnterior, cra, creditosCursados, creditosTotais, historicoCR } = coeficientes;
  const variacao = cr - crPeriodoAnterior;
  const sobe = variacao >= 0;
  const Seta = sobe ? TrendingUp : TrendingDown;

  return (
    <Page className="space-y-4 lg:space-y-6">
      <Panel className="grid grid-cols-3 divide-x divide-line">
        <div className="min-w-0 space-y-2 p-4 lg:p-5">
          <p className="text-sm text-muted">CR</p>
          <p className="flex flex-wrap items-baseline gap-x-2 text-3xl font-bold leading-none text-fg">
            <span className="num">{fmt1(cr)}</span>
            <span className="num inline-flex items-center gap-1 text-base font-medium text-muted">
              <Seta className="size-4 text-accent" strokeWidth={1.75} aria-hidden />
              {sobe ? "+" : "-"}
              {fmt1(Math.abs(variacao))}
            </span>
          </p>
        </div>

        <div className="min-w-0 space-y-2 p-4 lg:p-5">
          <p className="text-sm text-muted">CRA</p>
          <p className="num text-3xl font-bold leading-none text-fg">{fmt1(cra)}</p>
        </div>

        <div className="min-w-0 space-y-2 p-4 lg:p-5">
          <p className="text-sm text-muted">Créditos</p>
          <p className="num text-3xl font-bold leading-none text-fg">
            {creditosCursados}
            <span className="text-base font-medium text-muted">/{creditosTotais}</span>
          </p>
          <ProgressBar value={creditosCursados} max={creditosTotais} label="Créditos cursados" />
        </div>
      </Panel>

      <Panel className="p-5">
        <SectionHeading>Histórico do CR</SectionHeading>
        <HistoricoCR historico={historicoCR} meta={META_CR_MEDALHA} />
      </Panel>

      <Link
        href={ROTA_CONQUISTAS}
        className="flex items-center gap-3 rounded-card border border-line bg-surface-1 px-4 py-3.5 transition-colors hover:bg-surface-2 lg:px-5"
      >
        <GraduationCap className="size-5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
        <span className="min-w-0 flex-1 whitespace-nowrap text-[15px] font-medium text-fg">Medalha CR &gt; {META_CR_MEDALHA}</span>
        <span className="w-16 shrink-0 lg:w-40">
          <ProgressBar value={cr} max={META_CR_MEDALHA} tone="gold" label={`Progresso até CR ${META_CR_MEDALHA}`} />
        </span>
        <span className="num w-10 shrink-0 text-right text-sm text-muted">{fmtPct(cr / META_CR_MEDALHA)}</span>
        <ChevronRight className="size-5 shrink-0 text-muted" strokeWidth={1.75} aria-hidden />
      </Link>
    </Page>
  );
}
