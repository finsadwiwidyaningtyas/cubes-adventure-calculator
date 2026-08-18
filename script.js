// ================================
// CUBES ADVENTURE KNIGHT
// BASIC CALCULATOR
// ================================

let expression = "";
let result = "0";

// Menampilkan angka ke layar
function updateDisplay() {
    document.getElementById("result").textContent = expression || "0";
}

// Menambahkan angka/operator
function addNumber(value) {

    // Jika sebelumnya terjadi error
    if (expression === "ERROR") {
        expression = "";
    }

    // Mencegah operator ganda
    const lastChar = expression.slice(-1);

    if (
        ["+", "-", "*", "/", "%"].includes(value) &&
        ["+", "-", "*", "/", "%"].includes(lastChar)
    ) {
        return;
    }

    // Mencegah titik desimal ganda
    if (value === ".") {

        const parts = expression.split(/[\+\-\*\/%]/);
        const currentNumber = parts[parts.length - 1];

        if (currentNumber.includes(".")) {
            return;
        }
    }

    expression += value;

    updateDisplay();
}


// ================================
// CLEAR
// ================================

function clearDisplay() {

    expression = "";

    document.getElementById("history").textContent =
        "READY FOR CALCULATION";

    updateDisplay();
}


// ================================
// DELETE
// ================================

function deleteNumber() {

    if (expression === "ERROR") {
        expression = "";
    }

    expression = expression.slice(0, -1);

    updateDisplay();
}


// ================================
// CALCULATE
// ================================

function calculate() {

    if (!expression) {
        return;
    }

    try {

        let calculation = expression;

        // Mengubah persen
        calculation = calculation.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)"
        );

        // Menghitung
        let answer = Function(
            '"use strict"; return (' + calculation + ')'
        )();

        if (!isFinite(answer)) {
            throw new Error("Invalid");
        }

        // Membulatkan angka yang terlalu panjang
        answer = Number(
            parseFloat(answer.toFixed(10))
        );

        document.getElementById("history").textContent =
            expression + " =";

        expression = String(answer);

        updateDisplay();

    } catch (error) {

        expression = "ERROR";

        document.getElementById("history").textContent =
            "CALCULATION ERROR";

        updateDisplay();

        setTimeout(() => {

            expression = "";

            document.getElementById("history").textContent =
                "READY FOR CALCULATION";

            updateDisplay();

        }, 1500);
    }
}


// ================================
// KEYBOARD
// ================================

document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Angka
    if (/[0-9]/.test(key)) {

        addNumber(key);
    }

    // Operator
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        addNumber(key);
    }

    // Desimal
    else if (key === ".") {

        addNumber(".");
    }

    // Enter
    else if (key === "Enter") {

        calculate();
    }

    // Backspace
    else if (key === "Backspace") {

        deleteNumber();
    }

    // Escape
    else if (key === "Escape") {

        clearDisplay();
    }

});
// ================================
// SCIENTIFIC CALCULATOR
// ================================

// Akar kuadrat
function squareRoot() {

    if (!expression) return;

    try {

        let number = Number(expression);

        if (number < 0) {
            throw new Error("Invalid");
        }

        let answer = Math.sqrt(number);

        document.getElementById("history").textContent =
            "√" + expression;

        expression = String(
            parseFloat(answer.toFixed(10))
        );

        updateDisplay();

    } catch (error) {

        showError();
    }
}


// Kuadrat
function squareNumber() {

    if (!expression) return;

    try {

        let number = Number(expression);

        let answer = Math.pow(number, 2);

        document.getElementById("history").textContent =
            expression + "²";

        expression = String(
            parseFloat(answer.toFixed(10))
        );

        updateDisplay();

    } catch (error) {

        showError();
    }
}


// Kebalikan angka
function inverseNumber() {

    if (!expression) return;

    try {

        let number = Number(expression);

        if (number === 0) {
            throw new Error("Invalid");
        }

        let answer = 1 / number;

        document.getElementById("history").textContent =
            "1/" + expression;

        expression = String(
            parseFloat(answer.toFixed(10))
        );

        updateDisplay();

    } catch (error) {

        showError();
    }
}


// Positif / negatif
function plusMinus() {

    if (!expression) return;

    if (expression === "0") return;

    if (expression.startsWith("-")) {

        expression = expression.substring(1);

    } else {

        expression = "-" + expression;
    }

    updateDisplay();
}


// Pi
function addPi() {

    expression += Math.PI;

    updateDisplay();
}


// Menampilkan error
function showError() {

    expression = "ERROR";

    document.getElementById("history").textContent =
        "INVALID CALCULATION";

    updateDisplay();

    setTimeout(() => {

        expression = "";

        document.getElementById("history").textContent =
            "READY FOR CALCULATION";

        updateDisplay();

    }, 1500);
}
