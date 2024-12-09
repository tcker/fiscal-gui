// src/firebase.js (Updated for Firebase v9+)
import { initializeApp } from 'firebase/app'; // Modular import for Firebase
import { getAuth } from 'firebase/auth'; // Modular import for Authentication

const firebaseConfig = {
  apiKey: "AIzaSyDnBYIpQ8PyIQ787wTBYD1xy9FSo31VNSU",
  authDomain: "test-java-fiscal.firebaseapp.com",
  databaseURL: "https://test-java-fiscal-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-java-fiscal",
  storageBucket: "test-java-fiscal.firebasestorage.app",
  messagingSenderId: "996027067041",
  appId: "1:996027067041:web:dddd73ba9a1e1dbfb91ee0",
  measurementId: "G-QE50XLGR51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth }; // Export the auth instance for use in other components
