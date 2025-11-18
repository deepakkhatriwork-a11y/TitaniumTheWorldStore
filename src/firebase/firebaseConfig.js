// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyNwgQ730H3AzsKy-cfwfK4d0J1iyAtEw",
  authDomain: "titaniumtheworldstore-58259.firebaseapp.com",
  databaseURL: "https://titaniumtheworldstore-58259-default-rtdb.firebaseio.com",
  projectId: "titaniumtheworldstore-58259",
  storageBucket: "titaniumtheworldstore-58259.firebasestorage.app",
  messagingSenderId: "588377964142",
  appId: "1:588377964142:web:7f8000d6c08d866680b07f",
  measurementId: "G-LWZ1L35124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const fireDB = getFirestore(app);
const db = fireDB; // Alias for compatibility

export { app, analytics, auth, database, fireDB, db };

