const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = '../Offline.html'; // Path to your offline page
const FILES_TO_CACHE = [
    '/',
    '../../..index.html',
    '../../../Offline.html',
    '../../../Games.html',
    "../../../About Us.html",
    "../../../Blog.html" // Add the path to all pages you want available offline
];

// Install the service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch requests and serve cached content if offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((response) => {
                return response || caches.match(OFFLINE_URL);
            });
        })
    );
});
