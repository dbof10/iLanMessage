import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAH2VeXnL_kcYA2QJf3hiXVpYZmLkj84Oo",
    authDomain: "machine-share.firebaseapp.com",
    databaseURL: "https://machine-share-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "machine-share",
    storageBucket: "machine-share.firebasestorage.app",
    messagingSenderId: "382462272631",
    appId: "1:382462272631:web:d8b5de9bb4110d12f1d272",
    measurementId: "G-X4X22G8Q9Y"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);
