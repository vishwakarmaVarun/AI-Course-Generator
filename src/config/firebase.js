// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cognita---ai-couse-generator.firebaseapp.com",
  projectId: "cognita---ai-couse-generator",
  storageBucket: "cognita---ai-couse-generator.appspot.com",
  messagingSenderId: "544260521672",
  appId: "1:544260521672:web:fb7b43f185ab4237812ffd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
