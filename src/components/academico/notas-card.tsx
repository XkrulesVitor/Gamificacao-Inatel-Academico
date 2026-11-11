import { Card } from "@/components/ui/primitives";
import { fmt1 } from "@/lib/format";
import { getDisciplina } from "@/lib/mock/aluno";
import type { NotaDisciplina } from "@/lib/types";
import { corNota } from "./utils";
import { SeloMedalha } from "./gamificacao-links";

function CaixaNota({ rotulo, valor }: { rotulo: string; valor: number | null }) {
  return (
    <div className="rounded-md bg-surface-2 px-2 py-2.5 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{rotulo}</p>
      <p className={`mt-0.5 text-2xl font-bold tabular-nums ${corNota(valor)}`}>{valor === null ? "—" : valor}</p>
    </div>
  );
}

/** Card de notas de uma disciplina: NP1, NP2 e NL (só com laboratório) + média parcial. */
export function NotasCard({ nota }: { nota: NotaDisciplina }) {
  const disciplina = getDisciplina(nota.disciplina);
  const temLab = Boolean(disciplina?.laboratorioId);
  const titulo = disciplina ? `${disciplina.codigo} - ${disciplina.nome}` : nota.disciplina;

  const lancadas = [nota.np1, nota.np2, temLab ? nota.nl : null].filter((v): v is number => v !== null);
  const media = lancadas.length ? lancadas.reduce((s, v) => s + v, 0) / lancadas.length : null;
  const temNota100 = nota.np1 === 100 || nota.np2 === 100;

  return (
    <Card as="article" className="space-y-3">
      <div className="min-w-0">
        <h3 className="truncate text-base font-semibold text-fg" title={titulo}>
          {titulo}
        </h3>
        {disciplina && <p className="truncate text-sm text-muted">{disciplina.professor}</p>}
      </div>

      <div className={temLab ? "grid grid-cols-3 gap-2" : "grid grid-cols-2 gap-2"}>
        <CaixaNota rotulo="NP1" valor={nota.np1} />
        <CaixaNota rotulo="NP2" valor={nota.np2} />
        {temLab && <CaixaNota rotulo="NL" valor={nota.nl} />}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted">
          Média parcial:{" "}
          <span className={`font-semibold tabular-nums ${corNota(media)}`}>{media === null ? "—" : fmt1(media)}</span>
        </p>
        {temNota100 && <SeloMedalha>Medalha Nota 100</SeloMedalha>}
      </div>
    </Card>
  );
}
