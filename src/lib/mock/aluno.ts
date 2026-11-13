import type {
  Aluno,
  Aula,
  Aviso,
  Coeficientes,
  Disciplina,
  FrequenciaDisciplina,
  Laboratorio,
  Monitor,
  NotaDisciplina,
  Prova,
} from "@/lib/types";

/**
 * Conta mockada da persona da User Story:
 * "Lucas, estudante de Engenharia (4º período), com rotina intensa de
 *  disciplinas e projetos práticos em laboratório."
 * Todos os dados são fictícios.
 */
export const aluno: Aluno = {
  nome: "Lucas Andrade Ferreira",
  primeiroNome: "Lucas",
  email: "lucas.ferreira@ges.inatel.br",
  matricula: "GES-412",
  numeroMatricula: "412",
  curso: "Engenharia de Software",
  siglaCurso: "GES",
  periodo: 4,
  semestre: "2º semestre de 2026",
};

/** Senha aceita no login mock (qualquer senha não vazia também é aceita). */
export const SENHA_DEMO = "inatel";

export const cursos = [
  { sigla: "GES", nome: "Engenharia de Software" },
  { sigla: "GEC", nome: "Engenharia de Computação" },
  { sigla: "GET", nome: "Engenharia de Telecomunicações" },
  { sigla: "GEE", nome: "Engenharia Elétrica" },
  { sigla: "GEB", nome: "Engenharia Biomédica" },
  { sigla: "GEP", nome: "Engenharia de Produção" },
] as const;

export const laboratorios: Laboratorio[] = [
  {
    id: "s05-l1",
    codigo: "S05 · L1",
    nome: "Laboratório de Interface Homem-Máquina",
    disciplina: "S05",
    peso: 1.2,
    creditos: 2,
  },
  {
    id: "e08-l1",
    codigo: "E08 · L1",
    nome: "Laboratório de Eletrônica Digital",
    disciplina: "E08",
    peso: 1.5,
    creditos: 2,
  },
  {
    id: "f03-l4",
    codigo: "F03 · L4",
    nome: "Laboratório de Física III",
    disciplina: "F03",
    peso: 1.3,
    creditos: 2,
  },
];

/** Disciplinas do semestre (códigos da grade de horários real do app). */
export const disciplinas: Disciplina[] = [
  {
    codigo: "S05",
    nome: "Interface Homem-Máquina",
    professor: "Prof. Rafael Monteiro",
    creditos: 4,
    turma: "A",
    laboratorioId: "s05-l1",
  },
  {
    codigo: "S01",
    nome: "Banco de Dados",
    professor: "Profa. Helena Vasconcelos",
    creditos: 4,
    turma: "A",
  },
  {
    codigo: "E08",
    nome: "Eletrônica Digital",
    professor: "Prof. Márcio Albuquerque",
    creditos: 4,
    turma: "A",
    laboratorioId: "e08-l1",
  },
  {
    codigo: "F03",
    nome: "Física III",
    professor: "Profa. Cláudia Rezende",
    creditos: 4,
    turma: "A",
    laboratorioId: "f03-l4",
  },
  {
    codigo: "M05",
    nome: "Probabilidade e Estatística",
    professor: "Prof. Otávio Brandão",
    creditos: 4,
    turma: "A",
  },
  {
    codigo: "G04",
    nome: "Empreendedorismo e Inovação",
    professor: "Profa. Renata Moura",
    creditos: 4,
    turma: "A",
  },
];

export const creditosMatriculados = disciplinas.reduce((s, d) => s + d.creditos, 0); // 24

export function getDisciplina(codigo: string): Disciplina | undefined {
  return disciplinas.find((d) => d.codigo === codigo);
}

export function getLaboratorio(id: string): Laboratorio | undefined {
  return laboratorios.find((l) => l.id === id);
}

/** Horários exatamente como na grade do app real (coluna HORA). */
export const horariosGrade = [
  "07:00",
  "08:00",
  "08:50",
  "10:00",
  "10:50",
  "13:30",
  "14:20",
  "15:30",
  "16:20",
  "17:30",
  "18:20",
  "19:30",
  "20:20",
  "21:30",
  "22:20",
] as const;

export const diasGrade: { id: Aula["dia"]; curto: string; longo: string }[] = [
  { id: "seg", curto: "S", longo: "Segunda-feira" },
  { id: "ter", curto: "T", longo: "Terça-feira" },
  { id: "qua", curto: "Q", longo: "Quarta-feira" },
  { id: "qui", curto: "Q", longo: "Quinta-feira" },
  { id: "sex", curto: "S", longo: "Sexta-feira" },
  { id: "sab", curto: "S", longo: "Sábado" },
];

