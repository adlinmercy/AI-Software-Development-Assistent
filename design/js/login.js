/* =========================================
   DEVCORE AI
   LOGIN JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const rememberMe = document.getElementById("rememberMe");

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
   LOGIN
========================================= */

loginForm.addEventListener(
    "submit",
    function (event) {

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


        setTimeout(function () {

            showStatus(
                "Login successful. Welcome to DevCore AI!",
                "success"
            );


            loginButtonText.textContent =
                "Signed in";


            /*
             * Temporary navigation.
             *
             * Later this will be replaced
             * with real authentication.
             */

            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 800);


        }, 1000);

    }
);


/* =========================================
   FORGOT PASSWORD
========================================= */

forgotPassword.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        showStatus(
            "Password reset will be available after authentication is connected.",
            "error"
        );

    }
);


/* =========================================
   GOOGLE LOGIN
========================================= */

googleButton.addEventListener(
    "click",
    function () {

        showStatus(
            "Google sign-in will be connected later.",
            "error"
        );

    }
);


/* =========================================
   REMEMBER ME
========================================= */

rememberMe.addEventListener(
    "change",
    function () {

        if (rememberMe.checked) {

            console.log(
                "Remember me enabled"
            );

        } else {

            console.log(
                "Remember me disabled"
            );

        }

    }
);