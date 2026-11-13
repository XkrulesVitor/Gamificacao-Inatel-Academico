"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noop = () => () => {};

/** Renderiza no <body>. Overlays usam `fixed inset-0`. */
export function Portal({ children }: { children: React.ReactNode }) {
  const target = useSyncExternalStore(
    noop,
    () => document.body,
    () => null,
  );
  if (!target) return null;
  return createPortal(children, target);
}
