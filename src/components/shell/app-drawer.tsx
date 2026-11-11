"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CircleUserRound, Power, Sparkles } from "lucide-react";
import clsx from "clsx";
import { useEffect } from "react";
import { navSections, rotaAtiva } from "@/lib/nav";
import { useSession } from "@/components/session-provider";
import { meusPontos, nivelPorPontos } from "@/lib/ranking";
import { fmtInt } from "@/lib/format";

/** Menu lateral (drawer) no estilo do app real: cabeçalho azul em degradê + seções cinza. */
export function AppDrawer({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { aluno, sair } = useSession();
  const pontos = meusPontos();
  const { atual } = nivelPorPontos(pontos);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onFechar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto, onFechar]);

  return (
    <AnimatePresence>
      {aberto && (
        <div className="absolute inset-x-0 bottom-0 top-[env(safe-area-inset-top)] z-40 md:top-11">
          <motion.button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onFechar}
          />
          <motion.nav
            aria-label="Menu principal"
            className="app-scroll absolute inset-y-0 left-0 w-[82%] max-w-[300px] bg-drawer shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 340 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.5, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -500) onFechar();
            }}
          >
            {/* Cabeçalho do usuário */}
            <div className="bg-gradient-to-r from-[#17457f] to-[#0b63d6] px-5 pb-4 pt-5">
              <CircleUserRound className="size-14 text-white" strokeWidth={1.5} aria-hidden />
              <p className="mt-2 text-[17px] font-semibold leading-tight text-white">{aluno.nome}</p>
              <p className="mt-1 text-[13px] text-white/80">{aluno.email}</p>
              <Link
                href="/gamificacao/conquistas"
                onClick={onFechar}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 transition hover:bg-black/35"
              >
                <Sparkles className="size-3.5 text-gold" aria-hidden />
                Nível {atual.numero} · {fmtInt(pontos)} pts
              </Link>
            </div>

            {navSections.map((secao) => (
              <div key={secao.titulo} className="border-b border-white/10 py-2">
                <p
                  className={clsx(
                    "px-5 pb-1 pt-3 text-[14px]",
                    secao.destaque ? "font-semibold text-gold" : "text-[#b9b9bd]",
                  )}
                >
                  {secao.titulo}
                </p>
                <ul>
                  {secao.itens.map((item) => {
                    const ativo = rotaAtiva(pathname, item.href);
                    const Icone = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onFechar}
                          aria-current={ativo ? "page" : undefined}
                          className={clsx(
                            "flex h-12 items-center gap-6 px-5 text-[16px] transition",
                            ativo ? "bg-white/10 text-white" : "text-[#e6e6e8] hover:bg-white/5",
                          )}
                        >
                          <Icone className={clsx("size-6", ativo ? "text-brand" : "text-[#d0d0d3]")} aria-hidden />
                          <span className="flex-1">{item.label}</span>
                          {item.novo && (
                            <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                              Novo
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="py-2 pb-[calc(16px+env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => {
                  onFechar();
                  sair();
                  router.replace("/");
                }}
                className="flex h-12 w-full items-center gap-6 px-5 text-left text-[16px] text-[#e6e6e8] transition hover:bg-white/5"
              >
                <Power className="size-6 text-[#d0d0d3]" aria-hidden />
                Sair
              </button>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
