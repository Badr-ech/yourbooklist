// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHeegNk_omjNiEgC2qArnk0sg2oK9vlVI",
  authDomain: "yourbooklist.firebaseapp.com",
  projectId: "yourbooklist",
  storageBucket: "yourbooklist.appspot.com",
  messagingSenderId: "346940629232",
  appId: "1:346940629232:web:0be603523d07c0bffea235",
};

// Initialize Firebase for SSR
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
