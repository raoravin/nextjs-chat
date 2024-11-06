// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBnouRzv0gxppcCIX4XgPsI64ohl5dFtZI",
    authDomain: "nexjschat.firebaseapp.com",
    databaseURL: "https://nexjschat-default-rtdb.firebaseio.com",
    projectId: "nexjschat",
    storageBucket: "nexjschat.firebasestorage.app",
    messagingSenderId: "163500885636",
    appId: "1:163500885636:web:fa24acd63a5ac0f3f4a4d1",
    measurementId: "G-PW2X4M82XY"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };
