import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const PERFIL_KEY = "inatel-academico:perfil";

/** Barra superior própria das telas de entrada (sem menu). */
export function BarraEntrada({ voltar }: { voltar?: string }) {
  return (
    <header className="shrink-0 bg-header pt-[env(safe-area-inset-top)]">
      <div className="flex h-14 items-center gap-2 px-4 text-fg lg:h-16 lg:px-8">
        {voltar && (
          <Link
            href={voltar}
            aria-label="Voltar para Perfis Salvos"
            className="-ml-2 grid size-11 place-items-center rounded-full transition-colors duration-150 hover:bg-white/10 active:bg-white/10"
          >
            <ArrowLeft className="size-6" strokeWidth={1.75} />
          </Link>
        )}
        <span className="text-xl lg:text-[22px] lg:font-medium">Acadêmico</span>
      </div>
    </header>
  );
}

/** Estrutura comum: barra, coluna central (max-w-sm) e rodapé discreto. */
export function EntradaLayout({ voltar, children }: { voltar?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-bg">
      <BarraEntrada voltar={voltar} />
      <main className="app-scroll flex flex-1 flex-col px-6 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-8">{children}</div>
        <footer className="pb-5 text-center text-xs text-subtle">Protótipo acadêmico · dados fictícios</footer>
      </main>
    </div>
  );
}
