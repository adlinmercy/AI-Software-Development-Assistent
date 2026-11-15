
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import { app } from "./firebase-config.js";

const auth = getAuth(app);

export async function getFirebaseIdToken() {
    // Wait until Firebase restores the login session.
    await auth.authStateReady();

    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    return await user.getIdToken();
}
