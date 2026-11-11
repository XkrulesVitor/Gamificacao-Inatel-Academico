/** Helpers de formatação pt-BR. */

const nf1 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/** 87.0 -> "87,0" */
export function fmt1(n: number): string {
  return nf1.format(n);
}

/** 1420 -> "1.420" */
export function fmtInt(n: number): string {
  return nf0.format(n);
}

/** 0.97 -> "97%" */
export function fmtPct(n: number): string {
  return `${Math.round(n * 100)}%`;
}

function parse(iso: string): Date {
  // Datas "yyyy-mm-dd" são tratadas como horário local (evita voltar 1 dia por fuso).
  return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T12:00:00`) : new Date(iso);
}

/** "2026-11-24" -> "24/11/2026" */
export function fmtData(iso: string): string {
  return parse(iso).toLocaleDateString("pt-BR");
}

/** "2026-11-24" -> "24/11" */
export function fmtDiaMes(iso: string): string {
  return parse(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

/** "2026-10-17T16:21:00" -> "17/10/2026 16:21" (formato da tela Avisos) */
export function fmtDataHora(iso: string): string {
  const d = parse(iso);
  return `${d.toLocaleDateString("pt-BR")} ${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
}

/** "2026-11-24" -> "ter., 24 de nov." */
export function fmtDataLonga(iso: string): string {
  return parse(iso).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
}

/** Data de "hoje" do protótipo (fixa, para os mocks fazerem sentido). */
export const HOJE = "2026-11-11";

/** Dias entre HOJE e a data (positivo = futuro). */
export function diasAte(iso: string): number {
  const ms = parse(iso).getTime() - parse(HOJE).getTime();
  return Math.round(ms / 86_400_000);
}

export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  const a = partes[0]?.[0] ?? "";
  const b = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (a + b).toUpperCase();
}
