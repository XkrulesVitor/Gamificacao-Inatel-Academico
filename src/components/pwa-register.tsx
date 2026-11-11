"use client";

import { useEffect } from "react";

/**
 * Registra o service worker (/sw.js) somente em produção.
 * Não renderiza nada.
 */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch((error: unknown) => {
        console.warn("[pwa] falha ao registrar o service worker:", error);
      });
  }, []);

  return null;
}
