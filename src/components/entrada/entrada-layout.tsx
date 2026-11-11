import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const PERFIL_KEY = "inatel-academico:perfil";

/** Barra superior simples (sem ☰) das telas de entrada. */
export function BarraEntrada({ voltar }: { voltar?: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 bg-header px-4 text-white">
      {voltar && (
        <Link
          href={voltar}
          aria-label="Voltar para Perfis Salvos"
          className="-ml-2 grid size-11 place-items-center rounded-full outline-offset-2 transition active:bg-white/10"
        >
          <ArrowLeft className="size-6" />
        </Link>
      )}
      <span className="text-xl">Acadêmico</span>
    </header>
  );
}
