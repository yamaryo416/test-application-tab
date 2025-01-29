// キャッシュの名前を定義
const CACHE_NAME = "json-cache-v1";
const STATIC_CACHE_NAME = "static-cache-v1";
const STATIC_ASSETS = ["./", "./index.html", "./styles.css", "./index.js"];
let posts = [];
let currentIndex = 0;

// Service Workerのインストール時の処理
self.addEventListener("install", (event) => {
  console.log("Service Workerをインストール中...");
  event.waitUntil(
    Promise.all([
      // 静的アセットのキャッシュ
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log("静的ファイルをキャッシュ中...");
        return cache.addAll(STATIC_ASSETS);
      }),
      // JSONデータ用のキャッシュを作成
      caches.open(CACHE_NAME),
      self.skipWaiting(),
    ])
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュが存在する場合はそれを返す
      if (response) {
        return response;
      }
      // キャッシュが存在しない場合はネットワークリクエストを行う
      return fetch(event.request).then((response) => {
        // レスポンスが有効でない場合は、そのまま返す
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        // レスポンスをクローンしてキャッシュに保存
        const responseToCache = response.clone();
        caches.open(STATIC_CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
