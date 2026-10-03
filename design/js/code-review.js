/* =========================================================
   DEVCORE AI - CODE REVIEW
   Frontend Demo
   ========================================================= */


/* ================= ELEMENTS ================= */

const codeInput =
    document.getElementById("codeInput");

const language =
    document.getElementById("language");

const reviewBtn =
    document.getElementById("reviewBtn");

const loadingSection =
    document.getElementById("loadingSection");

const resultsSection =
    document.getElementById("resultsSection");

const reviewFindings =
    document.getElementById("reviewFindings");

const recommendations =
    document.getElementById("recommendations");

const reviewSummary =
    document.getElementById("reviewSummary");

const qualityScore =
    document.getElementById("qualityScore");

const securityScore =
    document.getElementById("securityScore");

const performanceScore =
    document.getElementById("performanceScore");

const maintainabilityScore =
    document.getElementById("maintainabilityScore");


/* ================= REVIEW BUTTON ================= */

reviewBtn.addEventListener("click", function () {

    const code =
        codeInput.value.trim();


    /* Validation */

    if (code.length < 10) {

        alert(
            "Please paste some code before starting the review."
        );

        codeInput.focus();

        return;
    }


    /* Get selected review categories */

    const checks = {

        quality:
            document.getElementById("qualityCheck").checked,

        security:
            document.getElementById("securityCheck").checked,

        performance:
            document.getElementById("performanceCheck").checked,

        maintainability:
            document.getElementById("maintainabilityCheck").checked

    };


    /* Hide previous result */

    resultsSection.style.display =
        "none";


    /* Show loading */

    loadingSection.style.display =
        "flex";


    reviewBtn.disabled = true;

    reviewBtn.innerHTML =
        "<span>✓</span><span>Reviewing...</span>";


    /*
        Demo processing.

        Later this will become:

        Frontend
            ↓
        FastAPI
            ↓
        Gemini API
            ↓
        Code Review
            ↓
        Results
    */

    setTimeout(function () {

        const result =
            generateReview(
                code,
                language.value,
                checks
            );


        /* Scores */

        qualityScore.textContent =
            result.scores.quality + "%";


        securityScore.textContent =
            result.scores.security + "%";


        performanceScore.textContent =
            result.scores.performance + "%";


        maintainabilityScore.textContent =
            result.scores.maintainability + "%";


        /* Findings */

        reviewFindings.innerHTML =
            createFindings(
                result.findings
            );


        /* Recommendations */

        recommendations.innerHTML =
            createRecommendations(
                result.recommendations
            );


        /* Summary */

        reviewSummary.textContent =
            result.summary;


        /* Hide loading */

        loadingSection.style.display =
            "none";


        /* Show results */

        resultsSection.style.display =
            "block";


        /* Reset button */

        reviewBtn.disabled = false;

        reviewBtn.innerHTML =
            "<span>✓</span><span>Review Code</span>";


        /* Scroll */

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


    }, 1800);

});


/* ================= REVIEW LOGIC ================= */

function generateReview(
    code,
    selectedLanguage,
    checks
) {

    const lowerCode =
        code.toLowerCase();


    let findings = [];

    let recommendations = [];


    let scores = {

        quality: 85,

        security: 90,

        performance: 82,

        maintainability: 88

    };


    /* ================= QUALITY ================= */

    if (checks.quality) {

        if (
            code.length > 1000
        ) {

            findings.push({

                type: "Review",

                badge: "badge-warning",

                text:
                    "The code is relatively large. Consider splitting the implementation into smaller functions or modules."

            });

            scores.quality = 78;

        } else {

            findings.push({

                type: "Good",

                badge: "badge-success",

                text:
                    "The submitted code has a manageable structure and can be improved further with clear function separation."

            });

        }


        recommendations.push(
            "Use meaningful variable and function names.",
            "Keep individual functions focused on a single responsibility."
        );

    }


    /* ================= SECURITY ================= */

    if (checks.security) {

        if (
            lowerCode.includes("password") ||
            lowerCode.includes("secret") ||
            lowerCode.includes("api_key")
        ) {

            findings.push({

                type: "Security",

                badge: "badge-warning",

                text:
                    "Sensitive information may be present directly in the source code. Secrets should not be hard-coded."

            });

            scores.security = 65;

        } else {

            findings.push({

                type: "Security",

                badge: "badge-success",

                text:
                    "No obvious hard-coded sensitive information was detected in this basic review."

            });

        }


        recommendations.push(
            "Store API keys and credentials using environment variables.",
            "Validate and sanitize external user input."
        );

    }


    /* ================= PERFORMANCE ================= */

    if (checks.performance) {

        findings.push({

            type: "Performance",

            badge: "badge-info",

            text:
                "Review loops, repeated calculations, and unnecessary operations when working with larger datasets."

        });


        recommendations.push(
            "Avoid unnecessary repeated calculations.",
            "Choose suitable data structures for frequently accessed data."
        );

    }


    /* ================= MAINTAINABILITY ================= */

    if (checks.maintainability) {

        findings.push({

            type: "Maintainability",

            badge: "badge-info",

            text:
                "Adding comments and separating reusable logic can make the code easier to understand and maintain."

        });


        recommendations.push(
            "Add comments for important or complex logic.",
            "Keep coding style consistent across the project."
        );

    }


    /* ================= DEFAULT ================= */

    if (findings.length === 0) {

        findings.push({

            type: "Info",

            badge: "badge-info",

            text:
                "Select at least one review category to receive detailed findings."

        });

    }


    if (recommendations.length === 0) {

        recommendations.push(
            "Select one or more review categories for additional recommendations."
        );

    }


    /* ================= SUMMARY ================= */

    const average =
        Math.round(
            (
                scores.quality +
                scores.security +
                scores.performance +
                scores.maintainability
            ) / 4
        );


    let summary;


    if (average >= 85) {

        summary =
            `The code received an overall review score of ${average}%. The structure is generally clear, but further improvements can be made in code organization, security practices, performance, and maintainability.`;

    } else {

        summary =
            `The code received an overall review score of ${average}%. Several areas should be improved to make the implementation more secure, efficient, and maintainable.`;

    }


    return {

        scores,
        findings,
        recommendations,
        summary

    };

}


/* ================= FINDINGS ================= */

function createFindings(findings) {

    let html = "";


    findings.forEach(function (finding) {

        html += `

            <div class="finding">

                <span class="finding-badge ${finding.badge}">
                    ${escapeHTML(finding.type)}
                </span>

                <span class="finding-text">
                    ${escapeHTML(finding.text)}
                </span>

            </div>

        `;

    });


    return html;
}


/* ================= RECOMMENDATIONS ================= */

function createRecommendations(items) {

    let html =
        '<ul class="recommendation-list">';


    items.forEach(function (item) {

        html += `
            <li>
                ${escapeHTML(item)}
            </li>
        `;

    });


    html += "</ul>";


    return html;
}


/* ================= ESCAPE HTML ================= */

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}