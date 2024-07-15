// sw.js file inside the public folder
// Note- 
// 1. Don't load every file from cache because we want only fresh data so to load cache data check before internet is available or not.
// 2. We can check which file is coming from cache and which are from server by checking in network if it shows serviceWorker then cache, 
// So to prevent this we use condition for this in fetch function below if(!navigator.onLine){ } 
// 3. For showing the fresh data when you are online when we fetch the data from api store that in localstorage and in offline mode show that data with alert of "you are in offline mode"

const CACHE_NAME = 'my-pwa-cache-v1';           // This is our cache name which is stored in cache
const urlsToCache = [                           // Below are the file urls which will reload the file when we are offline    
  '/',                                          // These urls are taken from inspect->network->all    
  '/index.html',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/vendors~main.chunk.js',           // We can also add our navitaion urls also to store thet file in cache like- "/dashboard"
  // Add any other assets you want to cache here
];

self.addEventListener('install', (event) => {           // This is predefined js function for service worker for cache the file in browser or to store the cache 
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('All files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache files during install', error);
      })
  );
});


self.addEventListener('fetch', (event) => {             // This used to get or fetch.  all these 3 functions are written mandatory 
    console.log('Fetch intercepted for:', event.request.url);
    if(!navigator.onLine){                              // Written a condition if no internet connect then show cache data else show from server
        event.respondWith(
            caches.match(event.request)
              .then((response) => {
                if (response) {
                  console.log('Serving from cache:', event.request.url);
                  return response;
                }
                console.log('Fetching from network:', event.request.url);
                return fetch(event.request);
              })
          );
    }
    
  });

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
