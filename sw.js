const CACHE_NAME = 'kasir-pintar-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './icon-192.png',
  './icon-512.png'
];

// Install Service Worker dan simpan file ke Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Gunakan file dari Cache saat Offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Kembalikan dari cache
      }
      return fetch(event.request); // Ambil dari internet jika tidak ada di cache
    })
  );
});