import { FlaskConical, Medal, Trophy } from "lucide-react";
import { ProgressBar } from "@/components/ui/primitives";
import { fmtInt, fmtPct } from "@/lib/format";
import { medalhas } from "@/lib/mock/gamificacao";
import { carregarRanking, meusPontos, minhaEntrada, nivelPorPontos } from "@/lib/ranking";

/** Resumo do nível do aluno (HTA: feedback ao acessar o módulo). */
export function ResumoNivel() {
  const pontos = meusPontos();
  const { atual, proximo, progresso, faltam } = nivelPorPontos(pontos);
  const conquistadas = medalhas.filter((m) => m.desbloqueada).length;
  const eu = minhaEntrada(carregarRanking());

  const stats = [
    { Icone: Medal, valor: `${conquistadas}/${medalhas.length}`, rotulo: "Medalhas", cor: "text-gold" },
    { Icone: Trophy, valor: eu ? `${eu.posicao}º` : "—", rotulo: "Posição geral", cor: "text-platinum" },
    { Icone: FlaskConical, valor: eu ? fmtPct(eu.presenca) : "—", rotulo: "Presença em labs", cor: "text-success" },
  ];

  return (
    <section
      aria-label="Resumo do seu nível"
      className="m-4 mb-3 rounded-card border border-line bg-gradient-to-b from-surface-2 to-surface-1 p-4"
    >
      <div className="flex items-center gap-3">
        <div
          className="grid size-14 shrink-0 place-items-center rounded-full border-[3px] border-xp bg-gradient-to-b from-xp/35 to-xp/5 text-2xl font-extrabold text-fg shadow-[0_0_20px_-6px_var(--color-xp)]"
          aria-hidden
        >
          {atual.numero}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-xp">Nível {atual.numero}</p>
          <p className="truncate text-lg font-bold leading-tight text-fg">{atual.titulo}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold leading-tight text-gold">{fmtInt(pontos)}</p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">pts</p>
        </div>
      </div>

      <div className="mt-3">
        <ProgressBar value={progresso} tone="xp" label={`Progresso até o próximo nível: ${Math.round(progresso * 100)}%`} />
        <p className="mt-1.5 text-xs text-muted">
          {proximo ? (
            <>
              Faltam <strong className="font-semibold text-fg">{fmtInt(faltam)} pts</strong> para Nível {proximo.numero} ·{" "}
              {proximo.titulo}
            </>
          ) : (
            "Nível máximo alcançado!"
          )}
        </p>
      </div>

      <ul className="mt-3 grid grid-cols-3 gap-2">
        {stats.map(({ Icone, valor, rotulo, cor }) => (
          <li key={rotulo} className="rounded-xl bg-surface-3/60 px-2 py-2 text-center">
            <Icone className={`mx-auto size-4 ${cor}`} aria-hidden />
            <p className="mt-0.5 text-[17px] font-bold leading-tight text-fg">{valor}</p>
            <p className="text-[11px] leading-tight text-muted">{rotulo}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
