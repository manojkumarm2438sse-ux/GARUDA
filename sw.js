// GARUDA Life & Career Operating System - Service Worker
const CACHE_NAME = 'garuda-v1.0.0';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/modules.css',
  './css/responsive.css',
  './js/app.js',
  './js/auth.js',
  './js/auth-views.js',
  './js/store.js',
  './js/ai-mentor.js',
  './js/schedule.js',
  './js/onboarding.js',
  './js/modules/upsc.js',
  './js/modules/army.js',
  './js/modules/ssb.js',
  './js/modules/fitness.js',
  './js/modules/it-career.js',
  './js/modules/govt-jobs.js',
  './js/modules/reports.js',
  './js/data/syllabus-data.js',
  './js/data/defence-data.js',
  './js/data/ssb-data.js',
  './js/data/fitness-data.js',
  './js/data/it-data.js',
  './js/data/jobs-data.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/garuda_icon.jpg',
  './assets/images/hero_banner.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[GARUDA SW] Pre-caching offline assets');
      return Promise.allSettled(
        STATIC_ASSETS.map((url) => cache.add(url).catch((err) => console.warn('[GARUDA SW] Pre-cache skip:', url, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[GARUDA SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Stale-while-revalidate for local assets; fallback to cache if offline
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.log('[GARUDA SW] Offline fetch fallback:', event.request.url);
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
