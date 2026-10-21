/* =========================================================
   DEVCORE AI - CODE DEBUGGING
   Connected to FastAPI + Gemini AI
   ========================================================= */


/* ================= CONFIGURATION ================= */

const API_URL = "http://127.0.0.1:8000/api/code-debugging";


/* ================= ELEMENTS ================= */

const codeInput = document.getElementById("codeInput");
const errorInput = document.getElementById("errorInput");
const language = document.getElementById("language");
const debugBtn = document.getElementById("debugBtn");

const loadingSection = document.getElementById("loadingSection");
const resultsSection = document.getElementById("resultsSection");

const errorSummary = document.getElementById("errorSummary");
const errorExplanation = document.getElementById("errorExplanation");
const fixedCode = document.getElementById("fixedCode");
const debugSuggestions = document.getElementById("debugSuggestions");


/* ================= INITIAL STATE ================= */

loadingSection.style.display = "none";
resultsSection.style.display = "none";


/* ================= DEBUG BUTTON ================= */

debugBtn.addEventListener("click", async function () {

    const code = codeInput.value.trim();
    const error = errorInput.value.trim();
    const selectedLanguage = language.value;

    /* Validate source code */

    if (!code) {
        alert("Please paste your code before debugging.");
        codeInput.focus();
        return;
    }

    if (code.length > 15000) {
        alert("Your code is too long. Please keep it under 15,000 characters.");
        codeInput.focus();
        return;
    }

    if (error.length > 5000) {
        alert("The error message must be under 5,000 characters.");
        errorInput.focus();
        return;
    }

    /* Update interface */

    resultsSection.style.display = "none";
    loadingSection.style.display = "flex";

    debugBtn.disabled = true;
    debugBtn.innerHTML = "<span>⚙</span><span>Analyzing...</span>";

    try {

        /* Send code to FastAPI */

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code,
                language: selectedLanguage,
                error_message: error
            })
        });

        /* Read response */

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "The debugging request failed."
            );
        }

        if (data.status !== "success") {
            throw new Error(
                data.message || "The AI could not analyze your code."
            );
        }

        /* Display error summary */

        errorSummary.textContent =
            data.error_summary || "No error summary was provided.";

        /* Display explanation */

        errorExplanation.textContent =
            data.error_explanation || "No explanation was provided.";

        /* Display corrected code */

        fixedCode.textContent =
            data.fixed_code || "No corrected code was provided.";

        /* Display suggestions */

        displaySuggestions(data.debug_suggestions);

        /* Display results */

        loadingSection.style.display = "none";
        resultsSection.style.display = "block";

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (error) {

        console.error("Code debugging error:", error);

        loadingSection.style.display = "none";

        alert(
            "Unable to debug your code.\n\n" +
            error.message +
            "\n\nPlease ensure your FastAPI backend is running."
        );

    } finally {

        /* Restore button */

        debugBtn.disabled = false;
        debugBtn.innerHTML = "<span>⚙</span><span>Debug Code</span>";

    }

});


/* ================= DISPLAY SUGGESTIONS ================= */

function displaySuggestions(suggestions) {

    const list = document.createElement("ul");
    list.className = "suggestion-list";

    let items = [];

    if (Array.isArray(suggestions)) {
        items = suggestions;
    } else if (typeof suggestions === "string" && suggestions.trim()) {

        items = suggestions
            .split(/\n+/)
            .map(item => item.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim())
            .filter(Boolean);

    }

    if (items.length === 0) {
        items = ["Review the explanation and test the corrected code."];
    }

    items.forEach(function (suggestion) {

        const item = document.createElement("li");
        item.textContent = String(suggestion);
        list.appendChild(item);

    });

    debugSuggestions.replaceChildren(list);

}