/**
 * Modelo de dados do protótipo — segue o Diagrama de Classes do documento
 * "Fluxo de Informações — Módulo de Gamificação" (Aluno, ModuloGamificacao,
 * Medalha, Ranking, Laboratorio), estendido com o necessário para as telas
 * acadêmicas padrão do app (notas, frequência, horários...).
 */

export type DiaSemana = "seg" | "ter" | "qua" | "qui" | "sex" | "sab";

export interface Disciplina {
  /** Código Inatel, ex.: "S05" */
  codigo: string;
  nome: string;
  professor: string;
  creditos: number;
  /** Turma de teoria, ex.: "A" */
  turma: string;
  /** Laboratório vinculado (id de Laboratorio), se houver */
  laboratorioId?: string;
}

export interface Laboratorio {
  id: string;
  /** Rótulo curto exibido, ex.: "S05 · L1" */
  codigo: string;
  nome: string;
  disciplina: string;
  /** Multiplicador de peso do laboratório no ranking (HTA: peso maior p/ labs práticos) */
  peso: number;
  creditos: number;
}

export interface Aula {
  dia: DiaSemana;
  /** Horário de início exatamente como na grade do app, ex.: "07:00" */
  hora: string;
  disciplina: string;
  /** "A" (teoria) ou "L1", "L4" (laboratório) */
  turma: string;
}

export interface NotaDisciplina {
  disciplina: string;
  /** Notas de 0 a 100; null = ainda não lançada */
  np1: number | null;
  np2: number | null;
  /** Nota de laboratório (média dos relatórios), se a disciplina tiver lab */
  nl: number | null;
}

export interface FrequenciaDisciplina {
  disciplina: string;
  aulasDadas: number;
  faltas: number;
  /** Limite de faltas permitido (25% da carga) */
  limiteFaltas: number;
  lab?: {
    aulasDadas: number;
    presencas: number;
  };
}

export interface Prova {
  disciplina: string;
  tipo: "NP1" | "NP2" | "NP3" | "NL";
  /** ISO date (yyyy-mm-dd) */
  data: string;
  hora: string;
  local: string;
}

export interface Monitor {
  disciplina: string;
  nome: string;
  dia: string;
  horario: string;
  local: string;
}

export interface Aviso {
  id: string;
  /** Remetente exibido no topo, ex.: "CRA" */
  remetente: string;
  /** Cor do avatar circular (classe tailwind bg-*) */
  cor: "accent" | "brand" | "gold" | "teal" | "xp";
  titulo: string;
  resumo: string;
  corpo: string;
  /** ISO datetime */
  data: string;
  importante: boolean;
  lido: boolean;
  /** Link interno opcional (ex.: aviso de gamificação leva ao módulo) */
  href?: string;
}

export interface Coeficientes {
  cr: number;
  crPeriodoAnterior: number;
  cra: number;
  creditosCursados: number;
  creditosTotais: number;
  historicoCR: { periodo: string; cr: number }[];
}

export type Raridade = "bronze" | "prata" | "ouro" | "platina";
export type CategoriaMedalha = "Notas" | "Frequência" | "Laboratório" | "Ranking" | "Colaboração";

/** Nomes de ícones lucide-react usados nas medalhas */
export type IconeMedalha =
  | "Award"
  | "FlaskConical"
  | "GraduationCap"
  | "Rocket"
  | "Sunrise"
  | "ClipboardCheck"
  | "Trophy"
  | "Clock"
  | "Flame"
  | "Users"
  | "HeartHandshake"
  | "Crown";

export interface Medalha {
  id: string;
  nome: string;
  descricao: string;
  /** Regra de desbloqueio (o "regulamento" da HTA) */
  requisito: string;
  categoria: CategoriaMedalha;
  raridade: Raridade;
  icone: IconeMedalha;
  /** Pontos (XP) concedidos ao desbloquear */
  pontos: number;
  desbloqueada: boolean;
  /** ISO date — só quando desbloqueada */
  dataConquista?: string;
  /** Onde/como foi conquistada, ex.: "NP1 de S05" */
  origem?: string;
  progresso: { atual: number; meta: number; unidade: string };
  /** Regra pendente / dica do que falta (exibida no cartão explicativo) */
  pendente?: string;
}

export interface Nivel {
  numero: number;
  titulo: string;
  /** Pontos mínimos para alcançar o nível */
  minimo: number;
}

export interface RegistroPontos {
  id: string;
  descricao: string;
  pontos: number;
  /** ISO date */
  data: string;
  tipo: "medalha" | "nota" | "presenca" | "entrega" | "colaboracao";
}

export interface DesempenhoLab {
  pontos: number;
  /** 0..1 */
  presenca: number;
}

export interface AlunoRanking {
  matricula: string;
  nome: string;
  /** Sigla do curso, ex.: "GES" */
  curso: string;
  periodo: number;
  pontos: number;
  creditosMatriculados: number;
  /** Presença geral em laboratórios (0..1) */
  presencaLab: number;
  labs: Partial<Record<string, DesempenhoLab>>;
  /** Iniciais/cor do avatar */
  avatarCor: string;
}

export interface Aluno {
  nome: string;
  primeiroNome: string;
  email: string;
  matricula: string;
  /** Número exibido no campo de login, ex.: "412" */
  numeroMatricula: string;
  curso: string;
  siglaCurso: string;
  periodo: number;
  semestre: string;
}

export type FiltroRanking =
  | { tipo: "geral" }
  | { tipo: "curso"; curso: string }
  | { tipo: "periodo"; periodo: number }
  | { tipo: "laboratorio"; laboratorioId: string };

export interface EntradaRanking {
  posicao: number;
  aluno: AlunoRanking;
  /** Pontos brutos considerados no filtro */
  pontos: number;
  creditos: number;
  presenca: number;
  fatorPresenca: number;
  peso: number;
  /** Pontuação normalizada usada na ordenação */
  pontuacao: number;
  souEu: boolean;
}
