// =====================================
// DEVCORE AI - SHARED THEME SETTINGS
// =====================================

(function () {
    const root = document.documentElement;

    function applyTheme() {
        const savedTheme =
            localStorage.getItem("devcoreTheme") || "Light";

        root.setAttribute("data-theme", savedTheme.toLowerCase());
    }

    function applyCompactMode() {
        const enabled =
            localStorage.getItem("devcoreCompactMode") === "true";

        root.setAttribute("data-compact", String(enabled));
    }

    // Apply saved preferences immediately.
    applyTheme();
    applyCompactMode();

    // Restore saved choices on the Settings page.
    document.addEventListener("DOMContentLoaded", () => {
        const themeSelect = document.getElementById("theme");
        const compactMode = document.getElementById("compactMode");

        if (themeSelect) {
            themeSelect.value =
                localStorage.getItem("devcoreTheme") || "Light";
        }

        if (compactMode) {
            compactMode.checked =
                localStorage.getItem("devcoreCompactMode") === "true";
        }
    });

    // Update other open tabs when preferences change.
    window.addEventListener("storage", event => {
        if (event.key === "devcoreTheme") {
            applyTheme();
        }

        if (event.key === "devcoreCompactMode") {
            applyCompactMode();
        }
    });
})();