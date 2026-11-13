"use client";

import { FlaskConical, Medal, Trophy } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProgressBar } from "@/components/ui/primitives";
import { fmtInt, fmtPct } from "@/lib/format";
import { medalhas } from "@/lib/mock/gamificacao";
import { carregarRanking, meusPontos, minhaEntrada, nivelPorPontos } from "@/lib/ranking";

/** Faixa compacta com nível, progresso e números do aluno. */
export function NivelResumo() {
  const naRanking = usePathname().startsWith("/gamificacao/ranking");
  const pontos = meusPontos();
  const { atual, proximo } = nivelPorPontos(pontos);
  const progresso = proximo ? pontos / proximo.minimo : 1;
  const conquistadas = medalhas.filter((m) => m.desbloqueada).length;
  const eu = minhaEntrada(carregarRanking());
  const dados = [
    { id: "medalhas", Icone: Medal, valor: `${conquistadas}/${medalhas.length}`, rotulo: "Medalhas conquistadas" },
    ...(naRanking
      ? []
      : [{ id: "posicao", Icone: Trophy, valor: eu ? `${eu.posicao}º` : "Sem posição", rotulo: "Posição no ranking geral" }]),
    { id: "labs", Icone: FlaskConical, valor: eu ? fmtPct(eu.presenca) : "Sem dados", rotulo: "Presença em laboratórios" },
  ];

  const pts = (className: string) => (
    <span className={`num shrink-0 text-[13px] text-muted ${className}`}>
      <span className="font-semibold text-gold">{fmtInt(pontos)}</span>
      {proximo ? ` / ${fmtInt(proximo.minimo)}` : ""} pts
    </span>
  );

  return (
    <section aria-label="Resumo do nível" className="mx-auto max-w-[1240px] px-4 pb-2.5 pt-3 lg:px-8 lg:pb-4 lg:pt-6">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex min-w-0 items-center gap-2.5 lg:w-[240px] lg:shrink-0 lg:gap-3">
          <span
            aria-hidden
            className="num grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-[15px] font-semibold text-fg ring-1 ring-gold lg:size-12 lg:text-lg"
          >
            {atual.numero}
          </span>
          <p className="min-w-0 flex-1 truncate text-[15px] font-semibold text-fg lg:hidden">
            Nível {atual.numero} · {atual.titulo}
          </p>
          <div className="hidden min-w-0 flex-1 lg:block">
            <p className="text-[13px] leading-tight text-muted">Nível {atual.numero}</p>
            <p className="truncate text-base font-semibold leading-tight text-fg">{atual.titulo}</p>
          </div>
          {pts("lg:hidden")}
        </div>

        <div className="flex min-w-0 items-center gap-3 lg:order-2 lg:flex-1">
          <ProgressBar
            tone="accent"
            value={progresso}
            label={`Progresso para o nível ${proximo?.numero ?? atual.numero}`}
            className="flex-1"
          />
          {pts("hidden lg:inline")}
          {!naRanking && (
            <ul className="flex shrink-0 items-center gap-2.5 lg:hidden">
              {dados.map(({ id, Icone, valor, rotulo }) => (
                <li key={id} title={rotulo} className="flex items-center gap-1">
                  <Icone className="size-3.5 text-muted" strokeWidth={1.75} aria-hidden />
                  <span className="num text-[13px] font-semibold text-fg">{valor}</span>
                  <span className="sr-only">{rotulo}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="hidden items-center gap-6 lg:order-3 lg:flex">
          {dados.map(({ id, Icone, valor, rotulo }) => (
            <li key={id} title={rotulo} className="flex items-center gap-1.5">
              <Icone className="size-4 text-muted" strokeWidth={1.75} aria-hidden />
              <span className="num text-[15px] font-semibold text-fg">{valor}</span>
              <span className="sr-only">{rotulo}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
