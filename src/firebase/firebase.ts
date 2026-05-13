import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Analytics only in production and if measurementId is provided
let analytics;
if (typeof window !== 'undefined' && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
  analytics = getAnalytics(app);
}

export { analytics };
