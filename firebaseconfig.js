// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB950RP-bPZwuLVbQ9jVGvmQZn1voo9YM",
  authDomain: "learn-flow-8c735.firebaseapp.com",
  projectId: "learn-flow-8c735",
  storageBucket: "learn-flow-8c735.firebasestorage.app",
  messagingSenderId: "762899444635",
  appId: "1:762899444635:web:b0ba8833878aafccf7673e",
  measurementId: "G-SRKE1J35DP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
