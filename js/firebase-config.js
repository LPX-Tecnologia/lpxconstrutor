// js/firebase-config.js - CORRIGIDO
const firebaseConfig = {
    apiKey: "AIzaSyB_HKuYMVnBn_rhKfvazjs-7SCmb9NOrDQ",
    authDomain: "construtorlpx.firebaseapp.com",
    projectId: "construtorlpx",
    storageBucket: "construtorlpx.firebasestorage.app",
    messagingSenderId: "247671839031",
    appId: "1:247671839031:web:1a4ecfdd28c02b802fa2b2",
    measurementId: "G-3J4XN3K2PG"
};

// Verifica se já foi inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Configuração offline
db.enablePersistence()
    .then(() => console.log('🔥 Modo offline ativado'))
    .catch(err => console.warn('⚠️ Erro offline:', err));

console.log('✅ Firebase configurado - v2.0.3');
