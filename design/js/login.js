// ==========================================
// DevCore AI - Firebase Login
// ==========================================

import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import { app } from "./firebase-config.js";


// ==========================================
// Firebase Authentication
// ==========================================

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


// ==========================================
// DOM Elements
// ==========================================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const rememberMe = document.getElementById("rememberMe");

const passwordToggle = document.getElementById("passwordToggle");

const forgotPassword = document.getElementById("forgotPassword");

const googleButton = document.getElementById("googleButton");

const loginButton = document.getElementById("loginButton");

const loginButtonText = document.getElementById("loginButtonText");

const statusMessage = document.getElementById("statusMessage");

const emailError = document.getElementById("emailError");

const passwordError = document.getElementById("passwordError");


// ==========================================
// Safety Check
// ==========================================

if (
    !loginForm ||
    !emailInput ||
    !passwordInput ||
    !rememberMe ||
    !passwordToggle ||
    !forgotPassword ||
    !googleButton ||
    !loginButton ||
    !loginButtonText ||
    !statusMessage ||
    !emailError ||
    !passwordError
) {
    console.error(
        "DevCore AI Login Error: One or more HTML elements are missing."
    );
}


// ==========================================
// Status Message
// ==========================================

function showStatus(message, type) {

    statusMessage.textContent = message;

    statusMessage.className =
        "status-message " + type;
}


function clearStatus() {

    statusMessage.textContent = "";

    statusMessage.className =
        "status-message";
}


// ==========================================
// Clear Validation Errors
// ==========================================

function clearErrors() {

    emailError.textContent = "";

    passwordError.textContent = "";
}


// ==========================================
// Email Validation
// ==========================================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// ==========================================
// Firebase Error Messages
// ==========================================

function getFirebaseErrorMessage(error) {

    switch (error.code) {

        case "auth/invalid-credential":
            return "Invalid email or password.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/invalid-email":
            return "Invalid email address.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        case "auth/popup-closed-by-user":
            return "Google sign-in was cancelled.";

        case "auth/popup-blocked":
            return "Google sign-in popup was blocked. Please allow popups.";

        case "auth/cancelled-popup-request":
            return "Google sign-in was cancelled.";

        case "auth/user-disabled":
            return "This account has been disabled.";

        default:

            console.error(
                "Firebase Error:",
                error
            );

            return "Something went wrong. Please try again.";
    }
}


// ==========================================
// Password Show / Hide
// ==========================================

passwordToggle.addEventListener(
    "click",
    function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            passwordToggle.textContent = "🙈";

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            passwordToggle.textContent = "👁";

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );
        }
    }
);


// ==========================================
// Email + Password Login
// ==========================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        clearErrors();

        clearStatus();


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        let valid = true;


        // ----------------------------------
        // Validate Email
        // ----------------------------------

        if (email === "") {

            emailError.textContent =
                "Please enter your email address.";

            valid = false;

        } else if (!isValidEmail(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;
        }


        // ----------------------------------
        // Validate Password
        // ----------------------------------

        if (password === "") {

            passwordError.textContent =
                "Please enter your password.";

            valid = false;

        } else if (password.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;
        }


        if (!valid) {
            return;
        }


        // ----------------------------------
        // Login Button Loading
        // ----------------------------------

        loginButton.disabled = true;

        loginButtonText.textContent =
            "Signing in...";


        try {

            // ----------------------------------
            // Remember Me
            // ----------------------------------

            await setPersistence(
                auth,
                rememberMe.checked
                    ? browserLocalPersistence
                    : browserSessionPersistence
            );


            // ----------------------------------
            // Firebase Login
            // ----------------------------------

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            // ----------------------------------
            // Login Success
            // ----------------------------------

            showStatus(
                "Login successful. Welcome to DevCore AI!",
                "success"
            );

            loginButtonText.textContent =
                "Signed in";


            // ----------------------------------
            // Redirect
            // ----------------------------------

            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 800);


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );

            showStatus(
                getFirebaseErrorMessage(error),
                "error"
            );

            loginButton.disabled = false;

            loginButtonText.textContent =
                "Sign in";
        }
    }
);


// ==========================================
// Forgot Password
// ==========================================

forgotPassword.addEventListener(
    "click",
    async function (event) {

        event.preventDefault();

        clearErrors();

        clearStatus();


        const email =
            emailInput.value.trim();


        // ----------------------------------
        // Check Email
        // ----------------------------------

        if (email === "") {

            showStatus(
                "Enter your email address first.",
                "error"
            );

            emailInput.focus();

            return;
        }


        if (!isValidEmail(email)) {

            showStatus(
                "Please enter a valid email address.",
                "error"
            );

            emailInput.focus();

            return;
        }


        // ----------------------------------
        // Send Reset Email
        // ----------------------------------

        try {

            await sendPasswordResetEmail(
                auth,
                email
            );


            showStatus(
                "Password reset email sent. Check your inbox.",
                "success"
            );


        } catch (error) {

            console.error(
                "Password Reset Error:",
                error
            );

            showStatus(
                getFirebaseErrorMessage(error),
                "error"
            );
        }
    }
);


// ==========================================
// Google Login
// ==========================================

googleButton.addEventListener(
    "click",
    async function () {

        clearErrors();

        clearStatus();


        googleButton.disabled = true;

        googleButton.innerHTML =
            "Signing in with Google...";


        try {

            // ----------------------------------
            // Google Authentication
            // ----------------------------------

            await signInWithPopup(
                auth,
                googleProvider
            );


            // ----------------------------------
            // Success
            // ----------------------------------

            showStatus(
                "Google sign-in successful!",
                "success"
            );


            // ----------------------------------
            // Redirect
            // ----------------------------------

            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 800);


        } catch (error) {

            console.error(
                "Google Login Error:",
                error
            );

            showStatus(
                getFirebaseErrorMessage(error),
                "error"
            );


            // ----------------------------------
            // Restore Google Button
            // ----------------------------------

            googleButton.disabled = false;

            googleButton.innerHTML = `
                <span class="google-icon">G</span>
                Continue with Google
            `;
        }
    }
);


// ==========================================
// Remember Me
// ==========================================

rememberMe.addEventListener(
    "change",
    function () {

        console.log(
            "Remember me:",
            rememberMe.checked
        );
    }
);