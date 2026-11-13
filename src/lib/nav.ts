import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarCheck,
  CalendarClock,
  Clock,
  Gauge,
  Mail,
  Medal,
  Settings,
  Trophy,
  Users,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Título do cabeçalho quando a rota está ativa */
  titulo: string;
  novo?: boolean;
  /** Prefixo extra que também ativa o item (ex.: /gamificacao cobre as duas abas) */
  match?: string;
}

export interface NavSection {
  titulo: string;
  itens: NavItem[];
  destaque?: boolean;
}

/**
 * Menu: mesmas seções do app real, enxuto (heurística 8).
 * Adicionado: Suporte Estudantil (Conquistas, Ranking).
 */
export const navSections: NavSection[] = [
  {
    titulo: "Mensagens Acadêmicas",
    itens: [{ label: "Avisos", href: "/avisos", icon: Mail, titulo: "Avisos" }],
  },
  {
    titulo: "Suporte Estudantil",
    destaque: true,
    itens: [
      {
        label: "Conquistas e Ranking",
        href: "/gamificacao/conquistas",
        match: "/gamificacao",
        icon: Trophy,
        titulo: "Conquistas e Ranking",
      },
    ],
  },
  {
    titulo: "Aproveitamento Escolar",
    itens: [
      { label: "Notas", href: "/notas", icon: BarChart3, titulo: "Notas" },
      { label: "Frequência", href: "/frequencia", icon: CalendarCheck, titulo: "Frequência" },
      { label: "Coeficientes", href: "/coeficientes", icon: Gauge, titulo: "Coeficientes" },
    ],
  },
  {
    titulo: "Calendários e Horários",
    itens: [
      { label: "Provas", href: "/provas", icon: CalendarClock, titulo: "Provas" },
      { label: "Horários de Aula", href: "/horarios", icon: Clock, titulo: "Horários de Aula" },
      { label: "Horários de Monitores", href: "/monitores", icon: Users, titulo: "Monitores" },
    ],
  },
  {
    titulo: "Outras Opções",
    itens: [{ label: "Configurações", href: "/configuracoes", icon: Settings, titulo: "Configurações" }],
  },
];

/** Barra inferior do mobile: 4 atalhos ao alcance do polegar. */
export const bottomTabs: NavItem[] = [
  { label: "Avisos", href: "/avisos", icon: Mail, titulo: "Avisos" },
  { label: "Conquistas", href: "/gamificacao/conquistas", icon: Medal, titulo: "Conquistas" },
  { label: "Ranking", href: "/gamificacao/ranking", icon: Trophy, titulo: "Ranking" },
  { label: "Horários", href: "/horarios", icon: Clock, titulo: "Horários de Aula" },
];

/** Itens removidos do menu original (Configurações > Sobre). */
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

export function tituloDaRota(pathname: string): string {
  if (pathname.startsWith("/gamificacao")) return "Conquistas e Ranking";
  for (const s of navSections) {
    for (const i of s.itens) {
      if (pathname === i.href || pathname.startsWith(i.href + "/")) return i.titulo;
    }
  }
  return "Acadêmico";
}

export function rotaAtiva(pathname: string, href: string, match?: string): boolean {
  if (match) return pathname === match || pathname.startsWith(match + "/");
  return pathname === href || pathname.startsWith(href + "/");
}
