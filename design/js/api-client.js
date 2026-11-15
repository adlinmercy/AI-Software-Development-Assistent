
/*
=========================================================
DEVCORE AI - SHARED API CLIENT
Handles authenticated communication with FastAPI.
=========================================================
*/

import { getFirebaseIdToken } from "./auth-guard.js";

// Backend URL
const API_BASE_URL = "http://127.0.0.1:8000";

// =====================================================
// AUTHENTICATED API REQUEST
// =====================================================

export async function apiRequest(endpoint, options = {}) {

    // Get Firebase ID token of the logged-in user.
    const token = await getFirebaseIdToken();

    // Prepare request headers.
    const headers = new Headers(options.headers || {});

    // Attach Firebase authentication token.
    headers.set("Authorization", `Bearer ${token}`);

    // Send request to FastAPI.
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    return response;
}
