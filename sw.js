// Tarn — offline app-shell service worker (rutas relativas: sirve en la raíz
// de un dominio o en una subcarpeta de GitHub Pages).
const CACHE_VERSION = 'tarn-v5';
const APP_SHELL = [
  './', 'index.html', 'manifest.webmanifest', 'registerSW.js', 'logo.svg',
  'favicon.png', 'favicon-32.png', 'apple-touch-icon.png',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'assets/index-b36bb841.js', 'assets/index-u85c6tjM.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          if (request.mode === 'navigate') return caches.match('index.html');
        });
      return cached || networkFetch;
    })
  );
});
