import { AbasGamificacao } from "@/components/gamificacao/abas";
import { ResumoNivel } from "@/components/gamificacao/resumo-nivel";

export default function GamificacaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ResumoNivel />
      <AbasGamificacao />
      {children}
    </div>
  );
}
