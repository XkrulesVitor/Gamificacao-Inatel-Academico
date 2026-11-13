"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleAlert, SearchX } from "lucide-react";
import clsx from "clsx";
import { useShell } from "@/components/shell/app-shell";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { useIsDesktop } from "@/lib/use-media";
import { avisos as avisosMock } from "@/lib/mock/aluno";
import { fmtDataHora, fmtDiaMes, HOJE } from "@/lib/format";
import type { Aviso } from "@/lib/types";
import { AVISO_ABRIR_KEY, SeloRemetente } from "./remetente";

function normalizar(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Aviso pedido por outra tela (ex.: "Avisos recentes" da Início). */
function lerPendente(): string | null {
  try {
    const id = window.sessionStorage.getItem(AVISO_ABRIR_KEY);
    return id && avisosMock.some((a) => a.id === id) ? id : null;
  } catch {
    return null;
  }
}

/** Data da lista: "04/11" no ano corrente, data completa nos demais. */
function dataLista(iso: string): string {
  return iso.slice(0, 4) === HOJE.slice(0, 4) ? fmtDiaMes(iso) : fmtDataHora(iso).split(" ")[0];
}

const rotulosAcao: Record<string, string> = {
  "/gamificacao/conquistas": "Ver conquistas",
  "/gamificacao/ranking": "Ver ranking",
};

function Leitor({ aviso, compacto }: { aviso: Aviso; compacto?: boolean }) {
  return (
    <article aria-labelledby={`aviso-${aviso.id}`}>
      <header className="flex items-center gap-3">
        <SeloRemetente nome={aviso.remetente} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-fg">{aviso.remetente}</p>
          <p className="num text-[13px] text-muted">{fmtDataHora(aviso.data)}</p>
        </div>
        {aviso.importante && (
          <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full bg-danger/12 px-2.5 text-xs font-semibold text-danger">
            <CircleAlert className="size-3.5" strokeWidth={2} aria-hidden /> Importante
          </span>
        )}
      </header>

      <h2
        id={`aviso-${aviso.id}`}
        className={clsx(
          "text-balance font-semibold leading-tight tracking-tight text-fg",
          compacto ? "mt-5 text-[21px]" : "mt-7 text-[26px]",
        )}
      >
        {aviso.titulo}
      </h2>
      <p
        className={clsx(
          "max-w-[68ch] text-pretty text-fg/85",
          compacto ? "mt-3 text-[16px] leading-[1.65]" : "mt-4 text-[17px] leading-[1.7]",
        )}
      >
        {aviso.corpo}
      </p>

      {aviso.href && (
        <Link
          href={aviso.href}
          className={clsx(
            "group inline-flex h-11 items-center justify-center gap-2 rounded-control bg-primary px-5 text-[15px] font-medium text-on-primary shadow-sm transition-[background-color,transform] duration-150 hover:bg-primary-hover active:scale-[0.98]",
            compacto ? "mt-6 w-full" : "mt-8",
          )}
        >
          {rotulosAcao[aviso.href] ?? "Abrir"}
          <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
        </Link>
      )}
    </article>
  );
}

function Linha({
  aviso,
  naoLido,
  ativo,
  onEscolher,
}: {
  aviso: Aviso;
  naoLido: boolean;
  ativo: boolean;
  onEscolher: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onEscolher}
      aria-current={ativo || undefined}
      aria-label={`${naoLido ? "Não lido. " : ""}${aviso.importante ? "Importante. " : ""}${aviso.remetente}, ${fmtDataHora(aviso.data)}. ${aviso.titulo}`}
      className={clsx(
        "relative flex w-full items-start gap-3.5 px-4 py-3.5 text-left transition-colors duration-150 lg:px-5",
        ativo ? "bg-accent/[0.09]" : "hover:bg-surface-2 active:bg-surface-3",
      )}
    >
      {naoLido && <span aria-hidden className="absolute left-[5px] top-[30px] size-2 rounded-full bg-accent lg:left-[7px]" />}
      <SeloRemetente nome={aviso.remetente} />
      <span className="min-w-0 flex-1" aria-hidden>
        <span className="flex items-center gap-1.5">
          {aviso.importante && <CircleAlert className="size-3.5 shrink-0 text-danger" strokeWidth={2} />}
          <span className={clsx("truncate text-[13px] font-medium", naoLido ? "text-fg" : "text-muted")}>
            {aviso.remetente}
          </span>
          <span className={clsx("num ml-auto shrink-0 pl-2 text-xs", naoLido ? "font-medium text-accent" : "text-subtle")}>
            {dataLista(aviso.data)}
          </span>
        </span>
        <span
          className={clsx(
            "mt-0.5 line-clamp-2 text-[15px] leading-snug",
            naoLido ? "font-semibold text-fg" : "font-normal text-fg/90",
          )}
        >
          {aviso.titulo}
        </span>
        <span className="mt-1 line-clamp-1 block text-[13px] leading-snug text-muted">{aviso.resumo}</span>
      </span>
    </button>
  );
}

