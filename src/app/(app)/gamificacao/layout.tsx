import { NivelResumo } from "@/components/gamificacao/nivel-resumo";
import { SectionTabs } from "@/components/shell/section-tabs";

const abas = [
  { label: "Conquistas", href: "/gamificacao/conquistas" },
  { label: "Ranking", href: "/gamificacao/ranking" },
];

/** Cabeçalho do módulo (cartão de nível) e abas superiores; o layout persiste entre as abas. */
export default function GamificacaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NivelResumo />
      <SectionTabs itens={abas} label="Seções de conquistas e ranking" layoutId="aba-gamificacao" />
      {children}
    </div>
  );
}
