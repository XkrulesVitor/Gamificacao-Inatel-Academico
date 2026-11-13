"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, Moon, Search, Sun, X } from "lucide-react";
import clsx from "clsx";
import { AppDrawer } from "@/components/shell/app-drawer";
import { BottomTabs } from "@/components/shell/bottom-tabs";
import { Sidebar } from "@/components/shell/sidebar";
import { useSession } from "@/components/session-provider";
import { useTheme } from "@/components/theme-provider";
import { tituloDaRota } from "@/lib/nav";
import { avisos } from "@/lib/mock/aluno";
import { HOJE } from "@/lib/format";

interface ShellValue {
  /** Texto da busca do cabeçalho (só na tela Avisos, como no app real) */
  busca: string;
  setBusca: (v: string) => void;
  buscaAberta: boolean;
}

const ShellContext = createContext<ShellValue | null>(null);

export function useShell(): ShellValue {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell deve ser usado dentro de <AppShell>");
  return ctx;
}

const ROTAS_COM_BUSCA = ["/avisos"];
const naoLidos = avisos.filter((a) => !a.lido).length;
const dataHojeBruta = new Date(`${HOJE}T12:00:00`).toLocaleDateString("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const dataHoje = dataHojeBruta.charAt(0).toUpperCase() + dataHojeBruta.slice(1);

function BotaoCabecalho({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        "relative grid size-10 place-items-center rounded-full text-on-header transition-colors duration-150 hover:bg-white/10 active:bg-white/15",
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * Shell autenticado.
 * Mobile (<1024px): cabeçalho azul-marinho (menu, título, tema, avisos), conteúdo, barra inferior.
 * Desktop (≥1024px): sidebar fixa, cabeçalho com título e data, conteúdo largo.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, autenticado } = useSession();
  const { tema, alternar } = useTheme();
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [busca, setBusca] = useState("");
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ready && !autenticado) router.replace("/");
  }, [ready, autenticado, router]);

  const [rotaAnterior, setRotaAnterior] = useState(pathname);
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname);
    setDrawerAberto(false);
    setBuscaAberta(false);
    setBusca("");
  }
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  const fecharDrawer = useCallback(() => setDrawerAberto(false), []);
  const value = useMemo(() => ({ busca, setBusca, buscaAberta }), [busca, buscaAberta]);
  const titulo = tituloDaRota(pathname);
  const temBusca = ROTAS_COM_BUSCA.includes(pathname);
  // Muda só ao trocar de seção (não entre abas da mesma seção), para a animação não repetir
  const chaveSecao = titulo;

  if (!ready || !autenticado) return <div className="flex-1 bg-bg" aria-busy="true" />;

  return (
    <ShellContext.Provider value={value}>
      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="relative z-30 shrink-0 bg-gradient-to-r from-header to-header-2 pt-[env(safe-area-inset-top)] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] lg:pt-0">
            <div className="mx-auto flex h-14 w-full items-center gap-1 px-1.5 lg:h-16 lg:px-6 xl:px-8">
              <BotaoCabecalho onClick={() => setDrawerAberto(true)} aria-label="Abrir menu" aria-expanded={drawerAberto} className="lg:hidden">
                <Menu className="size-6" strokeWidth={1.75} />
              </BotaoCabecalho>

              {buscaAberta ? (
                <input
                  autoFocus
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar avisos"
                  className="h-10 min-w-0 flex-1 rounded-control bg-white/10 px-3 text-[15px] text-on-header placeholder:text-on-header-muted focus:outline-none focus:ring-2 focus:ring-white/40 lg:max-w-md"
                  aria-label="Buscar avisos"
                />
              ) : (
                <div className="min-w-0 flex-1 pl-2 lg:pl-0">
                  <h1 className="truncate text-[19px] font-medium leading-tight text-on-header lg:text-[22px]">{titulo}</h1>
                  <p className="hidden text-[13px] text-on-header-muted lg:block">{dataHoje}</p>
                </div>
              )}

              {temBusca && (
                <BotaoCabecalho
                  onClick={() => {
                    setBuscaAberta((v) => !v);
                    setBusca("");
                  }}
                  aria-label={buscaAberta ? "Fechar busca" : "Buscar avisos"}
                  className={clsx(buscaAberta && "lg:ml-auto")}
                >
                  {buscaAberta ? <X className="size-[22px]" strokeWidth={1.75} /> : <Search className="size-[22px]" strokeWidth={1.75} />}
                </BotaoCabecalho>
              )}

              <BotaoCabecalho onClick={alternar} aria-label={tema === "dark" ? "Usar tema claro" : "Usar tema escuro"}>
                {tema === "dark" ? <Sun className="size-[21px]" strokeWidth={1.75} /> : <Moon className="size-[21px]" strokeWidth={1.75} />}
              </BotaoCabecalho>

              {(
                <Link
                  href="/avisos"
                  aria-label={naoLidos ? `Avisos, ${naoLidos} não lidos` : "Avisos"}
                  className="relative grid size-10 place-items-center rounded-full text-on-header transition-colors duration-150 hover:bg-white/10"
                >
                  <Bell className="size-[21px]" strokeWidth={1.75} />
                  {naoLidos > 0 && (
                    <span className="absolute right-1.5 top-1.5 size-2.5 rounded-full bg-danger ring-2 ring-header" aria-hidden />
                  )}
                </Link>
              )}
            </div>
          </header>

          <main ref={scrollRef} id="app-scroll" className="app-scroll relative flex-1">
            <div key={chaveSecao} className="animate-enter">
              {children}
            </div>
          </main>

          <BottomTabs />
        </div>
      </div>

      <AppDrawer aberto={drawerAberto} onFechar={fecharDrawer} />
    </ShellContext.Provider>
  );
}
