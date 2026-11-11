import { FlaskConical } from "lucide-react";
import { Card, Pill } from "@/components/ui/primitives";
import { fmtPct } from "@/lib/format";
import { getDisciplina } from "@/lib/mock/aluno";
import type { FrequenciaDisciplina } from "@/lib/types";
import { nivelUso } from "./utils";

const corBarra = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
} as const;

/** Barra do uso do limite de faltas (verde < 50%, amarelo < 80%, vermelho >= 80%). */
function BarraUso({ valor, max, rotulo }: { valor: number; max: number; rotulo: string }) {
  const razao = max > 0 ? valor / max : 0;
  const pct = Math.max(0, Math.min(100, razao * 100));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={valor}
      aria-label={rotulo}
      className="h-2 w-full overflow-hidden rounded-full bg-surface-3"
    >
      <div className={`h-full rounded-full transition-[width] duration-700 ${corBarra[nivelUso(razao)]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function FrequenciaCard({ item }: { item: FrequenciaDisciplina }) {
  const disciplina = getDisciplina(item.disciplina);
  const titulo = disciplina ? `${disciplina.codigo} - ${disciplina.nome}` : item.disciplina;
  const usoPct = item.limiteFaltas > 0 ? Math.round((item.faltas / item.limiteFaltas) * 100) : 0;

  return (
    <Card as="article" className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-fg" title={titulo}>
            {titulo}
          </h3>
          <p className="text-sm text-muted">Aulas dadas: {item.aulasDadas}</p>
        </div>
        <Pill tone="primary" className="shrink-0">
          FALTAS: {item.faltas}/{item.limiteFaltas}
        </Pill>
      </div>

      <div className="space-y-1.5">
        <BarraUso valor={item.faltas} max={item.limiteFaltas} rotulo={`Uso do limite de faltas de ${item.disciplina}`} />
        <p className="text-xs text-muted">{usoPct}% do limite de faltas usado</p>
      </div>

      {item.lab && (
        <p className="flex items-center gap-2 border-t border-line pt-3 text-sm text-fg">
          <FlaskConical className="size-4 shrink-0 text-xp" aria-hidden />
          <span>
            Laboratório: <span className="font-semibold">{item.lab.presencas}/{item.lab.aulasDadas}</span> presenças{" "}
            <span className="text-muted">({fmtPct(item.lab.presencas / item.lab.aulasDadas)})</span>
          </span>
        </p>
      )}
    </Card>
  );
}
