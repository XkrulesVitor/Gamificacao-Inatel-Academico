import { Page } from "@/components/ui/primitives";
import { NotasCard } from "@/components/academico/notas-card";
import { notas } from "@/lib/mock/aluno";

export default function NotasPage() {
  return (
    <Page className="space-y-3">
      {notas.map((nota) => (
        <NotasCard key={nota.disciplina} nota={nota} />
      ))}
    </Page>
  );
}
