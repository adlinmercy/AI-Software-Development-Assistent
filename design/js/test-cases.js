const testInputType = document.getElementById("testInputType");
const testLanguage = document.getElementById("testLanguage");
const testInput = document.getElementById("testInput");
const charCount = document.getElementById("charCount");

const generateTestBtn =
    document.getElementById("generateTestBtn");

const testResult =
    document.getElementById("testResult");

const testStatus =
    document.getElementById("testStatus");


// ========================================
// CHARACTER COUNT
// ========================================

testInput.addEventListener("input", () => {

    charCount.textContent = testInput.value.length;

});


// ========================================
// CHANGE PLACEHOLDER
// ========================================

testInputType.addEventListener("change", () => {

    if (testInputType.value === "Requirement") {

        testInput.placeholder =
            "Enter your software requirement here...\n\nExample:\nThe system should allow users to login using email and password.";

    }

    else {

        testInput.placeholder =
            "Paste your source code here...";

    }

});


// ========================================
// GENERATE TEST CASES
// ========================================

generateTestBtn.addEventListener("click", () => {

    const input = testInput.value.trim();

    const inputType = testInputType.value;

    const language = testLanguage.value;


    // ------------------------------------
    // VALIDATION
    // ------------------------------------

    if (input === "") {

        alert(
            "Please enter a requirement or paste your code first."
        );

        testInput.focus();

        return;
    }


    // ------------------------------------
    // LOADING STATE
    // ------------------------------------

    generateTestBtn.disabled = true;

    generateTestBtn.innerHTML = `
        <span>⟳</span>
        Generating...
    `;

    testStatus.textContent = "Analyzing";


    testResult.innerHTML = `

        <div class="empty-test">

            <div class="empty-test-icon">
                ⟳
            </div>

            <h3>
                Generating Test Cases...
            </h3>

            <p>
                DevCore AI is analyzing your
                ${inputType.toLowerCase()} and
                creating meaningful test scenarios.
            </p>

        </div>

    `;


    // ------------------------------------
    // AI SIMULATION
    // ------------------------------------

    setTimeout(() => {

        testResult.innerHTML = `

            <div class="generated-tests">


                <!-- SUMMARY -->

                <div class="test-summary">

                    <div>

                        <span class="summary-label">
                            Test Cases Generated
                        </span>

                        <h2>
                            6 Test Cases
                        </h2>

                    </div>

                    <span class="summary-badge">
                        ${language}
                    </span>

                </div>


                <!-- TEST CASE 1 -->

                <div class="test-case">

                    <div class="test-case-header">

                        <div>

                            <span class="test-id">
                                TC-001
                            </span>

                            <h3>
                                Valid Input Test
                            </h3>

                        </div>

                        <span class="priority high">
                            High
                        </span>

                    </div>

                    <div class="test-details">

                        <p>
                            <strong>Test Description:</strong>
                            Verify that the system works correctly
                            with valid input.
                        </p>

                        <p>
                            <strong>Input:</strong>
                            Valid and correctly formatted data.
                        </p>

                        <p>
                            <strong>Expected Result:</strong>
                            The system should process the input
                            successfully and display the expected output.
                        </p>

                    </div>

                </div>


                <!-- TEST CASE 2 -->

                <div class="test-case">

                    <div class="test-case-header">

                        <div>

                            <span class="test-id">
                                TC-002
                            </span>

                            <h3>
                                Empty Input Test
                            </h3>

                        </div>

                        <span class="priority high">
                            High
                        </span>

                    </div>

                    <div class="test-details">

                        <p>
                            <strong>Test Description:</strong>
                            Verify how the system handles empty input.
                        </p>

                        <p>
                            <strong>Input:</strong>
                            Empty or blank input.
                        </p>

                        <p>
                            <strong>Expected Result:</strong>
                            The system should display a suitable
                            validation message instead of processing
                            the empty input.
                        </p>

                    </div>

                </div>


                <!-- TEST CASE 3 -->

                <div class="test-case">

                    <div class="test-case-header">

                        <div>

                            <span class="test-id">
                                TC-003
                            </span>

                            <h3>
                                Invalid Input Test
                            </h3>

                        </div>

                        <span class="priority high">
                            High
                        </span>

                    </div>

                    <div class="test-details">

                        <p>
                            <strong>Test Description:</strong>
                            Verify that invalid or incorrectly formatted
                            data is handled properly.
                        </p>

                        <p>
                            <strong>Input:</strong>
                            Invalid data or incorrect format.
                        </p>

                        <p>
                            <strong>Expected Result:</strong>
                            The system should reject the invalid input
                            and display an appropriate error message.
                        </p>

                    </div>

                </div>


                <!-- TEST CASE 4 -->

                <div class="test-case">

                    <div class="test-case-header">

                        <div>

                            <span class="test-id">
                                TC-004
                            </span>

                            <h3>
                                Boundary Value Test
                            </h3>

                        </div>

                        <span class="priority medium">
                            Medium
                        </span>

                    </div>

                    <div class="test-details">

                        <p>
                            <strong>Test Description:</strong>
                            Verify system behavior at minimum and
                            maximum acceptable input values.
                        </p>

                        <p>
                            <strong>Input:</strong>
                            Minimum and maximum boundary values.
                        </p>

                        <p>
                            <strong>Expected Result:</strong>
                            The system should correctly process valid
                            boundary values without errors.
                        </p>

                    </div>

                </div>


                <!-- TEST CASE 5 -->

                <div class="test-case">

                    <div class="test-case-header">

                        <div>

                            <span class="test-id">
                                TC-005
                            </span>

                            <h3>
                                Special Character Test
                            </h3>

                        </div>

                        <span class="priority medium">
                            Medium
                        </span>

                    </div>

                    <div class="test-details">

                        <p>
                            <strong>Test Description:</strong>
                            Verify how the application handles
                            special characters.
                        </p>

                        <p>
                            <strong>Input:</strong>
                            Special characters such as
                            @, #, %, &, or symbols.
                        </p>

                        <p>
                            <strong>Expected Result:</strong>
                            The system should safely handle the
                            input without crashing.
                        </p>

                    </div>

                </div>


                <!-- TEST CASE 6 -->

                <div class="test-case">

                    <div class="test-case-header">

                        <div>

                            <span class="test-id">
                                TC-006
                            </span>

                            <h3>
                                Large Input Test
                            </h3>

                        </div>

                        <span class="priority low">
                            Low
                        </span>

                    </div>

                    <div class="test-details">

                        <p>
                            <strong>Test Description:</strong>
                            Verify the system behavior when a large
                            amount of data is provided.
                        </p>

                        <p>
                            <strong>Input:</strong>
                            Large input exceeding normal usage.
                        </p>

                        <p>
                            <strong>Expected Result:</strong>
                            The system should handle the input
                            efficiently without crashing or freezing.
                        </p>

                    </div>

                </div>


                <!-- AI RECOMMENDATION -->

                <div class="test-recommendation">

                    <h3>
                        💡 AI Testing Recommendation
                    </h3>

                    <p>
                        DevCore AI recommends combining functional,
                        negative, and boundary testing to improve
                        test coverage and identify unexpected
                        application behavior.
                    </p>

                </div>


            </div>

        `;


        // ------------------------------------
        // UPDATE STATUS
        // ------------------------------------

        testStatus.textContent = "Completed";


        // ------------------------------------
        // RESTORE BUTTON
        // ------------------------------------

        generateTestBtn.disabled = false;

        generateTestBtn.innerHTML = `
            <span>✦</span>
            Generate Test Cases
        `;


        // ------------------------------------
        // CONSOLE
        // ------------------------------------

        console.log(
            "Test Case Generation Completed"
        );

        console.log(
            "Input Type:",
            inputType
        );

        console.log(
            "Language:",
            language
        );

        console.log(
            "Input:",
            input
        );


    }, 1500);

});