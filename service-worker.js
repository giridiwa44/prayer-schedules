const CACHE_NAME = "pwa-cache-v1";
const ASSETS = [
  "/", 
  "/dist/output.css", 
  "/app.js"
];

// Install: cache asset dasar
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate: bersihkan cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch dengan stale-while-revalidate
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // 👉 skip kalau bukan GET atau bukan http/https
  if (req.method !== "GET" || !req.url.startsWith("http")) {
    return;
  }

  // Kalau navigasi (HTML), pakai network first biar gak ke-lock
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/"))
    );
    return;
  }

  // Untuk asset (CSS, JS, image, API) → SWR
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(req);
      const fetchPromise = fetch(req).then((networkResponse) => {
        // Kalau sukses fetch → update cache
        if (networkResponse && networkResponse.status === 200) {
          cache.put(req, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => null);

      // Kembalikan cache kalau ada, sambil update di background
      return cached || fetchPromise;
    })
  );
});
