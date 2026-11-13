"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useSession } from "@/components/session-provider";
import { EntradaLayout, PERFIL_KEY, Surge } from "@/components/entrada/entrada-layout";
import { Button, InatelLogo } from "@/components/ui/primitives";
import { iniciais } from "@/lib/format";

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
      <Surge className="mb-10 flex justify-center lg:hidden">
        <InatelLogo className="text-[64px] leading-none" />
      </Surge>

      <section aria-labelledby="perfis-titulo">
        <Surge>
          <h1
            id="perfis-titulo"
            className="mb-5 text-center text-2xl text-muted lg:mb-6 lg:text-left lg:text-[28px] lg:font-semibold lg:tracking-tight lg:text-fg"
          >
            Perfis Salvos
          </h1>
        </Surge>

        <Surge>
          <button
            type="button"
            onClick={abrirPerfil}
            className="group flex min-h-[72px] w-full items-center gap-3.5 rounded-card border border-line-strong bg-surface-1 px-4 py-3 text-left shadow-card transition-[border-color,background-color,transform] duration-150 hover:border-accent/50 active:scale-[0.99] active:bg-surface-2"
            aria-label={`Entrar como ${aluno.nome}, matrícula ${aluno.matricula}`}
          >
            <span
              aria-hidden
              className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-[15px] font-semibold text-on-primary"
            >
              {iniciais(aluno.nome)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[17px] font-medium text-fg">{aluno.nome}</span>
              <span className="mt-0.5 block text-sm text-muted">{aluno.matricula}</span>
            </span>
            <ChevronRight
              className="size-5 shrink-0 text-subtle transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-accent"
              strokeWidth={1.75}
              aria-hidden
            />
          </button>
        </Surge>

        <Surge>
          <Button onClick={outroUsuario} className="mt-3 h-14 w-full lg:h-12">
            Outro Usuário
          </Button>
        </Surge>
      </section>
    </EntradaLayout>
  );
}
