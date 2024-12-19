// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_LQL4n0uboWZcEPxmDeiSpgTqcMhByx0",
  authDomain: "authentication-adb00.firebaseapp.com",
  projectId: "authentication-adb00",
  storageBucket: "authentication-adb00.firebasestorage.app",
  messagingSenderId: "611913366223",
  appId: "1:611913366223:web:d3c2ba1217a35a32ded5ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const auth = getAuth();
export const db=getFirestore(app);
export default app;