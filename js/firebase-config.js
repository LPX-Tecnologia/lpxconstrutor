const firebaseConfig={apiKey:"AIzaSyB_HKuYMVnBn_rhKfvazjs-7SCmb9NOrDQ",authDomain:"construtorlpx.firebaseapp.com",projectId:"construtorlpx",storageBucket:"construtorlpx.firebasestorage.app",messagingSenderId:"247671839031",appId:"1:247671839031:web:1a4ecfdd28c02b802fa2b2",measurementId:"G-3J4XN3K2PG"};
firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const db=firebase.firestore();
db.settings({cacheSizeBytes:firebase.firestore.CACHE_SIZE_UNLIMITED});
db.enablePersistence().then(()=>console.log('🔥 Offline ativado')).catch(err=>console.warn('⚠️',err));
console.log('✅ Firebase configurado');
