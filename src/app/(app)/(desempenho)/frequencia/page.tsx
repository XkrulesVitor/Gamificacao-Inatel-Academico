import { Page, SplitLayout } from "@/components/ui/primitives";
import { FrequenciaLista, LabsPainel } from "@/components/academico/frequencia-lista";
import { frequencias } from "@/lib/mock/aluno";

export default function FrequenciaPage() {
  return (
    <Page>
      <SplitLayout
        main={<FrequenciaLista itens={frequencias} />}
        aside={<LabsPainel />}
        asideClassName="order-first lg:order-none"
      />
    </Page>
  );
}
