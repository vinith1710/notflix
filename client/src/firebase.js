import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwMndfTpRVy9N8oV2q_xqgTs4YlZVEBJo",
  authDomain: "notflix-c27b5.firebaseapp.com",
  projectId: "notflix-c27b5",
  storageBucket: "notflix-c27b5.appspot.com",
  messagingSenderId: "558431893405",
  appId: "1:558431893405:web:32e5d64b664700e3b96174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export default app;