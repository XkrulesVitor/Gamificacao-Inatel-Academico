"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { aluno } from "@/lib/mock/aluno";
import type { Aluno } from "@/lib/types";

/**
 * Sessão MOCK (sem backend / banco de dados). Apenas um flag no localStorage.
 * Nenhuma credencial é enviada ou armazenada.
 */
const STORAGE_KEY = "inatel-academico:sessao";
const EVENT = "inatel-academico:sessao-change";

function readSession(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

interface SessionValue {
  /** false até o client hidratar (evita redirecionar antes de ler o localStorage) */
  ready: boolean;
  autenticado: boolean;
  aluno: Aluno;
  entrar: () => void;
  sair: () => void;
}

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  // null no servidor => "ainda não sei"
  const estado = useSyncExternalStore<boolean | null>(subscribe, readSession, () => null);

  const entrar = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const sair = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const value = useMemo<SessionValue>(
    () => ({ ready: estado !== null, autenticado: estado === true, aluno, entrar, sair }),
    [estado, entrar, sair],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession deve ser usado dentro de <SessionProvider>");
  return ctx;
}
