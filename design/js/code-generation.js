/*
=========================================================
DEVCORE AI - CODE GENERATION
Frontend integration with the existing FastAPI backend.
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // HTML ELEMENTS
    // =====================================================

    const codeRequirement =
        document.getElementById("codeRequirement");

    const charCount =
        document.getElementById("charCount");

    const language =
        document.getElementById("language");

    const framework =
        document.getElementById("framework");

    const generateBtn =
        document.getElementById("generateBtn");

    const loadingSection =
        document.getElementById("loadingSection");

    const resultSection =
        document.getElementById("resultSection");

    const codeOutput =
        document.getElementById("codeOutput");

    const codeExplanation =
        document.getElementById("codeExplanation");

    const languageLabel =
        document.getElementById("languageLabel");

    const copyBtn =
        document.getElementById("copyBtn");


    // =====================================================
    // BACKEND API
    // =====================================================

    const API_URL =
        "http://127.0.0.1:8000/api/code-generation";


    // =====================================================
    // GET SAVED AI RESPONSE STYLE
    // =====================================================

    function getSavedResponseStyle() {

        try {

            const preferences = JSON.parse(
                localStorage.getItem("devcoreAiPreferences") || "{}"
            );

            const allowedStyles = [
                "Concise",
                "Balanced",
                "Detailed"
            ];

            if (allowedStyles.includes(preferences.style)) {
                return preferences.style;
            }

        } catch (error) {

            console.warn(
                "Unable to load AI response preferences:",
                error
            );

        }

        // Use Balanced when no valid preference is saved.
        return "Balanced";

    }


    // =====================================================
    // CHECK REQUIRED ELEMENTS
    // =====================================================

    const requiredElements = {
        codeRequirement,
        charCount,
        language,
        framework,
        generateBtn,
        loadingSection,
        resultSection,
        codeOutput,
        codeExplanation,
        languageLabel,
        copyBtn
    };

    const missingElements = Object.entries(requiredElements)
        .filter(([name, element]) => !element)
        .map(([name]) => name);

    if (missingElements.length > 0) {

        console.error(
            "DevCore AI: Missing HTML elements:",
            missingElements.join(", ")
        );

        return;
    }


    // =====================================================
    // INITIAL STATE
    // =====================================================

    loadingSection.style.display = "none";
    resultSection.style.display = "none";


    // =====================================================
    // CHARACTER COUNTER
    // =====================================================

    function updateCharacterCount() {

        charCount.textContent =
            `${codeRequirement.value.length} / 5000 characters`;

    }

    codeRequirement.addEventListener(
        "input",
        updateCharacterCount
    );

    updateCharacterCount();


    // =====================================================
    // GENERATE CODE
    // =====================================================

    generateBtn.addEventListener("click", async function (event) {

        event.preventDefault();

        const requirement =
            codeRequirement.value.trim();

        const selectedLanguage =
            language.value;

        const selectedFramework =
            framework.value;


        // =================================================
        // VALIDATE INPUT
        // =================================================

        if (requirement.length < 10) {

            alert(
                "Please enter at least 10 characters describing what you want to build."
            );

            codeRequirement.focus();

            return;
        }

        if (requirement.length > 5000) {

            alert(
                "Your description cannot exceed 5000 characters."
            );

            return;
        }


        // =================================================
        // LOAD RESPONSE STYLE
        // Read the saved value before sending the request.
        // =================================================

        const selectedResponseStyle =
            getSavedResponseStyle();


        // =================================================
        // UPDATE UI
        // =================================================

        generateBtn.disabled = true;

        generateBtn.innerHTML = `
            <span>◌</span>
            <span>Generating Code...</span>
        `;

        loadingSection.style.display = "flex";
        resultSection.style.display = "none";

        codeOutput.textContent = "";
        codeExplanation.textContent = "";


        try {

            // =============================================
            // SEND REQUEST TO FASTAPI
            // =============================================

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    requirement: requirement,

                    language: selectedLanguage,

                    framework: selectedFramework,

                    response_style: selectedResponseStyle

                })

            });


            // =============================================
            // READ RESPONSE SAFELY
            // =============================================

            const responseText = await response.text();

            let data;

            try {

                data = JSON.parse(responseText);

            } catch {

                throw new Error(
                    "The backend returned an invalid response. " +
                    "Check that FastAPI is running correctly."
                );

            }


            // =============================================
            // HANDLE HTTP ERRORS
            // =============================================

            if (!response.ok) {

                let errorMessage = data.detail;

                if (Array.isArray(errorMessage)) {

                    errorMessage = errorMessage
                        .map(item => item.msg || JSON.stringify(item))
                        .join("\n");

                }

                throw new Error(
                    typeof errorMessage === "string"
                        ? errorMessage
                        : "The backend could not generate your code."
                );

            }


            // =============================================
            // VALIDATE RESPONSE
            // =============================================

            if (
                data.status !== "success" ||
                typeof data.code !== "string" ||
                !data.code.trim()
            ) {

                console.error(
                    "Unexpected code-generation response:",
                    data
                );

                throw new Error(
                    "The backend response does not contain valid generated code. " +
                    "Check the response format in main.py."
                );

            }


            // =============================================
            // DISPLAY GENERATED CODE
            // =============================================

            // textContent prevents generated code from being
            // interpreted as HTML or JavaScript by the browser.

            codeOutput.textContent =
                removeCodeFences(data.code);

            codeExplanation.textContent =
                data.explanation ||
                "Code generated successfully. Review the code before running it.";

            languageLabel.textContent =
                data.language || selectedLanguage;


            // =============================================
            // SHOW RESULTS
            // =============================================

            loadingSection.style.display = "none";
            resultSection.style.display = "block";

            resultSection.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });


        } catch (error) {

            console.error(
                "DevCore AI code-generation error:",
                error
            );

            alert(
                "Unable to generate code.\n\n" +
                getErrorMessage(error)
            );

        } finally {

            loadingSection.style.display = "none";

            generateBtn.disabled = false;

            generateBtn.innerHTML = `
                <span>✦</span>
                <span>Generate Code</span>
            `;

        }

    });


    // =====================================================
    // REMOVE OPTIONAL MARKDOWN CODE FENCES
    // =====================================================

    function removeCodeFences(code) {

        let cleanedCode = code.trim();

        const match = cleanedCode.match(
            /^```(?:[\w+#.-]+)?[ \t]*\r?\n([\s\S]*?)\r?\n```$/
        );

        if (match) {

            cleanedCode = match[1];

        }

        return cleanedCode;

    }


    // =====================================================
    // COPY GENERATED CODE
    // =====================================================

    copyBtn.addEventListener("click", async function () {

        const code = codeOutput.textContent;

        if (!code.trim()) {

            alert("There is no generated code to copy.");

            return;

        }

        try {

            await navigator.clipboard.writeText(code);

            showCopySuccess();

        } catch (error) {

            console.error("Clipboard API failed:", error);

            // Fallback for supported browsers.

            const temporaryTextArea =
                document.createElement("textarea");

            temporaryTextArea.value = code;

            temporaryTextArea.style.position = "fixed";
            temporaryTextArea.style.left = "-9999px";

            document.body.appendChild(temporaryTextArea);

            temporaryTextArea.select();

            try {

                const copied =
                    document.execCommand("copy");

                if (!copied) {

                    throw new Error("Copy command failed.");

                }

                showCopySuccess();

            } catch (fallbackError) {

                console.error(
                    "Clipboard fallback failed:",
                    fallbackError
                );

                alert(
                    "Unable to copy automatically. Please select the code and copy it manually."
                );

            } finally {

                temporaryTextArea.remove();

            }

        }

    });


    // =====================================================
    // COPY SUCCESS MESSAGE
    // =====================================================

    function showCopySuccess() {

        const originalText = copyBtn.textContent;

        copyBtn.textContent = "Copied!";
        copyBtn.disabled = true;

        setTimeout(function () {

            copyBtn.textContent = originalText;
            copyBtn.disabled = false;

        }, 1500);

    }


    // =====================================================
    // FRIENDLY ERROR MESSAGES
    // =====================================================

    function getErrorMessage(error) {

        if (error instanceof TypeError) {

            return (
                "Cannot connect to the DevCore AI backend.\n\n" +
                "Check that FastAPI is running at:\n" +
                "http://127.0.0.1:8000\n\n" +
                "Also check your browser console and backend terminal."
            );

        }

        return error.message ||
            "An unexpected error occurred. Please try again.";

    }

});