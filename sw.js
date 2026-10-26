/* Alhamd POS service worker — lets the app install on a phone and open offline.
   Only the app's own files are cached. Firebase / cloud data requests are never touched. */
const CACHE = 'alhamd-pos-v2';
const FILES = [
  './', './index.html', './style.css', './admin.css',
  './script.js', './inventory.js', './delete-pin.js', './reset-ledger.js', './mobile-menu.js', './pwa.js',
  './manifest.json', './img/icon-192.png', './img/icon-512.png', './img/logo.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(
    FILES.map(f => c.add(f).catch(() => {}))
  )).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* network first (so updates always show), cache as the offline fallback */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
