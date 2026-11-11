"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";
import clsx from "clsx";
import { useShell } from "@/components/shell/app-shell";
import { useSession } from "@/components/session-provider";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Avatar } from "@/components/ui/primitives";
import { usePrefs } from "@/components/configuracoes/prefs";
import { AtalhoGamificacao } from "@/components/avisos/atalho-gamificacao";
import { avisos as avisosMock } from "@/lib/mock/aluno";
import { fmtDataHora } from "@/lib/format";
import type { Aviso } from "@/lib/types";

const corAvatar: Record<Aviso["cor"], string> = {
  accent: "bg-accent",
  gold: "bg-gold !text-black",
  xp: "bg-xp",
  teal: "bg-teal",
  brand: "bg-brand",
};

function normalizar(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function ListaAvisos() {
  const { busca } = useShell();
  const { aluno } = useSession();
  const { prefs } = usePrefs();
  const [lidos, setLidos] = useState<Set<string>>(
    () => new Set(avisosMock.filter((a) => a.lido).map((a) => a.id)),
  );
  const [aberto, setAberto] = useState(false);
  const [selecionado, setSelecionado] = useState<Aviso | null>(null);

  const termo = normalizar(busca.trim());
  const filtrando = termo.length > 0;
  const lista = useMemo(
    () =>
      filtrando
        ? avisosMock.filter((a) => normalizar(`${a.titulo} ${a.resumo} ${a.remetente}`).includes(termo))
        : avisosMock,
    [filtrando, termo],
  );

  function abrir(a: Aviso) {
    setSelecionado(a);
    setAberto(true);
    setLidos((prev) => new Set(prev).add(a.id));
  }

  return (
    <div className="animate-fade-up pb-8">
      {prefs.mostrarAtalho && !filtrando && (
        <div className="px-4 pb-3 pt-4">
          <AtalhoGamificacao nome={aluno.primeiroNome} />
        </div>
      )}

      {lista.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-8 py-14 text-center">
          <SearchX className="size-10 text-subtle" aria-hidden />
          <p className="font-semibold text-white">Nenhum aviso encontrado</p>
          <p className="text-sm text-muted">
            Não achamos resultados para &ldquo;{busca.trim()}&rdquo;. Tente outro remetente ou palavra do título.
          </p>
        </div>
      ) : (
        <ul>
          {lista.map((a) => {
            const naoLido = !lidos.has(a.id);
            return (
              <li key={a.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => abrir(a)}
                  aria-label={`${naoLido ? "Não lido. " : ""}${a.importante ? "Importante. " : ""}${a.remetente}, ${fmtDataHora(a.data)}. ${a.titulo}`}
                  className="flex min-h-[88px] w-full items-start gap-3 px-4 py-3 text-left transition active:bg-surface-2 hover:bg-surface-1"
                >
                  <Avatar label={a.remetente.charAt(0).toUpperCase()} className={corAvatar[a.cor]} />
                  <span className="min-w-0 flex-1" aria-hidden>
                    <span className="flex items-center gap-1.5">
                      {a.importante && <span className="font-bold text-danger">!</span>}
                      <span className="truncate text-[15px] font-semibold text-white">{a.remetente}</span>
                      <span className="ml-auto shrink-0 text-xs text-muted">{fmtDataHora(a.data)}</span>
                    </span>
                    <span className="mt-0.5 flex items-center gap-2">
                      {naoLido && <span className="size-2 shrink-0 rounded-full bg-brand" />}
                      <span className={clsx("truncate text-[15px] text-white", naoLido ? "font-bold" : "font-normal")}>
                        {a.titulo}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-muted">{a.resumo}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <BottomSheet open={aberto} onClose={() => setAberto(false)} title={selecionado?.titulo ?? "Aviso"} hideTitle>
        {selecionado && (
          <article className="pb-2">
            <div className="flex items-center gap-3">
              <Avatar label={selecionado.remetente.charAt(0).toUpperCase()} className={corAvatar[selecionado.cor]} />
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{selecionado.remetente}</p>
                <p className="text-xs text-muted">{fmtDataHora(selecionado.data)}</p>
              </div>
              {selecionado.importante && (
                <span className="ml-auto rounded-full bg-danger/15 px-2.5 py-1 text-xs font-semibold text-danger">
                  Importante
                </span>
              )}
            </div>
            <h3 className="mt-4 text-lg font-bold leading-snug text-white">{selecionado.titulo}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#d4d4d8]">{selecionado.corpo}</p>
            {selecionado.href && (
              <Link
                href={selecionado.href}
                className="mt-5 flex h-12 w-full items-center justify-center rounded-md border border-[#1e5fa0] bg-primary text-[15px] font-medium text-white transition active:scale-[0.99] hover:bg-[#0a52a0]"
              >
                Abrir Conquistas e Ranking
              </Link>
            )}
          </article>
        )}
      </BottomSheet>
    </div>
  );
}
