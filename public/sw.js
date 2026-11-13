/* Service Worker do Acadêmico Inatel (PWA). Escrito à mão, sem dependências.
 *
 * Estratégias:
 *  - Navegações (request.mode === "navigate"): network-first, com fallback para
 *    o cache e, por fim, para /offline.html.
 *  - /_next/static/ e /icons/: cache-first.
 *  - Demais recursos da mesma origem: stale-while-revalidate.
 *  - Requisições de outras origens e não-GET não são interceptadas.
 *
 * Para publicar uma nova versão do cache, altere VERSION.
 */

const VERSION = "v2";
const CACHE_PREFIX = "academico-inatel-";
const CACHE_NAME = `${CACHE_PREFIX}${VERSION}`;
const OFFLINE_URL = "/offline.html";

const PRECACHE_URLS = [
  "/",
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Equivalente tolerante ao cache.addAll: uma falha isolada não cancela a instalação.
      const results = await Promise.allSettled(
        PRECACHE_URLS.map(async (url) => {
          const response = await fetch(new Request(url, { cache: "reload" }));
          if (!response.ok) {
            throw new Error(`HTTP ${response.status} em ${url}`);
          }
          await cache.put(url, response);
        })
      );
      results.forEach((result) => {
        if (result.status === "rejected") {
          console.warn("[sw] falha no precache:", result.reason);
        }
      });
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, event));
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch (_error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    const offline = await cache.match(OFFLINE_URL);
    if (offline) return offline;
    return Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone()).catch(() => {});
  }
  return response;
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkUpdate = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  });

  // Mantém o worker vivo até a atualização em segundo plano terminar.
  event.waitUntil(networkUpdate.catch(() => {}));

  if (cached) return cached;

  try {
    return await networkUpdate;
  } catch (_error) {
    return Response.error();
  }
}
