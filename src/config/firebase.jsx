// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBLCefcNM5oWrjLKQJHdxfo12sS0TMv-aU",
  authDomain: "innohacks-41ada.firebaseapp.com",
  projectId: "innohacks-41ada",
  storageBucket: "innohacks-41ada.appspot.com",
  messagingSenderId: "380048047825",
  appId: "1:380048047825:web:a61e80055d899e05748ff0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
export const db = getFirestore(app);
