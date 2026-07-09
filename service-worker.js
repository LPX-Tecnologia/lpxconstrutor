const CACHE_NAME = 'lpxconstrutor-v2';

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
    './imagem/logo-lpxconstrutor.png',
    './manifest.json',
    './termos.html',
    './privacidade.html'
];

// Instala o Service Worker
self.addEventListener('install', function(event) {
    console.log('🔧 Service Worker instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('📦 Cache aberto');
            return cache.addAll(urlsToCache).catch(function(error) {
                console.log('⚠️ Erro ao adicionar ao cache:', error);
            });
        })
    );
});

// Busca do cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request).then(function(response) {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                var responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });
                return response;
            }).catch(function() {
                // Se offline, retorna a página inicial
                return caches.match('./index.html');
            });
        })
    );
});

// Atualiza cache
self.addEventListener('activate', function(event) {
    console.log('✅ Service Worker ativado');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Removendo cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
