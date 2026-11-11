import { FlaskConical } from "lucide-react";
import { Card, Page, ProgressBar, SectionTitle } from "@/components/ui/primitives";
import { FrequenciaCard } from "@/components/academico/frequencia-card";
import { LinkConquista } from "@/components/academico/gamificacao-links";
import { fmtPct } from "@/lib/format";
import { frequencias, presencaLabConsolidada } from "@/lib/mock/aluno";

export default function FrequenciaPage() {
  const { dadas, presencas, taxa } = presencaLabConsolidada;

  return (
    <Page className="space-y-3">
      <Card as="section" className="space-y-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="size-5 text-xp" aria-hidden />
          <h2 className="text-base font-semibold text-fg">
            Presença em laboratórios: <span className="tabular-nums">{presencas}/{dadas}</span>{" "}
            <span className="text-muted">({fmtPct(taxa)})</span>
          </h2>
        </div>
        <ProgressBar value={presencas} max={dadas} tone="success" label={`Presença em laboratórios: ${presencas} de ${dadas}`} />
        <LinkConquista>Rumo à medalha Frequência Plena em Labs</LinkConquista>
      </Card>

      <SectionTitle>Disciplinas</SectionTitle>
      <div className="space-y-3">
        {frequencias.map((item) => (
          <FrequenciaCard key={item.disciplina} item={item} />
        ))}
      </div>
    </Page>
  );
}
