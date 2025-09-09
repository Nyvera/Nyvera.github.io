const CACHE_NAME = "prisimai-cache-v4";

// Core files + offline fallback
const ASSETS = [
  "/",
  "https://prisimai.github.io/PrisimAI/index.html",
  "https://prisimai.github.io/PrisimAI/offline.html",
  "https://prisimai.github.io/PrisimAI/manifest.json",

  // PWA icons
  "https://prisimai.github.io/PrisimAI/icons/icon-192.png",
  "https://prisimai.github.io/PrisimAI/icons/icon-512.png",

  // Apple & favicons
  "https://prisimai.github.io/PrisimAI/apple-touch-icon.png",
  "https://prisimai.github.io/PrisimAI/favicon-32x32.png",
  "https://prisimai.github.io/PrisimAI/favicon-16x16.png",

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
