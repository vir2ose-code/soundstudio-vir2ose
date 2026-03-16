const CACHE_NAME = 'vir2ose-app-cache-v67';
const urlsToCache = [
    './',
    './index.html',
    './fonts/fonts.css',
    './about.html',
    './portfolio.html',
    './services.html',
    './contact.html',
    './offline.html',
    './style.css',
    './script.js',
    './icon-192.png',
    './icon-512.png',
    './smartphone-app/index.html',
    './smartphone-app/style.css',
    './smartphone-app/app.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // We only want to handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).catch(() => {
                    // Fetch failed (network error). If HTML navigation, return offline page
                    if (event.request.mode === 'navigate' ||
                        (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
                        return caches.match('./offline.html');
                    }
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Clearing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
