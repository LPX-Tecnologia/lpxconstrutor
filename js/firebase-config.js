// js/firebase-config.js - v2.1.9
const firebaseConfig = {
    apiKey: "AIzaSyB_HKuYMVnBn_rhKfvazjs-7SCmb9NOrDQ",
    authDomain: "construtorlpx.firebaseapp.com",
    projectId: "construtorlpx",
    storageBucket: "construtorlpx.firebasestorage.app",
    messagingSenderId: "247671839031",
    appId: "1:247671839031:web:1a4ecfdd28c02b802fa2b2",
    measurementId: "G-3J4XN3K2PG"
};

// Inicializa Firebase UMA ÚNICA VEZ
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Configuração offline
db.enablePersistence({ synchronizeTabs: true })
    .then(function() {
        console.log('🔥 Modo offline ATIVADO');
    })
    .catch(function(err) {
        console.warn('⚠️ Offline:', err.code);
    });

console.log('✅ Firebase configurado - v2.1.9');
