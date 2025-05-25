// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, onSnapshot, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAigm4R9KA3xeQEYawCdg9rvK0i-8GqeSQ",
  authDomain: "picknbuyorders.firebaseapp.com",
  projectId: "picknbuyorders",
  storageBucket: "picknbuyorders.firebasestorage.app",
  messagingSenderId: "405248122143",
  appId: "1:405248122143:web:e3d1e42f6188e660e0242a",
  measurementId: "G-1QVRWE2JNT"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, collection, addDoc, getDocs, query, onSnapshot, updateDoc, doc };
