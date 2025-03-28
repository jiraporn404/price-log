// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-wNRyORpCFyOytMIstZkXPgKEoj-ssK4",
  authDomain: "price-log-1d137.firebaseapp.com",
  projectId: "price-log-1d137",
  storageBucket: "price-log-1d137.firebasestorage.app",
  messagingSenderId: "972377732541",
  appId: "1:972377732541:web:fffc6613cd3212d14eced4",
  measurementId: "G-2DRZT3T40H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
