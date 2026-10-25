/* =========================================
   DEVCORE AI - DASHBOARD JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const startProjectButton =
        document.getElementById("startProjectButton");

    const notificationButton =
        document.getElementById("notificationButton");


    /* =========================================
       START NEW PROJECT
    ========================================= */

    if (startProjectButton) {
        startProjectButton.addEventListener("click", () => {
            window.location.href = "requirement.html";
        });
    }


    /* =========================================
       NOTIFICATIONS
    ========================================= */

    if (notificationButton) {
        notificationButton.addEventListener("click", () => {
            alert("You don't have any new notifications.");
        });
    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.addEventListener("click", () => {

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");
        });
    });


    /* =========================================
       RECENT PROJECTS
    ========================================= */

    async function loadRecentProjects() {

        const recentSection =
            document.querySelector(".recent-section");

        const emptyState =
            document.querySelector(".empty-project");

        if (!recentSection || !emptyState) {
            console.error("Recent Projects HTML elements were not found.");
            return;
        }

        // Create the activity container if it doesn't exist.
        let projectsContainer =
            document.getElementById("recentProjectsList");

        if (!projectsContainer) {
            projectsContainer = document.createElement("div");
            projectsContainer.id = "recentProjectsList";
            projectsContainer.className = "recent-projects-list";

            emptyState.insertAdjacentElement(
                "beforebegin",
                projectsContainer
            );
        }

        const activityLabels = {
            requirement: "Requirement Analysis",
            generation: "Code Generation",
            debugging: "Code Debugging",
            review: "Code Review",
            testing: "Test Case Generation",
            documentation: "Documentation Generation"
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/history"
            );

            if (!response.ok) {
                throw new Error(
                    `History API returned HTTP ${response.status}`
                );
            }

            const payload = await response.json();

            // Accept common response formats from the history endpoint.
            let activities = Array.isArray(payload)
                ? payload
                : (
                    payload.activities ||
                    payload.history ||
                    payload.items ||
                    payload.results ||
                    (Array.isArray(payload.data) ? payload.data : [])
                );

            // Some APIs wrap the list inside a data object.
            if (!Array.isArray(activities) && payload.data) {
                activities =
                    payload.data.activities ||
                    payload.data.history ||
                    payload.data.items ||
                    [];
            }

            if (!Array.isArray(activities)) {
                throw new Error(
                    "The history API did not return an activity list."
                );
            }

            // Show the three most recent activities.
            activities = [...activities]
                .sort((a, b) => {
                    const dateA = Date.parse(
                        a.created_at || a.createdAt || ""
                    ) || 0;

                    const dateB = Date.parse(
                        b.created_at || b.createdAt || ""
                    ) || 0;

                    return dateB - dateA;
                })
                .slice(0, 3);

            projectsContainer.replaceChildren();

            if (activities.length === 0) {
                projectsContainer.hidden = true;
                emptyState.hidden = false;
                return;
            }

            emptyState.hidden = true;
            projectsContainer.hidden = false;

            activities.forEach(activity => {

                const activityType =
                    activity.activity_type ||
                    activity.activityType ||
                    "";

                const title =
                    activity.project_name ||
                    activity.projectName ||
                    activityLabels[activityType] ||
                    "Development Activity";

                const activityLabel =
                    activityLabels[activityType] ||
                    activityType ||
                    "Development Activity";

                const summary =
                    activity.summary || "";

                const createdAt =
                    activity.created_at ||
                    activity.createdAt ||
                    "";

                let formattedDate = "Date unavailable";

                if (createdAt) {
                    const date = new Date(createdAt);

                    if (!Number.isNaN(date.getTime())) {
                        formattedDate = date.toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short"
                        });
                    }
                }

                // Build the activity card using safe DOM methods.
                const card = document.createElement("article");
                card.className = "recent-project-card";

                const details = document.createElement("div");
                details.className = "recent-project-details";

                const heading = document.createElement("h3");
                heading.className = "recent-project-title";
                heading.textContent = title;

                const metadata = document.createElement("p");
                metadata.className = "recent-project-meta";
                metadata.textContent =
                    `${activityLabel} · ${formattedDate}`;

                details.append(heading, metadata);

                if (summary) {
                    const description =
                        document.createElement("p");

                    description.className =
                        "recent-project-summary";

                    description.textContent = summary;

                    details.appendChild(description);
                }

                const viewLink = document.createElement("a");
                viewLink.className = "recent-project-link";
                viewLink.href = "project-history.html";
                viewLink.textContent = "View History →";

                card.append(details, viewLink);
                projectsContainer.appendChild(card);
            });

        } catch (error) {
            console.error(
                "Unable to load recent projects:",
                error
            );

            projectsContainer.replaceChildren();

            const errorMessage = document.createElement("p");
            errorMessage.className = "recent-project-error";
            errorMessage.textContent =
                "Unable to load recent activities. Please check that the backend is running.";

            projectsContainer.appendChild(errorMessage);
            projectsContainer.hidden = false;
            emptyState.hidden = true;
        }
    }

    loadRecentProjects();

});