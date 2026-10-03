/* ================================
   DEVCORE AI - LOGOUT JS
   ================================ */

document.addEventListener("DOMContentLoaded", () => {

    const cancelBtn = document.getElementById("cancelBtn");
    const logoutBtn = document.getElementById("logoutBtn");


    /* ================================
       CANCEL
       ================================ */

    cancelBtn.addEventListener("click", () => {

        window.location.href = "dashboard.html";

    });


    /* ================================
       LOGOUT
       ================================ */

    logoutBtn.addEventListener("click", () => {

        // Frontend demo logout
        localStorage.removeItem("devcoreUser");

        window.location.href = "login.html";

    });

});