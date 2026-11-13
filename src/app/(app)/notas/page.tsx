import { Page } from "@/components/ui/primitives";
import { NotasLista } from "@/components/academico/notas-lista";
import { notas } from "@/lib/mock/aluno";

export default function NotasPage() {
  return (
    <Page>
      <NotasLista notas={notas} />
    </Page>
  );
}
