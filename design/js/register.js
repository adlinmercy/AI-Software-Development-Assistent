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
   CONFIRM PASSWORD SHOW / HIDE
========================= */

const confirmPasswordInput =
    document.getElementById("confirm-password");

const confirmPasswordToggle =
    document.getElementById("confirm-password-toggle");

confirmPasswordToggle.addEventListener("click", function () {

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

});


/* =========================
   REGISTER FORM
========================= */

const registerForm =
    document.getElementById("register-form");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    /* Get values */

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirm-password").value;

    const terms =
        document.getElementById("terms").checked;


    /* Error elements */

    const nameError =
        document.getElementById("name-error");

    const emailError =
        document.getElementById("email-error");

    const passwordError =
        document.getElementById("password-error");

    const confirmPasswordError =
        document.getElementById("confirm-password-error");

    const formMessage =
        document.getElementById("form-message");


    /* Clear previous errors */

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    formMessage.textContent = "";
    formMessage.style.display = "none";


    /* =========================
       VALIDATION
    ========================== */

    let isValid = true;


    /* Name */

    if (name.length < 3) {

        nameError.textContent =
            "Please enter your full name.";

        isValid = false;
    }


    /* Email */

    if (!email) {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;
    }


    /* Password */

    if (password.length < 8) {

        passwordError.textContent =
            "Password must contain at least 8 characters.";

        isValid = false;
    }


    /* Confirm Password */

    if (password !== confirmPassword) {

        confirmPasswordError.textContent =
            "Passwords do not match.";

        isValid = false;
    }


    /* Terms */

    if (!terms) {

        formMessage.textContent =
            "Please agree to the Terms of Service and Privacy Policy.";

        formMessage.style.display = "block";

        isValid = false;
    }


    /* Stop if validation failed */

    if (!isValid) {
        return;
    }


    /* =========================
       TEMPORARY SUCCESS
    ========================== */

    formMessage.textContent =
        "Account created successfully!";

    formMessage.style.display = "block";


    /*
       Backend authentication
       will be connected later.
    */

});