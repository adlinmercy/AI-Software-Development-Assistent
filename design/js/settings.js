/* =========================================
   DEVCORE AI - SETTINGS JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const saveProfileBtn =
        document.getElementById("saveProfileBtn");

    const saveAiBtn =
        document.getElementById("saveAiBtn");

    const profileMessage =
        document.getElementById("profileMessage");

    const aiMessage =
        document.getElementById("aiMessage");


    // =====================================
    // SHOW MESSAGE
    // =====================================

    function showMessage(element, message) {
        if (!element) return;

        element.textContent = message;
        element.classList.add("show");

        setTimeout(() => {
            element.classList.remove("show");
        }, 2500);
    }


    // =====================================
    // LOAD SAVED PROFILE AND AI PREFERENCES
    // =====================================

    function readSavedObject(key) {
        try {
            const value = JSON.parse(
                localStorage.getItem(key) || "{}"
            );

            if (
                value &&
                typeof value === "object" &&
                !Array.isArray(value)
            ) {
                return value;
            }

        } catch (error) {
            console.error(`Unable to load ${key}:`, error);
        }

        return {};
    }

    const savedProfile =
        readSavedObject("devcoreProfile");

    // IMPORTANT: savedAiPreferences is declared only once.
    const savedAiPreferences =
        readSavedObject("devcoreAiPreferences");

    const fullNameInput =
        document.getElementById("fullName");

    const emailInput =
        document.getElementById("email");

    const programmingLanguage =
        document.getElementById("programmingLanguage");

    const responseStyle =
        document.getElementById("responseStyle");

    const aiSuggestionsToggle =
        document.getElementById("aiSuggestions");


    // Restore profile information.

    if (fullNameInput && savedProfile.fullName) {
        fullNameInput.value = savedProfile.fullName;
    }

    if (emailInput && savedProfile.email) {
        emailInput.value = savedProfile.email;
    }


    // Restore AI preferences.

    if (
        programmingLanguage &&
        savedAiPreferences.language
    ) {
        programmingLanguage.value =
            savedAiPreferences.language;
    }

    if (
        responseStyle &&
        savedAiPreferences.style
    ) {
        responseStyle.value =
            savedAiPreferences.style;
    }

    if (aiSuggestionsToggle) {
        aiSuggestionsToggle.checked =
            savedAiPreferences.aiSuggestions !== false;
    }


    // =====================================
    // PROFILE
    // =====================================

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener("click", () => {

            const fullName =
                fullNameInput.value.trim();

            const email =
                emailInput.value.trim();

            if (!fullName) {
                alert("Please enter your full name.");
                return;
            }

            if (!email) {
                alert("Please enter your email address.");
                return;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            const profile = {
                fullName: fullName,
                email: email
            };

            localStorage.setItem(
                "devcoreProfile",
                JSON.stringify(profile)
            );

            // Update the shared header if profile.js is loaded.
            if (typeof updateDevCoreProfile === "function") {
                updateDevCoreProfile();
            }

            showMessage(
                profileMessage,
                "Profile saved successfully."
            );

        });
    }


    // =====================================
    // AI PREFERENCES
    // =====================================

    if (saveAiBtn) {
        saveAiBtn.addEventListener("click", () => {

            const preferences = {
                language: programmingLanguage.value,
                style: responseStyle.value,
                aiSuggestions: aiSuggestionsToggle.checked
            };

            localStorage.setItem(
                "devcoreAiPreferences",
                JSON.stringify(preferences)
            );

            showMessage(
                aiMessage,
                "AI preferences saved successfully."
            );

        });
    }


    // =====================================
    // THEME
    // =====================================

    const theme =
        document.getElementById("theme");

    if (theme) {

        const savedTheme =
            localStorage.getItem("devcoreTheme") || "Light";

        theme.value = savedTheme;

        theme.addEventListener("change", () => {

            const selectedTheme = theme.value;

            localStorage.setItem(
                "devcoreTheme",
                selectedTheme
            );

            document.documentElement.setAttribute(
                "data-theme",
                selectedTheme.toLowerCase()
            );

        });
    }


    // =====================================
    // COMPACT MODE
    // =====================================

    const compactMode =
        document.getElementById("compactMode");

    if (compactMode) {

        const savedCompactMode =
            localStorage.getItem("devcoreCompactMode") === "true";

        compactMode.checked = savedCompactMode;

        document.documentElement.setAttribute(
            "data-compact",
            String(savedCompactMode)
        );

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


    // =====================================
    // NOTIFICATION SETTINGS
    // =====================================

    const notificationSettings = [
        "emailNotifications",
        "analysisNotifications",
        "securityNotifications"
    ];

    const savedNotifications =
        readSavedObject("devcoreNotificationSettings");

    notificationSettings.forEach(id => {

        const checkbox =
            document.getElementById(id);

        if (!checkbox) return;

        // Restore the previously saved choice.
        if (typeof savedNotifications[id] === "boolean") {
            checkbox.checked = savedNotifications[id];
        }

        // Save the new choice.
        checkbox.addEventListener("change", () => {

            savedNotifications[id] = checkbox.checked;

            localStorage.setItem(
                "devcoreNotificationSettings",
                JSON.stringify(savedNotifications)
            );

        });

    });

});