import type { AlunoRanking, EntradaRanking, FiltroRanking, Nivel } from "@/lib/types";
import { alunosRanking, MINHA_MATRICULA, niveis } from "@/lib/mock/gamificacao";
import { cursos, getLaboratorio, laboratorios, aluno } from "@/lib/mock/aluno";

/**
 * Fator de Presença em Laboratórios (HTA, recomendação do item 0):
 * varia de 0,5 (sem presença) a 1,5 (100% de presença), dando peso maior
 * à assiduidade nos laboratórios práticos da Engenharia.
 */
export function fatorPresenca(presenca: number): number {
  const p = Math.min(1, Math.max(0, presenca));
  return 0.5 + p;
}

/**
 * Pontos Ponderados = (Total de Pontos ÷ Créditos Matriculados) × Fator de Presença em Labs
 * — e, quando filtrado por um laboratório específico, × Peso do Laboratório.
 */
export function pontosPonderados(pontos: number, creditos: number, presenca: number, peso = 1): number {
  if (creditos <= 0) return 0;
  return (pontos / creditos) * fatorPresenca(presenca) * peso;
}

export const FORMULA_TEXTO =
  "Pontos Ponderados = (Total de Pontos ÷ Créditos Matriculados) × Fator de Presença em Labs";

function entradaBase(a: AlunoRanking, filtro: FiltroRanking): Omit<EntradaRanking, "posicao"> | null {
  const souEu = a.matricula === MINHA_MATRICULA;
  if (filtro.tipo === "laboratorio") {
    const lab = getLaboratorio(filtro.laboratorioId);
    const d = a.labs[filtro.laboratorioId];
    if (!lab || !d) return null;
    return {
      aluno: a,
      pontos: d.pontos,
      creditos: lab.creditos,
      presenca: d.presenca,
      fatorPresenca: fatorPresenca(d.presenca),
      peso: lab.peso,
      pontuacao: pontosPonderados(d.pontos, lab.creditos, d.presenca, lab.peso),
      souEu,
    };
  }
  if (filtro.tipo === "curso" && a.curso !== filtro.curso) return null;
  if (filtro.tipo === "periodo" && a.periodo !== filtro.periodo) return null;
  return {
    aluno: a,
    pontos: a.pontos,
    creditos: a.creditosMatriculados,
    presenca: a.presencaLab,
    fatorPresenca: fatorPresenca(a.presencaLab),
    peso: 1,
    pontuacao: pontosPonderados(a.pontos, a.creditosMatriculados, a.presencaLab),
    souEu,
  };
}

/** Ranking.carregar() + Ranking.filtrar(filtro) do diagrama de classes. */
export function carregarRanking(filtro: FiltroRanking = { tipo: "geral" }): EntradaRanking[] {
  return alunosRanking
    .map((a) => entradaBase(a, filtro))
    .filter((e): e is Omit<EntradaRanking, "posicao"> => e !== null)
    .sort((x, y) => y.pontuacao - x.pontuacao)
    .map((e, i) => ({ ...e, posicao: i + 1 }));
}

/** Ranking por pontos BRUTOS (sem normalização) — usado para comparar e mostrar a injustiça evitada. */
export function rankingBruto(): AlunoRanking[] {
  return [...alunosRanking].sort((x, y) => y.pontos - x.pontos);
}

export function minhaEntrada(ranking: EntradaRanking[]): EntradaRanking | undefined {
  return ranking.find((e) => e.souEu);
}

/** Opções do menu suspenso de filtro (HTA 3.2 — filtrar por curso ou laboratório). */
export interface OpcaoFiltro {
  id: string;
  grupo: "Visão" | "Laboratórios";
  label: string;
  descricao: string;
  filtro: FiltroRanking;
}

export const opcoesFiltro: OpcaoFiltro[] = [
  {
    id: "geral",
    grupo: "Visão",
    label: "Geral — todos os cursos",
    descricao: "Todos os alunos de graduação",
    filtro: { tipo: "geral" },
  },
  {
    id: "curso",
    grupo: "Visão",
    label: `Meu curso — ${cursos.find((c) => c.sigla === aluno.siglaCurso)?.nome ?? aluno.siglaCurso}`,
    descricao: `Apenas alunos ${aluno.siglaCurso}`,
    filtro: { tipo: "curso", curso: aluno.siglaCurso },
  },
  {
    id: "periodo",
    grupo: "Visão",
    label: `Meu período — ${aluno.periodo}º`,
    descricao: "Alunos do mesmo período, todos os cursos",
    filtro: { tipo: "periodo", periodo: aluno.periodo },
  },
  ...laboratorios.map<OpcaoFiltro>((l) => ({
    id: l.id,
    grupo: "Laboratórios",
    label: `Lab ${l.codigo}`,
    descricao: `${l.nome} · peso ×${l.peso.toLocaleString("pt-BR")}`,
    filtro: { tipo: "laboratorio", laboratorioId: l.id },
  })),
];

/* ---------------------------- Nível / pontos ---------------------------- */

export function nivelPorPontos(pontos: number): {
  atual: Nivel;
  proximo?: Nivel;
  /** 0..1 */
  progresso: number;
  faltam: number;
} {
  let atual = niveis[0];
  for (const n of niveis) if (pontos >= n.minimo) atual = n;
  const proximo = niveis.find((n) => n.numero === atual.numero + 1);
  if (!proximo) return { atual, progresso: 1, faltam: 0 };
  const progresso = (pontos - atual.minimo) / (proximo.minimo - atual.minimo);
  return { atual, proximo, progresso, faltam: proximo.minimo - pontos };
}

export function meusPontos(): number {
  return alunosRanking.find((a) => a.matricula === MINHA_MATRICULA)?.pontos ?? 0;
}
