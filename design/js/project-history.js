const searchInput =
    document.getElementById("searchInput");

const filterSelect =
    document.getElementById("filterSelect");

const historyList =
    document.getElementById("historyList");

const emptyState =
    document.getElementById("emptyState");

const activityCount =
    document.getElementById("activityCount");


/* =========================
   FILTER HISTORY
========================= */

function filterHistory() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedFilter =
        filterSelect.value;

    const items =
        document.querySelectorAll(".history-item");

    let visibleCount = 0;


    items.forEach(item => {

        const name =
            item.dataset.name.toLowerCase();

        const type =
            item.dataset.type;


        const matchesSearch =
            name.includes(searchText);

        const matchesFilter =
            selectedFilter === "all" ||
            type === selectedFilter;


        if (matchesSearch && matchesFilter) {

            item.style.display = "flex";

            visibleCount++;

        } else {

            item.style.display = "none";

        }

    });


    /* UPDATE COUNT */

    activityCount.textContent =
        `${visibleCount} ${visibleCount === 1 ? "activity" : "activities"}`;


    /* EMPTY STATE */

    if (visibleCount === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }

}


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    filterHistory
);


/* =========================
   FILTER
========================= */

filterSelect.addEventListener(
    "change",
    filterHistory
);


/* =========================
   VIEW ACTIVITY
========================= */

function viewActivity(projectName) {

    alert(
        `Opening activity:\n\n${projectName}\n\n` +
        `Detailed project history will be connected ` +
        `to the backend in the next stage.`
    );

}