/** Grade semanal (reproduz o print "Horários de Aula"). */
export const aulas: Aula[] = [
  { dia: "seg", hora: "07:00", disciplina: "S05", turma: "L1", local: "Lab. 3" },
  { dia: "qui", hora: "07:00", disciplina: "F03", turma: "L4", local: "Lab. Física 4" },
  { dia: "qua", hora: "10:00", disciplina: "E08", turma: "L1", local: "Lab. Digital 1" },
  { dia: "qua", hora: "10:50", disciplina: "E08", turma: "L1", local: "Lab. Digital 1" },
  { dia: "qui", hora: "13:30", disciplina: "M05", turma: "A", local: "P2-S03" },
  { dia: "qui", hora: "14:20", disciplina: "M05", turma: "A", local: "P2-S03" },
  { dia: "qua", hora: "15:30", disciplina: "F03", turma: "A", local: "P1-S21" },
  { dia: "qua", hora: "16:20", disciplina: "F03", turma: "A", local: "P1-S21" },
  { dia: "qui", hora: "15:30", disciplina: "G04", turma: "A", local: "P1-S10" },
  { dia: "qui", hora: "16:20", disciplina: "G04", turma: "A", local: "P1-S10" },
  { dia: "seg", hora: "17:30", disciplina: "E08", turma: "A", local: "P1-S12" },
  { dia: "seg", hora: "18:20", disciplina: "E08", turma: "A", local: "P1-S12" },
  { dia: "ter", hora: "17:30", disciplina: "M05", turma: "A", local: "P2-S03" },
  { dia: "ter", hora: "18:20", disciplina: "M05", turma: "A", local: "P2-S03" },
  { dia: "qua", hora: "17:30", disciplina: "S05", turma: "A", local: "P1-S17" },
  { dia: "qua", hora: "18:20", disciplina: "S05", turma: "A", local: "P1-S17" },
  { dia: "qui", hora: "17:30", disciplina: "S01", turma: "A", local: "P1-S15" },
  { dia: "qui", hora: "18:20", disciplina: "S01", turma: "A", local: "P1-S15" },
];

export const notas: NotaDisciplina[] = [
  { disciplina: "S05", np1: 100, np2: null, nl: 95 },
  { disciplina: "S01", np1: 84, np2: null, nl: null },
  { disciplina: "E08", np1: 74, np2: null, nl: 88 },
  { disciplina: "F03", np1: 69, np2: null, nl: 81 },
  { disciplina: "M05", np1: 78, np2: null, nl: null },
  { disciplina: "G04", np1: 92, np2: null, nl: null },
];

export const frequencias: FrequenciaDisciplina[] = [
  { disciplina: "S05", aulasDadas: 24, faltas: 0, limiteFaltas: 18, lab: { aulasDadas: 12, presencas: 12 } },
  { disciplina: "S01", aulasDadas: 24, faltas: 2, limiteFaltas: 18 },
  { disciplina: "E08", aulasDadas: 24, faltas: 1, limiteFaltas: 18, lab: { aulasDadas: 11, presencas: 11 } },
  { disciplina: "F03", aulasDadas: 24, faltas: 3, limiteFaltas: 18, lab: { aulasDadas: 11, presencas: 10 } },
  { disciplina: "M05", aulasDadas: 24, faltas: 4, limiteFaltas: 18 },
  { disciplina: "G04", aulasDadas: 12, faltas: 0, limiteFaltas: 9 },
];

/** Presença consolidada em laboratórios: 33 de 34 aulas (≈ 97%). */
export const presencaLabConsolidada = (() => {
  const labs = frequencias.flatMap((f) => (f.lab ? [f.lab] : []));
  const dadas = labs.reduce((s, l) => s + l.aulasDadas, 0);
  const presencas = labs.reduce((s, l) => s + l.presencas, 0);
  return { dadas, presencas, taxa: presencas / dadas };
})();

export const coeficientes: Coeficientes = {
  cr: 81.4,
  crPeriodoAnterior: 79.2,
  cra: 80.1,
  creditosCursados: 96,
  creditosTotais: 240,
  historicoCR: [
    { periodo: "1º", cr: 76.8 },
    { periodo: "2º", cr: 78.5 },
    { periodo: "3º", cr: 79.2 },
    { periodo: "4º", cr: 81.4 },
  ],
};

