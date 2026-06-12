const CACHE_NAME = 'ot-calc-v1';
const ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json'
];

// Masa install app, simpan semua fail dalam storage phone
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Bila buka app, dia akan load fail dari storage phone terus (laju & offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});