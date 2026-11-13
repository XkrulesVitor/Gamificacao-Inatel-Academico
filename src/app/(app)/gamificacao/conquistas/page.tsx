"use client";

import { useState } from "react";
import { AjudaMedalhas } from "@/components/gamificacao/ajuda-medalhas";
import { AtividadeRecente } from "@/components/gamificacao/atividade-recente";
import { bloqueadas, conquistadas, proxima, ultimaConquista } from "@/components/gamificacao/dados";
import { MedalDetail } from "@/components/gamificacao/medal-detail";
import { ProximaConquista } from "@/components/gamificacao/proxima-conquista";
import { Vitrine } from "@/components/gamificacao/vitrine";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Page, Panel, SectionHeading, SplitLayout } from "@/components/ui/primitives";
import { medalhas } from "@/lib/mock/gamificacao";
import { useIsDesktop } from "@/lib/use-media";
import type { Medalha } from "@/lib/types";

function Contagem({ children }: { children: React.ReactNode }) {
  return <span className="num text-[13px] font-medium text-muted">{children}</span>;
}

export default function ConquistasPage() {
  const desktop = useIsDesktop();
  const [selId, setSelId] = useState<string | undefined>(ultimaConquista?.id ?? medalhas[0]?.id);
  const [sheetId, setSheetId] = useState<string | undefined>();
  const [sheetAberto, setSheetAberto] = useState(false);

  const destaque = proxima;
  const selecionada = medalhas.find((m) => m.id === selId);
  const noSheet = medalhas.find((m) => m.id === sheetId);

  function abrir(m: Medalha) {
    if (desktop) {
      setSelId(m.id);
    } else {
      setSheetId(m.id);
      setSheetAberto(true);
    }
  }

  const main = (
    <>
      {destaque && (
        <section>
          <SectionHeading>Próxima conquista</SectionHeading>
          <ProximaConquista medalha={destaque} onAbrir={() => abrir(destaque)} ativa={desktop && selId === destaque.id} />
        </section>
      )}

      <section className="mt-8">
        <SectionHeading
          action={
            <span className="flex items-center gap-1">
              <Contagem>
                {conquistadas.length} de {medalhas.length}
              </Contagem>
              <AjudaMedalhas />
            </span>
          }
        >
          Conquistadas
        </SectionHeading>
        <Vitrine itens={conquistadas} selecionadaId={desktop ? selId : undefined} onAbrir={abrir} />
      </section>

      <section className="mt-6">
        <SectionHeading action={<Contagem>{bloqueadas.length}</Contagem>}>Bloqueadas</SectionHeading>
        <Vitrine itens={bloqueadas} selecionadaId={desktop ? selId : undefined} onAbrir={abrir} />
      </section>

      <section className="mt-8">
        <SectionHeading>Atividade recente</SectionHeading>
        <AtividadeRecente />
      </section>
    </>
  );

  const aside = <Panel className="p-5 xl:p-6">{selecionada && <MedalDetail medalha={selecionada} noSheet />}</Panel>;

  return (
    <Page className="pt-5 lg:pt-6">
      <SplitLayout main={main} aside={aside} asideClassName="hidden lg:block lg:top-[72px] xl:top-[80px]" />
      <BottomSheet open={sheetAberto} onClose={() => setSheetAberto(false)} title="Medalha" hideTitle>
        {noSheet && <MedalDetail medalha={noSheet} />}
      </BottomSheet>
    </Page>
  );
}
