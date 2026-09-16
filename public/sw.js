/**
 * LibLearn service worker.
 *
 * Written by hand rather than generated, because the caching rules here are
 * driven by how the app is actually used: students on intermittent Liberian
 * mobile connections, often returning to a lesson they have already opened.
 *
 * Strategy by request type:
 *   - navigations  → network-first, falling back to the cached app shell, so a
 *                    student who goes offline mid-session still gets the app
 *                    rather than the browser's error page.
 *   - /assets/*    → cache-first. Vite content-hashes these, so a given URL is
 *                    immutable and can be served from cache indefinitely.
 *   - icons, manifest → cache-first.
 *   - everything else (including /api/*) → straight to the network. Tutor
 *                    replies and auth must never be served stale.
 */
const VERSION = 'liblearn-v1';
const SHELL = `${VERSION}-shell`;
const ASSETS = `${VERSION}-assets`;
const SHELL_URL = '/index.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll([SHELL_URL, '/manifest.webmanifest', '/icon-192.png']))
      // A failed precache must not block activation - the runtime handlers
      // below will populate the cache on first successful fetch instead.
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

const isAsset = (url) =>
  url.pathname.startsWith('/assets/') ||
  url.pathname.endsWith('.png') ||
  url.pathname.endsWith('.webmanifest');

self.addEventListener('fetch', (event) => {
  const {request} = event;

  // Never interfere with anything but same-origin GETs.
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // API traffic is always live.
  if (url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL).then((c) => c.put(SHELL_URL, copy)).catch(() => undefined);
          return response;
        })
        .catch(() =>
          caches
            .match(SHELL_URL)
            .then(
              (cached) =>
                cached ??
                new Response(
                  '<!doctype html><meta charset="utf-8"><title>Offline</title>' +
                    '<body style="font-family:system-ui;padding:2rem">' +
                    '<h1>You are offline</h1>' +
                    '<p>Reconnect to load LibLearn. Work you have already saved is still on this device.</p>',
                  {headers: {'Content-Type': 'text/html'}, status: 503},
                ),
            ),
        ),
    );
    return;
  }

  if (isAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(ASSETS).then((c) => c.put(request, copy)).catch(() => undefined);
            }
            return response;
          }),
      ),
    );
  }
});
