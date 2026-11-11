"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/** Preferências de gamificação (mock) — apenas localStorage, sem backend. */
export interface Prefs {
  notificarMedalhas: boolean;
  exibirNome: boolean;
  mostrarAtalho: boolean;
}

export const PREFS_PADRAO: Prefs = { notificarMedalhas: true, exibirNome: true, mostrarAtalho: true };

const KEY = "inatel-academico:prefs";
const EVENT = "inatel-academico:prefs-change";

function ler(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
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

function interpretar(raw: string): Prefs {
  if (!raw) return PREFS_PADRAO;
  try {
    return { ...PREFS_PADRAO, ...(JSON.parse(raw) as Partial<Prefs>) };
  } catch {
    return PREFS_PADRAO;
  }
}

export function usePrefs(): { prefs: Prefs; definir: (chave: keyof Prefs, valor: boolean) => void } {
  const raw = useSyncExternalStore(subscribe, ler, () => "");
  const prefs = useMemo(() => interpretar(raw), [raw]);
  const definir = useCallback((chave: keyof Prefs, valor: boolean) => {
    const novo = { ...interpretar(ler()), [chave]: valor };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(novo));
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return { prefs, definir };
}
