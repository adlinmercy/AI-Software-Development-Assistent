/*
=========================================================
DEVCORE AI - TEST CASE GENERATION
Connected to the FastAPI backend
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://127.0.0.1:8000/api/test-cases";

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

    // Check required HTML elements
    const requiredElements = [
        testInput, charCount, generateBtn, loadingSection,
        resultsSection, testCasesBody, totalTests,
        positiveTests, negativeTests, testingSummary,
        language, testType
    ];

    if (requiredElements.some(element => !element)) {
        console.error("DevCore AI: A required HTML element is missing.");
        return;
    }

    // Character counter
    testInput.addEventListener("input", () => {
        charCount.textContent =
            `${testInput.value.length} / 5000 characters`;
    });

    // Generate test cases
    generateBtn.addEventListener("click", generateTestCases);

    async function generateTestCases() {
        const requirement = testInput.value.trim();

        if (requirement.length < 10) {
            alert("Please enter at least 10 characters of requirements or source code.");
            testInput.focus();
            return;
        }

        generateBtn.disabled = true;
        loadingSection.classList.add("show");
        resultsSection.classList.remove("show");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    requirement: requirement,
                    language: language.value,
                    test_type: testType.value
                })
            });

            const data = await response.json();

            if (!response.ok) {
                const message = typeof data.detail === "string"
                    ? data.detail
                    : "Unable to generate test cases.";

                throw new Error(message);
            }

            if (
                !Array.isArray(data.test_cases) ||
                data.test_cases.length === 0
            ) {
                throw new Error("The AI did not return any test cases.");
            }

            displayTestCases(data);

            loadingSection.classList.remove("show");
            resultsSection.classList.add("show");

            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } catch (error) {
            console.error("Test Case Generation Error:", error);

            alert(
                error.message.includes("Failed to fetch")
                    ? "Cannot connect to DevCore AI. Please check whether the backend is running."
                    : error.message
            );

        } finally {
            loadingSection.classList.remove("show");
            generateBtn.disabled = false;
        }
    }

    // Display AI-generated test cases
    function displayTestCases(data) {
        testCasesBody.innerHTML = "";

        let positive = 0;
        let negative = 0;

        data.test_cases.forEach(testCase => {
            if (testCase.type === "positive") positive++;
            if (testCase.type === "negative") negative++;

            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            const idSpan = document.createElement("span");
            idSpan.className = "test-id";
            idSpan.textContent = testCase.id;
            idCell.appendChild(idSpan);

            const testCell = document.createElement("td");
            testCell.textContent = testCase.test;

            const inputCell = document.createElement("td");
            inputCell.textContent = testCase.input;

            const expectedCell = document.createElement("td");
            expectedCell.textContent = testCase.expected;

            const priorityCell = document.createElement("td");
            const prioritySpan = document.createElement("span");
            prioritySpan.className =
                `priority ${(testCase.priority || "Medium").toLowerCase()}`;
            prioritySpan.textContent = testCase.priority || "Medium";
            priorityCell.appendChild(prioritySpan);

            row.append(
                idCell,
                testCell,
                inputCell,
                expectedCell,
                priorityCell
            );

            testCasesBody.appendChild(row);
        });

        totalTests.textContent = data.test_cases.length;
        positiveTests.textContent = positive;
        negativeTests.textContent = negative;

        // The backend does not calculate actual code or requirement coverage.
        if (coverage) {
            coverage.textContent = "N/A";
            coverage.title =
                "Actual coverage requires code execution or requirement traceability.";
        }

        displayTestingSummary(
            data,
            positive,
            negative
        );
    }

    // Display summary
    function displayTestingSummary(data, positive, negative) {
        testingSummary.innerHTML = "";

        const paragraph = document.createElement("p");
        paragraph.append("DevCore AI generated ");

        const count = document.createElement("strong");
        count.textContent = `${data.test_cases.length} test cases`;
        paragraph.appendChild(count);

        paragraph.append(
            ` using ${data.test_type} testing. The selected programming language is `
        );

        const selectedLanguage = document.createElement("strong");
        selectedLanguage.textContent = data.language;
        paragraph.appendChild(selectedLanguage);

        const list = document.createElement("ul");

        const items = [
            `${positive} positive test cases generated.`,
            `${negative} negative test cases generated.`,
            "Review the generated cases against your actual requirements."
        ];

        items.forEach(text => {
            const li = document.createElement("li");
            li.textContent = text;
            list.appendChild(li);
        });

        if (data.summary) {
            const summaryHeading = document.createElement("h4");
            summaryHeading.textContent = "Testing Approach";

            const summaryText = document.createElement("p");
            summaryText.textContent = data.summary;

            testingSummary.append(
                paragraph,
                list,
                summaryHeading,
                summaryText
            );
        } else {
            testingSummary.append(paragraph, list);
        }
    }
});