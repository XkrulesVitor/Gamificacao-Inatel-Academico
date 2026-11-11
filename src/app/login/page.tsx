"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, Info, LoaderCircle } from "lucide-react";
import clsx from "clsx";
import { useSession } from "@/components/session-provider";
import { BarraEntrada, PERFIL_KEY } from "@/components/entrada/entrada-layout";
import { PrimaryButton } from "@/components/ui/primitives";
import { aluno as alunoMock, cursos } from "@/lib/mock/aluno";

const campo =
  "h-[52px] w-full rounded-md border border-[#c8c8cc] bg-bg px-3 text-center text-[16px] text-white placeholder:text-subtle focus:border-brand focus:outline-2 focus:outline-offset-2 focus:outline-brand";

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

  // "".split("-") devolve [""] — usar || para cair no padrão quando não há perfil salvo
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
    if (!matricula.trim()) return setErro("Informe o número da matrícula.");
    if (!senha) return setErro("Informe a senha para continuar.");
    if (curso !== alunoMock.siglaCurso || matricula.trim() !== alunoMock.numeroMatricula) {
      return setErro("Matrícula não encontrada para este curso. Na demo use Engenharia de Software · 412.");
    }
    setErro(null);
    setCarregando(true);
    timer.current = setTimeout(() => {
      entrar();
      router.replace("/avisos");
    }, 700);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-bg">
      <BarraEntrada voltar="/" />
      <main className="app-scroll flex flex-1 flex-col px-6 pb-6">
        <form onSubmit={autenticar} noValidate className="my-auto flex flex-col gap-4 py-6" aria-busy={carregando}>
          <h1 className="mb-2 text-center text-lg text-[#b5b5ba]">Entre com suas credenciais.</h1>

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
            className={clsx(campo, "appearance-none text-center [text-align-last:center]")}
          >
            {cursos.map((c) => (
              <option key={c.sigla} value={c.sigla}>
                {c.nome}
              </option>
            ))}
          </select>

          <label htmlFor={`${id}-mat`} className="sr-only">
            Matrícula (somente números)
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
            <p
              role="alert"
              className="flex items-start gap-2 rounded-md border border-danger/40 bg-danger/10 px-3 py-2.5 text-sm text-[#ff8a82]"
            >
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              {erro}
            </p>
          )}

          <PrimaryButton type="submit" disabled={carregando} className="h-14">
            {carregando ? (
              <>
                <LoaderCircle className="size-5 animate-spin" aria-hidden /> Autenticando...
              </>
            ) : (
              "Autenticar"
            )}
          </PrimaryButton>

          <div className="mt-2 rounded-md border border-gold/30 bg-gold/10 p-3.5 text-[13px] leading-relaxed text-[#e9d9a6]">
            <p className="flex items-start gap-2">
              <Info className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span>
                <strong className="font-semibold text-gold">Conta de demonstração:</strong> Engenharia de Software ·
                matrícula 412 · qualquer senha. É um protótipo — não digite sua senha real.
              </span>
            </p>
            <button
              type="button"
              onClick={preencherDemo}
              disabled={carregando}
              className="mt-3 h-11 w-full rounded-md border border-gold/50 text-[14px] font-medium text-gold transition active:bg-gold/15 enabled:hover:bg-gold/10 disabled:opacity-50"
            >
              Preencher conta demo
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
