"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useSession } from "@/components/session-provider";
import { BarraEntrada, PERFIL_KEY } from "@/components/entrada/entrada-layout";
import { InatelLogo, PrimaryButton } from "@/components/ui/primitives";

export default function PerfisSalvos() {
  const router = useRouter();
  const { ready, autenticado, aluno } = useSession();

  useEffect(() => {
    if (ready && autenticado) router.replace("/avisos");
  }, [ready, autenticado, router]);

  function abrirPerfil() {
    try {
      window.sessionStorage.setItem(PERFIL_KEY, aluno.matricula);
    } catch {}
    router.push("/login");
  }

  function outroUsuario() {
    try {
      window.sessionStorage.removeItem(PERFIL_KEY);
    } catch {}
    router.push("/login");
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-bg">
      <BarraEntrada />
      <main className="app-scroll flex flex-1 flex-col px-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-10 py-8">
          <InatelLogo className="text-6xl" />
          <section className="w-full" aria-labelledby="perfis-titulo">
            <h1 id="perfis-titulo" className="mb-5 text-center text-2xl text-[#b5b5ba]">
              Perfis Salvos
            </h1>
            <button
              type="button"
              onClick={abrirPerfil}
              className="flex min-h-16 w-full items-center gap-3 rounded-md border border-[#c8c8cc] bg-bg px-4 py-3 text-left transition active:bg-surface-2 enabled:hover:bg-surface-1"
              aria-label={`Entrar como ${aluno.nome}, matrícula ${aluno.matricula}`}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[17px] text-white">{aluno.nome}</span>
                <span className="mt-1 block text-[15px] text-[#d0d0d4]">{aluno.matricula}</span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-subtle" aria-hidden />
            </button>
            <PrimaryButton type="button" onClick={outroUsuario} className="mt-4 h-14">
              Outro Usuário
            </PrimaryButton>
          </section>
        </div>
        <footer className="pb-5 text-center text-xs text-subtle">
          Protótipo acadêmico · dados fictícios · S05 IHM
        </footer>
      </main>
    </div>
  );
}
