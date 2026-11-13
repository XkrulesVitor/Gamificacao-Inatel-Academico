import { medalhas } from "@/lib/mock/gamificacao";
import type { Medalha, Raridade } from "@/lib/types";

const nf = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

/** 0..1 */
export function fracao(m: Medalha): number {
  if (m.desbloqueada) return 1;
  return Math.max(0, Math.min(1, m.progresso.atual / m.progresso.meta));
}

/** Percentual inteiro; bloqueada nunca mostra 100. */
export function percentual(m: Medalha): number {
  if (m.desbloqueada) return 100;
  return Math.max(0, Math.min(99, Math.floor(fracao(m) * 100)));
}

/** "33 de 34 aulas de lab". Unidades que começam com "de" ficam depois dos números. */
export function textoProgresso(m: Medalha): string {
  const { atual, meta, unidade } = m.progresso;
  return `${nf.format(atual)} de ${nf.format(meta)} ${unidade.replace(/^de /, "")}`;
}

const pesoRaridade: Record<Raridade, number> = { platina: 4, ouro: 3, prata: 2, bronze: 1 };

/** Conquistadas: raridade maior primeiro, depois a mais recente. */
export const conquistadas = medalhas
  .filter((m) => m.desbloqueada)
  .sort(
    (a, b) =>
      pesoRaridade[b.raridade] - pesoRaridade[a.raridade] ||
      (b.dataConquista ?? "").localeCompare(a.dataConquista ?? ""),
  );

/** Bloqueadas: mais perto de desbloquear primeiro. */
export const bloqueadas = medalhas.filter((m) => !m.desbloqueada).sort((a, b) => fracao(b) - fracao(a));

export const proxima: Medalha | undefined = bloqueadas[0];

/** Conquista mais recente (detalhe inicial do painel no desktop). */
export const ultimaConquista: Medalha | undefined = [...conquistadas].sort((a, b) =>
  (b.dataConquista ?? "").localeCompare(a.dataConquista ?? ""),
)[0];
