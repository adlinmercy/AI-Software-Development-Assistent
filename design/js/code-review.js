/* =========================================================
   DEVCORE AI - CODE REVIEW
   FastAPI + Gemini AI Integration
   ========================================================= */

const API_URL = "http://127.0.0.1:8000/api/code-review";


/* ================= ELEMENTS ================= */

const codeInput = document.getElementById("codeInput");
const language = document.getElementById("language");
const reviewBtn = document.getElementById("reviewBtn");

const loadingSection = document.getElementById("loadingSection");
const resultsSection = document.getElementById("resultsSection");

const reviewFindings = document.getElementById("reviewFindings");
const recommendations = document.getElementById("recommendations");
const reviewSummary = document.getElementById("reviewSummary");

const qualityScore = document.getElementById("qualityScore");
const securityScore = document.getElementById("securityScore");
const performanceScore = document.getElementById("performanceScore");
const maintainabilityScore = document.getElementById("maintainabilityScore");


/* ================= INITIAL STATE ================= */

loadingSection.style.display = "none";
resultsSection.style.display = "none";


/* ================= REVIEW BUTTON ================= */

reviewBtn.addEventListener("click", async function () {

    const code = codeInput.value.trim();

    if (code.length < 10) {
        alert("Please paste at least 10 characters of code.");
        codeInput.focus();
        return;
    }

    if (code.length > 15000) {
        alert("Please keep your code under 15,000 characters.");
        codeInput.focus();
        return;
    }

    const checks = {
        quality: document.getElementById("qualityCheck").checked,
        security: document.getElementById("securityCheck").checked,
        performance: document.getElementById("performanceCheck").checked,
        maintainability: document.getElementById("maintainabilityCheck").checked
    };

    if (!Object.values(checks).some(Boolean)) {
        alert("Please select at least one review category.");
        return;
    }

    resultsSection.style.display = "none";
    loadingSection.style.display = "flex";

    reviewBtn.disabled = true;
    reviewBtn.innerHTML = "<span>✓</span><span>Reviewing...</span>";

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code,
                language: language.value,
                ...checks
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "The code review request failed."
            );
        }

        if (data.status !== "success") {
            throw new Error(
                data.message || "The AI review was unsuccessful."
            );
        }

        /* Scores */

        const scores = data.scores || {};

        qualityScore.textContent =
            formatScore(scores.quality, checks.quality);

        securityScore.textContent =
            formatScore(scores.security, checks.security);

        performanceScore.textContent =
            formatScore(scores.performance, checks.performance);

        maintainabilityScore.textContent =
            formatScore(scores.maintainability, checks.maintainability);


        /* Findings */

        displayFindings(data.findings);


        /* Recommendations */

        displayRecommendations(data.recommendations);


        /* Summary */

        reviewSummary.textContent =
            data.summary || "No review summary was provided.";


        /* Show results */

        loadingSection.style.display = "none";
        resultsSection.style.display = "block";

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (error) {

        console.error("Code review error:", error);

        loadingSection.style.display = "none";

        alert(
            "Unable to review your code.\n\n" +
            error.message +
            "\n\nCheck that the FastAPI backend is running."
        );

    } finally {

        reviewBtn.disabled = false;
        reviewBtn.innerHTML = "<span>✓</span><span>Review Code</span>";

    }

});


/* ================= SCORE DISPLAY ================= */

function formatScore(score, enabled) {

    if (!enabled) {
        return "N/A";
    }

    if (
        typeof score !== "number" ||
        !Number.isFinite(score) ||
        score < 0 ||
        score > 100
    ) {
        return "N/A";
    }

    return `${score}%`;
}


/* ================= FINDINGS ================= */

function displayFindings(findings) {

    reviewFindings.replaceChildren();

    if (!Array.isArray(findings) || findings.length === 0) {

        reviewFindings.textContent =
            "No specific findings were returned for the selected categories.";

        return;
    }

    findings.forEach(function (finding) {

        const container = document.createElement("div");
        container.className = "finding";

        const badge = document.createElement("span");
        badge.className = "finding-badge " + getBadgeClass(finding.severity);
        badge.textContent = finding.type || "Review";

        const text = document.createElement("span");
        text.className = "finding-text";
        text.textContent = finding.text || "";

        container.append(badge, text);
        reviewFindings.appendChild(container);

    });

}


/* ================= FINDING BADGE ================= */

function getBadgeClass(severity) {

    const value = String(severity || "").toLowerCase();

    if (value === "critical" || value === "high") {
        return "badge-warning";
    }

    if (value === "medium" || value === "warning") {
        return "badge-warning";
    }

    if (value === "low" || value === "info") {
        return "badge-info";
    }

    if (value === "good" || value === "none") {
        return "badge-success";
    }

    return "badge-info";
}


/* ================= RECOMMENDATIONS ================= */

function displayRecommendations(items) {

    recommendations.replaceChildren();

    const list = document.createElement("ul");
    list.className = "recommendation-list";

    if (!Array.isArray(items) || items.length === 0) {

        const item = document.createElement("li");
        item.textContent = "No recommendations were returned.";
        list.appendChild(item);

    } else {

        items.forEach(function (recommendation) {

            const item = document.createElement("li");
            item.textContent = String(recommendation);

            list.appendChild(item);

        });

    }

    recommendations.appendChild(list);

}