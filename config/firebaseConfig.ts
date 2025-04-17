import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "aicoursegenerator-cf2ab.firebaseapp.com",
  projectId: "aicoursegenerator-cf2ab",
  storageBucket: "aicoursegenerator-cf2ab.appspot.com",
  messagingSenderId: "1023670729871",
  appId: "1:1023670729871:web:ca57d65506b4ba73d984fa",
  measurementId: "G-48GCYLJ0H3",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getFirestore(app);

export { auth };
