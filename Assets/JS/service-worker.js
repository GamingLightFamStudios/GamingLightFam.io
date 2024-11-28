// Define cache name and files to cache
const CACHE_NAME = 'my-site-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '../../../index.html',
  '../../../Games.html', // Add other pages to cache
  '../../../Blog.html',
  '../../../About Us.html',
  '../../../Pages/Contact.html',
  '../../../Pages/FAQ.html',
  '../../../Pages/Privacy Policy.html',
  '../../../Pages/Terms of Use.html',
  '../../../Games/Roblox/View Games/Murder Mystery X.html',
  '../../../Games/Roblox/View Games/PrisonBreak Life'
];

// Install event - caching necessary files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve cached content or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached content or fetch from the network
        return response || fetch(event.request);
      })
      .catch(() => {
        // If the fetch fails (offline), show the cached index.html
        return caches.match('/index.html');
      })
  );
});
