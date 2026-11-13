import { AbasGamificacao } from "@/components/gamificacao/abas";
import { NivelResumo } from "@/components/gamificacao/nivel-resumo";

export default function GamificacaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NivelResumo />
      <AbasGamificacao />
      {children}
    </div>
  );
}
