// Service Worker 範例：用於 PWA 離線緩存
// 在 Canvas 環境中，我們依賴瀏覽器處理 PWA，此檔案僅為註冊所需。

const CACHE_NAME = 'household-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // 由於檔案為單一 HTML，其他資源已經內嵌，只需緩存 HTML
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});