import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8i-UzGQPNUk-9_KSdNQzHXvDKeTKp_Po",
  authDomain: "auth-example-2b30e.firebaseapp.com",
  projectId: "auth-example-2b30e",
  storageBucket: "auth-example-2b30e.firebasestorage.app",
  messagingSenderId: "832273307605",
  appId: "1:832273307605:web:93d8d7a7cebc37b2900f5c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
