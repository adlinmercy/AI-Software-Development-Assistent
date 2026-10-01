const reviewLanguage = document.getElementById("reviewLanguage");
const reviewCode = document.getElementById("reviewCode");
const reviewBtn = document.getElementById("reviewBtn");
const reviewResult = document.getElementById("reviewResult");


// ========================================
// UPDATE FILE NAME & LANGUAGE
// ========================================

reviewLanguage.addEventListener("change", () => {

    const language = reviewLanguage.value;

    const fileName =
        document.querySelector(".editor-file-name");

    const languageLabel =
        document.querySelector(".editor-language");


    languageLabel.textContent =
        language.toUpperCase();


    if (language === "Java") {
        fileName.textContent = "your-code.java";
    }

    else if (language === "Python") {
        fileName.textContent = "your-code.py";
    }

    else if (language === "JavaScript") {
        fileName.textContent = "your-code.js";
    }

    else if (language === "C") {
        fileName.textContent = "your-code.c";
    }

    else if (language === "C++") {
        fileName.textContent = "your-code.cpp";
    }

});


// ========================================
// REVIEW CODE
// ========================================

reviewBtn.addEventListener("click", () => {

    const code = reviewCode.value.trim();
    const language = reviewLanguage.value;


    // Validation

    if (code === "") {

        alert("Please paste your code first.");

        reviewCode.focus();

        return;
    }


    // Loading

    reviewBtn.disabled = true;

    reviewBtn.innerHTML = `
        <span>⟳</span>
        Reviewing...
    `;


    reviewResult.innerHTML = `

        <div class="empty-review">

            <div class="empty-icon">
                ⟳
            </div>

            <h3>
                Reviewing Your Code...
            </h3>

            <p>
                DevCore AI is analyzing your code
                for quality, security, performance,
                and best practices.
            </p>

        </div>

    `;


    // Temporary AI simulation

    setTimeout(() => {


        reviewResult.innerHTML = `

            <div class="review-analysis">


                <!-- OVERALL SCORE -->

                <div class="review-summary">

                    <div>

                        <span class="summary-label">
                            Overall Code Quality
                        </span>

                        <h2>
                            82 / 100
                        </h2>

                    </div>

                    <span class="summary-badge">
                        Good
                    </span>

                </div>


                <!-- CODE QUALITY -->

                <div class="analysis-section">

                    <div class="analysis-heading">

                        <div class="analysis-icon quality-icon">
                            ✓
                        </div>

                        <div>

                            <h3>
                                Code Quality
                            </h3>

                            <span>
                                Good
                            </span>

                        </div>

                    </div>


                    <p>
                        The code structure is understandable
                        and uses appropriate programming
                        constructs. Variable naming and
                        overall organization can be improved
                        for better maintainability.
                    </p>

                </div>


                <!-- SECURITY -->

                <div class="analysis-section">

                    <div class="analysis-heading">

                        <div class="analysis-icon security-icon">
                            🔒
                        </div>

                        <div>

                            <h3>
                                Security Analysis
                            </h3>

                            <span>
                                Low Risk
                            </span>

                        </div>

                    </div>


                    <p>
                        No major security issue was detected
                        in the submitted code. Input validation
                        should be added when accepting data
                        directly from users.
                    </p>

                </div>


                <!-- PERFORMANCE -->

                <div class="analysis-section">

                    <div class="analysis-heading">

                        <div class="analysis-icon performance-icon">
                            ⚡
                        </div>

                        <div>

                            <h3>
                                Performance
                            </h3>

                            <span>
                                Good
                            </span>

                        </div>

                    </div>


                    <p>
                        The current implementation has
                        acceptable performance for normal
                        input sizes. Avoid unnecessary loops
                        and repeated calculations when working
                        with larger datasets.
                    </p>

                </div>


                <!-- BEST PRACTICES -->

                <div class="analysis-section">

                    <div class="analysis-heading">

                        <div class="analysis-icon practice-icon">
                            ★
                        </div>

                        <div>

                            <h3>
                                Best Practices
                            </h3>

                            <span>
                                Improvements Available
                            </span>

                        </div>

                    </div>


                    <ul class="suggestion-list">

                        <li>
                            Use meaningful and descriptive
                            variable names.
                        </li>

                        <li>
                            Add comments for complex logic.
                        </li>

                        <li>
                            Validate user input before processing.
                        </li>

                        <li>
                            Follow consistent coding standards
                            for the selected language.
                        </li>

                    </ul>

                </div>


                <!-- IMPROVEMENT SUGGESTIONS -->

                <div class="suggestions-box">

                    <h3>
                        💡 Improvement Suggestions
                    </h3>

                    <p>
                        DevCore AI recommends improving
                        readability, adding proper input
                        validation, handling possible edge
                        cases, and following language-specific
                        coding standards.
                    </p>

                </div>


            </div>

        `;


        // Update status

        const status =
            document.querySelector(".review-status");

        status.textContent = "Completed";


        // Restore button

        reviewBtn.disabled = false;

        reviewBtn.innerHTML = `
            <span>✦</span>
            Review Code
        `;


        // Console information

        console.log("Code Review Completed");

        console.log("Language:", language);

        console.log("Code:", code);


    }, 1500);

});