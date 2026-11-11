"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { AppDrawer } from "@/components/shell/app-drawer";
import { useSession } from "@/components/session-provider";
import { tituloDaRota } from "@/lib/nav";

interface ShellValue {
  /** Busca no cabeçalho (apenas tela Avisos, como no app real) */
  busca: string;
  setBusca: (v: string) => void;
  buscaAberta: boolean;
  abrirDrawer: () => void;
}

const ShellContext = createContext<ShellValue | null>(null);

export function useShell(): ShellValue {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell deve ser usado dentro de <AppShell>");
  return ctx;
}

/** Rotas que exibem o ícone de busca no cabeçalho */
const ROTAS_COM_BUSCA = ["/avisos"];

/**
 * Shell autenticado: cabeçalho azul-marinho (☰ + título + ação) e menu lateral,
 * reproduzindo a navegação padrão do app Acadêmico. Conteúdo rola por dentro (#app-scroll).
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, autenticado } = useSession();
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [busca, setBusca] = useState("");
  const scrollRef = useRef<HTMLElement>(null);

  // Guarda de rota: sem sessão mock -> tela de perfis salvos
  useEffect(() => {
    if (ready && !autenticado) router.replace("/");
  }, [ready, autenticado, router]);

  // Ao trocar de rota: fecha menu/busca e volta ao topo
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

  const abrirDrawer = useCallback(() => setDrawerAberto(true), []);
  const value = useMemo(() => ({ busca, setBusca, buscaAberta, abrirDrawer }), [busca, buscaAberta, abrirDrawer]);

  const titulo = tituloDaRota(pathname);
  const temBusca = ROTAS_COM_BUSCA.includes(pathname);

  if (!ready || !autenticado) {
    return <div className="flex-1 bg-bg" aria-busy="true" />;
  }

  return (
    <ShellContext.Provider value={value}>
      <header className="z-20 flex h-14 shrink-0 items-center gap-2 bg-header px-1.5 shadow-[0_1px_0_rgba(0,0,0,0.4)]">
        <button
          type="button"
          onClick={() => setDrawerAberto(true)}
          className="grid size-11 place-items-center rounded-full text-fg transition hover:bg-white/10"
          aria-label="Abrir menu"
          aria-expanded={drawerAberto}
        >
          <Menu className="size-6" />
        </button>

        {buscaAberta ? (
          <input
            autoFocus
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar avisos..."
            className="h-10 min-w-0 flex-1 rounded-md bg-white/10 px-3 text-[15px] text-fg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand"
            aria-label="Buscar avisos"
          />
        ) : (
          <h1 className="min-w-0 flex-1 truncate pl-3 text-[20px] font-normal text-fg">{titulo}</h1>
        )}

        {temBusca && (
          <button
            type="button"
            onClick={() => {
              setBuscaAberta((v) => !v);
              setBusca("");
            }}
            className="grid size-11 place-items-center rounded-full text-fg transition hover:bg-white/10"
            aria-label={buscaAberta ? "Fechar busca" : "Buscar"}
          >
            {buscaAberta ? <X className="size-6" /> : <Search className="size-6" />}
          </button>
        )}
      </header>

      <main ref={scrollRef} id="app-scroll" className="app-scroll relative flex-1">
        {children}
      </main>

      <AppDrawer aberto={drawerAberto} onFechar={() => setDrawerAberto(false)} />
    </ShellContext.Provider>
  );
}
