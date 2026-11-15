
/* =========================================
   DEVCORE AI - DASHBOARD JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const notificationButton =
        document.getElementById("notificationButton");


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

});
