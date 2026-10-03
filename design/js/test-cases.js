const testInput = document.getElementById("testInput");
const charCount = document.getElementById("charCount");

const generateBtn = document.getElementById("generateBtn");

const loadingSection = document.getElementById("loadingSection");
const resultsSection = document.getElementById("resultsSection");

const testCasesBody = document.getElementById("testCasesBody");

const totalTests = document.getElementById("totalTests");
const positiveTests = document.getElementById("positiveTests");
const negativeTests = document.getElementById("negativeTests");
const coverage = document.getElementById("coverage");

const testingSummary = document.getElementById("testingSummary");

const language = document.getElementById("language");
const testType = document.getElementById("testType");


/* =========================
   CHARACTER COUNTER
========================= */

testInput.addEventListener("input", () => {

    const length = testInput.value.length;

    charCount.textContent = `${length} / 5000 characters`;

});


/* =========================
   GENERATE TEST CASES
========================= */

generateBtn.addEventListener("click", () => {

    const input = testInput.value.trim();

    if (input.length < 10) {

        alert("Please enter a detailed requirement or source code.");

        testInput.focus();

        return;
    }


    generateBtn.disabled = true;

    loadingSection.classList.add("show");

    resultsSection.classList.remove("show");


    setTimeout(() => {

        const testCases = generateDemoTestCases(input);

        displayTestCases(testCases);

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
   DEMO TEST GENERATOR
========================= */

function generateDemoTestCases(input) {

    const text = input.toLowerCase();

    const cases = [];


    /*
       LOGIN
    */

    if (
        text.includes("login") ||
        text.includes("password") ||
        text.includes("email")
    ) {

        cases.push(
            {
                id: "TC-001",
                test: "Login with valid credentials",
                input: "Valid email and valid password",
                expected: "User should be successfully logged in",
                priority: "High",
                type: "positive"
            },

            {
                id: "TC-002",
                test: "Login with invalid password",
                input: "Valid email and incorrect password",
                expected: "System should display an error message",
                priority: "High",
                type: "negative"
            },

            {
                id: "TC-003",
                test: "Login with invalid email",
                input: "Unregistered email address",
                expected: "System should reject the login attempt",
                priority: "High",
                type: "negative"
            },

            {
                id: "TC-004",
                test: "Login with empty fields",
                input: "Email and password are empty",
                expected: "Validation message should be displayed",
                priority: "Medium",
                type: "negative"
            }
        );

    }


    /*
       REGISTRATION
    */

    if (
        text.includes("register") ||
        text.includes("registration") ||
        text.includes("signup")
    ) {

        cases.push(
            {
                id: `TC-${String(cases.length + 1).padStart(3, "0")}`,
                test: "Register with valid information",
                input: "Valid name, email and password",
                expected: "New user account should be created",
                priority: "High",
                type: "positive"
            },

            {
                id: `TC-${String(cases.length + 1).padStart(3, "0")}`,
                test: "Register with existing email",
                input: "Email already registered",
                expected: "System should show account already exists message",
                priority: "Medium",
                type: "negative"
            }
        );

    }


    /*
       PAYMENT
    */

    if (
        text.includes("payment") ||
        text.includes("transaction") ||
        text.includes("checkout")
    ) {

        cases.push(
            {
                id: `TC-${String(cases.length + 1).padStart(3, "0")}`,
                test: "Complete payment successfully",
                input: "Valid payment details",
                expected: "Payment should be processed successfully",
                priority: "High",
                type: "positive"
            },

            {
                id: `TC-${String(cases.length + 1).padStart(3, "0")}`,
                test: "Payment with invalid details",
                input: "Invalid card or payment information",
                expected: "Payment should be rejected",
                priority: "High",
                type: "negative"
            }
        );

    }


    /*
       SEARCH
    */

    if (
        text.includes("search") ||
        text.includes("find")
    ) {

        cases.push(
            {
                id: `TC-${String(cases.length + 1).padStart(3, "0")}`,
                test: "Search with valid keyword",
                input: "Enter a valid search keyword",
                expected: "Relevant search results should be displayed",
                priority: "Medium",
                type: "positive"
            },

            {
                id: `TC-${String(cases.length + 1).padStart(3, "0")}`,
                test: "Search with empty keyword",
                input: "Empty search field",
                expected: "Validation message should be displayed",
                priority: "Low",
                type: "negative"
            }
        );

    }


    /*
       DEFAULT CASES
    */

    if (cases.length === 0) {

        cases.push(
            {
                id: "TC-001",
                test: "Verify valid input",
                input: "Enter valid input data",
                expected: "System should process the input successfully",
                priority: "High",
                type: "positive"
            },

            {
                id: "TC-002",
                test: "Verify invalid input",
                input: "Enter invalid input data",
                expected: "System should display an appropriate error message",
                priority: "High",
                type: "negative"
            },

            {
                id: "TC-003",
                test: "Verify empty input",
                input: "Leave required fields empty",
                expected: "System should display validation messages",
                priority: "Medium",
                type: "negative"
            },

            {
                id: "TC-004",
                test: "Verify normal system operation",
                input: "Provide valid data according to requirements",
                expected: "System should perform the expected operation",
                priority: "Medium",
                type: "positive"
            },

            {
                id: "TC-005",
                test: "Verify boundary condition",
                input: "Provide minimum or maximum allowed value",
                expected: "System should handle the boundary value correctly",
                priority: "Low",
                type: "positive"
            }
        );

    }


    return cases;
}


/* =========================
   DISPLAY TEST CASES
========================= */

function displayTestCases(cases) {

    testCasesBody.innerHTML = "";

    let positive = 0;
    let negative = 0;


    cases.forEach(testCase => {

        if (testCase.type === "positive") {
            positive++;
        }

        if (testCase.type === "negative") {
            negative++;
        }


        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <span class="test-id">${testCase.id}</span>
            </td>

            <td>
                ${escapeHTML(testCase.test)}
            </td>

            <td>
                ${escapeHTML(testCase.input)}
            </td>

            <td>
                ${escapeHTML(testCase.expected)}
            </td>

            <td>
                <span class="priority ${testCase.priority.toLowerCase()}">
                    ${testCase.priority}
                </span>
            </td>
        `;

        testCasesBody.appendChild(row);

    });


    const total = cases.length;

    const coverageValue = Math.min(
        98,
        70 + (total * 4)
    );


    totalTests.textContent = total;

    positiveTests.textContent = positive;

    negativeTests.textContent = negative;

    coverage.textContent = `${coverageValue}%`;


    displayTestingSummary(
        total,
        positive,
        negative,
        coverageValue
    );
}


/* =========================
   TESTING SUMMARY
========================= */

function displayTestingSummary(
    total,
    positive,
    negative,
    coverageValue
) {

    const selectedLanguage =
        language.options[language.selectedIndex].text;

    const selectedType =
        testType.options[testType.selectedIndex].text;


    testingSummary.innerHTML = `

        <p>
            DevCore AI generated
            <strong>${total} test cases</strong>
            using ${selectedType}.
            The selected programming language is
            <strong>${selectedLanguage}</strong>.
        </p>

        <ul>
            <li>${positive} positive test cases were generated.</li>
            <li>${negative} negative and validation test cases were generated.</li>
            <li>Estimated requirement coverage is ${coverageValue}%.</li>
            <li>Test cases should be reviewed and updated according to the final system implementation.</li>
        </ul>

    `;
}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}