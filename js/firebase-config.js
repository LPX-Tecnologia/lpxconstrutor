// js/firebase-config.js - CORRIGIDO PARA OFFLINE

const firebaseConfig = {
    apiKey: "AIzaSyB_HKuYMVnBn_rhKfvazjs-7SCmb9NOrDQ",
    authDomain: "construtorlpx.firebaseapp.com",
    projectId: "construtorlpx",
    storageBucket: "construtorlpx.firebasestorage.app",
    messagingSenderId: "247671839031",
    appId: "1:247671839031:web:1a4ecfdd28c02b802fa2b2",
    measurementId: "G-3J4XN3K2PG"
};

// Inicializa Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Configuração para funcionar OFFLINE e ONLINE
db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    merge: true
});

// Habilita persistência offline
db.enablePersistence({ synchronizeTabs: true })
    .then(function() {
        console.log('🔥 Modo offline ATIVADO');
    })
    .catch(function(err) {
        if (err.code === 'failed-precondition') {
            console.warn('⚠️ Múltiplas abas abertas - offline limitado');
        } else if (err.code === 'unimplemented') {
            console.warn('⚠️ Navegador não suporta offline');
        }
    });

// Verifica conexão
window.addEventListener('online', function() {
    console.log('🌐 ONLINE - reconectando ao Firestore');
    db.enableNetwork().then(function() {
        console.log('✅ Reconectado ao Firestore');
    });
});

window.addEventListener('offline', function() {
    console.log('📴 OFFLINE - usando cache local');
});

console.log('✅ Firebase configurado - v2.0.4');
