// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUaf9LwOCmY85pop-U06EhHIZ_vp3IcpE",
  authDomain: "react-todo-with-firebase-rtdb.firebaseapp.com",
  projectId: "react-todo-with-firebase-rtdb",
  storageBucket: "react-todo-with-firebase-rtdb.firebasestorage.app",
  messagingSenderId: "1051721084126",
  appId: "1:1051721084126:web:b27112f84c7804a326e64f",
  measurementId: "G-Q39Q6050D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
