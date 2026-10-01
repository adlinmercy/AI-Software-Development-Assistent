// =================================
// DevCore AI - Settings
// =================================


// =================================
// Get Elements
// =================================

const saveSettingsBtn =
    document.getElementById("saveSettingsBtn");

const saveMessage =
    document.getElementById("saveMessage");

const themeSelect =
    document.getElementById("themeSelect");

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const notificationBtn =
    document.getElementById("notificationBtn");

const logoutBtn =
    document.getElementById("logoutBtn");


// =================================
// Save Settings
// =================================

saveSettingsBtn.addEventListener(
    "click",
    function () {

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();


        // Validation

        if (fullName === "") {

            alert("Please enter your full name.");

            return;
        }


        if (email === "") {

            alert("Please enter your email address.");

            return;
        }


        // Loading

        saveSettingsBtn.disabled = true;

        saveSettingsBtn.textContent =
            "Saving...";


        setTimeout(function () {

            saveSettingsBtn.disabled = false;

            saveSettingsBtn.textContent =
                "✓ Save Settings";


            saveMessage.textContent =
                "✓ Your settings have been saved successfully.";

            saveMessage.style.display =
                "block";


            setTimeout(function () {

                saveMessage.style.display =
                    "none";

            }, 3000);


            console.log("Settings saved.");

        }, 1000);

    }
);


// =================================
// Theme
// =================================

themeSelect.addEventListener(
    "change",
    function () {

        if (themeSelect.value === "dark") {

            alert(
                "Dark theme will be available in the next version."
            );

            themeSelect.value = "light";

        }

    }
);


// =================================
// Change Password
// =================================

changePasswordBtn.addEventListener(
    "click",
    function () {

        alert(
            "Password change functionality will be connected to the backend later."
        );

    }
);


// =================================
// Notification
// =================================

notificationBtn.addEventListener(
    "click",
    function () {

        alert(
            "No new notifications."
        );

    }
);


// =================================
// Logout
// =================================

logoutBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (confirmLogout) {

            window.location.href =
                "login.html";

        }

    }
);


// =================================
// Save Current Settings Locally
// =================================

function collectSettings() {

    const settings = {

        fullName:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        role:
            document.getElementById("role").value,

        language:
            document.getElementById("language").value,

        responseDetail:
            document.getElementById("responseDetail").value,

        codeSuggestions:
            document.getElementById("codeSuggestions").checked,

        securityAnalysis:
            document.getElementById("securityAnalysis").checked,

        projectNotifications:
            document.getElementById("projectNotifications").checked,

        taskNotifications:
            document.getElementById("taskNotifications").checked,

        emailNotifications:
            document.getElementById("emailNotifications").checked

    };


    return settings;

}


// =================================
// Save Settings to Browser
// =================================

saveSettingsBtn.addEventListener(
    "click",
    function () {

        const settings =
            collectSettings();

        localStorage.setItem(
            "devcoreSettings",
            JSON.stringify(settings)
        );

    }
);


// =================================
// Load Saved Settings
// =================================

function loadSettings() {

    const savedSettings =
        localStorage.getItem(
            "devcoreSettings"
        );


    if (!savedSettings) {
        return;
    }


    const settings =
        JSON.parse(savedSettings);


    if (settings.fullName) {

        document.getElementById(
            "fullName"
        ).value = settings.fullName;

    }


    if (settings.email) {

        document.getElementById(
            "email"
        ).value = settings.email;

    }


    if (settings.role) {

        document.getElementById(
            "role"
        ).value = settings.role;

    }


    if (settings.language) {

        document.getElementById(
            "language"
        ).value = settings.language;

    }


    if (settings.responseDetail) {

        document.getElementById(
            "responseDetail"
        ).value =
            settings.responseDetail;

    }


    document.getElementById(
        "codeSuggestions"
    ).checked =
        settings.codeSuggestions;


    document.getElementById(
        "securityAnalysis"
    ).checked =
        settings.securityAnalysis;


    document.getElementById(
        "projectNotifications"
    ).checked =
        settings.projectNotifications;


    document.getElementById(
        "taskNotifications"
    ).checked =
        settings.taskNotifications;


    document.getElementById(
        "emailNotifications"
    ).checked =
        settings.emailNotifications;

}


loadSettings();