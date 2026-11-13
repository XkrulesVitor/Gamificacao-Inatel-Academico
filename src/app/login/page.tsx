"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CircleAlert, Eye, EyeOff, Info, LoaderCircle } from "lucide-react";
import clsx from "clsx";
import { useSession } from "@/components/session-provider";
import { EntradaLayout, PERFIL_KEY, Surge } from "@/components/entrada/entrada-layout";
import { Button } from "@/components/ui/primitives";
import { aluno as alunoMock, cursos } from "@/lib/mock/aluno";

/** Celular: texto centrado e sem rótulo visível, como no app real. Desktop: rótulo acima e texto à esquerda. */
const campo =
  "h-[52px] w-full rounded-control border border-line-strong bg-surface-1 px-12 text-center text-[16px] text-fg shadow-[0_1px_2px_rgba(16,32,56,0.04)] placeholder:text-subtle transition-[border-color,box-shadow] duration-150 hover:border-subtle/70 focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/25 disabled:opacity-60 aria-[invalid=true]:border-danger lg:h-12 lg:px-3.5 lg:text-left lg:text-[15px]";
const rotulo = "sr-only lg:not-sr-only lg:mb-1.5 lg:block lg:text-[13px] lg:font-medium lg:text-muted";

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
  // A senha vive só neste estado: nunca vai para storage
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const id = useId();

  // "".split("-") devolve [""], então usa || para cair no padrão sem perfil salvo
  const curso = cursoEd ?? (siglaPerfil || "GES");
  const matricula = matEd ?? (matPerfil || "");

  useEffect(() => {
    if (ready && autenticado) router.replace("/inicio");
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
      setSenha("");
      entrar();
      router.replace("/inicio");
    }, 700);
  }

  return (
    <EntradaLayout voltar="/">
      <form onSubmit={autenticar} noValidate aria-busy={carregando}>
        <Surge>
          <h1 className="mb-6 text-center text-lg text-muted lg:mb-7 lg:text-left lg:text-[28px] lg:font-semibold lg:leading-tight lg:tracking-tight lg:text-fg">
            Entre com suas credenciais.
          </h1>
        </Surge>

        <div className="flex flex-col gap-4">
          <Surge>
            <label htmlFor={`${id}-curso`} className={rotulo}>
              Curso
            </label>
            <div className="relative">
              <select
                id={`${id}-curso`}
                value={curso}
                onChange={(e) => {
                  setCursoEd(e.target.value);
                  setErro(null);
                }}
                disabled={carregando}
                className={clsx(campo, "cursor-pointer appearance-none [text-align-last:center] lg:pr-10 lg:[text-align-last:auto]")}
              >
                {cursos.map((c) => (
                  <option key={c.sigla} value={c.sigla}>
                    {c.nome}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 size-[18px] -translate-y-1/2 text-subtle"
                strokeWidth={1.75}
                aria-hidden
              />
            </div>
          </Surge>

          <Surge>
            <label htmlFor={`${id}-mat`} className={rotulo}>
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
              className={clsx(campo, "num")}
            />
          </Surge>

          <Surge>
            <label htmlFor={`${id}-senha`} className={rotulo}>
              Senha
            </label>
            <div className="relative">
              <input
                id={`${id}-senha`}
                ref={senhaRef}
                type={verSenha ? "text" : "password"}
                autoComplete="off"
                placeholder="Senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErro(null);
                }}
                disabled={carregando}
                aria-invalid={!!erro && !senha}
                className={clsx(campo, "lg:pr-12")}
              />
              <button
                type="button"
                onClick={() => setVerSenha((v) => !v)}
                disabled={carregando}
                aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={verSenha}
                className="absolute right-1.5 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-control text-subtle transition-colors duration-150 hover:bg-surface-2 hover:text-fg disabled:opacity-50"
              >
                {verSenha ? (
                  <EyeOff className="size-[18px]" strokeWidth={1.75} aria-hidden />
                ) : (
                  <Eye className="size-[18px]" strokeWidth={1.75} aria-hidden />
                )}
              </button>
            </div>
          </Surge>

          {erro && (
            <p role="alert" className="flex items-start gap-2 text-sm text-danger">
              <CircleAlert className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              {erro}
            </p>
          )}

          <Surge>
            <Button type="submit" disabled={carregando} className="h-14 w-full lg:mt-2 lg:h-12">
              {carregando ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" strokeWidth={1.75} aria-hidden /> Autenticando
                </>
              ) : (
                "Autenticar"
              )}
            </Button>
          </Surge>

          <Surge>
            <div className="mt-1 flex items-center gap-2 border-t border-line pt-3 text-[13px] text-muted">
              <Info className="size-4 shrink-0 text-subtle" strokeWidth={1.75} aria-hidden />
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
          </Surge>
        </div>
      </form>
    </EntradaLayout>
  );
}
