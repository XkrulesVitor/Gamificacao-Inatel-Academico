import { SectionTabs } from "@/components/shell/section-tabs";
import { abasDesempenho } from "@/lib/nav";

export default function DesempenhoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionTabs itens={abasDesempenho} label="Seções de desempenho" layoutId="aba-desempenho" />
      {children}
    </>
  );
}
