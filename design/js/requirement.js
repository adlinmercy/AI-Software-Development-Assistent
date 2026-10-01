const requirementInput = document.getElementById("requirementInput");
const characterCount = document.getElementById("characterCount");
const analyzeBtn = document.getElementById("analyzeBtn");
const analysisResult = document.getElementById("analysisResult");


// ========================================
// CHARACTER COUNTER
// ========================================

requirementInput.addEventListener("input", () => {
    const count = requirementInput.value.length;

    characterCount.textContent = `${count} characters`;
});


// ========================================
// ANALYZE REQUIREMENTS
// ========================================

analyzeBtn.addEventListener("click", () => {

    const requirement = requirementInput.value.trim();

    // Check empty input
    if (requirement === "") {
        alert("Please enter your project requirements first.");
        requirementInput.focus();
        return;
    }


    // Loading state
    analyzeBtn.disabled = true;

    analyzeBtn.innerHTML = `
        <span>⟳</span>
        Analyzing...
    `;

    analysisResult.innerHTML = `
        <div class="empty-analysis">
            <div class="empty-icon">⟳</div>
            <h3>Analyzing Requirements...</h3>
            <p>
                DevCore AI is analyzing your project requirements.
            </p>
        </div>
    `;


    // Temporary AI processing simulation
    setTimeout(() => {

        analysisResult.innerHTML = `

            <div class="analysis-content">

                <div class="result-section">

                    <h3>
                        <span class="result-icon functional-icon">✓</span>
                        Functional Requirements
                    </h3>

                    <ul>
                        <li>Users should be able to enter software requirements.</li>
                        <li>The system should analyze the provided requirements.</li>
                        <li>The system should identify functional requirements.</li>
                        <li>The system should identify non-functional requirements.</li>
                        <li>The system should detect ambiguities and missing information.</li>
                    </ul>

                </div>


                <div class="result-section">

                    <h3>
                        <span class="result-icon quality-icon">◈</span>
                        Non-Functional Requirements
                    </h3>

                    <ul>
                        <li>The system should provide results quickly.</li>
                        <li>The application should be easy to use.</li>
                        <li>User requirements should be processed securely.</li>
                        <li>The system should provide reliable analysis.</li>
                    </ul>

                </div>


                <div class="result-section">

                    <h3>
                        <span class="result-icon warning-icon">!</span>
                        Ambiguities & Missing Information
                    </h3>

                    <ul>
                        <li>Specific user roles are not clearly defined.</li>
                        <li>Required technologies are not specified.</li>
                        <li>Security requirements need further clarification.</li>
                        <li>Expected system performance is not specified.</li>
                    </ul>

                </div>


                <div class="result-section">

                    <h3>
                        <span class="result-icon suggestion-icon">✦</span>
                        AI Suggestions
                    </h3>

                    <ul>
                        <li>Clearly define all types of users and their permissions.</li>
                        <li>Specify the expected system features and workflow.</li>
                        <li>Define security and performance requirements.</li>
                        <li>Specify the technologies or platforms to be used.</li>
                    </ul>

                </div>

            </div>
        `;


        // Restore button
        analyzeBtn.disabled = false;

        analyzeBtn.innerHTML = `
            <span>✦</span>
            Analyze Requirements
        `;

    }, 1500);

});