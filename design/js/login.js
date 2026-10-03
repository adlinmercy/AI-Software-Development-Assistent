/* =========================================
   DEVCORE AI
   LOGIN JAVASCRIPT
========================================= */

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


/* =========================================
   FIREBASE AUTH
========================================= */

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


/* =========================================
   ELEMENTS
========================================= */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const rememberMe =
    document.getElementById("rememberMe");

const passwordToggle =
    document.getElementById("passwordToggle");

const forgotPassword =
    document.getElementById("forgotPassword");

const googleButton =
    document.getElementById("googleButton");

const loginButton =
    document.getElementById("loginButton");

const loginButtonText =
    document.getElementById("loginButtonText");

const statusMessage =
    document.getElementById("statusMessage");

const emailError =
    document.getElementById("emailError");

const passwordError =
    document.getElementById("passwordError");


/* =========================================
   SHOW STATUS
========================================= */

function showStatus(message, type) {

    statusMessage.textContent = message;

    statusMessage.className =
        "status-message " + type;
}


/* =========================================
   CLEAR STATUS
========================================= */

function clearStatus() {

    statusMessage.textContent = "";

    statusMessage.className =
        "status-message";
}


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    emailError.textContent = "";

    passwordError.textContent = "";
}


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* =========================================
   FIREBASE ERROR MESSAGE
========================================= */

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

        default:
            return "Something went wrong. Please try again.";
    }
}


/* =========================================
   PASSWORD VISIBILITY
========================================= */

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


/* =========================================
   EMAIL / PASSWORD LOGIN
========================================= */

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


        /* Email */

        if (email === "") {

            emailError.textContent =
                "Please enter your email address.";

            valid = false;

        } else if (!isValidEmail(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;
        }


        /* Password */

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


        /* Loading */

        loginButton.disabled = true;

        loginButtonText.textContent =
            "Signing in...";


        try {

            /* Remember Me */

            await setPersistence(
                auth,
                rememberMe.checked
                    ? browserLocalPersistence
                    : browserSessionPersistence
            );


            /* Firebase Login */

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            showStatus(
                "Login successful. Welcome to DevCore AI!",
                "success"
            );


            loginButtonText.textContent =
                "Signed in";


            /* Go to Dashboard */

            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 800);


        } catch (error) {

            console.error(error);

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


/* =========================================
   FORGOT PASSWORD
========================================= */

forgotPassword.addEventListener(
    "click",
    async function (event) {

        event.preventDefault();

        clearErrors();
        clearStatus();


        const email =
            emailInput.value.trim();


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

            return;
        }


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

            console.error(error);

            showStatus(
                getFirebaseErrorMessage(error),
                "error"
            );

        }

    }
);


/* =========================================
   GOOGLE LOGIN
========================================= */

googleButton.addEventListener(
    "click",
    async function () {

        clearErrors();
        clearStatus();


        googleButton.disabled = true;

        googleButton.textContent =
            "Signing in with Google...";


        try {

            await signInWithPopup(
                auth,
                googleProvider
            );


            showStatus(
                "Google sign-in successful!",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 800);


        } catch (error) {

            console.error(error);

            showStatus(
                getFirebaseErrorMessage(error),
                "error"
            );


            googleButton.disabled = false;

            googleButton.innerHTML = `
                <span class="google-icon">G</span>
                Continue with Google
            `;

        }

    }
);


/* =========================================
   REMEMBER ME
========================================= */

rememberMe.addEventListener(
    "change",
    function () {

        console.log(
            "Remember me:",
            rememberMe.checked
        );

    }
);