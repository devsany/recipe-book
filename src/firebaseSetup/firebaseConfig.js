// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjnkR1ZvvSSVqiQIpdvu_q-9GQNtI4yyM",
  authDomain: "recipe-book-43eaf.firebaseapp.com",
  databaseURL:
    "https://recipe-book-43eaf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "recipe-book-43eaf",
  storageBucket: "recipe-book-43eaf.appspot.com",
  messagingSenderId: "1023569796936",
  appId: "1:1023569796936:web:4f34591f07de108ccd1d7d",
  measurementId: "G-M58L6K5F1X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
