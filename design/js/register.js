/* =========================================
   DEVCORE AI
   REGISTER JAVASCRIPT
========================================= */


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
   PASSWORD TOGGLE
========================================= */

passwordToggle.addEventListener(
    "click",
    function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            passwordToggle.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            passwordToggle.textContent = "👁";

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

        } else {

            confirmPasswordInput.type = "password";

            confirmPasswordToggle.textContent = "👁";

        }

    }
);


/* =========================================
   REGISTER
========================================= */

registerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        clearErrors();

        clearStatus();


        const fullName =
            fullNameInput.value.trim();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        let valid = true;


        /* Full Name */

        if (fullName === "") {

            nameError.textContent =
                "Please enter your full name.";

            valid = false;

        } else if (fullName.length < 2) {

            nameError.textContent =
                "Please enter a valid name.";

            valid = false;

        }


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
                "Please create a password.";

            valid = false;

        } else if (password.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        }


        /* Confirm Password */

        if (confirmPassword === "") {

            confirmPasswordError.textContent =
                "Please confirm your password.";

            valid = false;

        } else if (password !== confirmPassword) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            valid = false;

        }


        /* Terms */

        if (!termsInput.checked) {

            termsError.textContent =
                "Please accept the Terms of Service.";

            valid = false;

        }


        if (!valid) {

            return;

        }


        /* Loading */

        registerButton.disabled = true;

        registerButtonText.textContent =
            "Creating account...";


        /*
         * Temporary frontend simulation.
         *
         * Firebase authentication will be
         * connected later.
         */

        setTimeout(function () {

            showStatus(
                "Account created successfully!",
                "success"
            );


            registerButtonText.textContent =
                "Account created";


            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 1000);


        }, 1000);

    }
);