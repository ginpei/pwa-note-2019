/** @type {ServiceWorkerGlobalScope} */
// @ts-ignore
const sw = self;

const cachePaths = [
  '/offline.html',
];

sw.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  sw.skipWaiting();
});

sw.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');

  const p = caches
    .open('cache-v1.0.0')
    .then((cache) => cache.addAll(cachePaths));
  event.waitUntil(p);
});

sw.addEventListener('fetch', (event) => {
  const { pathname } = new URL(event.request.url);
  if (pathname === '/') {
    const p = fetch(event.request)
      .catch(async () => {
        const cache = await caches.open('cache-v1.0.0');
        const res = await cache.match('/offline.html');
        return res;
      });
    // @ts-ignore
    event.respondWith(p);
  }
});
