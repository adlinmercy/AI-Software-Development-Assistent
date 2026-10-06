/* =========================================
   DEVCORE AI
   REGISTER JAVASCRIPT - FIREBASE
========================================= */


/* =========================================
   FIREBASE
========================================= */

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import { app } from "./firebase-config.js";


const auth = getAuth(app);


/* =========================================
   ELEMENTS
========================================= */

const registerForm =
    document.getElementById("registerForm");

const fullNameInput =
    document.getElementById("fullName");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const termsInput =
    document.getElementById("terms");

const passwordToggle =
    document.getElementById("passwordToggle");

const confirmPasswordToggle =
    document.getElementById("confirmPasswordToggle");

const registerButton =
    document.getElementById("registerButton");

const registerButtonText =
    document.getElementById("registerButtonText");

const statusMessage =
    document.getElementById("statusMessage");

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const passwordError =
    document.getElementById("passwordError");

const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const termsError =
    document.getElementById("termsError");


/* =========================================
   STATUS
========================================= */

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


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    nameError.textContent = "";

    emailError.textContent = "";

    passwordError.textContent = "";

    confirmPasswordError.textContent = "";

    termsError.textContent = "";
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

        case "auth/email-already-in-use":
            return "An account already exists with this email.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password is too weak. Please use a stronger password.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        case "auth/operation-not-allowed":
            return "Email/password authentication is not enabled.";

        default:

            console.error(
                "Firebase Registration Error:",
                error
            );

            return "Something went wrong. Please try again.";
    }
}


/* =========================================
   PASSWORD TOGGLE
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
   CONFIRM PASSWORD TOGGLE
========================================= */

confirmPasswordToggle.addEventListener(
    "click",
    function () {

        if (confirmPasswordInput.type === "password") {

            confirmPasswordInput.type = "text";

            confirmPasswordToggle.textContent = "🙈";

            confirmPasswordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            confirmPasswordInput.type = "password";

            confirmPasswordToggle.textContent = "👁";

            confirmPasswordToggle.setAttribute(
                "aria-label",
                "Show password"
            );
        }
    }
);


/* =========================================
   REGISTER
========================================= */

registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        clearErrors();

        clearStatus();


        /* =====================================
           GET VALUES
        ===================================== */

        const fullName =
            fullNameInput.value.trim();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        let valid = true;


        /* =====================================
           FULL NAME
        ===================================== */

        if (fullName === "") {

            nameError.textContent =
                "Please enter your full name.";

            valid = false;

        } else if (fullName.length < 2) {

            nameError.textContent =
                "Please enter a valid name.";

            valid = false;
        }


        /* =====================================
           EMAIL
        ===================================== */

        if (email === "") {

            emailError.textContent =
                "Please enter your email address.";

            valid = false;

        } else if (!isValidEmail(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;
        }


        /* =====================================
           PASSWORD
        ===================================== */

        if (password === "") {

            passwordError.textContent =
                "Please create a password.";

            valid = false;

        } else if (password.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;
        }


        /* =====================================
           CONFIRM PASSWORD
        ===================================== */

        if (confirmPassword === "") {

            confirmPasswordError.textContent =
                "Please confirm your password.";

            valid = false;

        } else if (password !== confirmPassword) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            valid = false;
        }


        /* =====================================
           TERMS
        ===================================== */

        if (!termsInput.checked) {

            termsError.textContent =
                "Please accept the Terms of Service.";

            valid = false;
        }


        /* =====================================
           STOP IF INVALID
        ===================================== */

        if (!valid) {
            return;
        }


        /* =====================================
           LOADING
        ===================================== */

        registerButton.disabled = true;

        registerButtonText.textContent =
            "Creating account...";


        try {

            /* =================================
               CREATE FIREBASE ACCOUNT
            ================================= */

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            /* =================================
               SAVE USER DISPLAY NAME
            ================================= */

            await updateProfile(
                user,
                {
                    displayName: fullName
                }
            );


            /* =================================
               SUCCESS
            ================================= */

            showStatus(
                "Account created successfully!",
                "success"
            );


            registerButtonText.textContent =
                "Account created";


            /* =================================
               REDIRECT TO LOGIN
            ================================= */

            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 1000);


        } catch (error) {

            console.error(error);


            /* ================================
               FIREBASE ERROR
            ================================= */

            showStatus(
                getFirebaseErrorMessage(error),
                "error"
            );


            /* ================================
               ENABLE BUTTON AGAIN
            ================================= */

            registerButton.disabled = false;

            registerButtonText.textContent =
                "Create account";
        }

    }
);