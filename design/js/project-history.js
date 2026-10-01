// =================================
// DevCore AI - Project History
// =================================

const projectSearch =
    document.getElementById("projectSearch");

const projectFilter =
    document.getElementById("projectFilter");

const projectList =
    document.getElementById("projectList");

const noResults =
    document.getElementById("noResults");

const totalProjects =
    document.getElementById("totalProjects");

const completedProjects =
    document.getElementById("completedProjects");

const progressProjects =
    document.getElementById("progressProjects");

const aiTasks =
    document.getElementById("aiTasks");


// =================================
// Search Projects
// =================================

projectSearch.addEventListener("input", filterProjects);


// =================================
// Filter Projects
// =================================

projectFilter.addEventListener("change", filterProjects);


// =================================
// Filter Function
// =================================

function filterProjects() {

    const searchText =
        projectSearch.value
            .toLowerCase()
            .trim();

    const selectedFilter =
        projectFilter.value;

    const projects =
        document.querySelectorAll(".project-item");

    let visibleProjects = 0;


    projects.forEach(function(project) {

        const projectName =
            project.dataset.name.toLowerCase();

        const projectStatus =
            project.dataset.status;


        const matchesSearch =
            projectName.includes(searchText);


        const matchesFilter =
            selectedFilter === "all" ||
            projectStatus === selectedFilter;


        if (matchesSearch && matchesFilter) {

            project.style.display = "grid";

            visibleProjects++;

        } else {

            project.style.display = "none";

        }

    });


    // Show no results message

    if (visibleProjects === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


// =================================
// Open Project
// =================================

const openButtons =
    document.querySelectorAll(".open-btn");

openButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const projectName =
            button.dataset.project;

        alert(
            "Opening project: " +
            projectName +
            "\n\nProject details will be available when the backend and database are connected."
        );

    });

});


// =================================
// Delete Project
// =================================

function attachDeleteEvents() {

    const deleteButtons =
        document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const projectName =
                button.dataset.project;


            const confirmDelete =
                confirm(
                    "Are you sure you want to delete \"" +
                    projectName +
                    "\"?"
                );


            if (confirmDelete) {

                const projectItem =
                    button.closest(".project-item");

                projectItem.remove();

                updateStatistics();

                filterProjects();

            }

        });

    });

}

attachDeleteEvents();


// =================================
// Update Statistics
// =================================

function updateStatistics() {

    const projects =
        document.querySelectorAll(".project-item");

    let completed = 0;
    let progress = 0;


    projects.forEach(function(project) {

        if (project.dataset.status === "completed") {

            completed++;

        }

        if (project.dataset.status === "progress") {

            progress++;

        }

    });


    const total =
        projects.length;


    totalProjects.textContent =
        total;

    completedProjects.textContent =
        completed;

    progressProjects.textContent =
        progress;

}


// =================================
// New Project
// =================================

const newProjectBtn =
    document.getElementById("newProjectBtn");

newProjectBtn.addEventListener(
    "click",
    function() {

        window.location.href =
            "dashboard.html";

    }
);


// =================================
// Logout
// =================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                window.location.href =
                    "login.html";

            }

        }
    );

}


// =================================
// Notification
// =================================

const notificationBtn =
    document.querySelector(".notification-btn");

if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        function() {

            alert(
                "No new notifications."
            );

        }
    );

}