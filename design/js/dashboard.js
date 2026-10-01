/* =========================
   DASHBOARD
========================= */


/* =========================
   NOTIFICATION BUTTON
========================= */

const notificationButton =
    document.querySelector(".notification-button");

if (notificationButton) {
    notificationButton.addEventListener("click", function () {

        alert("No new notifications.");

    });
}


/* =========================
   START NEW PROJECT
========================= */

const startButton =
    document.querySelector(".start-button");

if (startButton) {
    startButton.addEventListener("click", function () {

        window.location.href = "requirement.html";

    });
}





/* =========================
   SIDEBAR NAVIGATION
========================= */

const sidebarLinks =
    document.querySelectorAll(".sidebar a");


sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const linkText =
            link.textContent.trim();

        /* Dashboard */

        if (linkText.includes("Dashboard")) {

            event.preventDefault();

            window.location.href = "dashboard.html";

        }

        /* Requirement Analysis */

        else if (linkText.includes("Requirement Analysis")) {

            event.preventDefault();

            window.location.href = "requirement.html";

        }

        /* Code Generation */

        else if (linkText.includes("Code Generation")) {

            event.preventDefault();

            window.location.href = "code-generation.html";

        }

        /* Code Debugging */

        else if (linkText.includes("Code Debugging")) {

            event.preventDefault();

            window.location.href = "code-debugging.html";

        }

        /* Code Review */

        else if (linkText.includes("Code Review")) {

            event.preventDefault();

            window.location.href = "code-review.html";

        }

        /* Test Case Generation */

        else if (linkText.includes("Test Case Generation")) {

            event.preventDefault();

            window.location.href = "test-cases.html";

        }

        /* Documentation */

        else if (linkText.includes("Documentation")) {

            event.preventDefault();

            window.location.href = "documentation.html";

        }

        /* Project History */

        else if (linkText.includes("Project History")) {

            event.preventDefault();

            window.location.href = "project-history.html";

        }

        /* Settings */

        else if (linkText.includes("Settings")) {

            event.preventDefault();

            window.location.href = "settings.html";

        }

    });

});


/* =========================
   LOGOUT
========================= */

const logoutButton =
    document.querySelector(".logout");

if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (!confirmLogout) {

            event.preventDefault();

        } else {

            window.location.href = "login.html";

        }

    });

}