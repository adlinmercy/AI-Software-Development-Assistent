const documentationInput =
    document.getElementById("documentationInput");

const charCount =
    document.getElementById("charCount");

const generateBtn =
    document.getElementById("generateBtn");

const loadingSection =
    document.getElementById("loadingSection");

const resultsSection =
    document.getElementById("resultsSection");

const documentationOutput =
    document.getElementById("documentationOutput");

const copyBtn =
    document.getElementById("copyBtn");

const documentationType =
    document.getElementById("documentationType");

const language =
    document.getElementById("language");


// Backend API URL
const API_URL = "http://127.0.0.1:8000";

/* =========================
   RENDER MARKDOWN OUTPUT
========================= */

function renderMarkdown(markdown) {
    if (typeof marked === "undefined") {
        throw new Error(
            "Markdown library did not load. Check your internet connection."
        );
    }

    // Convert Markdown into HTML.
    const html = marked.parse(markdown);

    // Parse the generated HTML.
    const parsedDocument = new DOMParser().parseFromString(
        html,
        "text/html"
    );

    // Remove potentially unsafe elements.
    parsedDocument.querySelectorAll(
        "script, iframe, object, embed, form"
    ).forEach(element => element.remove());

    // Remove unsafe event handlers and URLs.
    parsedDocument.querySelectorAll("*").forEach(element => {
        [...element.attributes].forEach(attribute => {
            const name = attribute.name.toLowerCase();
            const value = attribute.value.trim();

            if (name.startsWith("on")) {
                element.removeAttribute(attribute.name);
            }

            if (
                ["href", "src", "xlink:href", "formaction"].includes(name) &&
                /^(javascript:|vbscript:|data:)/i.test(value)
            ) {
                element.removeAttribute(attribute.name);
            }
        });
    });

    // Give headings IDs so table-of-contents links can find them.
    const headings = parsedDocument.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
    );

    const usedIds = new Set();

    headings.forEach(heading => {
        let id = heading.textContent
            .trim()
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s-]/gu, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        if (!id) {
            id = "section";
        }

        const baseId = id;
        let counter = 1;

        while (usedIds.has(id)) {
            id = `${baseId}-${counter++}`;
        }

        usedIds.add(id);
        heading.id = id;
    });

    // Fix links in the generated table of contents.
    parsedDocument.querySelectorAll('a[href*="#"]').forEach(link => {
        const href = link.getAttribute("href");

        if (!href) return;

        const hashIndex = href.indexOf("#");

        if (hashIndex === -1) return;

        const rawHash = href.slice(hashIndex + 1);

        let decodedHash;

        try {
            decodedHash = decodeURIComponent(rawHash);
        } catch {
            decodedHash = rawHash;
        }

        // Match the link to a generated heading.
        const matchingHeading = [...headings].find(heading => {
            const headingText = heading.textContent
                .trim()
                .toLowerCase()
                .replace(/[^\p{L}\p{N}\s-]/gu, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

            return (
                heading.id === decodedHash ||
                headingText === decodedHash.toLowerCase()
            );
        });

        if (matchingHeading) {
            link.setAttribute("href", `#${matchingHeading.id}`);
        }
    });

    // Insert the generated documentation.
    documentationOutput.replaceChildren(
        ...Array.from(parsedDocument.body.childNodes)
    );
}


/* =========================
   CHARACTER COUNTER
========================= */

documentationInput.addEventListener("input", () => {
    const length = documentationInput.value.length;

    charCount.textContent =
        `${length} / 5000 characters`;
});


/* =========================
   GENERATE DOCUMENTATION
========================= */

generateBtn.addEventListener("click", async () => {
    const input = documentationInput.value.trim();

    if (input.length < 10) {
        alert(
            "Please enter a detailed requirement or source code."
        );

        documentationInput.focus();
        return;
    }

    generateBtn.disabled = true;
    loadingSection.classList.add("show");
    resultsSection.classList.remove("show");

    try {
        const response = await fetch(
            `${API_URL}/api/documentation-generation`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    requirement: input,
                    documentation_type: documentationType.value,
                    language: language.value
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Documentation generation failed."
            );
        }

        // Display the generated documentation safely as text.
        const generatedText =
            data.documentation ||
            data.generated_documentation ||
            data.result ||
            data.response;

        if (!generatedText) {
            throw new Error(
                "The API responded, but no documentation text was found."
            );
        }

        renderMarkdown(generatedText);

        loadingSection.classList.remove("show");
        resultsSection.classList.add("show");

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (error) {
        console.error("Documentation error:", error);

        alert(
            "Unable to generate documentation.\n\n" +
            error.message +
            "\n\nCheck that your backend is running and the API endpoint exists."
        );

    } finally {
        loadingSection.classList.remove("show");
        generateBtn.disabled = false;
    }
});


/* =========================
   COPY DOCUMENTATION
========================= */

copyBtn.addEventListener("click", async () => {
    const text = documentationOutput.innerText;

    try {
        await navigator.clipboard.writeText(text);

        copyBtn.textContent = "Copied";

        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1500);

    } catch (error) {
        alert("Unable to copy documentation.");
    }
});