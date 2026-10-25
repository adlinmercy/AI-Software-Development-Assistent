document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://127.0.0.1:8000/api/history";

    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const historyList = document.getElementById("historyList");
    const emptyState = document.getElementById("emptyState");
    const activityCount = document.getElementById("activityCount");

    let activities = [];

    const activityLabels = {
        requirement: "Requirement Analysis",
        generation: "Code Generation",
        debugging: "Code Debugging",
        review: "Code Review",
        testing: "Test Cases",
        documentation: "Documentation"
    };

    const activityIcons = {
        requirement: "⌕",
        generation: "</>",
        debugging: "⚙",
        review: "✓",
        testing: "□",
        documentation: "▤"
    };

    function formatDate(dateString) {
        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return dateString || "Date unavailable";
        }

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return `Today, ${date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })}`;
        }

        if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday, ${date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })}`;
        }

        return date.toLocaleString([], {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function renderHistory() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedFilter = filterSelect.value;

        const filteredActivities = activities.filter(activity => {
            const name = (activity.project_name || "").toLowerCase();
            const summary = (activity.summary || "").toLowerCase();

            const matchesSearch =
                name.includes(searchText) ||
                summary.includes(searchText);

            const matchesFilter =
                selectedFilter === "all" ||
                activity.activity_type === selectedFilter;

            return matchesSearch && matchesFilter;
        });

        historyList.replaceChildren();

        filteredActivities.forEach(activity => {
            const type = activity.activity_type;

            // Original card structure and CSS class names
            const card = document.createElement("div");
            card.className = "history-item";
            card.dataset.type = type;
            card.dataset.name = activity.project_name || "";

            const icon = document.createElement("div");
            icon.className = `history-icon ${type}`;
            icon.textContent = activityIcons[type] || "•";

            const details = document.createElement("div");
            details.className = "history-details";

            const main = document.createElement("div");
            main.className = "history-main";

            const title = document.createElement("h3");
            title.textContent = activity.project_name || "Untitled Activity";

            const badge = document.createElement("span");
            badge.className = "activity-type";
            badge.textContent = activityLabels[type] || type;

            const description = document.createElement("p");
            description.textContent =
                activity.summary || "Activity completed successfully.";

            const time = document.createElement("span");
            time.className = "history-time";
            time.textContent = formatDate(activity.created_at);

            const viewButton = document.createElement("button");
            viewButton.className = "view-btn";
            viewButton.type = "button";
            viewButton.textContent = "View";
            viewButton.addEventListener("click", () => {
                viewActivity(activity.id);
            });

            main.append(title, badge);
            details.append(main, description, time);
            card.append(icon, details, viewButton);
            historyList.appendChild(card);
        });

        activityCount.textContent =
            `${filteredActivities.length} ${
                filteredActivities.length === 1 ? "activity" : "activities"
            }`;

        emptyState.style.display =
            filteredActivities.length === 0 ? "block" : "none";
    }

    async function loadHistory() {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            activities = Array.isArray(data.activities)
                ? data.activities
                : [];

            renderHistory();
        } catch (error) {
            console.error("Failed to load Project History:", error);

            historyList.replaceChildren();
            activityCount.textContent = "0 activities";
            emptyState.style.display = "block";
        }
    }

    async function viewActivity(activityId) {
    try {
        const response = await fetch(`${API_URL}/${activityId}`);

        if (!response.ok) {
            throw new Error("Failed to load activity details.");
        }

        const data = await response.json();
        const activity = data.activity;

        if (!activity) {
            throw new Error("Activity details not found.");
        }

        const result = activity.result_data || {};

let output;

if (activity.activity_type === "review" || result.scores) {
    const scores = Object.entries(result.scores || {})
        .filter(([category, score]) => score > 0)
        .map(([category, score]) => {
            const label =
                category.charAt(0).toUpperCase() + category.slice(1);

            return `- **${label}:** ${score}/100`;
        })
        .join("\n");

    const findings = Array.isArray(result.findings)
        && result.findings.length > 0
        ? result.findings.map((finding, index) =>
            `### ${index + 1}. ${finding.type || "Finding"} — ${finding.severity || "Info"}\n${finding.text || ""}`
        ).join("\n\n")
        : "No significant findings reported.";

    const recommendations = Array.isArray(result.recommendations)
        && result.recommendations.length > 0
        ? result.recommendations.map((item, index) =>
            `${index + 1}. ${item}`
        ).join("\n")
        : "No recommendations provided.";

    output = `
# Code Review Results

## Summary
${result.summary || "No summary available."}

## Review Scores
${scores || "No review scores available."}

## Findings
${findings}

## Recommendations
${recommendations}
`;
} else if (
    activity.activity_type === "testing" ||
    Array.isArray(result.test_cases)
) {
    const testCases = Array.isArray(result.test_cases)
        ? result.test_cases
        : [];

    const caseSections = testCases.map((testCase, index) => {
        return [
            `### ${testCase.id || `TC-${String(index + 1).padStart(3, "0")}`}: ${testCase.test || `Test Case ${index + 1}`}`,
            `- **Type:** ${testCase.type || "Not specified"}`,
            `- **Priority:** ${testCase.priority || "Not specified"}`,
            `- **Input / Preconditions:** ${testCase.input || "Not specified"}`,
            `- **Expected Result:** ${testCase.expected || "Not specified"}`
        ].join("\n");
    }).join("\n\n");

    output = `
# Test Case Generation Report

**Language:** ${result.language || "Not specified"}

**Test Type:** ${result.test_type || "Not specified"}

## Summary

${result.summary || "No summary available."}

## Test Statistics

- **Total Tests:** ${result.total_tests ?? testCases.length}
- **Positive Tests:** ${result.positive_tests ?? testCases.filter(test => test.type === "positive").length}
- **Negative Tests:** ${result.negative_tests ?? testCases.filter(test => test.type === "negative").length}

## Generated Test Cases

${caseSections || "No test cases are available."}
`;
} else if (
    activity.activity_type === "generation" ||
    (result.code && result.explanation)
) {
    output = `# Code Generation Report

**Language:** ${result.language || "Not specified"}

**Framework:** ${result.framework || "None"}

## Generated Code

\`\`\`${(result.language || "").toLowerCase()}
${result.code || "No generated code available."}
\`\`\`

## Explanation

${result.explanation || "No explanation available."}
`;

} else if (
    activity.activity_type === "debugging" ||
    result.error_summary
) {
    output = `# Code Debugging Report

**Language:** ${result.language || "Not specified"}

## Error Summary

${result.error_summary || "No error summary available."}

## Error Explanation

${result.error_explanation || "No error explanation available."}

## Fixed Code

\`\`\`${(result.language || "").toLowerCase()}
${result.fixed_code || "No corrected code available."}
\`\`\`

## Debugging Suggestions

${result.debug_suggestions || "No debugging suggestions available."}
`;

} else {
    output =
        result.analysis ||
        result.documentation ||
        result.code ||
        result.fixed_code ||
        JSON.stringify(result, null, 2);
}
        document.getElementById("activityModalTitle").textContent =
            activity.project_name || "Activity Details";

        document.getElementById("activityModalMeta").textContent =
            `${activity.activity_type} • ${formatDate(activity.created_at)}`;

        const modalBody = document.getElementById("activityModalBody");

if (output && typeof marked !== "undefined") {
    modalBody.innerHTML = marked.parse(output);
} else {
    modalBody.textContent = output || "No saved result is available.";
}

        const modal = document.getElementById("activityModal");

        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");

    } catch (error) {
        console.error("Failed to open activity:", error);
        alert("Unable to load the saved activity. Please try again.");
    }
}



    searchInput.addEventListener("input", renderHistory);
    filterSelect.addEventListener("change", renderHistory);
    

    // =====================================================
// CLOSE ACTIVITY MODAL
// =====================================================

const activityModal = document.getElementById("activityModal");
const closeActivityModal = document.getElementById("closeActivityModal");

function closeActivityDetails() {
    activityModal.style.display = "none";
    activityModal.setAttribute("aria-hidden", "true");
}

// Close using the X button
closeActivityModal.addEventListener("click", closeActivityDetails);

// Close by clicking outside the modal
activityModal.addEventListener("click", function (event) {
    if (event.target === activityModal) {
        closeActivityDetails();
    }
});

// Close by pressing Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activityModal.style.display === "flex") {
        closeActivityDetails();
    }
});
    loadHistory();
});
