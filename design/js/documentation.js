// ================================
// DevCore AI - Documentation
// Generation
// ================================

const docInputType = document.getElementById("docInputType");
const documentationType = document.getElementById("documentationType");
const docLanguage = document.getElementById("docLanguage");

const documentationInput =
    document.getElementById("documentationInput");

const docCharCount =
    document.getElementById("docCharCount");

const generateDocumentationBtn =
    document.getElementById("generateDocumentationBtn");

const documentationResult =
    document.getElementById("documentationResult");

const documentationEmpty =
    document.getElementById("documentationEmpty");

const generatedDocumentation =
    document.getElementById("generatedDocumentation");

const documentationStatus =
    document.getElementById("documentationStatus");


// ================================
// Character Counter
// ================================

documentationInput.addEventListener("input", function () {

    docCharCount.textContent =
        documentationInput.value.length;

});


// ================================
// Change Placeholder
// ================================

docInputType.addEventListener("change", function () {

    if (docInputType.value === "code") {

        documentationInput.placeholder =
            "Paste your source code here...";

    } else {

        documentationInput.placeholder =
            "Enter your software requirement here...";

    }

});


// ================================
// Generate Documentation
// ================================

generateDocumentationBtn.addEventListener(
    "click",
    function () {

        const input =
            documentationInput.value.trim();

        const inputType =
            docInputType.value;

        const documentation =
            documentationType.value;

        const language =
            docLanguage.value;


        // Validation
        if (input === "") {

            alert(
                "Please enter a software requirement or source code."
            );

            documentationInput.focus();

            return;
        }


        // Loading State
        generateDocumentationBtn.disabled = true;

        generateDocumentationBtn.innerHTML =
            "⏳ Generating Documentation...";

        documentationStatus.textContent =
            "Generating";

        documentationStatus.classList.add("loading");


        documentationEmpty.style.display =
            "none";

        generatedDocumentation.innerHTML =
            `
            <div class="loading-documentation">

                <div class="loading-spinner"></div>

                <p>
                    DevCore AI is analyzing your input
                    and generating documentation...
                </p>

            </div>
            `;


        // Simulate AI processing
        setTimeout(function () {

            generateDocumentation(
                inputType,
                documentation,
                language
            );

        }, 1500);

    }
);


// ================================
// Generate Documentation Function
// ================================

