
import { apiRequest } from "./api-client.js";

// ==========================================
// DOM ELEMENTS
// ==========================================

const projectCount = document.getElementById("projectCount");
const selectedProjectName = document.getElementById("selectedProjectName");

const projectsGrid = document.getElementById("projectsGrid");
const projectLoading = document.getElementById("projectLoading");
const projectError = document.getElementById("projectError");
const emptyProjects = document.getElementById("emptyProjects");

const createProjectBtn = document.getElementById("createProjectBtn");
const emptyCreateBtn = document.getElementById("emptyCreateBtn");
const refreshProjectsBtn = document.getElementById("refreshProjectsBtn");

const createProjectModal = document.getElementById("createProjectModal");
const createProjectForm = document.getElementById("createProjectForm");

const projectNameInput = document.getElementById("projectName");
const projectDescriptionInput = document.getElementById("projectDescription");

const createProjectError = document.getElementById("createProjectError");
const saveProjectBtn = document.getElementById("saveProjectBtn");
const cancelProjectBtn = document.getElementById("cancelProjectBtn");
const closeProjectModal = document.getElementById("closeProjectModal");

const SELECTED_PROJECT_KEY = "devcoreSelectedProjectId";

let projects = [];

// ==========================================
// MESSAGE HANDLING
// ==========================================

function showError(message) {
    projectError.textContent = message;
    projectError.hidden = false;
}

function hideError() {
    projectError.textContent = "";
    projectError.hidden = true;
}

// ==========================================
// MODAL CONTROLS
// ==========================================

function openModal() {
    createProjectError.textContent = "";
    createProjectError.hidden = true;

    createProjectModal.style.display = "flex";
    createProjectModal.setAttribute("aria-hidden", "false");

    projectNameInput.focus();
}

function closeModal() {
    createProjectModal.style.display = "none";
    createProjectModal.setAttribute("aria-hidden", "true");

    createProjectForm.reset();

    createProjectError.textContent = "";
    createProjectError.hidden = true;
}

createProjectBtn.addEventListener("click", openModal);
emptyCreateBtn.addEventListener("click", openModal);

cancelProjectBtn.addEventListener("click", closeModal);
closeProjectModal.addEventListener("click", closeModal);

createProjectModal.addEventListener("click", (event) => {
    if (event.target === createProjectModal) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        createProjectModal.style.display === "flex"
    ) {
        closeModal();
    }
});

// ==========================================
// DATE FORMATTING
// ==========================================

function formatDate(dateValue) {
    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

// ==========================================
// SELECT PROJECT
// ==========================================

function selectProject(project) {
    localStorage.setItem(SELECTED_PROJECT_KEY, project.id);

    selectedProjectName.textContent = project.name;

    renderProjects();
}

// ==========================================
// RENDER PROJECT CARDS
// ==========================================

function renderProjects() {
    projectsGrid.replaceChildren();

    const selectedId = localStorage.getItem(SELECTED_PROJECT_KEY);

    projects.forEach((project) => {
        const isSelected = project.id === selectedId;

        const card = document.createElement("div");
        card.className = "project-card";

        if (isSelected) {
            card.classList.add("selected");
        }

        const title = document.createElement("h3");
        title.className = "project-card-title";
        title.textContent = project.name;

        const description = document.createElement("p");
        description.className = "project-card-description";
        description.textContent =
            project.description || "No description provided.";

        const date = document.createElement("p");
        date.className = "project-card-date";
        date.textContent = `Created: ${formatDate(project.created_at)}`;

        const selectButton = document.createElement("button");
        selectButton.type = "button";
        selectButton.className = "select-project-btn";
        selectButton.textContent = isSelected ? "Selected" : "Select Project";
        selectButton.disabled = isSelected;

        selectButton.addEventListener("click", () => {
            selectProject(project);
        });

        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-project-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteProject(project);
        });

        card.append(
            title,
            description,
            date,
            selectButton,
            deleteButton
        );

        projectsGrid.appendChild(card);
    });

    projectCount.textContent = projects.length;

    const selectedProject = projects.find(
        (project) => project.id === selectedId
    );

    selectedProjectName.textContent =
        selectedProject ? selectedProject.name : "None";

    emptyProjects.hidden = projects.length !== 0;
    projectsGrid.hidden = projects.length === 0;
}

// ==========================================
// DELETE PROJECT
// ==========================================

async function deleteProject(project) {
    const confirmed = window.confirm(
        `Are you sure you want to delete "${project.name}"?`
    );

    if (!confirmed) return;

    try {
        const response = await apiRequest(
            `/api/projects/${encodeURIComponent(project.id)}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Unable to delete project."
            );
        }

        if (
            localStorage.getItem(SELECTED_PROJECT_KEY) === project.id
        ) {
            localStorage.removeItem(SELECTED_PROJECT_KEY);
        }

        await loadProjects();

    } catch (error) {
        console.error("Project deletion failed:", error);
        showError(error.message || "Unable to delete project.");
    }
}

// ==========================================
// LOAD PROJECTS FROM BACKEND
// ==========================================

async function loadProjects() {
    projectLoading.hidden = false;
    projectsGrid.hidden = true;
    emptyProjects.hidden = true;

    hideError();

    try {
        const response = await apiRequest("/api/projects");

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Unable to load projects."
            );
        }

        projects = Array.isArray(data.projects)
            ? data.projects
            : [];

        const selectedId = localStorage.getItem(SELECTED_PROJECT_KEY);

        const selectedExists = projects.some(
            (project) => project.id === selectedId
        );

        if (!selectedExists) {
            localStorage.removeItem(SELECTED_PROJECT_KEY);
        }

        renderProjects();

    } catch (error) {
        console.error("Project loading failed:", error);
        showError(error.message || "Something went wrong.");
    } finally {
        projectLoading.hidden = true;
    }
}

// ==========================================
// CREATE NEW PROJECT
// ==========================================

createProjectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = projectNameInput.value.trim();
    const description = projectDescriptionInput.value.trim();

    if (!name || name.length > 100) {
        createProjectError.textContent =
            "Project name must contain 1 to 100 characters.";

        createProjectError.hidden = false;
        return;
    }

    if (description.length > 500) {
        createProjectError.textContent =
            "Description cannot exceed 500 characters.";

        createProjectError.hidden = false;
        return;
    }

    saveProjectBtn.disabled = true;
    saveProjectBtn.textContent = "Creating...";

    createProjectError.textContent = "";
    createProjectError.hidden = true;

    try {
        const response = await apiRequest("/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Unable to create project."
            );
        }

        if (!data.project || !data.project.id) {
            throw new Error("Invalid project response from server.");
        }

        localStorage.setItem(
            SELECTED_PROJECT_KEY,
            data.project.id
        );

        closeModal();

        await loadProjects();

    } catch (error) {
        console.error("Project creation failed:", error);

        createProjectError.textContent = error.message;
        createProjectError.hidden = false;

    } finally {
        saveProjectBtn.disabled = false;
        saveProjectBtn.textContent = "Create Project";
    }
});

// ==========================================
// REFRESH PROJECTS
// ==========================================

refreshProjectsBtn.addEventListener("click", loadProjects);

// ==========================================
// INITIALIZE PAGE
// ==========================================

loadProjects();

// ==========================================
// BACK BUTTON
// ==========================================

const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "dashboard.html";
    }
});