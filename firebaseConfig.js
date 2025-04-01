// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "messenger-5c1b5.firebaseapp.com",
  projectId: "messenger-5c1b5",
  storageBucket: "messenger-5c1b5.firebasestorage.app",
  messagingSenderId: "158213916044",
  appId: "1:158213916044:web:f83eb2e3bd3f708b7e82a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);