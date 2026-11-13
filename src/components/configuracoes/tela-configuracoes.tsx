"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Monitor, Moon, Smartphone, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { useSession } from "@/components/session-provider";
import { useTheme } from "@/components/theme-provider";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import {
  Button,
  Page,
  Panel,
  SectionHeading,
} from "@/components/ui/primitives";
import { usePrefs, type Prefs } from "@/components/configuracoes/prefs";

function Switch({
  id,
  checked,
  onChange,
  label,
  descricao,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  descricao?: string;
}) {
  return (
    <div className="flex min-h-14 items-center gap-3 px-4 py-2">
      <div className="min-w-0 flex-1">
        <p id={`${id}-l`} className="text-[15px] text-fg">
          {label}
        </p>
        {descricao && (
          <p id={`${id}-d`} className="mt-0.5 text-[13px] text-muted">
            {descricao}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-l`}
        aria-describedby={descricao ? `${id}-d` : undefined}
        onClick={() => onChange(!checked)}
        className="-mr-2 grid size-12 shrink-0 place-items-center rounded-full"
      >
        <span
          aria-hidden
          className={clsx(
            "relative h-7 w-12 rounded-full transition-colors duration-200",
            checked
              ? "bg-primary"
              : "bg-surface-3 ring-1 ring-inset ring-line-strong",
          )}
        >
          <span
            className={clsx(
              "absolute left-0.5 top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform duration-200",
              checked && "translate-x-5",
            )}
          />
        </span>
      </button>
    </div>
  );
}

const TEMAS = [
  { valor: "sistema", rotulo: "Sistema", Icone: Monitor },
  { valor: "claro", rotulo: "Claro", Icone: Sun },
  { valor: "escuro", rotulo: "Escuro", Icone: Moon },
] as const;

/** Seletor segmentado de tema: o indicador desliza entre as opções. */
function SeletorTema() {
  const { preferencia, definir } = useTheme();
  const reduzir = useReducedMotion();

  function aoTeclar(e: React.KeyboardEvent<HTMLDivElement>) {
    const i = TEMAS.findIndex((t) => t.valor === preferencia);
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % TEMAS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + TEMAS.length) % TEMAS.length;
    else return;
    e.preventDefault();
    definir(TEMAS[n].valor);
    (e.currentTarget.children[n] as HTMLElement).focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label="Tema"
      onKeyDown={aoTeclar}
      className="grid grid-cols-3 gap-1 rounded-control bg-surface-3 p-1"
    >
      {TEMAS.map(({ valor, rotulo, Icone }) => {
        const ativo = preferencia === valor;
        return (
          <button
            key={valor}
            type="button"
            role="radio"
            aria-checked={ativo}
            tabIndex={ativo ? 0 : -1}
            onClick={() => definir(valor)}
            className={clsx(
              "relative flex h-11 items-center justify-center gap-2 rounded-[8px] text-[14px] font-medium transition-colors duration-150",
              ativo ? "text-fg" : "text-muted hover:text-fg",
            )}
          >
            {ativo && (
              <motion.span
                layoutId="tema-ativo"
                aria-hidden
                transition={reduzir ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-[8px] border border-line bg-surface-1 shadow-card"
              />
            )}
            <Icone className={clsx("relative size-4", ativo && "text-accent")} strokeWidth={1.75} aria-hidden />
            <span className="relative">{rotulo}</span>
          </button>
        );
      })}
    </div>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-3">
      <dt className="text-sm text-muted">{rotulo}</dt>
      <dd className="min-w-0 break-words text-right text-[15px] text-fg">
        {valor}
      </dd>
    </div>
  );
}

const opcoes: { chave: keyof Prefs; label: string; descricao?: string }[] = [
  { chave: "notificarMedalhas", label: "Notificar medalhas" },
  { chave: "exibirNome", label: "Mostrar meu nome no ranking" },
  { chave: "mostrarAtalho", label: "Gamificação no Início" },
];

export function TelaConfiguracoes() {
  const router = useRouter();
  const { aluno, sair } = useSession();
  const { prefs, definir } = usePrefs();
  const [confirmarSaida, setConfirmarSaida] = useState(false);

  function sairDaConta() {
    setConfirmarSaida(false);
    sair();
    router.replace("/");
  }

  return (
    <Page>
      <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <section>
            <SectionHeading>Aparência</SectionHeading>
            <Panel as="div" className="p-3 shadow-card">
              <SeletorTema />
            </Panel>
          </section>

          <section>
            <SectionHeading>Perfil</SectionHeading>
            <Panel as="div" className="shadow-card">
              <dl className="divide-y divide-line">
                <Linha rotulo="Nome" valor={aluno.nome} />
                <Linha rotulo="Matrícula" valor={aluno.matricula} />
                <Linha rotulo="Curso" valor={aluno.curso} />
                <Linha rotulo="E-mail" valor={aluno.email} />
                <Linha
                  rotulo="Período"
                  valor={`${aluno.periodo}º · ${aluno.semestre}`}
                />
              </dl>
            </Panel>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <SectionHeading>Gamificação</SectionHeading>
            <Panel as="div" className="divide-y divide-line shadow-card">
              {opcoes.map((o) => (
                <Switch
                  key={o.chave}
                  id={`pref-${o.chave}`}
                  checked={prefs[o.chave]}
                  onChange={(v) => definir(o.chave, v)}
                  label={o.label}
                  descricao={o.descricao}
                />
              ))}
            </Panel>
          </section>

          <section>
            <SectionHeading>Instalar como app</SectionHeading>
            <Panel as="div" className="divide-y divide-line shadow-card">
              {[
                ["Android", "Menu do navegador, Instalar app"],
                ["iPhone", "Compartilhar, Adicionar à Tela de Início"],
              ].map(([so, passo]) => (
                <div
                  key={so}
                  className="flex min-h-14 items-center gap-3 px-4 py-3"
                >
                  <Smartphone
                    className="size-5 shrink-0 text-muted"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <p className="min-w-0 text-[15px] text-fg">
                    {so} <span className="text-muted">· {passo}</span>
                  </p>
                </div>
              ))}
            </Panel>
          </section>
        </div>

        <div className="lg:hidden">
          <Button
            variant="secondary"
            onClick={() => setConfirmarSaida(true)}
            className="w-full"
          >
            <LogOut className="size-4" strokeWidth={1.75} aria-hidden /> Sair
          </Button>
        </div>
      </div>

      <BottomSheet
        open={confirmarSaida}
        onClose={() => setConfirmarSaida(false)}
        title="Sair da conta?"
      >
        <div className="mt-2 grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => setConfirmarSaida(false)}>
            Cancelar
          </Button>
          <Button onClick={sairDaConta}>Sair</Button>
        </div>
      </BottomSheet>
    </Page>
  );
}
