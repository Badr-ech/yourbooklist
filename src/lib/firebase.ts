// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "yourbooklist.firebaseapp.com",
  projectId: "yourbooklist",
  storageBucket: "yourbooklist.firebasestorage.app",
  messagingSenderId: "346940629232",
  appId: "1:346940629232:web:0be603523d07c0bffea235",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
