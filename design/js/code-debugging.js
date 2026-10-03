/* =========================================================
   DEVCORE AI - CODE DEBUGGING
   Frontend Demo
   ========================================================= */


/* ================= ELEMENTS ================= */

const codeInput =
    document.getElementById("codeInput");

const errorInput =
    document.getElementById("errorInput");

const language =
    document.getElementById("language");

const debugBtn =
    document.getElementById("debugBtn");

const loadingSection =
    document.getElementById("loadingSection");

const resultsSection =
    document.getElementById("resultsSection");

const errorSummary =
    document.getElementById("errorSummary");

const errorExplanation =
    document.getElementById("errorExplanation");

const fixedCode =
    document.getElementById("fixedCode");

const debugSuggestions =
    document.getElementById("debugSuggestions");


/* ================= DEBUG BUTTON ================= */

debugBtn.addEventListener("click", function () {

    const code =
        codeInput.value.trim();

    const error =
        errorInput.value.trim();

    const selectedLanguage =
        language.value;


    /* Validation */

    if (code.length < 5) {

        alert(
            "Please paste your code before debugging."
        );

        codeInput.focus();

        return;
    }


    /* Hide old results */

    resultsSection.style.display = "none";


    /* Show loading */

    loadingSection.style.display = "flex";

    debugBtn.disabled = true;

    debugBtn.innerHTML =
        "<span>⚙</span><span>Analyzing...</span>";


    /*
        Demo delay.

        Later:

        Frontend
            ↓
        FastAPI
            ↓
        Gemini API
            ↓
        Code analysis
            ↓
        Suggested fix
    */

    setTimeout(function () {

        const analysis =
            analyzeCode(
                code,
                error,
                selectedLanguage
            );


        errorSummary.innerHTML =
            `<div class="error-message">
                ${escapeHTML(analysis.error)}
            </div>`;


        errorExplanation.textContent =
            analysis.explanation;


        fixedCode.textContent =
            analysis.fixedCode;


        debugSuggestions.innerHTML =
            createSuggestionList(
                analysis.suggestions
            );


        /* Hide loading */

        loadingSection.style.display =
            "none";


        /* Show results */

        resultsSection.style.display =
            "block";


        /* Reset button */

        debugBtn.disabled = false;

        debugBtn.innerHTML =
            "<span>⚙</span><span>Debug Code</span>";


        /* Scroll */

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


    }, 1800);

});


/* ================= CODE ANALYSIS ================= */

function analyzeCode(
    code,
    error,
    selectedLanguage
) {

    const lowerCode =
        code.toLowerCase();

    const lowerError =
        error.toLowerCase();


    /* ---------- PYTHON ---------- */

    if (selectedLanguage === "Python") {

        if (
            lowerCode.includes("print(") &&
            lowerCode.includes("name")
        ) {

            return {
                error:
                    error ||
                    "Possible NameError: a variable may be used before it is defined.",

                explanation:
                    "The code appears to use a variable that may not have been initialized before it is accessed. Python raises a NameError when a variable does not exist in the current scope.",

                fixedCode:
                    `# Example corrected structure

name = "Developer"

print(name)
`,

                suggestions: [
                    "Make sure all variables are initialized before use.",
                    "Check variable names for spelling mistakes.",
                    "Keep variable names consistent throughout the program."
                ]
            };

        }


        if (
            lowerCode.includes("/ 0") ||
            lowerError.includes("zero division")
        ) {

            return {
                error:
                    error ||
                    "ZeroDivisionError: division by zero.",

                explanation:
                    "The program may be attempting to divide a value by zero. Python does not allow division by zero and raises ZeroDivisionError.",

                fixedCode:
                    `if divisor != 0:
    result = number / divisor
else:
    print("Cannot divide by zero")
`,

                suggestions: [
                    "Check the divisor before performing division.",
                    "Handle invalid input from the user.",
                    "Use appropriate exception handling when required."
                ]
            };

        }

    }


    /* ---------- JAVA ---------- */

    if (selectedLanguage === "Java") {

        if (
            lowerCode.includes("system.out.println") &&
            lowerCode.includes("string")
        ) {

            return {
                error:
                    error ||
                    "Possible compilation error caused by an undeclared or incorrectly declared variable.",

                explanation:
                    "The code may be referring to a variable that has not been declared in the current scope. Java requires variables to be declared with a valid data type before they are used.",

                fixedCode:
                    `public class Main {

    public static void main(String[] args) {

        String name = "Developer";

        System.out.println(name);
    }
}
`,

                suggestions: [
                    "Declare variables before using them.",
                    "Check the variable data type.",
                    "Make sure the variable is inside the correct scope."
                ]
            };

        }

    }


    /* ---------- GENERIC ---------- */

    return {

        error:
            error ||
            "Potential code issue detected. Further analysis is required to identify the exact error.",

        explanation:
            "DevCore AI has analyzed the submitted code structure. The exact problem may depend on the runtime environment, input values, compiler output, or additional project files.",

        fixedCode:
            `// Review the code carefully.

// Recommended debugging steps:
// 1. Check the error message.
// 2. Identify the affected line.
// 3. Verify variables and data types.
// 4. Check the program logic.
// 5. Test the corrected code again.
`,

        suggestions: [
            "Check the exact compiler or runtime error message.",
            "Review the line where the error occurs.",
            "Verify variable names, data types, and input values.",
            "Test the program with simple sample inputs."
        ]
    };

}


/* ================= SUGGESTION LIST ================= */

function createSuggestionList(suggestions) {

    let html =
        '<ul class="suggestion-list">';


    suggestions.forEach(function (suggestion) {

        html +=
            `<li>${escapeHTML(suggestion)}</li>`;

    });


    html += "</ul>";


    return html;
}


/* ================= ESCAPE HTML ================= */

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}