export const provas: Prova[] = [
  { disciplina: "S05", tipo: "NP2", data: "2026-11-24", hora: "17:30", local: "P1-S17" },
  { disciplina: "E08", tipo: "NP2", data: "2026-11-25", hora: "17:30", local: "P1-S12" },
  { disciplina: "M05", tipo: "NP2", data: "2026-11-26", hora: "13:30", local: "P2-S03" },
  { disciplina: "F03", tipo: "NP2", data: "2026-11-27", hora: "15:30", local: "P1-S21" },
  { disciplina: "S01", tipo: "NP2", data: "2026-11-30", hora: "17:30", local: "P1-S17" },
  { disciplina: "G04", tipo: "NP2", data: "2026-12-01", hora: "15:30", local: "Auditório" },
  { disciplina: "E08", tipo: "NL", data: "2026-12-02", hora: "10:00", local: "Lab. E08 · L1" },
  { disciplina: "S05", tipo: "NP3", data: "2026-12-09", hora: "17:30", local: "P1-S17" },
];

/** Monitores (nomes fictícios), no formato da tela "Monitores" do app. */
export const monitores: Monitor[] = [
  { disciplina: "E08", nome: "Caio Henrique Moraes", dia: "Segunda-feira", horario: "17:30 às 19:30", local: "III-3" },
  { disciplina: "E08", nome: "Juliana Prates Viana", dia: "Quinta-feira", horario: "17:30 às 19:30", local: "III-3" },
  { disciplina: "F03", nome: "Rodrigo Lemos Furtado", dia: "Segunda-feira", horario: "17:30 às 19:30", local: "Teams" },
  { disciplina: "F03", nome: "Rodrigo Lemos Furtado", dia: "Quarta-feira", horario: "13:30 às 15:00", local: "II-7" },
  { disciplina: "M05", nome: "Paula Cristina Assunção", dia: "Terça-feira", horario: "15:30 às 17:30", local: "II-2" },
  { disciplina: "S01", nome: "Henrique Salles Prado", dia: "Quarta-feira", horario: "19:30 às 21:00", local: "Lab. 5" },
  { disciplina: "S05", nome: "Marcela Toledo Reis", dia: "Sexta-feira", horario: "10:00 às 12:00", local: "Lab. 3" },
];

export const avisos: Aviso[] = [
  {
    id: "av-gami-1",
    remetente: "Suporte Estudantil",
    titulo: "Medalha Maratona de Labs desbloqueada",
    resumo: "10 relatórios de laboratório entregues no prazo.",
    corpo:
      "Você ganhou 100 pts com a medalha Maratona de Labs por entregar 10 relatórios de laboratório no prazo.",
    data: "2026-11-04T18:42:00",
    importante: false,
    lido: false,
    href: "/gamificacao/conquistas",
  },
  {
    id: "av-gami-2",
    remetente: "Suporte Estudantil",
    titulo: "Ranking do semestre atualizado",
    resumo: "Você está em 4º no ranking geral.",
    corpo:
      "O ranking passou a ser proporcional aos créditos matriculados e à presença em laboratórios. Pontos Ponderados = (Total de Pontos ÷ Créditos Matriculados) × Fator de Presença em Labs.",
    data: "2026-11-03T08:00:00",
    importante: false,
    lido: false,
    href: "/gamificacao/ranking",
  },
  {
    id: "av-cra-1",
    remetente: "CRA",
    titulo: "TRANSFERÊNCIA INTERNA DE CURSO/TURNO 1º2027",
    resumo: "Pedidos pelo portal até 28/11/2026.",
    corpo:
      "Prezados(as) alunos(as), estão abertas as solicitações de transferência interna de curso/turno para o 1º semestre de 2027. Os pedidos devem ser feitos pelo portal até 28/11/2026.",
    data: "2026-10-17T16:21:00",
    importante: true,
    lido: true,
  },
  {
    id: "av-cra-2",
    remetente: "CRA",
    titulo: "Calendário de NP2 publicado",
    resumo: "Datas de NP2 disponíveis em Provas.",
    corpo:
      "Prezados(as) alunos(as), o calendário de provas NP2 do 2º semestre de 2026 já está disponível na opção Provas do aplicativo.",
    data: "2026-10-10T10:36:00",
    importante: true,
    lido: true,
  },
  {
    id: "av-fablab",
    remetente: "Fab Lab",
    titulo: "Horário estendido do Fab Lab na semana de provas",
    resumo: "O Fab Lab funcionará das 07h às 23h.",
    corpo:
      "Durante a semana de NP2 o Fab Lab funcionará das 07h às 23h. Presenças registradas em projetos práticos também contam pontos de laboratório.",
    data: "2026-10-06T09:15:00",
    importante: false,
    lido: true,
  },
];
