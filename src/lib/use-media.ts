"use client";

import { useSyncExternalStore } from "react";

/** Breakpoint do desktop (sidebar fixa). Igual ao `lg` do Tailwind. */
export const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribe(query: string) {
  return (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  };
}

/** true quando a media query bate. No servidor devolve `false`. */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Atalho: layout desktop (≥1024px). Use para decidir entre bottom sheet (mobile) e painel lateral (desktop). */
export function useIsDesktop(): boolean {
  return useMedia(DESKTOP_QUERY);
}
