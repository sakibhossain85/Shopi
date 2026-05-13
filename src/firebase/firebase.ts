import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDDRYexOwQ3-vGLA0JY5GWzrUMUiRoY01Q",
  authDomain: "shopi-49083.firebaseapp.com",
  projectId: "shopi-49083",
  storageBucket: "shopi-49083.firebasestorage.app",
  messagingSenderId: "846145014915",
  appId: "1:846145014915:web:fd65dc8011c676454cdfb6",
  measurementId: "G-6ND05NWR2K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Safe analytics (no crash in Vite/Vercel)
export let analytics = null;

isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});