function generateDocumentation(
    inputType,
    documentationType,
    language
) {

    let title = "";
    let content = "";


    // README
    if (documentationType === "readme") {

        title = "Project README";

        content = `# Software Project

## Overview

This project is designed to provide a software solution based on the given requirements.

## Features

- Requirement-based software development
- User-friendly interface
- Automated processing
- Error handling
- Scalable architecture

## Technology Stack

- Programming Language: ${language}
- Frontend: HTML, CSS, JavaScript
- Backend: Python / FastAPI
- AI Model: Large Language Model

## Installation

1. Clone the project.
2. Install the required dependencies.
3. Configure the application.
4. Start the application.

## Usage

Enter the required input and use the available features provided by the application.

## Future Enhancements

- Advanced AI assistance
- Improved security
- Cloud deployment
- Additional programming language support

## Conclusion

The system provides an intelligent approach to simplify software development and improve developer productivity.`;

    }


    // API Documentation
    else if (documentationType === "api") {

        title = "API Documentation";

        content = `# API Documentation

## API Overview

This API provides services required by the software application.

## Base URL

/api/v1

## Endpoints

### POST /analyze

Analyzes the submitted software requirement.

**Request:**

{
    "requirement": "User requirement description"
}

**Response:**

{
    "status": "success",
    "analysis": "Requirement analysis result"
}

---

### POST /generate

Generates source code based on the provided requirement.

**Request:**

{
    "requirement": "Software requirement",
    "language": "${language}"
}

**Response:**

{
    "status": "success",
    "code": "Generated source code"
}

---

### POST /debug

Analyzes source code and identifies possible errors.

**Request:**

{
    "code": "Source code",
    "language": "${language}"
}

**Response:**

{
    "status": "success",
    "errors": "Detected errors",
    "suggestion": "Suggested fix"
}

## Error Handling

The API returns appropriate error messages when invalid or incomplete input is provided.`;

    }


    // Code Documentation
    else if (documentationType === "code") {

        title = "Code Documentation";

        content = `# Code Documentation

## Programming Language

${language}

## Purpose

The provided source code is analyzed to explain its structure and functionality.

## Main Components

### Input Handling

The application receives input from the user and validates the provided information.

### Processing

The system processes the input according to the application requirements.

### Output

The processed result is returned to the user through the application interface.

## Functions

Functions should have clear names and descriptions explaining their purpose.

## Error Handling

The application should handle invalid input and runtime errors appropriately.

## Maintainability

The code should follow consistent naming conventions, modular design and reusable functions.

## Recommendations

- Use meaningful variable names.
- Add comments for complex logic.
- Handle exceptions properly.
- Follow coding standards.
- Avoid unnecessary duplicate code.`;

    }


    // Setup / Deployment
    else if (documentationType === "setup") {

        title = "Setup & Deployment Guide";

        content = `# Setup and Deployment Guide

## System Requirements

- Windows / Linux / macOS
- ${language} environment
- Node.js
- Python
- Internet connection

## Step 1: Install Dependencies

Install the required software and project dependencies.

## Step 2: Configure the Project

Create the required configuration files and add the necessary environment variables.

## Step 3: Start the Backend

Run the backend application using the appropriate command.

## Step 4: Start the Frontend

Open or start the frontend application.

## Step 5: Test the Application

Verify that all major features are working correctly.

## Deployment

The application can be deployed using a suitable cloud hosting platform.

## Security

- Keep API keys secure.
- Do not expose secret credentials.
- Validate user input.
- Use secure API communication.

## Troubleshooting

If the application does not start, verify the installed dependencies, configuration values and network connection.`;

    }


    // Display Result
    generatedDocumentation.innerHTML = `

        <div class="generated-doc-header">

            <div>

                <span class="doc-label">
                    AI GENERATED
                </span>

                <h2>${title}</h2>

                <p>
                    Generated using ${language}
                </p>

            </div>

            <div class="doc-actions">

                <button
                    class="copy-doc-btn"
                    id="copyDocBtn"
                >
                    📋 Copy
                </button>

                <button
                    class="download-doc-btn"
                    id="downloadDocBtn"
                >
                    ⬇ Download
                </button>

            </div>

        </div>


        <div class="documentation-content">

            <pre id="documentationText">${content}</pre>

        </div>

    `;


    // Completed Status
    documentationStatus.textContent =
        "Completed";

    documentationStatus.classList.remove(
        "loading"
    );

    documentationStatus.classList.add(
        "completed"
    );


    // Restore Button
    generateDocumentationBtn.disabled =
        false;

    generateDocumentationBtn.innerHTML =
        "<span>✨</span> Generate Documentation";


    // Copy Button
    const copyDocBtn =
        document.getElementById("copyDocBtn");

    copyDocBtn.addEventListener(
        "click",
        function () {

            navigator.clipboard.writeText(
                content
            );

            copyDocBtn.textContent =
                "✓ Copied";

            setTimeout(function () {

                copyDocBtn.textContent =
                    "📋 Copy";

            }, 1500);

        }
    );


    // Download Button
    const downloadDocBtn =
        document.getElementById(
            "downloadDocBtn"
        );

    downloadDocBtn.addEventListener(
        "click",
        function () {

            const file =
                new Blob(
                    [content],
                    {
                        type: "text/plain"
                    }
                );

            const url =
                URL.createObjectURL(file);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "generated-documentation.md";

            link.click();

            URL.revokeObjectURL(url);

        }
    );


    console.log(
        "Documentation generated successfully."
    );

}


// ================================
// Logout
// ================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

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

}