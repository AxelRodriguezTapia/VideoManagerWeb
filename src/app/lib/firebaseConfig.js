// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4VYGXFbVPPVRgAZeIJKMeEn9XTMsS8I4",
  authDomain: "videolistapp-ddf29.firebaseapp.com",
  projectId: "videolistapp-ddf29",
  storageBucket: "videolistapp-ddf29.firebasestorage.app",
  messagingSenderId: "182081917708",
  appId: "1:182081917708:web:56ed93e99e732f256eaf29"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth, Firestore y Storage
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };