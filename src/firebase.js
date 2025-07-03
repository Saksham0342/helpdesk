// Replace with your actual config from Firebase console
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsaG9I_igY9MaB7C5LlWqIFlrMl8WzS2U",
  authDomain: "helpdesk-6ca3f.firebaseapp.com",
  projectId: "helpdesk-6ca3f",
  storageBucket: "helpdesk-6ca3f.firebasestorage.app",
  messagingSenderId: "1027932912511",
  appId: "1:1027932912511:web:ef27b9e771430fc6e5384a",
  measurementId: "G-7Q5JFZ1B28"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
