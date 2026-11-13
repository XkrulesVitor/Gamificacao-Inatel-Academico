"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { fmt1 } from "@/lib/format";
import type { EntradaRanking } from "@/lib/types";

const ALTURA = 100;
const LINHA = 40;
/** Distância vertical entre níveis de empilhamento. */
const PASSO = 12;
const NIVEIS = 3;
/** Respiro lateral para os pontos das pontas não serem cortados. */
const MARGEM = 10;
/** Espaço mínimo entre centros de pontos no mesmo nível. */
const VAO = 12;
const VAO_EU = 18;

type Ponto = { e: EntradaRanking; x: number; nivel: number };

/**
 * Empilha para baixo os pontos que colidiriam na linha (beeswarm simples, até 3 níveis).
 * Você fica sempre na linha, com o rótulo acima.
 */
function distribuir(ranking: EntradaRanking[], largura: number): Ponto[] {
  const max = ranking[0].pontuacao;
  const min = ranking[ranking.length - 1].pontuacao;
  const util = Math.max(1, largura - MARGEM * 2);
  const px = (v: number) => MARGEM + (max === min ? util / 2 : ((v - min) / (max - min)) * util);
  const ocupados: number[][] = Array.from({ length: NIVEIS }, () => []);
  const eu = ranking.find((e) => e.souEu);
  const pontos: Ponto[] = [];
  if (eu) {
    const x = px(eu.pontuacao);
    ocupados[0].push(x);
    pontos.push({ e: eu, x, nivel: 0 });
  }
  const outros = ranking.filter((e) => !e.souEu).sort((a, b) => a.pontuacao - b.pontuacao);
  for (const e of outros) {
    const x = px(e.pontuacao);
    let nivel = -1;
    for (let n = 0; n < NIVEIS && nivel < 0; n++) {
      const livre = ocupados[n].every((o, i) => Math.abs(o - x) >= (n === 0 && eu && i === 0 ? VAO_EU : VAO));
      if (livre) nivel = n;
    }
    if (nivel < 0) {
      // Sem nível livre: usa o nível com o vizinho mais distante.
      let melhor = 0;
      let dist = -1;
      for (let n = 0; n < NIVEIS; n++) {
        const d = Math.min(...ocupados[n].map((o) => Math.abs(o - x)), Infinity);
        if (d > dist) {
          dist = d;
          melhor = n;
        }
      }
      nivel = melhor;
    }
    ocupados[nivel].push(x);
    pontos.push({ e, x, nivel });
  }
  return pontos;
}

/** Todas as pontuações do filtro numa régua: o Top 3 em dourado, você em azul e sempre rotulado. */
export function FaixaPontuacao({ ranking }: { ranking: EntradaRanking[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [largura, setLargura] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setLargura(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (ranking.length < 2) return null;
  const max = ranking[0].pontuacao;
  const min = ranking[ranking.length - 1].pontuacao;
  const pontos = largura > 0 ? distribuir(ranking, largura) : [];
  const eu = pontos.find((p) => p.e.souEu);
  const corte = pontos.find((p) => p.e.posicao === Math.min(3, ranking.length));
  const inicioBanda = corte ? Math.max(0, Math.min(corte.x - 9, largura - 52)) : largura;
  // Rótulo "Você" centrado no ponto, sem sair da régua
  const meiaTag = 22;
  const tagX = eu ? Math.min(largura - meiaTag, Math.max(meiaTag, eu.x)) : 0;

  return (
    <div className="pt-2">
      <div ref={ref} className="relative w-full" style={{ height: ALTURA }}>
        {largura > 0 && (
          <>
            <div
              aria-hidden
              className="absolute rounded-control bg-gold/12 ring-1 ring-inset ring-gold/25"
              style={{ left: inicioBanda, right: 0, top: LINHA - 10, bottom: 6 }}
            />
            <span className="absolute bottom-2.5 right-2 text-[11px] font-medium text-gold-ink">Top 3</span>
            <div aria-hidden className="absolute inset-x-0 h-px bg-line-strong" style={{ top: LINHA }} />
            {pontos
              .filter((p) => !p.e.souEu)
              .map((p) => (
                <span
                  key={p.e.aluno.matricula}
                  aria-hidden
                  title={`${p.e.posicao}º · ${fmt1(p.e.pontuacao)}`}
                  className={clsx(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-surface-1",
                    p.e.posicao <= 3 ? "size-2.5 bg-gold" : "size-2 bg-subtle",
                  )}
                  style={{ left: p.x, top: LINHA + p.nivel * PASSO }}
                />
              ))}
            {eu && (
              <>
                <span
                  className="absolute top-1 -translate-x-1/2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold leading-4 text-on-primary shadow-card"
                  style={{ left: tagX }}
                >
                  Você
                </span>
                <span aria-hidden className="absolute w-px bg-accent/50" style={{ left: eu.x, top: 25, height: LINHA - 25 - 7 }} />
                <span
                  aria-hidden
                  className="absolute z-[1] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-accent/20"
                  style={{ left: eu.x, top: LINHA }}
                />
              </>
            )}
          </>
        )}
      </div>
      <div className="num mt-1 flex justify-between text-[11px] text-subtle">
        <span>{fmt1(min)}</span>
        <span>{fmt1(max)}</span>
      </div>
    </div>
  );
}
