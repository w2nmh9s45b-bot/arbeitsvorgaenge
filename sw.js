/* Service Worker AV-App – Netz-zuerst für index.html (Updates kommen sofort an,
   kein Cache-Versions-Bump nötig), Cache-zuerst für statische Assets. */
const CACHE = "av-app-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const isPage = req.mode === "navigate" || new URL(req.url).pathname.endsWith("/index.html");
  if (isPage) {
    // Netz zuerst, bei Offline aus dem Cache
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => { c.put("./index.html", copy); });
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
  } else {
    // Cache zuerst, sonst Netz (und nachcachen)
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => { c.put(req, copy); });
            return res;
          })
      )
    );
  }
});
