// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD919giFLv4XR00k_p10-_UFPyjhhdcZCs",
  authDomain: "ninja-firebase-tut-ff31b.firebaseapp.com",
  projectId: "ninja-firebase-tut-ff31b",
  storageBucket: "ninja-firebase-tut-ff31b.firebasestorage.app",
  messagingSenderId: "947281992424",
  appId: "1:947281992424:web:2352ef3f4894c4458b875d",
  measurementId: "G-WY7CF8LZ7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {db};