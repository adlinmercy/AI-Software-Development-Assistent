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
                throw new Error("Activity details endpoint is not available.");
            }

            const data = await response.json();
            const activity = data.activity;

            if (!activity) {
                throw new Error("Activity details not found.");
            }

            const result = activity.result_data || {};

            const output =
                result.analysis ||
                result.code ||
                result.documentation ||
                result.fixed_code ||
                JSON.stringify(result, null, 2);

            alert(
                `${activity.project_name}\n\n` +
                `${activity.summary || ""}\n\n` +
                `Result:\n${output}`
            );
        } catch (error) {
            console.error("Failed to open activity:", error);

            alert(
                "The activity list is working, but the backend detail " +
                "endpoint still needs to be added."
            );
        }
    }

    searchInput.addEventListener("input", renderHistory);
    filterSelect.addEventListener("change", renderHistory);

    loadHistory();
});
