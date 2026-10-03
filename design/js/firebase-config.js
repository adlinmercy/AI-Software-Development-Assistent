// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";


// Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCvFj538mpbBbeLy5cQpGmzPzZrn69UrC0",
    authDomain: "devcore-ai-f1c64.firebaseapp.com",
    projectId: "devcore-ai-f1c64",
    storageBucket: "devcore-ai-f1c64.firebasestorage.app",
    messagingSenderId: "539994722571",
    appId: "1:539994722571:web:1c63aba75faadecd6fd20e",
    measurementId: "G-6RF67JDGNS"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Export Firebase app

export { app };