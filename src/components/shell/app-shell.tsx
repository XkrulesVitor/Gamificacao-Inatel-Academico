"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import clsx from "clsx";
import { AppDrawer } from "@/components/shell/app-drawer";
import { BottomTabs } from "@/components/shell/bottom-tabs";
import { Sidebar } from "@/components/shell/sidebar";
import { useSession } from "@/components/session-provider";
import { tituloDaRota } from "@/lib/nav";

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

/**
 * Shell autenticado.
 * Mobile (<1024px): cabeçalho azul-marinho com menu, conteúdo, barra inferior; menu lateral em drawer.
 * Desktop (≥1024px): sidebar fixa à esquerda, barra superior azul-marinho, conteúdo largo.
 * O conteúdo rola dentro de #app-scroll.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, autenticado } = useSession();
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

  if (!ready || !autenticado) return <div className="flex-1 bg-bg" aria-busy="true" />;

  return (
    <ShellContext.Provider value={value}>
      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="z-20 shrink-0 bg-header pt-[env(safe-area-inset-top)] lg:pt-0">
            <div className="flex h-14 items-center gap-1 px-1.5 lg:h-16 lg:px-8">
              <button
                type="button"
                onClick={() => setDrawerAberto(true)}
                className="grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-white/10 lg:hidden"
                aria-label="Abrir menu"
                aria-expanded={drawerAberto}
              >
                <Menu className="size-6" strokeWidth={1.75} />
              </button>

              {buscaAberta ? (
                <input
                  autoFocus
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar avisos"
                  className="h-10 min-w-0 flex-1 rounded-control bg-white/10 px-3 text-[15px] text-fg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent lg:max-w-md"
                  aria-label="Buscar avisos"
                />
              ) : (
                <h1 className="min-w-0 flex-1 truncate pl-3 text-xl font-normal text-fg lg:pl-0 lg:text-[22px] lg:font-medium">
                  {titulo}
                </h1>
              )}

              {temBusca && (
                <button
                  type="button"
                  onClick={() => {
                    setBuscaAberta((v) => !v);
                    setBusca("");
                  }}
                  className={clsx(
                    "grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-white/10",
                    buscaAberta && "lg:ml-auto",
                  )}
                  aria-label={buscaAberta ? "Fechar busca" : "Buscar"}
                >
                  {buscaAberta ? <X className="size-6" strokeWidth={1.75} /> : <Search className="size-6" strokeWidth={1.75} />}
                </button>
              )}
            </div>
          </header>

          <main ref={scrollRef} id="app-scroll" className="app-scroll relative flex-1">
            {children}
          </main>

          <BottomTabs />
        </div>
      </div>

      <AppDrawer aberto={drawerAberto} onFechar={fecharDrawer} />
    </ShellContext.Provider>
  );
}
