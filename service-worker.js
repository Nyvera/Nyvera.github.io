const CACHE_NAME = 'echoai-cache-v1';
const urlsToCache = [
  '/EchoAI',
  '/EchoAI/index.html',
  '/EchoAI/favicon.ico',
  '/EchoAI/EchoAI/style.css',
  '/EchoAI/script.js',
  '/EchoAI/manifest.json',
  '/EchoAI/favicon.ico'
];

// Install service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch resources from the cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request); // Fallback to network if not cached
      })
  );
});

// Clear old caches on activate
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
