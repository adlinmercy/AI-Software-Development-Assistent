// =====================================
// DEVCORE AI - SHARED AI PREFERENCES
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    let preferences = {};

    try {
        preferences = JSON.parse(
            localStorage.getItem("devcoreAiPreferences") || "{}"
        );
    } catch (error) {
        console.error("Unable to load AI preferences:", error);
    }

    const defaultLanguage = preferences.language;

    if (!defaultLanguage) {
        return;
    }

    // Apply the saved language when the current module supports it.
    const languageSelect = document.getElementById("language");

    if (!languageSelect) {
        return;
    }

    function normalizeLanguage(value) {
        const normalized = value.trim().toLowerCase();

        if (normalized === "c++" || normalized === "cpp") {
            return "cpp";
        }

        if (normalized === "javascript" || normalized === "java script") {
            return "javascript";
        }

        return normalized;
    }

    const requestedLanguage = normalizeLanguage(defaultLanguage);

    const matchingOption = Array.from(languageSelect.options).find(
        option =>
            normalizeLanguage(option.value) === requestedLanguage ||
            normalizeLanguage(option.textContent) === requestedLanguage
    );

    // Change the selection only if this module supports the language.
    if (matchingOption) {
        languageSelect.value = matchingOption.value;

        languageSelect.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }

});