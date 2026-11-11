import { Card, Page, ProgressBar, SectionTitle } from "@/components/ui/primitives";
import { CRBarras } from "@/components/academico/cr-barras";
import { LinkConquista } from "@/components/academico/gamificacao-links";
import { fmt1, fmtPct } from "@/lib/format";
import { coeficientes } from "@/lib/mock/aluno";

const META_CR_MEDALHA = 85;

export default function CoeficientesPage() {
  const { cr, crPeriodoAnterior, cra, creditosCursados, creditosTotais, historicoCR } = coeficientes;
  const variacao = cr - crPeriodoAnterior;
  const subiu = variacao >= 0;

  return (
    <Page className="space-y-3">
      <Card as="section" className="text-center">
        <p className="text-sm font-medium text-muted">Coeficiente de Rendimento (CR)</p>
        <p className="mt-1 text-6xl font-bold tabular-nums leading-none text-fg">{fmt1(cr)}</p>
        <p className={`mt-3 text-sm font-semibold ${subiu ? "text-success" : "text-danger"}`}>
          {subiu ? "+" : "−"}
          {fmt1(Math.abs(variacao))} {subiu ? "▲" : "▼"}{" "}
          <span className="font-normal text-muted">vs. período anterior ({fmt1(crPeriodoAnterior)})</span>
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card as="section">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">CRA</p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-fg">{fmt1(cra)}</p>
        </Card>
        <Card as="section" className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Créditos cursados</p>
          <p className="text-3xl font-bold tabular-nums text-fg">
            {creditosCursados}
            <span className="text-base font-medium text-muted">/{creditosTotais}</span>
          </p>
          <ProgressBar value={creditosCursados} max={creditosTotais} label="Créditos cursados" />
          <p className="text-xs text-muted">{fmtPct(creditosCursados / creditosTotais)} do curso</p>
        </Card>
      </div>

      <SectionTitle>Histórico do CR</SectionTitle>
      <Card as="section">
        <CRBarras historico={historicoCR} />
      </Card>

      <SectionTitle>Medalhas</SectionTitle>
      <Card as="section" className="space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-base font-semibold text-fg">Medalha CR &gt; {META_CR_MEDALHA}</h2>
          <p className="text-sm tabular-nums text-muted">
            {fmt1(cr)}/{META_CR_MEDALHA} ({fmtPct(cr / META_CR_MEDALHA)})
          </p>
        </div>
        <ProgressBar value={cr} max={META_CR_MEDALHA} tone="gold" label={`Progresso até CR ${META_CR_MEDALHA}`} />
        <LinkConquista>Ver progresso nas Conquistas</LinkConquista>
      </Card>
    </Page>
  );
}
