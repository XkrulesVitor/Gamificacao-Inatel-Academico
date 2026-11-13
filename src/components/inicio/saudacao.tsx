import Link from "next/link";
import clsx from "clsx";
import { CalendarClock, ChevronRight, Mail, Medal, type LucideIcon } from "lucide-react";
import { HOJE } from "@/lib/format";
import { avisosNaoLidos, emDias, medalhaMaisPerto, proximaProva } from "./dados";

type Tom = "accent" | "gold";

interface Alerta {
  id: string;
  href: string;
  Icone: LucideIcon;
  tom: Tom;
  /** Texto com a parte forte separada (número ou prazo) */
  antes: string;
  forte: string;
  depois?: string;
}

const tons: Record<Tom, string> = {
  accent: "bg-accent/12 text-accent ring-accent/20",
  gold: "bg-gold/14 text-gold-ink ring-gold/30",
};

/** "Qua, 11 nov" */
const dataCurta = (() => {
  const d = new Date(`${HOJE}T12:00:00`);
  const dia = d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
  const mes = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  return `${dia.charAt(0).toUpperCase()}${dia.slice(1)}, ${d.getDate()} ${mes}`;
})();

function montarAlertas(): Alerta[] {
  const lista: Alerta[] = [];
  const prova = proximaProva();
  if (prova) {
    lista.push({
      id: "prova",
      href: "/provas",
      Icone: CalendarClock,
      tom: "accent",
      antes: `${prova.prova.tipo} de ${prova.disciplina.nome} `,
      forte: emDias(prova.prova.data),
    });
  }
  if (avisosNaoLidos > 0) {
    lista.push({
      id: "avisos",
      href: "/avisos",
      Icone: Mail,
      tom: "accent",
      antes: "",
      forte: String(avisosNaoLidos),
      depois: avisosNaoLidos === 1 ? " aviso não lido" : " avisos não lidos",
    });
  }
  const medalha = medalhaMaisPerto();
  if (medalha) {
    lista.push({
      id: "medalha",
      href: "/gamificacao/conquistas",
      Icone: Medal,
      tom: "gold",
      antes: `${medalha.medalha.nome} a `,
      forte: `${medalha.faltam.toLocaleString("pt-BR")} ${medalha.unidade}`,
    });
  }
  return lista.slice(0, 3);
}

/** Cartão "Olá, Lucas" do wireframe: saudação e até 3 alertas que levam a algum lugar. */
export function Saudacao({ nome }: { nome: string }) {
  const alertas = montarAlertas();
  return (
    <section
      aria-labelledby="saudacao-titulo"
      className="rounded-card border border-line bg-surface-1 px-4 pb-2 pt-5 shadow-card lg:px-6 lg:pb-3 lg:pt-6"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="saudacao-titulo" className="text-[26px] font-semibold leading-tight tracking-tight text-fg lg:text-[30px]">
          Olá, {nome}
        </h2>
        {/* No desktop a data já está no cabeçalho */}
        <p className="num shrink-0 text-sm text-muted lg:hidden">{dataCurta}</p>
      </div>

      {alertas.length > 0 && (
        <ul className="mt-3 lg:mt-4">
          {alertas.map(({ id, href, Icone, tom, antes, forte, depois }) => (
            <li key={id}>
              <Link
                href={href}
                className="group -mx-2 flex min-h-[52px] items-center gap-3 rounded-control px-2 py-1.5 transition-colors duration-150 hover:bg-surface-2 active:bg-surface-3"
              >
                <span
                  aria-hidden
                  className={clsx("grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-inset", tons[tom])}
                >
                  <Icone className="size-[18px]" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1 text-[15px] leading-snug text-fg">
                  {antes}
                  <span className="num font-semibold">{forte}</span>
                  {depois}
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-subtle transition-transform duration-150 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