export function ListaAvisos() {
  const { busca } = useShell();
  const desktop = useIsDesktop();
  const [pendente] = useState(lerPendente);
  const [lidos, setLidos] = useState<Set<string>>(() => {
    const s = new Set(avisosMock.filter((a) => a.lido).map((a) => a.id));
    if (pendente) s.add(pendente);
    return s;
  });
  const [aberto, setAberto] = useState(() => Boolean(pendente) && !desktop);
  const [selId, setSelId] = useState<string | null>(pendente);

  // O pedido de abertura vale uma vez
  useEffect(() => {
    if (!pendente) return;
    try {
      window.sessionStorage.removeItem(AVISO_ABRIR_KEY);
    } catch {}
  }, [pendente]);

  const termo = normalizar(busca.trim());
  const filtrando = termo.length > 0;
  const lista = useMemo(
    () =>
      filtrando
        ? avisosMock.filter((a) => normalizar(`${a.titulo} ${a.resumo} ${a.remetente}`).includes(termo))
        : avisosMock,
    [filtrando, termo],
  );

  // Leitor do desktop: seleção explícita ou o primeiro não lido.
  const inicial = avisosMock.find((a) => !a.lido) ?? avisosMock[0];
  const selecionado = avisosMock.find((a) => a.id === selId) ?? inicial;
  const noLeitor = filtrando && !lista.includes(selecionado) ? lista[0] : selecionado;

  function escolher(a: Aviso) {
    setSelId(a.id);
    setLidos((prev) => (prev.has(a.id) ? prev : new Set(prev).add(a.id)));
    if (!desktop) setAberto(true);
  }

  const linhas =
    lista.length === 0 ? (
      <div className="flex flex-col items-center gap-2 px-8 py-16 text-center">
        <SearchX className="size-8 text-subtle" strokeWidth={1.75} aria-hidden />
        <p className="font-medium text-fg">Nenhum aviso encontrado</p>
      </div>
    ) : (
      <ul className="divide-y divide-line">
        {lista.map((a) => (
          <li key={a.id}>
            <Linha
              aviso={a}
              naoLido={!lidos.has(a.id)}
              ativo={desktop && noLeitor?.id === a.id}
              onEscolher={() => escolher(a)}
            />
          </li>
        ))}
      </ul>
    );

  if (desktop) {
    return (
      <div className="mx-auto w-full max-w-[1240px] px-6 pb-14 pt-6 xl:px-8 xl:pt-8">
        <div className="grid grid-cols-[minmax(300px,360px)_minmax(0,1fr)] items-start gap-6 xl:grid-cols-[400px_minmax(0,1fr)] xl:gap-8">
          <section aria-label="Lista de avisos" className="overflow-hidden rounded-card border border-line bg-surface-1 shadow-card">
            {linhas}
          </section>
          {noLeitor && (
            <section
              aria-label="Aviso aberto"
              className="sticky top-6 rounded-card border border-line bg-surface-1 px-8 pb-9 pt-7 shadow-card xl:top-8 xl:px-10"
            >
              <Leitor key={noLeitor.id} aviso={noLeitor} />
            </section>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="border-b border-line bg-surface-1">{linhas}</div>
      <BottomSheet open={aberto} onClose={() => setAberto(false)} title={selecionado.titulo} hideTitle>
        <Leitor aviso={selecionado} compacto />
      </BottomSheet>
    </div>
  );
}
