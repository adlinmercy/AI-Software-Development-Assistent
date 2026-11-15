
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

export const auth = getAuth(app);

// ==========================================
// Get Firebase ID Token
// ==========================================

export async function getFirebaseIdToken() {

    // Wait until Firebase determines the authentication state.
    if (!auth.currentUser) {
        await new Promise((resolve) => {

            const unsubscribe = onAuthStateChanged(
                auth,
                () => {
                    unsubscribe();
                    resolve();
                }
            );

        });
    }

    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    // Return a Firebase ID token for backend verification.
    return await user.getIdToken();
}

// ==========================================
// Protect Page
// ==========================================

onAuthStateChanged(auth, function (user) {

    if (!user) {
        window.location.href = "login.html";
    }

});
