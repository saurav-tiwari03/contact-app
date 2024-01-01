// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu2TdM_xfQ5umNdXXCCAA5XtF8bdUXf-g",
  authDomain: "contact-vite-be6e0.firebaseapp.com",
  projectId: "contact-vite-be6e0",
  storageBucket: "contact-vite-be6e0.appspot.com",
  messagingSenderId: "661775590508",
  appId: "1:661775590508:web:eca67def6ce065c1fba449"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);