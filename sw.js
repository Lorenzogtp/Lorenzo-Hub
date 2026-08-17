const CACHE = 'lorenzo-hub-v1.2-20260817';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './config.js',
  './links.js',
  './icon-192.png',
  './icon-512.png',
  './404.html',
  './actv-rapido.html',
  './piano-prove-elisir.html'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;

  const req = event.request;
  const url = new URL(req.url);

  // HTML/config: network first, so GitHub updates appear immediately.
  if(req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('config.js') || url.pathname.endsWith('links.js')){
    event.respondWith(
      fetch(req)
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return resp;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return resp;
    }))
  );
});
