/* ================================
   DEVCORE AI - SETTINGS JS
   ================================ */

document.addEventListener("DOMContentLoaded", () => {

    const saveProfileBtn = document.getElementById("saveProfileBtn");
    const saveAiBtn = document.getElementById("saveAiBtn");
    const changePasswordBtn = document.getElementById("changePasswordBtn");

    const profileMessage = document.getElementById("profileMessage");
    const aiMessage = document.getElementById("aiMessage");
    const passwordMessage = document.getElementById("passwordMessage");


    /* ================================
       SHOW MESSAGE
       ================================ */

    function showMessage(element, message) {

        element.textContent = message;

        element.classList.add("show");

        setTimeout(() => {
            element.classList.remove("show");
        }, 2500);
    }


    /* ================================
       PROFILE
       ================================ */

    saveProfileBtn.addEventListener("click", () => {

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();


        if (fullName === "") {
            alert("Please enter your full name.");
            return;
        }

        if (email === "") {
            alert("Please enter your email address.");
            return;
        }

        showMessage(
            profileMessage,
            "Profile updated successfully."
        );

    });


    /* ================================
       AI PREFERENCES
       ================================ */

    saveAiBtn.addEventListener("click", () => {

        const language =
            document.getElementById("programmingLanguage").value;

        const style =
            document.getElementById("responseStyle").value;

        console.log("Default Language:", language);
        console.log("Response Style:", style);

        showMessage(
            aiMessage,
            "AI preferences updated successfully."
        );

    });


    /* ================================
       CHANGE PASSWORD
       ================================ */

    changePasswordBtn.addEventListener("click", () => {

        const currentPassword =
            document.getElementById("currentPassword").value;

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (currentPassword === "") {
            alert("Please enter your current password.");
            return;
        }

        if (newPassword === "") {
            alert("Please enter a new password.");
            return;
        }

        if (newPassword.length < 6) {
            alert("New password must contain at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }


        showMessage(
            passwordMessage,
            "Password changed successfully."
        );


        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";

    });


    /* ================================
       THEME
       ================================ */

    const theme = document.getElementById("theme");

    theme.addEventListener("change", () => {

        if (theme.value === "Dark") {
            alert(
                "Dark mode will be connected to the application theme in the future."
            );

            theme.value = "Light";
        }

    });


    /* ================================
       COMPACT MODE
       ================================ */

    const compactMode =
        document.getElementById("compactMode");

    compactMode.addEventListener("change", () => {

        if (compactMode.checked) {

            document.body.style.fontSize = "98%";

        } else {

            document.body.style.fontSize = "100%";

        }

    });


    /* ================================
       NOTIFICATION SETTINGS
       ================================ */

    const notificationSettings = [
        "emailNotifications",
        "analysisNotifications",
        "securityNotifications"
    ];

    notificationSettings.forEach(id => {

        const checkbox = document.getElementById(id);

        checkbox.addEventListener("change", () => {

            console.log(
                id,
                checkbox.checked ? "Enabled" : "Disabled"
            );

        });

    });

});