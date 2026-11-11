"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Minus, Smartphone } from "lucide-react";
import clsx from "clsx";
import { useSession } from "@/components/session-provider";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Card, Page, SectionTitle } from "@/components/ui/primitives";
import { usePrefs, type Prefs } from "@/components/configuracoes/prefs";
import { itensRemovidos } from "@/lib/nav";

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
  descricao: string;
}) {
  return (
    <div className="flex min-h-14 items-center gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p id={`${id}-l`} className="text-[15px] font-medium text-white">
          {label}
        </p>
        <p id={`${id}-d`} className="mt-0.5 text-[13px] leading-snug text-muted">
          {descricao}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-l`}
        aria-describedby={`${id}-d`}
        onClick={() => onChange(!checked)}
        className="grid size-12 shrink-0 place-items-center rounded-full outline-offset-0"
      >
        <span
          aria-hidden
          className={clsx(
            "relative h-7 w-12 rounded-full transition-colors",
            checked ? "bg-primary-strong" : "bg-surface-3 ring-1 ring-inset ring-line-strong",
          )}
        >
          <span
            className={clsx(
              "absolute left-0.5 top-0.5 size-6 rounded-full bg-white shadow transition-transform",
              checked && "translate-x-5",
            )}
          />
        </span>
      </button>
    </div>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0">
      <dt className="text-sm text-muted">{rotulo}</dt>
      <dd className="min-w-0 break-words text-right text-[15px] text-white">{valor}</dd>
    </div>
  );
}

const opcoes: { chave: keyof Prefs; label: string; descricao: string }[] = [
  {
    chave: "notificarMedalhas",
    label: "Notificar novas medalhas",
    descricao: "Receba um aviso quando desbloquear uma conquista.",
  },
  {
    chave: "exibirNome",
    label: "Exibir meu nome no ranking",
    descricao: "Desligado, você aparece como \"Anônimo\" para os colegas. Sua posição continua sendo calculada.",
  },
  {
    chave: "mostrarAtalho",
    label: "Mostrar atalho na tela inicial",
    descricao: "Cartão com nível, pontos e ranking no topo dos Avisos.",
  },
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
      <SectionTitle>Perfil</SectionTitle>
      <Card>
        <dl>
          <Linha rotulo="Nome" valor={aluno.nome} />
          <Linha rotulo="Matrícula" valor={aluno.matricula} />
          <Linha rotulo="Curso" valor={aluno.curso} />
          <Linha rotulo="E-mail" valor={aluno.email} />
          <Linha rotulo="Período" valor={`${aluno.periodo}º · ${aluno.semestre}`} />
        </dl>
      </Card>

      <SectionTitle>Gamificação</SectionTitle>
      <Card className="divide-y divide-line py-1">
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
      </Card>
      <p className="mt-2 px-1 text-xs text-subtle">Preferências guardadas apenas neste aparelho.</p>

      <SectionTitle>Instalar como app</SectionTitle>
      <Card className="flex gap-3">
        <Smartphone className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
        <ul className="space-y-1.5 text-sm leading-relaxed text-[#d4d4d8]">
          <li>
            <strong className="text-white">Android:</strong> menu ⋮ do navegador &gt; Instalar app.
          </li>
          <li>
            <strong className="text-white">iPhone:</strong> Compartilhar &gt; Adicionar à Tela de Início.
          </li>
        </ul>
      </Card>

      <SectionTitle>Sobre o protótipo</SectionTitle>
      <Card>
        <p className="text-sm font-semibold text-white">O que foi adicionado</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#d4d4d8]">
          <li>Suporte Estudantil &gt; Conquistas e Ranking, no menu lateral.</li>
          <li>Atalho de gamificação na tela inicial (Avisos), para consulta rápida entre aulas.</li>
          <li>Ranking normalizado por créditos e presença em laboratórios, para ser justo com todos.</li>
        </ul>

        <p className="mt-5 text-sm font-semibold text-white">O que saiu do menu original</p>
        <p className="mt-1 text-[13px] leading-snug text-muted">
          Menu enxuto: itens de baixo uso foram removidos para reduzir a carga de decisão (heurística 8 de Nielsen,
          design estético e minimalista).
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {itensRemovidos.map((i) => (
            <li key={i} className="flex items-center gap-1 rounded-full bg-surface-3 px-2.5 py-1 text-xs text-muted">
              <Minus className="size-3 text-danger" aria-hidden /> {i}
            </li>
          ))}
        </ul>
        <p className="mt-5 flex items-center gap-1.5 text-xs text-subtle">
          v1.0 · S05 IHM · dados fictícios
        </p>
      </Card>

      <button
        type="button"
        onClick={() => setConfirmarSaida(true)}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md border border-danger/50 text-[15px] font-medium text-danger transition active:bg-danger/10 hover:bg-danger/5"
      >
        <LogOut className="size-4" aria-hidden /> Sair da conta
      </button>

      <BottomSheet open={confirmarSaida} onClose={() => setConfirmarSaida(false)} title="Sair da conta?">
        <p className="text-sm text-muted">Você voltará para os Perfis Salvos e precisará se autenticar novamente.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setConfirmarSaida(false)}
            className="h-12 rounded-md border border-line-strong text-[15px] font-medium text-white transition active:bg-surface-3"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={sairDaConta}
            className="h-12 rounded-md bg-danger text-[15px] font-semibold text-black transition active:scale-[0.98]"
          >
            Sair
          </button>
        </div>
      </BottomSheet>
    </Page>
  );
}
