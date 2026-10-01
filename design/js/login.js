/* =========================
   PASSWORD SHOW / HIDE
========================= */

const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("password-toggle");

passwordToggle.addEventListener("click", function () {

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

});


/* =========================
   LOGIN FORM
========================= */

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    /* Get values */

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const rememberMe =
        document.getElementById("remember-me").checked;


    /* Error elements */

    const emailError =
        document.getElementById("email-error");

    const passwordError =
        document.getElementById("password-error");

    const formMessage =
        document.getElementById("form-message");


    /* Clear previous errors */

    emailError.textContent = "";
    passwordError.textContent = "";

    formMessage.textContent = "";
    formMessage.style.display = "none";


    /* =========================
       VALIDATION
    ========================== */

    let isValid = true;


    /* Email validation */

    if (!email) {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;

    } else {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            isValid = false;
        }
    }


    /* Password validation */

    if (!password) {

        passwordError.textContent =
            "Please enter your password.";

        isValid = false;

    } else if (password.length < 8) {

        passwordError.textContent =
            "Password must contain at least 8 characters.";

        isValid = false;
    }


    /* Stop if validation failed */

    if (!isValid) {
        return;
    }


    /* =========================
       TEMPORARY LOGIN
    ========================== */

    formMessage.textContent =
        "Login successful! Backend authentication will be connected later.";

    formMessage.style.display = "block";


    /*
       Remember Me will be connected
       to real authentication later.

       Backend authentication will also
       be added later.
    */

    console.log("Email:", email);
    console.log("Remember Me:", rememberMe);

});


/* =========================
   GOOGLE LOGIN
========================= */

const googleButton =
    document.getElementById("google-login");

googleButton.addEventListener("click", function () {

    alert(
        "Google authentication will be connected later."
    );

});