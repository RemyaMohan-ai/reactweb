// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mernauth-e103c.firebaseapp.com",
  projectId: "mernauth-e103c",
  storageBucket: "mernauth-e103c.firebasestorage.app",
  messagingSenderId: "172020986305",
  appId: "1:172020986305:web:6ad5ba7d38a50dbd72bf40"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);