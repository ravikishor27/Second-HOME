// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY_ID,
  authDomain: "mern-yourhome.firebaseapp.com",
  projectId: "mern-yourhome",
  storageBucket: "mern-yourhome.firebasestorage.app",
  messagingSenderId: "681636069298",
  appId: "1:681636069298:web:6015de949ad274a4276eab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);