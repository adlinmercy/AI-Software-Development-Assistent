/* =========================================================
   DEVCORE AI - CODE GENERATION
   Frontend Demo
   ========================================================= */


/* ================= ELEMENTS ================= */

const codeRequirement =
    document.getElementById("codeRequirement");

const charCount =
    document.getElementById("charCount");

const language =
    document.getElementById("language");

const framework =
    document.getElementById("framework");

const generateBtn =
    document.getElementById("generateBtn");

const loadingSection =
    document.getElementById("loadingSection");

const resultSection =
    document.getElementById("resultSection");

const codeOutput =
    document.getElementById("codeOutput");

const codeExplanation =
    document.getElementById("codeExplanation");

const languageLabel =
    document.getElementById("languageLabel");

const copyBtn =
    document.getElementById("copyBtn");


/* ================= CHARACTER COUNT ================= */

codeRequirement.addEventListener("input", function () {

    const length = codeRequirement.value.length;

    charCount.textContent =
        `${length} / 5000 characters`;

});


/* ================= GENERATE CODE ================= */

generateBtn.addEventListener("click", function () {

    const requirement =
        codeRequirement.value.trim();

    const selectedLanguage =
        language.value;

    const selectedFramework =
        framework.value;


    /* Validation */

    if (requirement.length < 10) {

        alert(
            "Please enter a more detailed description of what you want to build."
        );

        codeRequirement.focus();

        return;
    }


    /* Hide previous result */

    resultSection.style.display = "none";


    /* Show loading */

    loadingSection.style.display = "flex";

    generateBtn.disabled = true;

    generateBtn.innerHTML =
        "<span>✦</span><span>Generating...</span>";


    /*
        Demo delay.

        Later this section will call:
        Backend → FastAPI → Gemini API
    */

    setTimeout(function () {

        const generatedCode =
            generateDemoCode(
                requirement,
                selectedLanguage,
                selectedFramework
            );


        const explanation =
            generateExplanation(
                requirement,
                selectedLanguage,
                selectedFramework
            );


        /* Update result */

        codeOutput.textContent =
            generatedCode;

        codeExplanation.textContent =
            explanation;

        languageLabel.textContent =
            selectedLanguage;


        /* Hide loading */

        loadingSection.style.display =
            "none";


        /* Show result */

        resultSection.style.display =
            "block";


        /* Reset button */

        generateBtn.disabled = false;

        generateBtn.innerHTML =
            "<span>✦</span><span>Generate Code</span>";


        /* Scroll to result */

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


    }, 1800);

});


/* ================= DEMO CODE GENERATOR ================= */

function generateDemoCode(
    requirement,
    selectedLanguage,
    selectedFramework
) {

    const text =
        requirement.toLowerCase();


    /* ---------- PYTHON ---------- */

    if (selectedLanguage === "Python") {

        if (
            text.includes("largest") ||
            text.includes("maximum")
        ) {

            return `# Find the largest number in a list

def find_largest(numbers):
    if not numbers:
        return None

    return max(numbers)


# Example usage
numbers = [10, 25, 7, 42, 18]

largest = find_largest(numbers)

print("Largest number:", largest)
`;
        }


        if (
            text.includes("calculator") ||
            text.includes("addition")
        ) {

            return `# Simple Calculator

def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b


def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"

    return a / b


# Example
a = 10
b = 5

print("Addition:", add(a, b))
print("Subtraction:", subtract(a, b))
print("Multiplication:", multiply(a, b))
print("Division:", divide(a, b))
`;
        }


        return `# Generated Python Code
# Requirement:
# ${requirement}

def main():

    # TODO:
    # Implement the requested functionality here.

    print("Application started")


if __name__ == "__main__":
    main()
`;
    }


    /* ---------- JAVA ---------- */

    if (selectedLanguage === "Java") {

        if (
            text.includes("largest") ||
            text.includes("maximum")
        ) {

            return `import java.util.*;

public class Main {

    public static int findLargest(int[] numbers) {

        int largest = numbers[0];

        for (int number : numbers) {

            if (number > largest) {
                largest = number;
            }

        }

        return largest;
    }

    public static void main(String[] args) {

        int[] numbers = {
            10, 25, 7, 42, 18
        };

        int result =
            findLargest(numbers);

        System.out.println(
            "Largest number: " + result
        );
    }
}
`;
        }


        return `import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner =
            new Scanner(System.in);

        // Requirement:
        // ${requirement}

        System.out.println(
            "Application started"
        );

        scanner.close();
    }
}
`;
    }


    /* ---------- JAVASCRIPT ---------- */

    if (selectedLanguage === "JavaScript") {

        return `// Generated JavaScript Code

function main() {

    // Requirement:
    // ${requirement}

    console.log(
        "Application started"
    );
}

main();
`;
    }


    /* ---------- C ---------- */

    if (selectedLanguage === "C") {

        return `#include <stdio.h>

int main() {

    /*
       Requirement:
       ${requirement}
    */

    printf("Application started\\n");

    return 0;
}
`;
    }


    /* ---------- C++ ---------- */

    if (selectedLanguage === "C++") {

        return `#include <iostream>

using namespace std;

int main() {

    /*
       Requirement:
       ${requirement}
    */

    cout << "Application started";

    return 0;
}
`;
    }


    /* ---------- HTML ---------- */

    if (selectedLanguage === "HTML") {

        return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <title>Generated Page</title>
</head>

<body>

    <h1>Generated Application</h1>

    <p>
        ${requirement}
    </p>

</body>

</html>
`;
    }


    /* ---------- CSS ---------- */

    if (selectedLanguage === "CSS") {

        return `/* Generated CSS */

body {
    margin: 0;

    font-family: Arial, sans-serif;

    background: #f8fafc;

    color: #0f172a;
}

.container {
    max-width: 1200px;

    margin: auto;

    padding: 20px;
}
`;
    }


    return "// Code generation is not available for this language yet.";
}


/* ================= EXPLANATION ================= */

function generateExplanation(
    requirement,
    selectedLanguage,
    selectedFramework
) {

    let explanation =
        `DevCore AI generated a ${selectedLanguage} solution based on the provided requirement. `;


    if (selectedFramework !== "None") {

        explanation +=
            `The selected technology is ${selectedFramework}. `;

    }


    explanation +=
        "The generated code provides a basic implementation structure and can be further modified according to the project's detailed requirements.";


    return explanation;
}


/* ================= COPY CODE ================= */

copyBtn.addEventListener("click", async function () {

    const code =
        codeOutput.textContent;


    try {

        await navigator.clipboard.writeText(code);

        copyBtn.textContent =
            "Copied!";


        setTimeout(function () {

            copyBtn.textContent =
                "Copy";

        }, 1500);


    } catch (error) {

        alert(
            "Unable to copy the code."
        );

    }

});