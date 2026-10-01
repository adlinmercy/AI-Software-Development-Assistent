const buggyCode = document.getElementById("buggyCode");
const debugLanguage = document.getElementById("debugLanguage");
const errorDescription = document.getElementById("errorDescription");

const debugBtn = document.getElementById("debugBtn");
const debugResult = document.getElementById("debugResult");


// ========================================
// UPDATE FILE NAME WHEN LANGUAGE CHANGES
// ========================================

debugLanguage.addEventListener("change", () => {

    const language = debugLanguage.value;

    const fileName = document.querySelector(".input-file-name");
    const languageLabel = document.querySelector(".input-language");

    languageLabel.textContent = language.toUpperCase();

    if (language === "Java") {
        fileName.textContent = "your-code.java";
    }

    else if (language === "Python") {
        fileName.textContent = "your-code.py";
    }

    else if (language === "JavaScript") {
        fileName.textContent = "your-code.js";
    }

    else if (language === "C") {
        fileName.textContent = "your-code.c";
    }

    else if (language === "C++") {
        fileName.textContent = "your-code.cpp";
    }

});


// ========================================
// ANALYZE & DEBUG
// ========================================

debugBtn.addEventListener("click", () => {

    const code = buggyCode.value.trim();
    const language = debugLanguage.value;
    const problem = errorDescription.value.trim();


    // Empty code validation

    if (code === "") {

        alert("Please paste your code first.");

        buggyCode.focus();

        return;
    }


    // Loading state

    debugBtn.disabled = true;

    debugBtn.innerHTML = `
        <span>⟳</span>
        Analyzing...
    `;


    debugResult.innerHTML = `

        <div class="empty-debug">

            <div class="debug-icon">
                ⟳
            </div>

            <h3>
                Analyzing Your Code...
            </h3>

            <p>
                DevCore AI is checking your code for errors
                and possible improvements.
            </p>

        </div>

    `;


    // Temporary AI simulation

    setTimeout(() => {

        let correctedCode = code;


        // ========================================
        // SAMPLE JAVA FIX
        // ========================================

        if (language === "Java") {

            correctedCode =
`import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");

        int number = scanner.nextInt();

        long factorial = 1;

        for (int i = 1; i <= number; i++) {

            factorial *= i;

        }

        System.out.println(
            "Factorial = " + factorial
        );

        scanner.close();
    }
}`;

        }


        // ========================================
        // SAMPLE PYTHON FIX
        // ========================================

        else if (language === "Python") {

            correctedCode =
`def factorial(number):

    result = 1

    for i in range(1, number + 1):
        result *= i

    return result


number = int(input("Enter a number: "))

result = factorial(number)

print("Factorial =", result)`;

        }


        // ========================================
        // SAMPLE JAVASCRIPT FIX
        // ========================================

        else if (language === "JavaScript") {

            correctedCode =
`function factorial(number) {

    let result = 1;

    for (let i = 1; i <= number; i++) {

        result *= i;

    }

    return result;
}


const number = Number(
    prompt("Enter a number:")
);

console.log(
    "Factorial =",
    factorial(number)
);`;

        }


        // ========================================
        // C FIX
        // ========================================

        else if (language === "C") {

            correctedCode =
`#include <stdio.h>

int main() {

    int number;

    long factorial = 1;

    printf("Enter a number: ");

    scanf("%d", &number);

    for (int i = 1; i <= number; i++) {

        factorial *= i;

    }

    printf(
        "Factorial = %ld\\n",
        factorial
    );

    return 0;
}`;

        }


        // ========================================
        // C++ FIX
        // ========================================

        else if (language === "C++") {

            correctedCode =
`#include <iostream>

using namespace std;

int main() {

    int number;

    long long factorial = 1;

    cout << "Enter a number: ";

    cin >> number;

    for (int i = 1; i <= number; i++) {

        factorial *= i;

    }

    cout << "Factorial = "
         << factorial
         << endl;

    return 0;
}`;

        }


        // ========================================
        // DISPLAY RESULT
        // ========================================

        debugResult.innerHTML = `

            <div class="debug-content">


                <!-- ERROR DETECTION -->

                <div class="debug-section">

                    <div class="section-heading">

                        <span class="result-icon error-result">
                            !
                        </span>

                        <div>

                            <h3>
                                Error Detected
                            </h3>

                            <span class="severity">
                                Needs Attention
                            </span>

                        </div>

                    </div>


                    <p>
                        The provided code may contain a
                        logical or implementation issue.
                        DevCore AI has identified a possible
                        problem that should be reviewed.
                    </p>

                </div>


                <!-- EXPLANATION -->

                <div class="debug-section">

                    <div class="section-heading">

                        <span class="result-icon explanation-result">
                            ?
                        </span>

                        <h3>
                            Error Explanation
                        </h3>

                    </div>


                    <p>

                        The code should correctly handle the
                        input, processing logic, and output.
                        Check variable initialization, loop
                        conditions, input handling, and data
                        types to avoid unexpected results.

                    </p>


                    ${
                        problem
                            ? `<div class="problem-box">
                                <strong>Your Problem:</strong>
                                ${escapeHTML(problem)}
                               </div>`
                            : ""
                    }

                </div>


                <!-- CORRECTED CODE -->

                <div class="debug-section corrected-section">

                    <div class="section-heading">

                        <span class="result-icon fix-result">
                            ✓
                        </span>

                        <h3>
                            Suggested Fix
                        </h3>

                    </div>


                    <div class="fixed-code">

                        <div class="fixed-code-header">

                            <span>
                                corrected-code.${getExtension(language)}
                            </span>

                            <button
                                id="copyFixedCode"
                                class="copy-fixed"
                            >
                                Copy
                            </button>

                        </div>


                        <pre><code id="correctedCode">${escapeHTML(correctedCode)}</code></pre>

                    </div>

                </div>


            </div>

        `;


        // ========================================
        // COPY CORRECTED CODE
        // ========================================

        const copyFixedCode =
            document.getElementById("copyFixedCode");

        copyFixedCode.addEventListener("click", async () => {

            const fixedCode =
                document.getElementById("correctedCode").textContent;

            try {

                await navigator.clipboard.writeText(fixedCode);

                copyFixedCode.textContent = "Copied!";

                setTimeout(() => {

                    copyFixedCode.textContent = "Copy";

                }, 1500);

            }

            catch (error) {

                alert("Unable to copy the corrected code.");

            }

        });


        // Restore button

        debugBtn.disabled = false;

        debugBtn.innerHTML = `
            <span>✦</span>
            Analyze & Debug
        `;


    }, 1500);

});


// ========================================
// HELPER FUNCTIONS
// ========================================

function getExtension(language) {

    if (language === "Java") {
        return "java";
    }

    if (language === "Python") {
        return "py";
    }

    if (language === "JavaScript") {
        return "js";
    }

    if (language === "C") {
        return "c";
    }

    if (language === "C++") {
        return "cpp";
    }

    return "txt";
}


function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}