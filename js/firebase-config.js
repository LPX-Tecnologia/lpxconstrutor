// ==========================================================
// ===== CONFIGURAÇÃO DO FIREBASE =====
// ==========================================================

const firebaseConfig = {
    apiKey: "AIzaSyB_HKuYMVnBn_rhKfvazjs-7SCmb9NOrDQ",
    authDomain: "construtorlpx.firebaseapp.com",
    projectId: "construtorlpx",
    storageBucket: "construtorlpx.firebasestorage.app",
    messagingSenderId: "247671839031",
    appId: "1:247671839031:web:1a4ecfdd28c02b802fa2b2"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Serviços globais
const auth = firebase.auth();
const db = firebase.firestore();

// Configurações do Firestore
db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    merge: true
});

// Habilita persistência offline
db.enablePersistence({ synchronizeTabs: true })
    .then(() => console.log('🔥 Firestore offline ativado'))
    .catch(err => console.warn('⚠️ Erro offline:', err));

// Configura idioma da autenticação
auth.useDeviceLanguage();

console.log('✅ Firebase configurado com sucesso');
