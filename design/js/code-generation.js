const codeRequirement = document.getElementById("codeRequirement");
const language = document.getElementById("language");
const framework = document.getElementById("framework");
const codeType = document.getElementById("codeType");

const generateBtn = document.getElementById("generateBtn");
const codeOutput = document.getElementById("codeOutput");

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");


// ========================================
// GENERATE CODE
// ========================================

generateBtn.addEventListener("click", () => {

    const requirement = codeRequirement.value.trim();

    if (requirement === "") {
        alert("Please enter a software requirement first.");
        codeRequirement.focus();
        return;
    }


    const selectedLanguage = language.value;
    const selectedFramework = framework.value;
    const selectedCodeType = codeType.value;


    // Loading state

    generateBtn.disabled = true;

    generateBtn.innerHTML = `
        <span>⟳</span>
        Generating...
    `;


    codeOutput.textContent = `Generating ${selectedLanguage} code...

Please wait...`;


    // Temporary AI simulation

    setTimeout(() => {

        let generatedCode = "";


        // ========================================
        // JAVA
        // ========================================

        if (selectedLanguage === "Java") {

            generatedCode =
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


        // ========================================
        // PYTHON
        // ========================================

        } else if (selectedLanguage === "Python") {

            generatedCode =
`def factorial(number):

    result = 1

    for i in range(1, number + 1):
        result *= i

    return result


number = int(input("Enter a number: "))

result = factorial(number)

print("Factorial =", result)`;


        // ========================================
        // JAVASCRIPT
        // ========================================

        } else if (selectedLanguage === "JavaScript") {

            generatedCode =
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


        // ========================================
        // C
        // ========================================

        } else if (selectedLanguage === "C") {

            generatedCode =
`#include <stdio.h>

int main() {

    int number;
    long factorial = 1;

    printf("Enter a number: ");
    scanf("%d", &number);

    for (int i = 1; i <= number; i++) {
        factorial *= i;
    }

    printf("Factorial = %ld\\n", factorial);

    return 0;
}`;


        // ========================================
        // C++
        // ========================================

        } else if (selectedLanguage === "C++") {

            generatedCode =
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
         << factorial << endl;

    return 0;
}`;

        }


        // ========================================
        // DISPLAY CODE
        // ========================================

        codeOutput.textContent = generatedCode;


        // Update file name

        const fileName = document.querySelector(".file-name");

        if (selectedLanguage === "Java") {
            fileName.textContent = "generated-code.java";
        }

        else if (selectedLanguage === "Python") {
            fileName.textContent = "generated-code.py";
        }

        else if (selectedLanguage === "JavaScript") {
            fileName.textContent = "generated-code.js";
        }

        else if (selectedLanguage === "C") {
            fileName.textContent = "generated-code.c";
        }

        else if (selectedLanguage === "C++") {
            fileName.textContent = "generated-code.cpp";
        }


        // Update language label

        const languageLabel =
            document.querySelector(".language-label");

        languageLabel.textContent =
            selectedLanguage.toUpperCase();


        // Restore button

        generateBtn.disabled = false;

        generateBtn.innerHTML = `
            <span>✦</span>
            Generate Code
        `;


        console.log("Requirement:", requirement);
        console.log("Language:", selectedLanguage);
        console.log("Framework:", selectedFramework);
        console.log("Code Type:", selectedCodeType);

    }, 1500);

});


// ========================================
// COPY CODE
// ========================================

copyBtn.addEventListener("click", async () => {

    const code = codeOutput.textContent.trim();

    if (
        code === "" ||
        code.includes("Generated code will appear here")
    ) {
        alert("There is no generated code to copy.");
        return;
    }


    try {

        await navigator.clipboard.writeText(code);

        copyBtn.textContent = "Copied!";

        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1500);

    } catch (error) {

        alert("Unable to copy the code.");

    }

});


// ========================================
// DOWNLOAD CODE
// ========================================

downloadBtn.addEventListener("click", () => {

    const code = codeOutput.textContent.trim();

    if (
        code === "" ||
        code.includes("Generated code will appear here")
    ) {
        alert("There is no generated code to download.");
        return;
    }


    let extension = "txt";

    if (language.value === "Java") {
        extension = "java";
    }

    else if (language.value === "Python") {
        extension = "py";
    }

    else if (language.value === "JavaScript") {
        extension = "js";
    }

    else if (language.value === "C") {
        extension = "c";
    }

    else if (language.value === "C++") {
        extension = "cpp";
    }


    const file = new Blob(
        [code],
        { type: "text/plain" }
    );


    const url = URL.createObjectURL(file);

    const link = document.createElement("a");

    link.href = url;

    link.download = `generated-code.${extension}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

});