import { aulas, avisos, frequencias, getDisciplina, notas, provas } from "@/lib/mock/aluno";
import { evolucaoRanking, medalhas } from "@/lib/mock/gamificacao";
import { diasAte, HOJE } from "@/lib/format";
import type { Aula, Aviso, DiaSemana, Disciplina, Medalha, Prova } from "@/lib/types";

/** Hora "atual" do protótipo (combina com HOJE, quarta 11/11). */
export const AGORA = "09:41";

/** Duração de um bloco de aula na grade do Inatel. */
const BLOCO_MIN = 50;
/** Janela da faixa "Prova" no card da disciplina. */
const JANELA_PROVA_DIAS = 15;

const DIAS: (DiaSemana | null)[] = [null, "seg", "ter", "qua", "qui", "sex", "sab"];

function minutos(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function hhmm(min: number): string {
  return `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

export type EstadoAula = "encerrada" | "agora" | "proxima" | "depois";

export interface AulaDoDia {
  id: string;
  disciplina: Disciplina;
  turma: string;
  lab: boolean;
  local: string;
  inicio: string;
  fim: string;
  faltas: number;
  limiteFaltas: number;
  /** Média das notas lançadas (NP1, NP2, NL) */
  media: number | null;
  /** Prova da disciplina nos próximos 15 dias */
  prova?: Prova;
  estado: EstadoAula;
  /** Minutos até começar (só para "proxima") */
  emMinutos?: number;
}

function mediaParcial(codigo: string): number | null {
  const n = notas.find((x) => x.disciplina === codigo);
  if (!n) return null;
  const lancadas = [n.np1, n.np2, n.nl].filter((v): v is number => v !== null);
  return lancadas.length ? lancadas.reduce((s, v) => s + v, 0) / lancadas.length : null;
}

function provaProxima(codigo: string): Prova | undefined {
  return provas
    .filter((p) => p.disciplina === codigo)
    .filter((p) => {
      const d = diasAte(p.data);
      return d >= 0 && d <= JANELA_PROVA_DIAS;
    })
    .sort((a, b) => a.data.localeCompare(b.data))[0];
}

/** Aulas de HOJE, juntando blocos seguidos da mesma disciplina e turma (10:00 + 10:50 = 10:00 às 11:40). */
export function aulasDeHoje(): AulaDoDia[] {
  const dia = DIAS[new Date(`${HOJE}T12:00:00`).getDay()];
  const blocos = aulas.filter((a) => a.dia === dia).sort((a, b) => minutos(a.hora) - minutos(b.hora));

  const grupos: { primeira: Aula; ultimaHora: string }[] = [];
  for (const a of blocos) {
    const g = grupos[grupos.length - 1];
    if (g && g.primeira.disciplina === a.disciplina && g.primeira.turma === a.turma) g.ultimaHora = a.hora;
    else grupos.push({ primeira: a, ultimaHora: a.hora });
  }

  const agora = minutos(AGORA);
  let proximaMarcada = false;

  return grupos.flatMap(({ primeira, ultimaHora }) => {
    const disciplina = getDisciplina(primeira.disciplina);
    if (!disciplina) return [];
    const ini = minutos(primeira.hora);
    const fim = minutos(ultimaHora) + BLOCO_MIN;
    let estado: EstadoAula = "depois";
    if (fim <= agora) estado = "encerrada";
    else if (ini <= agora) estado = "agora";
    else if (!proximaMarcada) {
      estado = "proxima";
      proximaMarcada = true;
    }
    if (estado === "agora") proximaMarcada = true;
    const freq = frequencias.find((f) => f.disciplina === disciplina.codigo);
    return [
      {
        id: `${disciplina.codigo}-${primeira.turma}-${primeira.hora}`,
        disciplina,
        turma: primeira.turma,
        lab: primeira.turma.startsWith("L"),
        local: primeira.local ?? "",
        inicio: primeira.hora,
        fim: hhmm(fim),
        faltas: freq?.faltas ?? 0,
        limiteFaltas: freq?.limiteFaltas ?? 0,
        media: mediaParcial(disciplina.codigo),
        prova: provaProxima(disciplina.codigo),
        estado,
        emMinutos: estado === "proxima" ? ini - agora : undefined,
      },
    ];
  });
}

/** "hoje", "amanhã", "em 13 dias" */
export function emDias(iso: string): string {
  const n = diasAte(iso);
  if (n <= 0) return "hoje";
  if (n === 1) return "amanhã";
  return `em ${n} dias`;
}

/** Próxima prova do semestre a partir de HOJE. */
export function proximaProva(): { prova: Prova; disciplina: Disciplina } | undefined {
  const p = provas
    .filter((x) => diasAte(x.data) >= 0)
    .sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora))[0];
  const d = p && getDisciplina(p.disciplina);
  return p && d ? { prova: p, disciplina: d } : undefined;
}

export const avisosNaoLidos = avisos.filter((a) => !a.lido).length;

/** Medalha bloqueada com maior progresso. */
export function medalhaMaisPerto(): { medalha: Medalha; pct: number; faltam: number; unidade: string } | undefined {
  const m = medalhas
    .filter((x) => !x.desbloqueada && x.progresso.meta > 0)
    .map((x) => ({ x, pct: Math.min(1, x.progresso.atual / x.progresso.meta) }))
    .sort((a, b) => b.pct - a.pct)[0];
  if (!m) return undefined;
  const faltam = Math.max(0, Math.round((m.x.progresso.meta - m.x.progresso.atual) * 10) / 10);
  // "aulas de lab" -> "aula" / "aulas"
  const plural = m.x.progresso.unidade.split(" ")[0];
  const unidade = faltam === 1 ? plural.replace(/s$/, "") : plural;
  return { medalha: m.x, pct: m.pct, faltam, unidade };
}

/** Posição atual e variação da última semana (S11 → S12). */
export function variacaoSemana(): { anterior: number; atual: number; delta: number; semana: string } | undefined {
  const n = evolucaoRanking.length;
  if (n < 2) return undefined;
  const ant = evolucaoRanking[n - 2];
  const at = evolucaoRanking[n - 1];
  return { anterior: ant.posicao, atual: at.posicao, delta: ant.posicao - at.posicao, semana: ant.semana };
}

export function avisosRecentes(qtd = 3): Aviso[] {
  return [...avisos].sort((a, b) => b.data.localeCompare(a.data)).slice(0, qtd);
}
