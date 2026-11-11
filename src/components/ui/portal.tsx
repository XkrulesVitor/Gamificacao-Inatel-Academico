"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noop = () => () => {};

/**
 * Renderiza dentro de #app-frame (o "viewport" do app — moldura do celular no desktop).
 * Filhos devem usar `absolute inset-0` (NÃO `fixed`), para ficarem presos à moldura.
 */
export function Portal({ children }: { children: React.ReactNode }) {
  const target = useSyncExternalStore(
    noop,
    () => document.getElementById("app-frame"),
    () => null,
  );
  if (!target) return null;
  return createPortal(children, target);
}
