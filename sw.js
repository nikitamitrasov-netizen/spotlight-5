/* Spotlight 5 — offline cache */
const CACHE = 'sp5-v14';
const ASSETS = [
  './',
  'index.html',
  'css/styles.css',
  'css/features.css',
  'js/data-1.js',
  'js/data-2.js',
  'js/data-3.js',
  'js/data-reading.js',
  'js/data-theory.js',
  'js/extras-1.js',
  'js/extras-2.js',
  'js/extras-3.js',
  'js/app.js',
  'js/features.js',
  'manifest.webmanifest',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => {
        if (req.mode === 'navigate') return caches.match('index.html');
        return caches.match('./');
      });
    })
  );
});

