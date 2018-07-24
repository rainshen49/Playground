let cacheName = 'weatherPWA-step-6-1'
let dataCacheName = 'weatherData-v1'
const filesToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/styles/inline.css',
    '/images/clear.png',
    '/images/cloudy-scattered-showers.png',
    '/images/cloudy.png',
    '/images/fog.png',
    '/images/ic_add_white_24px.svg',
    '/images/ic_refresh_white_24px.svg',
    '/images/partly-cloudy.png',
    '/images/rain.png',
    '/images/scattered-showers.png',
    '/images/sleet.png',
    '/images/snow.png',
    '/images/thunderstorm.png',
    '/images/wind.png'
];

self.addEventListener('install', e => {
    console.log('service worker install')
    e.waitUntil(caches.open(cacheName).then(cache => {
        console.log('service worker caching app shell');
        return cache.addAll(filesToCache);
    }))
})

self.addEventListener('activate', e => {
    console.log('Service worker activated');
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('service worker removing old cache', key)
                    return caches.delete(key);
                }
            }))
        })
    )
    return self.clients.claim();
})

self.addEventListener('fetch', e => {
    // console.log('sw fetch')
    let dataUrl = 'https://query.yahooapis.com/v1/public/yql';
    if (e.request.url.indexOf(dataUrl) > -1) {
        // requesting weather dataCacheName
        e.respondWith(
            caches.open(dataCacheName).then(cache => {
                return fetch(e.request).then(response => {
                    cache.put(e.request.url, response.clone())
                    return response;
                })
            })
        )
    } else {
        // requesting app shell
        e.respondWith(caches.match(e.request).then(response => {
            return response || fetch(e.request);
        }))
    }
})