// =====================================
// DEVCORE AI - SHARED THEME SETTINGS
// =====================================

(function () {
    const savedTheme = localStorage.getItem("devcoreTheme") || "Light";

    // Apply the saved theme when the page loads.
    document.documentElement.setAttribute(
        "data-theme",
        savedTheme.toLowerCase()
    );

    // Restore the saved selection in the Settings page.
    document.addEventListener("DOMContentLoaded", () => {
        const themeSelect = document.getElementById("theme");

        if (themeSelect) {
            themeSelect.value = savedTheme;
        }
    });
})();