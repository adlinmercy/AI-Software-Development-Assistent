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

        // ================================
    // LOAD SAVED SETTINGS
    // ================================

    const savedProfile = JSON.parse(
        localStorage.getItem("devcoreProfile") || "{}"
    );

    const savedAiPreferences = JSON.parse(
        localStorage.getItem("devcoreAiPreferences") || "{}"
    );

    if (savedProfile.fullName) {
        document.getElementById("fullName").value =
            savedProfile.fullName;
    }

    if (savedProfile.email) {
        document.getElementById("email").value =
            savedProfile.email;
    }

    if (savedAiPreferences.language) {
        document.getElementById("programmingLanguage").value =
            savedAiPreferences.language;
    }

    if (savedAiPreferences.style) {
        document.getElementById("responseStyle").value =
            savedAiPreferences.style;
    }


        saveProfileBtn.addEventListener("click", () => {

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        if (!fullName) {
            alert("Please enter your full name.");
            return;
        }

        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        localStorage.setItem(
            "devcoreProfile",
            JSON.stringify({
                fullName: fullName,
                email: email
            })
        );

        updateDevCoreProfile();

        showMessage(
            profileMessage,
            "Profile saved successfully."
        );

    });

        saveAiBtn.addEventListener("click", () => {

        const language =
            document.getElementById("programmingLanguage").value;

        const style =
            document.getElementById("responseStyle").value;

        localStorage.setItem(
            "devcoreAiPreferences",
            JSON.stringify({
                language: language,
                style: style
            })
        );

        showMessage(
            aiMessage,
            "AI preferences saved successfully."
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

    if (theme) {
        const savedTheme =
            localStorage.getItem("devcoreTheme") || "Light";

        theme.value = savedTheme;

        theme.addEventListener("change", () => {
            const selectedTheme = theme.value;

            // Save the selected theme.
            localStorage.setItem("devcoreTheme", selectedTheme);

            // Apply the theme immediately.
            document.documentElement.setAttribute(
                "data-theme",
                selectedTheme.toLowerCase()
            );
        });
    }

   /* ================================
   COMPACT MODE
   ================================ */

const compactMode = document.getElementById("compactMode");

if (compactMode) {
    // Restore the saved preference.
    const savedCompactMode =
        localStorage.getItem("devcoreCompactMode") === "true";

    compactMode.checked = savedCompactMode;

    document.documentElement.setAttribute(
        "data-compact",
        String(savedCompactMode)
    );

    // Save and apply changes immediately.
    compactMode.addEventListener("change", () => {
        const enabled = compactMode.checked;

        localStorage.setItem(
            "devcoreCompactMode",
            String(enabled)
        );

        document.documentElement.setAttribute(
            "data-compact",
            String(enabled)
        );

        showMessage(
            aiMessage,
            enabled
                ? "Compact interface enabled."
                : "Compact interface disabled."
        );
    });
}



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