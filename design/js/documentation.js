const documentationInput =
    document.getElementById("documentationInput");

const charCount =
    document.getElementById("charCount");

const generateBtn =
    document.getElementById("generateBtn");

const loadingSection =
    document.getElementById("loadingSection");

const resultsSection =
    document.getElementById("resultsSection");

const documentationOutput =
    document.getElementById("documentationOutput");

const copyBtn =
    document.getElementById("copyBtn");

const documentationType =
    document.getElementById("documentationType");

const language =
    document.getElementById("language");


/* =========================
   CHARACTER COUNTER
========================= */

documentationInput.addEventListener("input", () => {

    const length = documentationInput.value.length;

    charCount.textContent =
        `${length} / 5000 characters`;

});


/* =========================
   GENERATE DOCUMENTATION
========================= */

generateBtn.addEventListener("click", () => {

    const input =
        documentationInput.value.trim();

    if (input.length < 10) {

        alert(
            "Please enter a detailed requirement or source code."
        );

        documentationInput.focus();

        return;
    }


    generateBtn.disabled = true;

    loadingSection.classList.add("show");

    resultsSection.classList.remove("show");


    setTimeout(() => {

        const documentation =
            generateDemoDocumentation(input);

        documentationOutput.innerHTML =
            documentation;

        loadingSection.classList.remove("show");

        resultsSection.classList.add("show");

        generateBtn.disabled = false;


        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 1800);

});


/* =========================
   DEMO DOCUMENTATION
========================= */

function generateDemoDocumentation(input) {

    const text =
        input.toLowerCase();

    const selectedType =
        documentationType
            .options[documentationType.selectedIndex]
            .text;

    const selectedLanguage =
        language
            .options[language.selectedIndex]
            .text;


    let projectName =
        "Software Development Project";


    if (text.includes("login")) {

        projectName =
            "User Login Management System";

    } else if (text.includes("bus")) {

        projectName =
            "College Bus Management System";

    } else if (text.includes("library")) {

        projectName =
            "Library Management System";

    } else if (text.includes("shopping")) {

        projectName =
            "Online Shopping System";

    }


    return `

        <h1>${projectName}</h1>

        <p>
            This document provides a structured overview of the
            software project, its functionality, technical details,
            and usage information.
        </p>


        <h2>1. Project Overview</h2>

        <p>
            The ${projectName} is designed to provide users with
            a simple and efficient solution for managing the
            required software operations.
        </p>


        <h2>2. Project Requirements</h2>

        <p>
            The system should process user inputs and perform the
            required operations according to the defined software
            requirements.
        </p>

        <ul>

            <li>
                The system should provide a user-friendly interface.
            </li>

            <li>
                The system should validate user input.
            </li>

            <li>
                The system should process valid requests correctly.
            </li>

            <li>
                The system should display appropriate messages
                when an error occurs.
            </li>

        </ul>


        <h2>3. Main Features</h2>

        <ul>

            <li>
                User input and data processing
            </li>

            <li>
                Input validation and error handling
            </li>

            <li>
                Core application functionality
            </li>

            <li>
                User-friendly result presentation
            </li>

        </ul>


        <h2>4. Technology</h2>

        <p>
            Programming Language:
            <strong>${selectedLanguage}</strong>
        </p>

        <p>
            Documentation Type:
            <strong>${selectedType}</strong>
        </p>


        <h2>5. System Workflow</h2>

        <ol>

            <li>
                User provides the required input.
            </li>

            <li>
                The system validates the input.
            </li>

            <li>
                Application logic processes the request.
            </li>

            <li>
                The system generates the required result.
            </li>

            <li>
                The result is displayed to the user.
            </li>

        </ol>


        <h2>6. Error Handling</h2>

        <p>
            The system should validate input data and provide
            meaningful error messages when invalid or incomplete
            information is provided.
        </p>


        <h2>7. Testing</h2>

        <p>
            The application should be tested using positive,
            negative, boundary, and validation test cases to
            verify expected system behavior.
        </p>


        <h2>8. Future Enhancements</h2>

        <ul>

            <li>
                Integration with an AI-powered backend
            </li>

            <li>
                Database integration
            </li>

            <li>
                Authentication and user management
            </li>

            <li>
                Project history and version management
            </li>

        </ul>

    `;
}


/* =========================
   COPY DOCUMENTATION
========================= */

copyBtn.addEventListener("click", async () => {

    const text =
        documentationOutput.innerText;

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.textContent = "Copied";

        setTimeout(() => {

            copyBtn.textContent = "Copy";

        }, 1500);

    } catch (error) {

        alert(
            "Unable to copy documentation."
        );

    }

});