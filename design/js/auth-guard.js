// ==========================================
// DevCore AI - Authentication Guard
// ==========================================

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import { app } from "./firebase-config.js";


// ==========================================
// Firebase Authentication
// ==========================================

const auth = getAuth(app);


// ==========================================
// Protect Page
// ==========================================

onAuthStateChanged(auth, function (user) {

    if (!user) {

        // User is NOT logged in
        window.location.href = "login.html";

    }

});