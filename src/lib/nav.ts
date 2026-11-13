import type { LucideIcon } from "lucide-react";
import { CalendarDays, ChartColumn, House, Mail, Medal, Settings, Trophy } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Título do cabeçalho quando a rota está ativa */
  titulo: string;
  /** Prefixos que também ativam o item (seções com abas) */
  match?: string[];
}

export interface SubNavItem {
  label: string;
  href: string;
}

/**
 * Menu v3: 6 itens (antes 9 em 4 seções). Desempenho e Agenda agrupam telas em abas.
 * Removidos do app real (heurística 8): Material Didático, Plano de Ensino, Histórico,
 * Atividades Complementares, Calendário Acadêmico, Eventos Inatel, Reposições, Cronograma,
 * Tesouraria, Consulta de Pedidos, Avaliação Docente, Pesquisa Institucional, Central de Cópias,
 * Requerimentos.
 */
export const navItens: NavItem[] = [
  { label: "Início", href: "/inicio", icon: House, titulo: "Início" },
  { label: "Avisos", href: "/avisos", icon: Mail, titulo: "Avisos" },
  {
    label: "Conquistas e Ranking",
    href: "/gamificacao/conquistas",
    icon: Trophy,
    titulo: "Conquistas e Ranking",
    match: ["/gamificacao"],
  },
  {
    label: "Desempenho",
    href: "/notas",
    icon: ChartColumn,
    titulo: "Desempenho",
    match: ["/notas", "/frequencia", "/coeficientes"],
  },
  {
    label: "Agenda",
    href: "/horarios",
    icon: CalendarDays,
    titulo: "Agenda",
    match: ["/horarios", "/provas", "/monitores"],
  },
  { label: "Configurações", href: "/configuracoes", icon: Settings, titulo: "Configurações" },
];

/** Abas das seções agrupadas */
export const abasDesempenho: SubNavItem[] = [
  { label: "Notas", href: "/notas" },
  { label: "Frequência", href: "/frequencia" },
  { label: "Coeficientes", href: "/coeficientes" },
];

export const abasAgenda: SubNavItem[] = [
  { label: "Horários", href: "/horarios" },
  { label: "Provas", href: "/provas" },
  { label: "Monitores", href: "/monitores" },
];

/** Barra inferior do mobile: 5 destinos ao alcance do polegar. Avisos fica no sino do cabeçalho. */
export const bottomTabs: NavItem[] = [
  { label: "Início", href: "/inicio", icon: House, titulo: "Início" },
  { label: "Desempenho", href: "/notas", icon: ChartColumn, titulo: "Desempenho", match: ["/notas", "/frequencia", "/coeficientes"] },
  { label: "Conquistas", href: "/gamificacao/conquistas", icon: Medal, titulo: "Conquistas" },
  { label: "Ranking", href: "/gamificacao/ranking", icon: Trophy, titulo: "Ranking" },
  { label: "Agenda", href: "/horarios", icon: CalendarDays, titulo: "Agenda", match: ["/horarios", "/provas", "/monitores"] },
];

/** Itens do menu original que saíram (documentação) */
export const itensRemovidos = [
  "Material Didático",
  "Plano de Ensino",
  "Histórico",
  "Atividades Complementares",
  "Calendário Acadêmico",
  "Eventos Inatel",
  "Reposições",
  "Cronograma de Aula",
  "Tesouraria",
  "Consulta de Pedidos",
  "Avaliação Docente",
  "Pesquisa Institucional",
  "Central de Cópias",
  "Requerimentos",
];

function bate(pathname: string, prefixo: string): boolean {
  return pathname === prefixo || pathname.startsWith(prefixo + "/");
}

export function rotaAtiva(pathname: string, href: string, match?: string[]): boolean {
  if (match) return match.some((m) => bate(pathname, m));
  return bate(pathname, href);
}

export function tituloDaRota(pathname: string): string {
  for (const i of navItens) if (rotaAtiva(pathname, i.href, i.match)) return i.titulo;
  return "Acadêmico";
}
