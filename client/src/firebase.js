// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB6sw_s6A6JFKj780lZA1J5pxgXn2JvaAE",
    authDomain: "sharath-travels-d4c8a.firebaseapp.com",
    projectId: "sharath-travels-d4c8a",
    storageBucket: "sharath-travels-d4c8a.firebasestorage.app",
    messagingSenderId: "749785886639",
    appId: "1:749785886639:web:13bbdd50da8f333a1d095a",
    measurementId: "G-CJ8W4ME41X"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
