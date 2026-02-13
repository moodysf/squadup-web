import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPUkm2D0ozAOsPjBPF-BdP_MvYwQ7GiM4",
  authDomain: "squadup-b3f7b.firebaseapp.com",
  projectId: "squadup-b3f7b",
  storageBucket: "squadup-b3f7b.firebasestorage.app",
  messagingSenderId: "953197896218",
  appId: "1:953197896218:web:3e3e5694ee7fa3255267a3",
  measurementId: "G-KT6GV6YY18",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
