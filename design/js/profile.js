// =====================================
// DEVCORE AI - SHARED PROFILE DISPLAY
// =====================================

function updateDevCoreProfile() {
    let savedProfile = {};

    try {
        savedProfile = JSON.parse(
            localStorage.getItem("devcoreProfile") || "{}"
        );
    } catch (error) {
        console.error("Unable to load saved profile:", error);
    }

    const fullName = savedProfile.fullName?.trim() || "User";
    const firstLetter = fullName.charAt(0).toUpperCase();

    // Support the different profile layouts used across pages.
    const profiles = document.querySelectorAll(
        ".profile, .profile-area"
    );

    profiles.forEach(profile => {
        const nameElement = profile.querySelector(
            ".profile-name, .profile-info strong"
        );

        const avatarElement = profile.querySelector(".profile-avatar");

        if (nameElement) {
            nameElement.textContent = fullName;
        }

        if (avatarElement) {
            avatarElement.textContent = firstLetter || "U";
        }
    });
}

// Update when the page loads.
document.addEventListener(
    "DOMContentLoaded",
    updateDevCoreProfile
);

// Update when the profile changes in another browser tab.
window.addEventListener("storage", event => {
    if (event.key === "devcoreProfile") {
        updateDevCoreProfile();
    }
});