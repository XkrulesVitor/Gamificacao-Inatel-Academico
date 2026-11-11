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

/** Cor do texto de uma nota: >= 80 verde, 60–79 amarelo, < 60 vermelho. null = não lançada. */
export function corNota(valor: number | null): string {
  if (valor === null) return "text-subtle";
  if (valor >= 80) return "text-success";
  if (valor >= 60) return "text-warning";
  return "text-danger";
}

/** Nível de uso do limite de faltas: < 50% verde, < 80% amarelo, >= 80% vermelho. */
export function nivelUso(razao: number): "success" | "warning" | "danger" {
  if (razao < 0.5) return "success";
  if (razao < 0.8) return "warning";
  return "danger";
}

/** Turma começando com "L" = laboratório (ex.: "L1", "L4"). */
export function isLaboratorio(turma: string): boolean {
  return turma.startsWith("L");
}

/** "2026-11-24" -> { dia: "24", mesCurto: "nov", ano: "2026", mesLongo: "Novembro" } */
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
