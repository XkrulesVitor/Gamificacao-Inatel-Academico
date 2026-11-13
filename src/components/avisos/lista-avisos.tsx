"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CircleAlert, Landmark, Mail, SearchX, Trophy, Wrench, type LucideIcon } from "lucide-react";
import clsx from "clsx";
import { useShell } from "@/components/shell/app-shell";
import { useSession } from "@/components/session-provider";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { IconBubble, Page, Panel, SplitLayout } from "@/components/ui/primitives";
import { usePrefs } from "@/components/configuracoes/prefs";
import { AtalhoGamificacao } from "@/components/avisos/atalho-gamificacao";
import { useIsDesktop } from "@/lib/use-media";
import { avisos as avisosMock } from "@/lib/mock/aluno";
import { fmtDataHora } from "@/lib/format";
import type { Aviso } from "@/lib/types";

const remetentes: Record<string, { Icone: LucideIcon; tom: "neutral" | "gold" }> = {
  CRA: { Icone: Landmark, tom: "neutral" },
  "Suporte Estudantil": { Icone: Trophy, tom: "gold" },
  "Fab Lab": { Icone: Wrench, tom: "neutral" },
};

function Remetente({ nome, className }: { nome: string; className?: string }) {
  const { Icone, tom } = remetentes[nome] ?? { Icone: Mail, tom: "neutral" as const };
  return (
    <IconBubble tone={tom} className={className}>
      <Icone className="size-5" strokeWidth={1.75} />
    </IconBubble>
  );
}

function normalizar(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function Leitor({ aviso, compacto }: { aviso: Aviso; compacto?: boolean }) {
  return (
    <article>
      <div className="flex items-center gap-3">
        <Remetente nome={aviso.remetente} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-fg">{aviso.remetente}</p>
          <p className="num text-xs text-muted">{fmtDataHora(aviso.data)}</p>
        </div>
        {aviso.importante && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-danger">
            <CircleAlert className="size-4" strokeWidth={1.75} aria-hidden /> Importante
          </span>
        )}
      </div>
      <h3 className={clsx("mt-4 font-semibold leading-snug text-fg", compacto ? "text-lg" : "text-xl")}>{aviso.titulo}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{aviso.corpo}</p>
      {aviso.href && (
        <Link
          href={aviso.href}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-control border border-[#1e5fa0] bg-primary px-4 text-[15px] font-medium text-white transition-colors duration-150 hover:bg-primary-hover lg:w-auto"
        >
          Abrir
        </Link>
      )}
    </article>
  );
}

export function ListaAvisos() {
  const { busca } = useShell();
  const { aluno } = useSession();
  const { prefs } = usePrefs();
  const desktop = useIsDesktop();
  const [lidos, setLidos] = useState<Set<string>>(
    () => new Set(avisosMock.filter((a) => a.lido).map((a) => a.id)),
  );
  const [aberto, setAberto] = useState(false);
  const [selId, setSelId] = useState<string | null>(null);

  const termo = normalizar(busca.trim());
  const filtrando = termo.length > 0;
  const lista = useMemo(
    () =>
      filtrando
        ? avisosMock.filter((a) => normalizar(`${a.titulo} ${a.resumo} ${a.remetente}`).includes(termo))
        : avisosMock,
    [filtrando, termo],
  );

  // Leitor do desktop: seleção explícita ou o primeiro não lido (inicial) da lista visível.
  const inicial = avisosMock.find((a) => !a.lido) ?? avisosMock[0];
  const selecionado = avisosMock.find((a) => a.id === selId) ?? inicial;

  function marcarLido(id: string) {
    setLidos((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }

  function escolher(a: Aviso) {
    setSelId(a.id);
    marcarLido(a.id);
    if (!desktop) setAberto(true);
  }

  const atalho = prefs.mostrarAtalho ? <AtalhoGamificacao nome={aluno.primeiroNome} /> : null;

  const linhas =
    lista.length === 0 ? (
      <div className="flex flex-col items-center gap-2 px-8 py-14 text-center">
        <SearchX className="size-8 text-subtle" strokeWidth={1.75} aria-hidden />
        <p className="font-medium text-fg">Nenhum aviso encontrado</p>
      </div>
    ) : (
      <ul>
        {lista.map((a) => {
          const naoLido = !lidos.has(a.id);
          const ativo = desktop && a.id === selecionado.id;
          return (
            <li key={a.id} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onClick={() => escolher(a)}
                aria-current={ativo || undefined}
                aria-label={`${naoLido ? "Não lido. " : ""}${a.importante ? "Importante. " : ""}${a.remetente}, ${fmtDataHora(a.data)}. ${a.titulo}`}
                className={clsx(
                  "flex min-h-[88px] w-full items-start gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-surface-2 active:bg-surface-2",
                  ativo && "bg-surface-2",
                )}
              >
                <Remetente nome={a.remetente} />
                <span className="min-w-0 flex-1" aria-hidden>
                  <span className="flex items-center gap-1.5">
                    {a.importante && <CircleAlert className="size-4 shrink-0 text-danger" strokeWidth={1.75} />}
                    <span className="truncate text-[15px] font-semibold text-fg">{a.remetente}</span>
                    <span className="num ml-auto shrink-0 text-xs text-muted">{fmtDataHora(a.data)}</span>
                  </span>
                  <span className="mt-0.5 flex items-start gap-2">
                    {naoLido && <span className="mt-2 size-2 shrink-0 rounded-full bg-accent" />}
                    <span className={clsx("line-clamp-2 text-[15px] text-fg", naoLido ? "font-semibold" : "font-normal")}>
                      {a.titulo}
                    </span>
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-sm text-muted">{a.resumo}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    );

  const sheet = (
    <BottomSheet open={aberto} onClose={() => setAberto(false)} title={selecionado.titulo} hideTitle>
      <Leitor aviso={selecionado} compacto />
    </BottomSheet>
  );

  if (desktop) {
    return (
      <Page>
        <SplitLayout
          className="lg:grid-cols-[minmax(0,1fr)_420px]"
          main={<Panel className="overflow-hidden">{linhas}</Panel>}
          aside={
            <div className="space-y-4">
              {atalho}
              {filtrando && lista.length === 0 ? null : (
                <Panel className="p-5">
                  <Leitor aviso={filtrando && !lista.includes(selecionado) ? lista[0] : selecionado} />
                </Panel>
              )}
            </div>
          }
        />
      </Page>
    );
  }

  return (
    <div className="pb-8">
      {atalho && !filtrando && <div className="px-4 pb-1 pt-4">{atalho}</div>}
      {linhas}
      {sheet}
    </div>
  );
}
