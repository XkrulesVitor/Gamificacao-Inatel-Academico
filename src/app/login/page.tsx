"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, Info, LoaderCircle } from "lucide-react";
import clsx from "clsx";
import { useSession } from "@/components/session-provider";
import { EntradaLayout, PERFIL_KEY } from "@/components/entrada/entrada-layout";
import { Button } from "@/components/ui/primitives";
import { aluno as alunoMock, cursos } from "@/lib/mock/aluno";

const campo =
  "h-[52px] w-full rounded-control border border-line-strong bg-bg px-3 text-center text-[16px] text-fg placeholder:text-subtle transition-colors duration-150 hover:border-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60 aria-[invalid=true]:border-danger";

const subscribeNada = () => () => {};
/** Perfil escolhido em "Perfis Salvos" (sessionStorage), lido sem setState em effect. */
function lerPerfil(): string {
  try {
    return window.sessionStorage.getItem(PERFIL_KEY) ?? "";
  } catch {
    return "";
  }
}

export default function Credenciais() {
  const router = useRouter();
  const { ready, autenticado, entrar } = useSession();
  const perfil = useSyncExternalStore(subscribeNada, lerPerfil, () => "");
  const [siglaPerfil, matPerfil] = perfil.split("-");

  const [cursoEd, setCursoEd] = useState<string | null>(null);
  const [matEd, setMatEd] = useState<string | null>(null);
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const id = useId();

  // "".split("-") devolve [""], então usa || para cair no padrão sem perfil salvo
  const curso = cursoEd ?? (siglaPerfil || "GES");
  const matricula = matEd ?? (matPerfil || "");

  useEffect(() => {
    if (ready && autenticado) router.replace("/avisos");
  }, [ready, autenticado, router]);

  useEffect(() => {
    if (perfil) senhaRef.current?.focus();
  }, [perfil]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function preencherDemo() {
    setCursoEd(alunoMock.siglaCurso);
    setMatEd(alunoMock.numeroMatricula);
    setSenha("demo");
    setErro(null);
  }

  function autenticar(e: React.FormEvent) {
    e.preventDefault();
    if (carregando) return;
    if (!matricula.trim()) return setErro("Informe a matrícula.");
    if (!senha) return setErro("Informe a senha.");
    if (curso !== alunoMock.siglaCurso || matricula.trim() !== alunoMock.numeroMatricula) {
      return setErro("Matrícula não encontrada. Na demonstração use 412.");
    }
    setErro(null);
    setCarregando(true);
    timer.current = setTimeout(() => {
      entrar();
      router.replace("/avisos");
    }, 700);
  }

  return (
    <EntradaLayout voltar="/">
      <form onSubmit={autenticar} noValidate className="flex flex-col gap-4" aria-busy={carregando}>
        <h1 className="mb-2 text-center text-lg text-muted">Entre com suas credenciais.</h1>

        <label htmlFor={`${id}-curso`} className="sr-only">
          Curso
        </label>
        <select
          id={`${id}-curso`}
          value={curso}
          onChange={(e) => {
            setCursoEd(e.target.value);
            setErro(null);
          }}
          disabled={carregando}
          className={clsx(campo, "appearance-none [text-align-last:center]")}
        >
          {cursos.map((c) => (
            <option key={c.sigla} value={c.sigla}>
              {c.nome}
            </option>
          ))}
        </select>

        <label htmlFor={`${id}-mat`} className="sr-only">
          Matrícula
        </label>
        <input
          id={`${id}-mat`}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => {
            setMatEd(e.target.value.replace(/\D/g, ""));
            setErro(null);
          }}
          disabled={carregando}
          aria-invalid={!!erro && !matricula}
          className={campo}
        />

        <label htmlFor={`${id}-senha`} className="sr-only">
          Senha
        </label>
        <input
          id={`${id}-senha`}
          ref={senhaRef}
          type="password"
          autoComplete="off"
          placeholder="Senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErro(null);
          }}
          disabled={carregando}
          aria-invalid={!!erro && !senha}
          className={campo}
        />

        {erro && (
          <p role="alert" className="flex items-start gap-2 text-sm text-danger">
            <CircleAlert className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden />
            {erro}
          </p>
        )}

        <Button type="submit" disabled={carregando} className="h-14 w-full">
          {carregando ? (
            <>
              <LoaderCircle className="size-5 animate-spin" strokeWidth={1.75} aria-hidden /> Autenticando
            </>
          ) : (
            "Autenticar"
          )}
        </Button>

        <div className="mt-2 flex items-center gap-2 text-[13px] text-subtle">
          <Info className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
          <p className="min-w-0 flex-1">Conta de demonstração</p>
          <button
            type="button"
            onClick={preencherDemo}
            disabled={carregando}
            className="-mr-2 inline-flex h-11 shrink-0 items-center rounded-control px-2 font-medium text-accent transition-colors duration-150 enabled:hover:bg-accent/10 disabled:opacity-50"
          >
            Preencher
          </button>
        </div>
      </form>
    </EntradaLayout>
  );
}
