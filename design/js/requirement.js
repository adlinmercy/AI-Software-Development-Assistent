/* =========================================================
   DEVCORE AI - REQUIREMENT ANALYSIS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= ELEMENTS ================= */

    const requirementInput =
        document.getElementById("requirementInput");

    const charCount =
        document.getElementById("charCount");

    const analyzeBtn =
        document.getElementById("analyzeBtn");

    const loadingSection =
        document.getElementById("loadingSection");

    const resultsSection =
        document.getElementById("resultsSection");

    const functionalRequirements =
        document.getElementById("functionalRequirements");

    const nonFunctionalRequirements =
        document.getElementById("nonFunctionalRequirements");

    const missingRequirements =
        document.getElementById("missingRequirements");

    const suggestions =
        document.getElementById("suggestions");

    const functionalCount =
        document.getElementById("functionalCount");

    const nonFunctionalCount =
        document.getElementById("nonFunctionalCount");


    /* ================= CHARACTER COUNTER ================= */

    requirementInput.addEventListener("input", function () {

        const currentLength = requirementInput.value.length;

        charCount.textContent =
            `${currentLength} / 5000 characters`;

    });


    /* ================= ANALYZE BUTTON ================= */

    analyzeBtn.addEventListener("click", function () {

        const requirement =
            requirementInput.value.trim();


        /* Empty validation */

        if (requirement === "") {

            alert(
                "Please enter your software requirements before analyzing."
            );

            requirementInput.focus();

            return;
        }


        /* Minimum input */

        if (requirement.length < 20) {

            alert(
                "Please provide a little more information about your software requirement."
            );

            requirementInput.focus();

            return;
        }


        /* Start analysis */

        startAnalysis(requirement);

    });


    /* ================= START ANALYSIS ================= */

    function startAnalysis(requirement) {

        /* Disable button */

        analyzeBtn.disabled = true;

        analyzeBtn.innerHTML =
            `<span class="btn-icon">◌</span>
             <span>Analyzing...</span>`;


        /* Hide previous results */

        resultsSection.classList.remove("show");


        /* Show loading */

        loadingSection.classList.add("show");


        /* Scroll to loading section */

        loadingSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        /*
         * Frontend demo delay.
         *
         * Later this will be replaced with:
         *
         * fetch("/api/analyze-requirements", {...})
         */

        setTimeout(function () {

            const analysis =
                generateDemoAnalysis(requirement);

            displayResults(analysis);

            loadingSection.classList.remove("show");

            resultsSection.classList.add("show");

            analyzeBtn.disabled = false;

            analyzeBtn.innerHTML =
                `<span class="btn-icon">✦</span>
                 <span>Analyze Requirements</span>`;


            /* Scroll to results */

            setTimeout(function () {

                resultsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 150);

        }, 1800);

    }


    /* =====================================================
       DEMO AI ANALYSIS
       ===================================================== */

    function generateDemoAnalysis(requirement) {

        const text =
            requirement.toLowerCase();


        /* ---------------- Functional ---------------- */

        const functional = [];


        if (
            text.includes("login") ||
            text.includes("sign in") ||
            text.includes("authentication")
        ) {
            functional.push(
                "The system should provide secure user authentication and login functionality."
            );
        }


        if (
            text.includes("register") ||
            text.includes("registration") ||
            text.includes("signup")
        ) {
            functional.push(
                "The system should allow new users to create an account."
            );
        }


        if (
            text.includes("admin") ||
            text.includes("administrator")
        ) {
            functional.push(
                "The system should provide administrative functionality for managing system data and users."
            );
        }


        if (
            text.includes("track") ||
            text.includes("location") ||
            text.includes("live")
        ) {
            functional.push(
                "The system should provide real-time tracking or status information."
            );
        }


        if (
            text.includes("notification") ||
            text.includes("alert")
        ) {
            functional.push(
                "The system should provide notifications or alerts to relevant users."
            );
        }


        if (
            text.includes("report") ||
            text.includes("reports")
        ) {
            functional.push(
                "The system should generate reports based on available system data."
            );
        }


        if (
            text.includes("database") ||
            text.includes("store") ||
            text.includes("save")
        ) {
            functional.push(
                "The system should store and retrieve required application data."
            );
        }


        if (functional.length === 0) {

            functional.push(
                "The system should implement the functionality described in the provided software requirement."
            );

            functional.push(
                "The system should accept user input and process it according to the defined business requirements."
            );

            functional.push(
                "The system should provide appropriate output based on the user's request."
            );

        }


        /* ---------------- Non Functional ---------------- */

        const nonFunctional = [

            "The system should provide a user-friendly and easy-to-use interface.",

            "The system should provide reliable and consistent responses.",

            "The system should protect user data and prevent unauthorized access.",

            "The system should provide acceptable response time for normal user operations."

        ];


        /* ---------------- Missing Information ---------------- */

        const missing = [];


        if (
            !text.includes("user") &&
            !text.includes("student") &&
            !text.includes("admin") &&
            !text.includes("customer")
        ) {
            missing.push(
                "The target users or user roles are not clearly specified."
            );
        }


        if (
            !text.includes("database") &&
            !text.includes("data") &&
            !text.includes("store")
        ) {
            missing.push(
                "The required data storage and database details are not specified."
            );
        }


        if (
            !text.includes("security") &&
            !text.includes("secure")
        ) {
            missing.push(
                "Specific security requirements have not been defined."
            );
        }


        if (
            !text.includes("performance") &&
            !text.includes("fast") &&
            !text.includes("response")
        ) {
            missing.push(
                "Performance and response-time expectations are not clearly defined."
            );
        }


        if (missing.length === 0) {

            missing.push(
                "No major ambiguity was detected from the provided description. Detailed stakeholder validation is still recommended."
            );

        }


        /* ---------------- Suggestions ---------------- */

        const suggestionsList = [

            "Clearly define all user roles and their permissions.",

            "Specify the expected inputs and outputs for each major feature.",

            "Define security, performance, and scalability requirements.",

            "Identify important business rules and system constraints.",

            "Break large requirements into smaller, testable requirements."

        ];


        return {
            functional: functional,
            nonFunctional: nonFunctional,
            missing: missing,
            suggestions: suggestionsList
        };

    }


    /* =====================================================
       DISPLAY RESULTS
       ===================================================== */

    function displayResults(analysis) {


        /* Functional requirements */

        functionalRequirements.innerHTML =
            createList(analysis.functional);

        functionalCount.textContent =
            analysis.functional.length;


        /* Non-functional requirements */

        nonFunctionalRequirements.innerHTML =
            createList(analysis.nonFunctional);

        nonFunctionalCount.textContent =
            analysis.nonFunctional.length;


        /* Missing information */

        missingRequirements.innerHTML =
            createList(analysis.missing);


        /* Suggestions */

        suggestions.innerHTML =
            createList(analysis.suggestions);

    }


    /* =====================================================
       CREATE LIST
       ===================================================== */

    function createList(items) {

        if (!items || items.length === 0) {

            return `
                <p class="empty-result">
                    No information available.
                </p>
            `;

        }


        let html = '<ul class="result-list">';


        items.forEach(function (item) {

            html += `
                <li>${escapeHTML(item)}</li>
            `;

        });


        html += "</ul>";

        return html;

    }


    /* =====================================================
       SECURITY
       Prevent raw HTML from user input appearing in results
       ===================================================== */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }

});