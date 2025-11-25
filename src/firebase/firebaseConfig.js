// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
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

// Initialize Firebase with performance optimizations
const app = initializeApp(firebaseConfig);

// Initialize services immediately since lazy loading is causing issues
const auth = getAuth(app);
const database = getDatabase(app);
const fireDB = getFirestore(app);

// Export instances
export { 
  app, 
  auth, 
  database, 
  fireDB
};