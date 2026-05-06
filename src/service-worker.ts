/* eslint-disable @typescript-eslint/no-explicit-any */
const CACHE_NAME = 'sw-cache-v1';
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js'
];

(self as any).addEventListener('install', (event: any) => {
    (event as any).waitUntil(
        caches.open(CACHE_NAME).then((cache: any) => cache.addAll(STATIC_FILES))
    );
});

(self as any).addEventListener('activate', (event: any) => {
    (event as any).waitUntil(
        caches.keys().then((keyList: string[]) =>
            Promise.all(
                keyList.map((key: string) =>
                    key === CACHE_NAME ? Promise.resolve(null) : caches.delete(key)
                )
            )
        )
    );
});

(self as any).addEventListener('fetch', (event: any) => {
    const req = (event as any).request;
    const url = req.url;

    (event as any).respondWith(
        ((): Promise<any> => {
            if (url.endsWith('.css') || url.endsWith('.js')) {
                // Cache-First for CSS/JS
                return caches.match(req).then((cached: any) => {
                    if (cached) return cached;
                    return fetch(req).then((netResp: any) => {
                        const clone = netResp.clone();
                        caches.open(CACHE_NAME).then((cache: any) => cache.put(req, clone));
                        return netResp;
                    });
                });
            } else if (url.includes('/api/')) {
                // Network-First for API
                return fetch(req).then((netResp: any) => {
                    if (netResp.ok) {
                        const clone = netResp.clone();
                        caches.open(CACHE_NAME).then((cache: any) => cache.put(req, clone));
                    }
                    return netResp;
                }).catch(() => caches.match(req));
            } else {
                // Network-First with offline fallback for pages
                return fetch(req).catch(() => caches.match('/index.html'));
            }
        })()
    );
});