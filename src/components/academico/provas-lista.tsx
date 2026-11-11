import { Clock, MapPin } from "lucide-react";
import { Pill } from "@/components/ui/primitives";
import { diasAte } from "@/lib/format";
import { getDisciplina } from "@/lib/mock/aluno";
import type { Prova } from "@/lib/types";
import { partesData, rotuloDias } from "./utils";

interface Grupo {
  chave: string;
  titulo: string;
  itens: Prova[];
}

/** Lista de provas ordenada por data, agrupada por mês. Destaca sutilmente a mais próxima. */
export function ProvasLista({ provas }: { provas: Prova[] }) {
  const ordenadas = [...provas].sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora));
  const proxima = ordenadas.find((p) => diasAte(p.data) >= 0);

  const grupos: Grupo[] = [];
  for (const prova of ordenadas) {
    const partes = partesData(prova.data);
    const atual = grupos[grupos.length - 1];
    if (atual && atual.chave === partes.chaveMes) {
      atual.itens.push(prova);
    } else {
      grupos.push({ chave: partes.chaveMes, titulo: `${partes.mesLongo} ${partes.ano}`, itens: [prova] });
    }
  }

  return (
    <div className="space-y-6">
      {grupos.map((grupo) => (
        <section key={grupo.chave} aria-labelledby={`mes-${grupo.chave}`}>
          <h2 id={`mes-${grupo.chave}`} className="mb-2 text-base font-semibold text-fg">
            {grupo.titulo}
          </h2>
          <ul className="space-y-2">
            {grupo.itens.map((prova) => {
              const disciplina = getDisciplina(prova.disciplina);
              const titulo = disciplina ? `${disciplina.codigo} - ${disciplina.nome}` : prova.disciplina;
              const destaque = prova === proxima;
              const { dia, mesCurto } = partesData(prova.data);
              return (
                <li
                  key={`${prova.disciplina}-${prova.data}-${prova.tipo}`}
                  className={`flex items-center gap-3 rounded-card border p-3 ${
                    destaque ? "border-brand/60 bg-primary/20" : "border-line bg-surface-1"
                  }`}
                >
                  <div className="grid w-14 shrink-0 place-items-center rounded-md bg-surface-2 py-2">
                    <span className="text-2xl font-bold leading-none tabular-nums text-fg">{dia}</span>
                    <span className="mt-1 text-xs font-semibold uppercase text-muted">{mesCurto}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-fg" title={titulo}>
                      {titulo}
                    </p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" aria-hidden />
                        {prova.hora}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" aria-hidden />
                        {prova.local}
                      </span>
                    </p>
                    <p className={`mt-1 text-xs font-medium ${destaque ? "text-brand" : "text-subtle"}`}>
                      {rotuloDias(prova.data)}
                    </p>
                  </div>

                  <Pill tone={prova.tipo === "NL" ? "teal" : "primary"} className="shrink-0">
                    {prova.tipo}
                  </Pill>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
