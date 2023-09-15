// Products API (offline-first)
if (request.url.includes('/endpoint')) {
    event.respondWith(
        caches.match(request).then(function (response) {

            // Otherwise, make a fresh API call
            return fetch(request).then(function (response) {

                // Cache for offline access
                let copy = response.clone();
                event.waitUntil(caches.open('app').then(function (cache) {
                    return cache.put(request, copy);
                }));

                // Return the requested file
                return response;

            });

        })
    );
}