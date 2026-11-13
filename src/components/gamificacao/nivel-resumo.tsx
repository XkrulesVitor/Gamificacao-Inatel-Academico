"use client";

import { FlaskConical, Medal, Trophy, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EmblemaNivel } from "@/components/gamificacao/emblema-nivel";
import { EASE, mix } from "@/components/gamificacao/metal";
import { fmtInt, fmtPct } from "@/lib/format";
import { medalhas, niveis } from "@/lib/mock/gamificacao";
import { carregarRanking, meusPontos, minhaEntrada, nivelPorPontos } from "@/lib/ranking";
import { useCountUp } from "@/lib/use-count-up";

const MAXIMO = niveis[niveis.length - 1].minimo;
/** Marcos de nível (%) na trilha completa, sem o início e o fim. */
const MARCOS = niveis.slice(1, -1).map((n) => (n.minimo / MAXIMO) * 100);

/** Máscara que abre um vão de 3px em cada marco: a barra vira segmentos, um por nível. */
function mascara(marcos: number[]): string {
  const partes: string[] = [];
  let inicio = "0%";
  for (const m of marcos) {
    const antes = `calc(${m}% + -1.5px)`;
    partes.push(`black ${inicio} ${antes}`, `transparent ${antes} calc(${m}% + 1.5px)`);
    inicio = `calc(${m}% + 1.5px)`;
  }
  partes.push(`black ${inicio} 100%`);
  return `linear-gradient(90deg, ${partes.join(", ")})`;
}
const MASCARA = mascara(MARCOS);

/** Barra de XP da trilha inteira (nível 1 ao 9). Cada vão é um marco; o trecho do nível atual fica realçado. */
function BarraXp({ pontos, inicioNivel, fimNivel, rotulo }: { pontos: number; inicioNivel: number; fimNivel: number; rotulo: string }) {
  const reduzir = useReducedMotion();
  const pct = Math.min(100, (pontos / MAXIMO) * 100);
  const a = (inicioNivel / MAXIMO) * 100;
  const b = (fimNivel / MAXIMO) * 100;
  return (
    <div
      role="progressbar"
      aria-label={rotulo}
      aria-valuemin={inicioNivel}
      aria-valuemax={fimNivel}
      aria-valuenow={pontos}
      className="relative h-2.5 w-full overflow-hidden rounded-full"
      style={{ maskImage: MASCARA, WebkitMaskImage: MASCARA }}
    >
      <div className="absolute inset-0 bg-on-header/15" />
      <div className="absolute inset-y-0 bg-on-header/15" style={{ left: `${a}%`, width: `${b - a}%` }} />
      <motion.div
        className="absolute inset-y-0 left-0"
        style={{
          backgroundImage: `linear-gradient(90deg, ${mix("var(--gold)", 70, "black")}, var(--gold) 72%, ${mix("var(--gold)", 65, "white")})`,
        }}
        initial={{ width: reduzir ? `${pct}%` : "0%" }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      />
    </div>
  );
}

function Dado({ Icone, valor, rotulo }: { Icone: LucideIcon; valor: string; rotulo: string }) {
  return (
    <div className="flex min-w-0 flex-col-reverse">
      <dt className="mt-0.5 flex items-center gap-1 text-xs text-on-header-muted">
        <Icone className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
        <span className="truncate">{rotulo}</span>
      </dt>
      <dd className="num text-[17px] font-semibold leading-tight tracking-tight text-on-header lg:text-xl">{valor}</dd>
    </div>
  );
}

/** Cartão de identidade do aluno no jogo: emblema, nível, pontos, trilha de XP e números do módulo. */
export function NivelResumo() {
  const pontos = meusPontos();
  const { atual, proximo, faltam } = nivelPorPontos(pontos);
  const contados = useCountUp(pontos);
  const conquistadas = medalhas.filter((m) => m.desbloqueada).length;
  const eu = minhaEntrada(carregarRanking());

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 pb-3 pt-4 lg:px-6 lg:pb-4 lg:pt-6 xl:px-8 xl:pt-8">
      <section
        aria-label="Resumo do nível"
        className="relative overflow-hidden rounded-card bg-gradient-to-br from-header to-header-2 p-4 text-on-header shadow-card ring-1 ring-inset ring-on-header/10 lg:px-6 lg:py-5"
      >
        <div className="relative flex flex-col gap-3.5 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex min-w-0 flex-1 items-start gap-4 lg:items-center lg:gap-5">
            <EmblemaNivel numero={atual.numero} className="h-[64px] w-[57px] shrink-0 lg:h-[84px] lg:w-[75px]" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <p className="truncate text-[15px] font-semibold leading-tight lg:text-[17px]">
                  Nível {atual.numero} · {atual.titulo}
                </p>
                <p className="num whitespace-nowrap leading-none">
                  <span className="text-[26px] font-semibold tracking-tight text-gold lg:text-[30px]">
                    {fmtInt(Math.round(contados))}
                  </span>
                  <span className="ml-1 text-[13px] font-medium text-on-header-muted">pts</span>
                </p>
              </div>
              <div className="mt-3 hidden lg:block">
                <BarraXp
                  pontos={pontos}
                  inicioNivel={atual.minimo}
                  fimNivel={proximo?.minimo ?? MAXIMO}
                  rotulo={`Pontos no nível ${atual.numero}`}
                />
                {proximo && (
                  <p className="mt-2 text-[13px] text-on-header-muted">
                    <span className="num font-semibold text-on-header">{fmtInt(faltam)} pts</span> para o Nível{" "}
                    {proximo.numero} · {proximo.titulo}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <BarraXp
              pontos={pontos}
              inicioNivel={atual.minimo}
              fimNivel={proximo?.minimo ?? MAXIMO}
              rotulo={`Pontos no nível ${atual.numero}`}
            />
            {proximo && (
              <p className="mt-2 text-[13px] text-on-header-muted">
                <span className="num font-semibold text-on-header">{fmtInt(faltam)} pts</span> para o Nível {proximo.numero}{" "}
                · {proximo.titulo}
              </p>
            )}
          </div>

          <dl className="grid grid-cols-3 gap-3 border-t border-on-header/15 pt-3 lg:w-[300px] lg:shrink-0 lg:gap-5 lg:border-l lg:border-t-0 lg:py-1 lg:pl-7 xl:w-[330px]">
            <Dado Icone={Medal} valor={`${conquistadas}/${medalhas.length}`} rotulo="medalhas" />
            <Dado Icone={Trophy} valor={eu ? `${eu.posicao}º` : "Sem posição"} rotulo="no geral" />
            <Dado Icone={FlaskConical} valor={eu ? fmtPct(eu.presenca) : "Sem dados"} rotulo="em labs" />
          </dl>
        </div>
      </section>
    </div>
  );
}
