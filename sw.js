self.addEventListener('install', (e) => {
    // Skip waiting to force this new SW to become active immediately
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                return caches.delete(key);
            }));
        }).then(() => {
            self.clients.claim();
            // Unregister the service worker itself
            self.registration.unregister().then(() => {
                console.log('Service Worker unregistered successfully.');
            });
        })
    );
});

self.addEventListener('fetch', (e) => {
    // Just fetch from network normally
    e.respondWith(fetch(e.request).catch(() => new Response('Network Error', { status: 408 })));
});
