/* =========================================
   DEVCORE AI
   DASHBOARD JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const startProjectButton =
    document.getElementById("startProjectButton");

const notificationButton =
    document.getElementById("notificationButton");


/* =========================================
   START NEW PROJECT
========================================= */

startProjectButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "requirement.html";

    }
);


/* =========================================
   NOTIFICATION
========================================= */

notificationButton.addEventListener(
    "click",
    function () {

        alert(
            "You don't have any new notifications."
        );

    }
);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            /*
             * Active state is primarily controlled
             * by the HTML class on each page.
             *
             * This only updates the visual state
             * before navigation.
             */

            navItems.forEach(function (nav) {

                nav.classList.remove("active");

            });


            item.classList.add("active");

        }
    );

});