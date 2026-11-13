"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useSession } from "@/components/session-provider";
import { EntradaLayout, PERFIL_KEY } from "@/components/entrada/entrada-layout";
import { Button, InatelLogo } from "@/components/ui/primitives";

export default function PerfisSalvos() {
  const router = useRouter();
  const { ready, autenticado, aluno } = useSession();

  useEffect(() => {
    if (ready && autenticado) router.replace("/inicio");
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
    <EntradaLayout>
      <div className="flex flex-col items-center gap-10">
        <InatelLogo className="text-6xl lg:text-7xl" />
        <section className="w-full" aria-labelledby="perfis-titulo">
          <h1 id="perfis-titulo" className="mb-5 text-center text-2xl text-muted">
            Perfis Salvos
          </h1>
          <button
            type="button"
            onClick={abrirPerfil}
            className="flex min-h-16 w-full items-center gap-3 rounded-control border border-line-strong bg-bg px-4 py-3 text-left transition-colors duration-150 hover:border-subtle hover:bg-surface-1 active:bg-surface-2"
            aria-label={`Entrar como ${aluno.nome}, matrícula ${aluno.matricula}`}
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[17px] text-fg">{aluno.nome}</span>
              <span className="num mt-1 block text-[15px] text-muted">{aluno.matricula}</span>
            </span>
            <ChevronRight className="size-5 shrink-0 text-subtle" strokeWidth={1.75} aria-hidden />
          </button>
          <Button onClick={outroUsuario} className="mt-3 h-14 w-full">
            Outro Usuário
          </Button>
        </section>
      </div>
    </EntradaLayout>
  );
}
