/*
=========================================================
DEVCORE AI - REQUIREMENT ANALYSIS
Connects the requirement analysis page to the FastAPI AI.
Uses the existing four-card HTML layout.
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // ELEMENTS
    // =====================================================

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


    // =====================================================
    // BACKEND API
    // =====================================================

    const API_URL =
        "http://127.0.0.1:8000/api/requirement-analysis";


    // =====================================================
    // CHECK REQUIRED HTML ELEMENTS
    // =====================================================

    const requiredElements = {
        requirementInput,
        charCount,
        analyzeBtn,
        loadingSection,
        resultsSection,
        functionalRequirements,
        nonFunctionalRequirements,
        missingRequirements,
        suggestions
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

    loadingSection.classList.remove("show");
    resultsSection.classList.remove("show");

    loadingSection.setAttribute("aria-hidden", "true");
    resultsSection.setAttribute("aria-hidden", "true");


    // =====================================================
    // CHARACTER COUNTER
    // =====================================================

    function updateCharacterCount() {

        charCount.textContent =
            `${requirementInput.value.length} / 5000 characters`;

    }

    requirementInput.addEventListener(
        "input",
        updateCharacterCount
    );

    updateCharacterCount();


    // =====================================================
    // ANALYZE BUTTON
    // =====================================================

    analyzeBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const requirement =
            requirementInput.value.trim();

        if (!requirement) {

            alert(
                "Please enter your software requirements before analyzing."
            );

            requirementInput.focus();

            return;
        }

        if (requirement.length < 20) {

            alert(
                "Please provide at least 20 characters describing your project."
            );

            requirementInput.focus();

            return;
        }

        startAnalysis(requirement);

    });


    // =====================================================
    // START ANALYSIS
    // =====================================================

    async function startAnalysis(requirement) {

        analyzeBtn.disabled = true;

        analyzeBtn.innerHTML = `
            <span class="btn-icon">◌</span>
            <span>Analyzing...</span>
        `;

        resultsSection.classList.remove("show");
        resultsSection.setAttribute("aria-hidden", "true");

        loadingSection.classList.add("show");
        loadingSection.setAttribute("aria-hidden", "false");

        clearResults();

        loadingSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        try {

            // Send the project description to FastAPI.

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    project_description: requirement
                })

            });


            // Read the response.

            const responseText = await response.text();

            let data;

            try {

                data = JSON.parse(responseText);

            } catch {

                throw new Error(
                    "The backend returned an invalid response. " +
                    "Check that the FastAPI server is running."
                );

            }


            // Handle HTTP errors.

            if (!response.ok) {

                const message =
                    typeof data.detail === "string"
                        ? data.detail
                        : "The server could not analyze your requirements.";

                throw new Error(message);

            }


            // Validate the AI response.

            if (
                !data.analysis ||
                typeof data.analysis !== "string"
            ) {

                throw new Error(
                    "The AI did not return a valid analysis report."
                );

            }


            // Display the report in the four existing cards.

            displayAnalysis(data.analysis);

            resultsSection.classList.add("show");
            resultsSection.setAttribute("aria-hidden", "false");

            resultsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } catch (error) {

            console.error(
                "DevCore AI requirement analysis error:",
                error
            );

            alert(
                "Unable to analyze requirements.\n\n" +
                getFriendlyError(error)
            );

        } finally {

            loadingSection.classList.remove("show");
            loadingSection.setAttribute("aria-hidden", "true");

            analyzeBtn.disabled = false;

            analyzeBtn.innerHTML = `
                <span>✦</span>
                <span>Analyze Requirements</span>
            `;

        }

    }


    // =====================================================
    // CLEAR RESULTS
    // =====================================================

    function clearResults() {

        functionalRequirements.replaceChildren();
        nonFunctionalRequirements.replaceChildren();
        missingRequirements.replaceChildren();
        suggestions.replaceChildren();

        if (functionalCount) {
            functionalCount.textContent = "0";
        }

        if (nonFunctionalCount) {
            nonFunctionalCount.textContent = "0";
        }

    }


    // =====================================================
    // DISPLAY AI ANALYSIS
    // =====================================================

    function displayAnalysis(markdown) {

        clearResults();

        /*
         * The backend currently returns a Markdown report.
         * Split it into sections using Markdown headings.
         */

        const sections = parseMarkdownSections(markdown);


        // Functional requirements

        const functionalText = findSection(sections, [
            "functional requirements",
            "functional requirement"
        ]);

        renderSection(
            functionalRequirements,
            functionalText,
            "No functional requirements were identified."
        );

        if (functionalCount) {

            functionalCount.textContent =
                String(countItems(functionalText));

        }


        // Non-functional requirements

        const nonFunctionalText = findSection(sections, [
            "non-functional requirements",
            "nonfunctional requirements",
            "non-functional requirement"
        ]);

        renderSection(
            nonFunctionalRequirements,
            nonFunctionalText,
            "No non-functional requirements were identified."
        );

        if (nonFunctionalCount) {

            nonFunctionalCount.textContent =
                String(countItems(nonFunctionalText));

        }


        // Missing or ambiguous information

        const missingText = findSection(sections, [
            "clarifying questions",
            "missing requirements",
            "missing or ambiguous information",
            "ambiguities",
            "assumptions and open questions"
        ]);

        renderSection(
            missingRequirements,
            missingText,
            "No separate clarification section was found in the report."
        );


        // Suggestions and recommendations

        const suggestionText = findSection(sections, [
            "suggestions",
            "recommendations",
            "recommended development phases",
            "suggested technology stack",
            "risks and assumptions",
            "constraints, risks, assumptions"
        ]);

        renderSection(
            suggestions,
            suggestionText,
            "Review the full analysis for additional recommendations."
        );

    }


    // =====================================================
    // PARSE MARKDOWN HEADINGS
    // =====================================================

    function parseMarkdownSections(markdown) {

        const lines = markdown.split(/\r?\n/);

        const sections = [];

        let currentTitle = "Overview";
        let currentContent = [];

        function saveSection() {

            sections.push({
                title: normalizeTitle(currentTitle),
                content: currentContent.join("\n").trim()
            });

        }

        for (const line of lines) {

            const headingMatch =
                line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/);

            if (headingMatch) {

                saveSection();

                currentTitle = headingMatch[1]
                    .replace(/\*\*/g, "")
                    .trim();

                currentContent = [];

            } else {

                currentContent.push(line);

            }

        }

        saveSection();

        return sections;

    }


    // =====================================================
    // NORMALIZE SECTION TITLES
    // =====================================================

    function normalizeTitle(title) {

        return title
            .toLowerCase()
            .replace(/^\d+[\s.)-]+/, "")
            .replace(/[*_`]/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, " ")
            .trim();

    }




    // =====================================================
// FIND AN EXACT REPORT SECTION
// =====================================================

function findSection(sections, possibleTitles) {

    const normalizedTitles = possibleTitles.map(
        normalizeTitle
    );

    // Match complete heading names only.
    const matchingSection = sections.find(section =>
        normalizedTitles.includes(section.title)
    );

    return matchingSection
        ? matchingSection.content
        : "";
}

// =====================================================
// RENDER ORGANIZED REQUIREMENT RESULTS
// =====================================================

function renderSection(container, markdown, emptyMessage) {

    container.replaceChildren();

    if (!markdown || !markdown.trim()) {

        const message = document.createElement("p");

        message.className = "empty-result";
        message.textContent = emptyMessage;

        container.appendChild(message);

        return;
    }

    const lines = markdown.split(/\r?\n/);

    let table = null;
    let tableBody = null;
    let list = null;

    function createTable() {

        table = document.createElement("table");
        table.className = "analysis-table";

        const tbody = document.createElement("tbody");

        tableBody = tbody;

        table.appendChild(tbody);
        container.appendChild(table);

    }

    function finishTable() {

        table = null;
        tableBody = null;

    }

    function addCell(row, text, isHeader = false) {

        const cell = document.createElement(
            isHeader ? "th" : "td"
        );

        cell.textContent = text;

        row.appendChild(cell);

    }

    function cleanMarkdown(text) {

        return text
            .replace(/<[^>]*>/g, "")
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/\*(.*?)\*/g, "$1")
            .replace(/`([^`]+)`/g, "$1")
            .replace(/^\s*[-*+]\s+/, "")
            .trim();

    }

    for (const rawLine of lines) {

        const line = rawLine.trim();

        if (!line || /^[-|:\s]+$/.test(line)) {
            continue;
        }

        // Markdown table rows
        if (line.startsWith("|") && line.endsWith("|")) {

            const cells = line
                .slice(1, -1)
                .split("|")
                .map(cell => cleanMarkdown(cell));

            if (
                cells.every(cell => /^:?-{2,}:?$/.test(cell))
            ) {
                continue;
            }

            if (!table) {
                createTable();
            }

            const row = document.createElement("tr");

            const isHeader = tableBody.children.length === 0;

            cells.forEach(cell => {
                addCell(row, cell, isHeader);
            });

            tableBody.appendChild(row);

            list = null;

            continue;
        }

        finishTable();

        // Markdown headings
        const headingMatch = line.match(/^#{1,6}\s+(.+)$/);

        if (headingMatch) {

            const heading = document.createElement("h4");

            heading.className = "analysis-subheading";
            heading.textContent = cleanMarkdown(headingMatch[1]);

            container.appendChild(heading);

            list = null;

            continue;
        }

        // Numbered or bulleted requirements
        const listMatch = line.match(
            /^(?:[-*+]\s+|\d+[.)]\s+)(.+)$/
        );

        if (listMatch) {

            if (!list) {

                list = document.createElement("ul");

                list.className = "analysis-list";

                container.appendChild(list);

            }

            const item = document.createElement("li");

            item.textContent = cleanMarkdown(listMatch[1]);

            list.appendChild(item);

            continue;
        }

        // Regular paragraph
        list = null;

        const paragraph = document.createElement("p");

        paragraph.className = "analysis-paragraph";
        paragraph.textContent = cleanMarkdown(line);

        container.appendChild(paragraph);

    }

}

    // =====================================================
    // COUNT REQUIREMENT ITEMS
    // =====================================================

    function countItems(markdown) {

        if (!markdown || !markdown.trim()) {

            return 0;

        }

        const lines = markdown.split(/\r?\n/);

        const items = lines.filter(line =>
            /^\s*(?:[-*+]|\d+[.)])\s+/.test(line)
        );

        return items.length;

    }


    // =====================================================
    // FRIENDLY ERROR MESSAGES
    // =====================================================

    function getFriendlyError(error) {

        if (error instanceof TypeError) {

            return (
                "Cannot connect to the DevCore AI backend.\n\n" +
                "Make sure FastAPI is running at:\n" +
                "http://127.0.0.1:8000\n\n" +
                "Also check that the frontend is allowed to access the backend."
            );

        }

        return error.message ||
            "An unexpected error occurred. Please try again.";

    }

});