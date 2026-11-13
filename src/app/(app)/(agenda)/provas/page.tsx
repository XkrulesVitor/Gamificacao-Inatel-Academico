import { Page } from "@/components/ui/primitives";
import { ProvasLista } from "@/components/academico/provas-lista";
import { provas } from "@/lib/mock/aluno";

export default function ProvasPage() {
  return (
    <Page>
      <ProvasLista provas={provas} />
    </Page>
  );
}
