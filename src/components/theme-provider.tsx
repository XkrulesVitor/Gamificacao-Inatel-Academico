"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

export type PreferenciaTema = "sistema" | "claro" | "escuro";
export type Tema = "light" | "dark";

const KEY = "inatel-academico:tema";
const EVENT = "inatel-academico:tema-change";

/**
 * Script inline do <head>: aplica o tema antes da primeira pintura (sem piscar).
 * Lê a preferência salva; "sistema" (ou nada salvo) segue prefers-color-scheme.
 */
export const SCRIPT_TEMA = `(function(){try{var p=localStorage.getItem("${KEY}")||"sistema";var t=p==="claro"?"light":p==="escuro"?"dark":(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

function lerPreferencia(): PreferenciaTema {
  try {
    const v = localStorage.getItem(KEY);
    return v === "claro" || v === "escuro" ? v : "sistema";
  } catch {
    return "sistema";
  }
}

function resolver(p: PreferenciaTema): Tema {
  if (p === "claro") return "light";
  if (p === "escuro") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function subscribe(cb: () => void) {
  const mql = window.matchMedia("(prefers-color-scheme: light)");
  mql.addEventListener("change", cb);
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    mql.removeEventListener("change", cb);
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

interface ThemeValue {
  preferencia: PreferenciaTema;
  tema: Tema;
  definir: (p: PreferenciaTema) => void;
  /** Alterna entre claro e escuro (o botão do cabeçalho) */
  alternar: () => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const preferencia = useSyncExternalStore<PreferenciaTema>(subscribe, lerPreferencia, () => "sistema");
  const tema = useSyncExternalStore<Tema>(
    subscribe,
    () => resolver(lerPreferencia()),
    () => "dark",
  );

  // Mantém o atributo do <html> em dia (mudança do sistema ou escolha do usuário)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  const definir = useCallback((p: PreferenciaTema) => {
    try {
      localStorage.setItem(KEY, p);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const alternar = useCallback(() => {
    definir(resolver(lerPreferencia()) === "dark" ? "claro" : "escuro");
  }, [definir]);

  const value = useMemo(() => ({ preferencia, tema, definir, alternar }), [preferencia, tema, definir, alternar]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de <ThemeProvider>");
  return ctx;
}
