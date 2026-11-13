"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { BookOpen, CalendarClock, ChevronRight, Clock, FlaskConical, MapPin } from "lucide-react";
import { fmt1, fmtDiaMes } from "@/lib/format";
import { AGORA, aulasDeHoje, emDias, type AulaDoDia } from "./dados";

function Pilula({ rotulo, valor, alerta }: { rotulo: string; valor: string; alerta?: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[13px] ring-1 ring-inset",
        alerta ? "bg-danger/10 text-danger ring-danger/25" : "bg-surface-2 text-muted ring-line",
      )}
    >
      {rotulo}
      <span className={clsx("num font-semibold", alerta ? "text-danger" : "text-fg")}>{valor}</span>
    </span>
  );
}

function CardAula({ aula }: { aula: AulaDoDia }) {
  const proxima = aula.estado === "proxima";
  const agora = aula.estado === "agora";
  const destaque = proxima || agora;
  const TipoIcone = aula.lab ? FlaskConical : BookOpen;
  // Faltas perto do limite (75%) ficam em vermelho
  const faltasAlerta = aula.limiteFaltas > 0 && aula.faltas >= aula.limiteFaltas * 0.75;

  return (
    <article
      aria-label={`${aula.disciplina.nome}, ${aula.inicio} às ${aula.fim}${proxima ? ", próxima aula" : ""}`}
      className={clsx(
        "flex h-full flex-col overflow-hidden rounded-card border bg-surface-1 shadow-card transition-[border-color,box-shadow] duration-200",
        destaque ? "border-accent/45 ring-1 ring-accent/15" : "border-line",
        aula.estado === "encerrada" && "opacity-60",
      )}
    >
      {aula.prova && (
        <Link
          href="/provas"
          className="flex h-9 shrink-0 items-center gap-2 border-b border-accent/15 bg-accent/10 px-4 text-[13px] font-medium text-accent transition-colors duration-150 hover:bg-accent/15"
        >
          <CalendarClock className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
          <span className="num">
            Prova {fmtDiaMes(aula.prova.data)}
          </span>
          <span className="num ml-auto font-normal opacity-80">
            {aula.prova.tipo} · {emDias(aula.prova.data)}
          </span>
        </Link>
      )}

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <div className="flex min-h-6 items-center gap-2 text-[13px] text-muted">
          <span className="num font-medium text-fg/80">{aula.disciplina.codigo}</span>
          <span aria-hidden className="text-subtle">·</span>
          <span className="inline-flex items-center gap-1">
            <TipoIcone className="size-3.5" strokeWidth={1.75} aria-hidden />
            {aula.lab ? "Laboratório" : "Teoria"}
          </span>
          {destaque && (
            <span className="ml-auto inline-flex h-6 items-center gap-1.5 rounded-full bg-accent/12 px-2.5 text-xs font-semibold text-accent">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {agora ? "Agora" : `Em ${aula.emMinutos} min`}
            </span>
          )}
        </div>

        <h3 className="mt-1 truncate text-[17px] font-semibold leading-snug tracking-tight text-fg">{aula.disciplina.nome}</h3>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          {/* No desktop o horário vai na coluna da linha do tempo */}
          <span className="num inline-flex items-center gap-1.5 lg:hidden">
            <Clock className="size-3.5 text-subtle" strokeWidth={1.75} aria-hidden />
            {aula.inicio} às {aula.fim}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-subtle" strokeWidth={1.75} aria-hidden />
            {aula.local}
          </span>
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-3.5">
          <Pilula rotulo="Faltas" valor={`${aula.faltas}/${aula.limiteFaltas}`} alerta={faltasAlerta} />
          {aula.media !== null && <Pilula rotulo="Média" valor={fmt1(aula.media)} alerta={aula.media < 60} />}
        </div>
      </div>
    </article>
  );
}

/** Linha "agora" da linha do tempo (desktop), como a marca de hora atual de uma agenda. */
function LinhaAgora() {
  return (
    <li aria-label={`Agora, ${AGORA}`} className="hidden grid-cols-[64px_minmax(0,1fr)] items-center gap-4 lg:grid">
      <span className="num text-right text-xs font-semibold text-accent">{AGORA}</span>
      <span aria-hidden className="relative flex h-3 items-center">
        <span className="absolute -left-[5px] size-2.5 rounded-full bg-accent ring-4 ring-accent/15" />
        <span className="h-px w-full bg-gradient-to-r from-accent/70 to-accent/0" />
      </span>
    </li>
  );
}

/** Seção "Hoje": aulas do dia. Mobile: carrossel com snap. Desktop: linha do tempo. */
export function AulasHoje() {
  const lista = aulasDeHoje();
  const trilho = useRef<HTMLOListElement>(null);
  const [ativo, setAtivo] = useState(0);
  const iAgora = lista.findIndex((a) => a.estado === "proxima" || a.estado === "agora");

  function aoRolar() {
    const el = trilho.current;
    const item = el?.querySelector<HTMLElement>("[data-aula]");
    if (!el || !item) return;
    const passo = item.offsetWidth + 12;
    setAtivo(Math.min(lista.length - 1, Math.round(el.scrollLeft / passo)));
  }

  return (
    <section aria-labelledby="hoje-titulo">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="hoje-titulo" className="text-[17px] font-semibold tracking-tight text-fg">
          Hoje
          <span className="num ml-2 text-sm font-normal text-muted">
            {lista.length} {lista.length === 1 ? "aula" : "aulas"}
          </span>
        </h2>
        <Link
          href="/horarios"
          className="-mr-2 inline-flex h-9 items-center gap-1 rounded-control px-2 text-sm font-medium text-accent transition-colors duration-150 hover:bg-accent/10"
        >
          Semana
          <ChevronRight className="size-4" strokeWidth={1.75} aria-hidden />
        </Link>
      </div>

      {lista.length === 0 ? (
        <p className="rounded-card border border-line bg-surface-1 px-4 py-6 text-center text-sm text-muted">Sem aulas hoje</p>
      ) : (
        <>
          <ol
            ref={trilho}
            onScroll={aoRolar}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {lista.map((a, i) => (
              <FragmentoAula key={a.id} aula={a} antesDaLinha={i === iAgora && a.estado === "proxima"} />
            ))}
          </ol>

          {lista.length > 1 && (
            <div className="mt-3 flex justify-center gap-1.5 lg:hidden" aria-hidden>
              {lista.map((a, i) => (
                <span
                  key={a.id}
                  className={clsx(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === ativo ? "w-5 bg-accent" : "w-1.5 bg-surface-4",
                  )}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function FragmentoAula({ aula, antesDaLinha }: { aula: AulaDoDia; antesDaLinha: boolean }) {
  return (
    <>
      {antesDaLinha && <LinhaAgora />}
      <li
        data-aula
        className="w-[86%] max-w-[360px] shrink-0 snap-start lg:grid lg:w-auto lg:max-w-none lg:grid-cols-[64px_minmax(0,1fr)] lg:gap-4"
      >
        <div className="hidden pt-3.5 text-right lg:block" aria-hidden>
          <p className="num text-[15px] font-semibold leading-tight tracking-tight text-fg">{aula.inicio}</p>
          <p className="num mt-0.5 text-xs text-subtle">{aula.fim}</p>
        </div>
        <CardAula aula={aula} />
      </li>
    </>
  );
}
