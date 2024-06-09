// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7y3NhG-SoKZWjqmqnu8agfy7jm_H1bT4",
    authDomain: "chatrix-e84fc.firebaseapp.com",
    projectId: "chatrix-e84fc",
    storageBucket: "chatrix-e84fc.appspot.com",
    messagingSenderId: "538052999469",
    appId: "1:538052999469:web:4705ef7012a2cd1278bba4",
    measurementId: "G-97R3SWH1H0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
