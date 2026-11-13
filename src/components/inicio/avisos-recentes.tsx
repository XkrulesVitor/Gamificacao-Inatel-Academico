"use client";

import Link from "next/link";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { AVISO_ABRIR_KEY, SeloRemetente } from "@/components/avisos/remetente";
import { fmtDiaMes } from "@/lib/format";
import { avisosRecentes } from "./dados";

function lembrar(id: string) {
  try {
    window.sessionStorage.setItem(AVISO_ABRIR_KEY, id);
  } catch {}
}

/** Últimos avisos, compactos. Tocar abre o aviso direto na tela Avisos. */
export function AvisosRecentes() {
  const lista = avisosRecentes(3);
  return (
    <section aria-labelledby="avisos-recentes-titulo" className="rounded-card border border-line bg-surface-1 shadow-card">
      <div className="flex items-center justify-between gap-3 px-5 pb-1 pt-4">
        <h2 id="avisos-recentes-titulo" className="text-[15px] font-semibold tracking-tight text-fg">
          Avisos recentes
        </h2>
        <Link
          href="/avisos"
          className="-mr-2 inline-flex h-9 items-center gap-1 rounded-control px-2 text-sm font-medium text-accent transition-colors duration-150 hover:bg-accent/10"
        >
          Ver todos
          <ChevronRight className="size-4" strokeWidth={1.75} aria-hidden />
        </Link>
      </div>
      <ul className="px-2 pb-2">
        {lista.map((a) => (
          <li key={a.id}>
            <Link
              href="/avisos"
              onClick={() => lembrar(a.id)}
              aria-label={`${a.lido ? "" : "Não lido. "}${a.remetente}, ${fmtDiaMes(a.data)}. ${a.titulo}`}
              className="flex min-h-[60px] items-center gap-3 rounded-control px-3 py-2.5 transition-colors duration-150 hover:bg-surface-2 active:bg-surface-3"
            >
              <SeloRemetente nome={a.remetente} tamanho="sm" />
              <span className="min-w-0 flex-1" aria-hidden>
                <span className="flex items-center gap-2 text-xs text-muted">
                  <span className="truncate">{a.remetente}</span>
                  <span className="num ml-auto shrink-0 text-subtle">{fmtDiaMes(a.data)}</span>
                </span>
                <span className="mt-0.5 flex items-center gap-2">
                  <span
                    className={clsx(
                      "truncate text-sm leading-snug text-fg",
                      a.lido ? "font-normal" : "font-semibold",
                    )}
                  >
                    {a.titulo}
                  </span>
                  {!a.lido && <span className="ml-auto size-2 shrink-0 rounded-full bg-accent" />}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
