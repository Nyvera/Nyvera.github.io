const CACHE_NAME = "prisimai-cache-v4";

// Core files + offline fallback
const ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",

  // PWA icons
  "/icons/icon-192.png",
  "/icons/icon-512.png",

  // Apple & favicons
  "/apple-touch-icon.png",
  "/favicon-32x32.png",
  "/favicon-16x16.png",

  // External dependencies
  "https://cdn.tailwindcss.com",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch event with offline fallback
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Pollinations API → network first
  if (url.hostname.includes("pollinations.ai")) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Everything else → cache first, then network, then offline.html
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => caches.match("/offline.html"))
      );
    })
  );
});
