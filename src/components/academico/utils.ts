import { diasAte } from "@/lib/format";

export const MESES_LONGOS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

export const MESES_CURTOS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"] as const;

/** Nota abaixo de 60 em vermelho; as demais em texto normal. */
export function classeNota(valor: number | null): string {
  return valor !== null && valor < 60 ? "text-danger" : "text-fg";
}

/** Turma começando com "L" = laboratório (ex.: "L1", "L4"). */
export function isLaboratorio(turma: string): boolean {
  return turma.startsWith("L");
}

/** "2026-11-24" -> { dia: "24", mesCurto: "nov", ano: "2026", mesLongo: "Novembro", chaveMes: "2026-11" } */
export function partesData(iso: string) {
  const mes = Number(iso.slice(5, 7)) - 1;
  return {
    dia: iso.slice(8, 10),
    mesCurto: MESES_CURTOS[mes],
    mesLongo: MESES_LONGOS[mes],
    ano: iso.slice(0, 4),
    chaveMes: iso.slice(0, 7),
  };
}

/** Texto relativo à data de hoje do protótipo: "hoje", "amanhã", "em 13 dias". */
export function rotuloDias(iso: string): string {
  const n = diasAte(iso);
  if (n === 0) return "hoje";
  if (n === 1) return "amanhã";
  if (n > 1) return `em ${n} dias`;
  if (n === -1) return "ontem";
  return `há ${-n} dias`;
}
