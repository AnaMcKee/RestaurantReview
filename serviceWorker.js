// source of information:
//https://googlechrome.github.io/samples/service-worker/basic/
const precache = 'restaurant-static-v1';

// list of local resources we always want to be cached
const precacheURLS = [
	'./', //Alias for index.html
	'./index.html',
	'./restaurant.html',
	'./css/styles.css',
	'./data/restaurants.json',
	'./js/dbhelper.js',
	'./js/main.js',
	'./js/restaurant_info.js',
	'./js/serviceWorkerReg.js',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/3.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg'
];

// install handler takes care of precaching asets we always need
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(precache).then(cache => {
			return cache.addAll(precacheURLS);
		})
	);
});

// activate handler takes care of cleaning up old caches
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
				cacheNames.filter(cacheName => {
					return cacheName.startsWith('restaurant-') &&
							cacheName != precache;
				}).map(cacheName => {
					return caches.delete(cacheName);
				})
			);
		})
	);
})

// fetch event
// credit: https://developers.google.com/web/fundamentals/primers/service-workers/#cache_and_return_requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

