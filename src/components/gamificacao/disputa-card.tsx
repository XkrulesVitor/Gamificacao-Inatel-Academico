import { ArrowDown, ArrowUp, Swords } from "lucide-react";
import { Avatar } from "@/components/ui/primitives";
import { fmt1, iniciais } from "@/lib/format";
import type { EntradaRanking } from "@/lib/types";

/** Dimensão social: quem está logo acima e logo abaixo de você no filtro atual. */
export function DisputaCard({ ranking, eu }: { ranking: EntradaRanking[]; eu: EntradaRanking }) {
  const i = ranking.indexOf(eu);
  const acima = ranking[i - 1];
  const abaixo = ranking[i + 1];

  return (
    <section aria-label="Disputa" className="rounded-card border border-line bg-surface-1 p-3.5">
      <h3 className="mb-2.5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-muted">
        <Swords className="size-4 text-accent" aria-hidden /> Disputa
      </h3>
      <ul className="space-y-2.5">
        <Vizinho
          icone={<ArrowUp className="size-4 text-success" aria-hidden />}
          e={acima}
          vazio="Você lidera este filtro. Segure a posição!"
          texto={(e) => (
            <>
              <strong className="text-fg">{e.aluno.nome.split(" ")[0]}</strong> está{" "}
              <strong className="text-gold">{fmt1(e.pontuacao - eu.pontuacao)} pts</strong> à frente
            </>
          )}
          dica={(e) => `Alcance-o e você sobe para ${e.posicao}º.`}
        />
        <Vizinho
          icone={<ArrowDown className="size-4 text-danger" aria-hidden />}
          e={abaixo}
          vazio="Ninguém abaixo de você neste filtro."
          texto={(e) => (
            <>
              <strong className="text-fg">{e.aluno.nome.split(" ")[0]}</strong> está a{" "}
              <strong className="text-gold">{fmt1(eu.pontuacao - e.pontuacao)} pts</strong> de você
            </>
          )}
          dica={() => "Mantenha o ritmo para não perder a posição."}
        />
      </ul>
    </section>
  );
}

function Vizinho({
  icone,
  e,
  vazio,
  texto,
  dica,
}: {
  icone: React.ReactNode;
  e?: EntradaRanking;
  vazio: string;
  texto: (e: EntradaRanking) => React.ReactNode;
  dica: (e: EntradaRanking) => string;
}) {
  return (
    <li className="flex items-center gap-3">
      {e ? (
        <Avatar label={iniciais(e.aluno.nome)} color={e.aluno.avatarCor} className="size-10 text-sm" />
      ) : (
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-3" aria-hidden>
          {icone}
        </span>
      )}
      <div className="min-w-0 flex-1">
        {e ? (
          <>
            <p className="text-[15px] leading-snug text-muted">{texto(e)}</p>
            <p className="text-xs text-muted">{dica(e)}</p>
          </>
        ) : (
          <p className="text-[15px] leading-snug text-muted">{vazio}</p>
        )}
      </div>
      {e && <span className="shrink-0">{icone}</span>}
    </li>
  );
}
