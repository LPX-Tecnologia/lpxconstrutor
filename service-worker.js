const CACHE_NAME = 'lpxconstrutor-v3';

const urlsToCache = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/auth.js',
    './js/database.js',
    './js/firebase-config.js',
    './js/mapa.js',
    './js/chat.js',
    './js/notifications.js',
    './imagem/logo-lpxconstrutor.png'
];

// Instala
self.addEventListener('install', function(event) {
    console.log('🔧 Service Worker instalando...');
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache).catch(function(err) {
                console.log('⚠️ Cache parcial:', err);
            });
        })
    );
});

// Busca - NÃO interceptar Firebase/Google APIs
self.addEventListener('fetch', function(event) {
    const url = event.request.url;
    
    // NÃO interceptar requisições do Firebase ou Google APIs
    if (url.includes('firestore.googleapis.com') || 
        url.includes('googleapis.com') ||
        url.includes('gstatic.com') ||
        url.includes('firebase')) {
        return; // Deixa passar direto
    }
    
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).then(function(response) {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                var responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });
                return response;
            }).catch(function() {
                return caches.match('./index.html');
            });
        })
    );
});

// Ativa
self.addEventListener('activate', function(event) {
    console.log('✅ Service Worker ativado');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
