import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarCheck,
  ClipboardList,
  Clock,
  Mail,
  Rows3,
  Settings,
  Trophy,
  Users,
  ClipboardCheck,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Título exibido no cabeçalho quando a rota está ativa */
  titulo: string;
  /** Selo "Novo" no menu (módulo de gamificação) */
  novo?: boolean;
}

export interface NavSection {
  titulo: string;
  itens: NavItem[];
  destaque?: boolean;
}

/**
 * Menu lateral — mesma estrutura de seções do app real, porém ENXUTO.
 *
 * Removidos (excesso de opções, baixa frequência de uso — heurística 8 de Nielsen):
 *  Material Didático, Plano de Ensino, Histórico, toda a seção "Atividades Complementares"
 *  (Avaliações, Frequência, Eletivas, Obrigatórias), Calendário Acadêmico, Eventos Inatel,
 *  Reposições, Cronograma de Aula, Tesouraria, Consulta de Pedidos, Avaliação Docente,
 *  Pesquisa Institucional, Central de Cópias e Requerimentos.
 *
 * Adicionado: seção "Suporte Estudantil > Conquistas e Ranking" (HTA, item 1).
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
        icon: Trophy,
        titulo: "Conquistas e Ranking",
        novo: true,
      },
    ],
  },
  {
    titulo: "Aproveitamento Escolar",
    itens: [
      { label: "Notas", href: "/notas", icon: BarChart3, titulo: "Notas" },
      { label: "Frequência", href: "/frequencia", icon: CalendarCheck, titulo: "Frequência" },
      { label: "Coeficientes", href: "/coeficientes", icon: ClipboardList, titulo: "Coeficientes" },
    ],
  },
  {
    titulo: "Calendários e Horários",
    itens: [
      { label: "Provas", href: "/provas", icon: Rows3, titulo: "Provas" },
      { label: "Horários de Aula", href: "/horarios", icon: Clock, titulo: "Horários de Aula" },
      { label: "Horários de Monitores", href: "/monitores", icon: Users, titulo: "Monitores" },
    ],
  },
  {
    titulo: "Outras Opções",
    itens: [{ label: "Configurações", href: "/configuracoes", icon: Settings, titulo: "Configurações" }],
  },
];

/** Itens removidos do menu original (exibidos na tela Configurações > Sobre o protótipo). */
export const itensRemovidos = [
  "Material Didático",
  "Plano de Ensino",
  "Histórico",
  "Atividades Complementares (4 itens)",
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

export const iconeEntregas = ClipboardCheck;

/** Título do cabeçalho para um pathname. */
export function tituloDaRota(pathname: string): string {
  if (pathname.startsWith("/gamificacao")) return "Conquistas e Ranking";
  for (const s of navSections) {
    for (const i of s.itens) {
      if (pathname === i.href || pathname.startsWith(i.href + "/")) return i.titulo;
    }
  }
  return "Acadêmico";
}

export function rotaAtiva(pathname: string, href: string): boolean {
  if (href.startsWith("/gamificacao")) return pathname.startsWith("/gamificacao");
  return pathname === href || pathname.startsWith(href + "/");
}
