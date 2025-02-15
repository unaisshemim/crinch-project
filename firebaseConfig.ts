import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpUqJgXXgnJ6bxnw6fQJsR8I8E6YG7e2I",
  authDomain: "valentine-hackathon.firebaseapp.com",
  projectId: "valentine-hackathon",
  storageBucket: "valentine-hackathon.appspot.com",
  messagingSenderId: "530257849153",
  appId: "1:530257849153:web:5f65ed3bc846e7b8a4cfc0",
  measurementId: "G-5BFN01MEWB",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
