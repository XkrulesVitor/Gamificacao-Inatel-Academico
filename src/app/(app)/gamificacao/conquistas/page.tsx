"use client";

import clsx from "clsx";
import { useState } from "react";
import {
  CalendarCheck,
  CircleHelp,
  ChevronRight,
  FileCheck,
  GraduationCap,
  Medal,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AjudaMedalhasSheet } from "@/components/gamificacao/ajuda-medalhas-sheet";
import { MedalBadge, percentual } from "@/components/gamificacao/medalha-badge";
import { MedalhaSheet } from "@/components/gamificacao/medalha-sheet";
import { Card, Page, ProgressBar, SectionTitle } from "@/components/ui/primitives";
import { fmtDiaMes } from "@/lib/format";
import { historicoPontos, medalhas } from "@/lib/mock/gamificacao";
import type { Medalha, RegistroPontos } from "@/lib/types";

type Filtro = "todas" | "conquistadas" | "bloqueadas";

const conquistadas = medalhas.filter((m) => m.desbloqueada);
const bloqueadas = medalhas.filter((m) => !m.desbloqueada);

const chips: { id: Filtro; rotulo: string; total: number }[] = [
  { id: "todas", rotulo: "Todas", total: medalhas.length },
  { id: "conquistadas", rotulo: "Conquistadas", total: conquistadas.length },
  { id: "bloqueadas", rotulo: "Bloqueadas", total: bloqueadas.length },
];

const iconeTipo: Record<RegistroPontos["tipo"], LucideIcon> = {
  medalha: Medal,
  nota: GraduationCap,
  presenca: CalendarCheck,
  entrega: FileCheck,
  colaboracao: Users,
};

const proxima = [...bloqueadas].sort((a, b) => percentual(b) - percentual(a))[0];

export default function ConquistasPage() {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [selId, setSelId] = useState<string | null>(null);
  const [sheetAberto, setSheetAberto] = useState(false);
  const [ajudaAberta, setAjudaAberta] = useState(false);

  const grupos: { titulo: string; itens: Medalha[] }[] = [
    ...(filtro !== "bloqueadas" ? [{ titulo: "Conquistadas", itens: conquistadas }] : []),
    ...(filtro !== "conquistadas" ? [{ titulo: "Bloqueadas", itens: bloqueadas }] : []),
  ];

  function abrir(id: string) {
    setSelId(id);
    setSheetAberto(true);
  }

  return (
    <Page>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm text-muted">
          <strong className="font-semibold text-fg">{conquistadas.length}</strong> de {medalhas.length} medalhas
        </p>
        <button
          type="button"
          onClick={() => setAjudaAberta(true)}
          aria-label="Como funcionam as medalhas"
          className="-mr-2 flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-medium text-brand outline-none transition hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-brand"
        >
          <CircleHelp className="size-[18px]" aria-hidden />
          Como funciona?
        </button>
      </div>

      <div role="group" aria-label="Filtrar medalhas" className="flex gap-2">
        {chips.map((c) => {
          const ativo = filtro === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={ativo}
              onClick={() => setFiltro(c.id)}
              className={clsx(
                "h-11 flex-1 whitespace-nowrap rounded-full border px-2 text-[13px] font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-brand",
                ativo
                  ? "border-brand bg-brand text-white"
                  : "border-line-strong bg-surface-1 text-muted hover:text-fg",
              )}
            >
              {c.rotulo} ({c.total})
            </button>
          );
        })}
      </div>

      <div key={filtro} className="animate-fade-up">
        {grupos.map((g) => (
          <section key={g.titulo} aria-label={g.titulo} className="mt-6">
            <SectionTitle>
              {g.titulo} · {g.itens.length}
            </SectionTitle>
            <ul className="grid grid-cols-3 gap-x-2 gap-y-4">
              {g.itens.map((m) => (
                <li key={m.id}>
                  <MedalhaItem medalha={m} onAbrir={() => abrir(m.id)} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {proxima && (
        <>
          <SectionTitle>Próxima conquista</SectionTitle>
          <Card className="flex items-center gap-3">
            <MedalBadge medalha={proxima} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold text-fg">{proxima.nome}</p>
              <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted">{proxima.pendente ?? proxima.requisito}</p>
              <div className="mt-2 flex items-center gap-2">
                <ProgressBar value={percentual(proxima)} max={100} className="flex-1" label={`Progresso de ${proxima.nome}`} />
                <span className="text-xs font-bold text-fg">{percentual(proxima)}%</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => abrir(proxima.id)}
              aria-label={`Ver como desbloquear ${proxima.nome}`}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-white outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </Card>
        </>
      )}

      <SectionTitle>Atividade recente</SectionTitle>
      <Card as="section" className="p-0">
        <ul>
          {historicoPontos.map((h) => {
            const Icone = iconeTipo[h.tipo];
            return (
              <li key={h.id} className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-3 text-muted" aria-hidden>
                  <Icone className="size-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-fg">{h.descricao}</p>
                  <p className="text-xs text-muted">{fmtDiaMes(h.data)}</p>
                </div>
                <span className="text-sm font-bold text-gold">+{h.pontos}</span>
              </li>
            );
          })}
        </ul>
      </Card>

      <MedalhaSheet
        medalha={medalhas.find((m) => m.id === selId) ?? null}
        open={sheetAberto}
        onClose={() => setSheetAberto(false)}
      />
      <AjudaMedalhasSheet open={ajudaAberta} onClose={() => setAjudaAberta(false)} />
    </Page>
  );
}

function MedalhaItem({ medalha: m, onAbrir }: { medalha: Medalha; onAbrir: () => void }) {
  const pct = percentual(m);
  return (
    <button
      type="button"
      onClick={onAbrir}
      aria-label={`${m.nome}, ${m.desbloqueada ? "conquistada" : `bloqueada, ${pct}% de progresso`}`}
      className="flex min-h-[44px] w-full flex-col items-center gap-1.5 rounded-xl px-1 py-1 text-center outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-brand"
    >
      <MedalBadge medalha={m} size="sm" />
      <span
        className={clsx(
          "line-clamp-2 min-h-[2.5em] text-[13px] font-semibold leading-tight",
          m.desbloqueada ? "text-fg" : "text-muted",
        )}
      >
        {m.nome}
      </span>
      {!m.desbloqueada && (
        <span className="flex w-full max-w-[72px] flex-col items-center gap-0.5" aria-hidden>
          <span className="h-1 w-full overflow-hidden rounded-full bg-surface-3">
            <span className="block h-full rounded-full bg-muted" style={{ width: `${pct}%` }} />
          </span>
          <span className="text-[11px] font-semibold text-muted">{pct}%</span>
        </span>
      )}
    </button>
  );
}
