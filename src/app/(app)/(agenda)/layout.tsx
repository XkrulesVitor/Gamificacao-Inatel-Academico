import { SectionTabs } from "@/components/shell/section-tabs";
import { abasAgenda } from "@/lib/nav";

export default function AgendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionTabs itens={abasAgenda} label="Seções da agenda" layoutId="aba-agenda" />
      {children}
    </>
  );
}
