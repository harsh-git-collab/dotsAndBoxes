// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2b7qhMnKuatBsmwo499YSf5tjnUlXlzk",
  authDomain: "dots-and-boxes-dcfde.firebaseapp.com",
  databaseURL: "https://dots-and-boxes-dcfde-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dots-and-boxes-dcfde",
  storageBucket: "dots-and-boxes-dcfde.firebasestorage.app",
  messagingSenderId: "281413174741",
  appId: "1:281413174741:web:078dc6d72091390e9ca95c",
  measurementId: "G-2EXRYFJ2QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {db};