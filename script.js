// ========================================
// CUBES ADVENTURE KNIGHT
// SCIENTIFIC CALCULATOR
// ========================================

let expression = "";
let result = "0";


// ========================================
// UPDATE DISPLAY
// ========================================

function updateDisplay() {

    document.getElementById("result").textContent =
        expression || "0";

}


// ========================================
// FORMAT HASIL
// ========================================

function formatResult(number) {

    if (!Number.isFinite(number)) {
        throw new Error("Invalid");
    }

    return String(
        parseFloat(
            number.toFixed(10)
        )
    );

}


// ========================================
// TAMBAH ANGKA / OPERATOR
// ========================================

function addNumber(value) {

    if (expression === "ERROR") {
        expression = "";
    }


    const lastChar =
        expression.slice(-1);


    // Operator
    if (
        ["+", "-", "*", "/", "%", "^"].includes(value) &&
        ["+", "-", "*", "/", "%", "^"].includes(lastChar)
    ) {

        return;

    }


    // Desimal
    if (value === ".") {

        const parts =
            expression.split(/[\+\-\*\/%\^]/);

        const currentNumber =
            parts[parts.length - 1];


        if (currentNumber.includes(".")) {
            return;
        }

    }


    expression += value;

    updateDisplay();

}


// ========================================
// CLEAR
// ========================================

function clearDisplay() {

    expression = "";

    document.getElementById("history").textContent =
        "READY FOR CALCULATION";

    updateDisplay();

}


// ========================================
// DELETE
// ========================================

function deleteNumber() {

    if (expression === "ERROR") {

        expression = "";

    }

    expression =
        expression.slice(0, -1);

    updateDisplay();

}


// ========================================
// CALCULATE
// ========================================

function calculate() {

    if (!expression) {
        return;
    }


    try {

        let calculation =
            expression;


        // Persentase
        calculation =
            calculation.replace(
                /(\d+(\.\d+)?)%/g,
                "($1/100)"
            );


        // Pangkat
        calculation =
            calculation.replace(
                /\^/g,
                "**"
            );


        /*
         * Function digunakan setelah input
         * dibatasi hanya karakter matematika.
         */

        if (
            !/^[0-9+\-*/().%\s*]+$/.test(calculation)
        ) {

            throw new Error("Invalid");

        }


        let answer =
            Function(
                '"use strict"; return (' +
                calculation +
                ')'
            )();


        if (!Number.isFinite(answer)) {
            throw new Error("Invalid");
        }


        answer =
            Number(
                formatResult(answer)
            );


        document.getElementById("history").textContent =
            expression + " =";


        expression =
            String(answer);


        updateDisplay();


    } catch (error) {

        showError();

    }

}


// ========================================
// √ SQUARE ROOT
// ========================================

function squareRoot() {

    calculateFunction(
        Math.sqrt,
        "√"
    );

}


// ========================================
// x²
// ========================================

function squareNumber() {

    calculateFunction(
        number => Math.pow(number, 2),
        "²"
    );

}


// ========================================
// xʸ
// ========================================

function powerNumber() {

    if (!expression) {
        return;
    }


    if (
        expression.slice(-1) === "^"
    ) {

        return;

    }


    expression += "^";

    updateDisplay();

}


// ========================================
// 1/x
// ========================================

function inverseNumber() {

    calculateFunction(
        number => {

            if (number === 0) {
                throw new Error("Invalid");
            }

            return 1 / number;

        },
        "1/"
    );

}


// ========================================
// ±
/* ======================================== */

function plusMinus() {

    if (!expression) {
        return;
    }


    if (expression === "0") {
        return;
    }


    if (expression.startsWith("-")) {

        expression =
            expression.substring(1);

    } else {

        expression =
            "-" + expression;

    }


    updateDisplay();

}


// ========================================
// SIN
// ========================================

function sinNumber() {

    calculateFunction(
        number =>
            Math.sin(
                number * Math.PI / 180
            ),
        "sin"
    );

}


// ========================================
// COS
// ========================================

function cosNumber() {

    calculateFunction(
        number =>
            Math.cos(
                number * Math.PI / 180
            ),
        "cos"
    );

}


// ========================================
// TAN
// ========================================

function tanNumber() {

    calculateFunction(
        number =>
            Math.tan(
                number * Math.PI / 180
            ),
        "tan"
    );

}


// ========================================
// ASIN
// ========================================

function asinNumber() {

    calculateFunction(
        number => {

            if (number < -1 || number > 1) {
                throw new Error("Invalid");
            }

            return Math.asin(number) * 180 / Math.PI;

        },
        "asin"
    );

}


// ========================================
// ACOS
// ========================================

function acosNumber() {

    calculateFunction(
        number => {

            if (number < -1 || number > 1) {
                throw new Error("Invalid");
            }

            return Math.acos(number) * 180 / Math.PI;

        },
        "acos"
    );

}


// ========================================
// ATAN
// ========================================

function atanNumber() {

    calculateFunction(
        number =>
            Math.atan(number) * 180 / Math.PI,
        "atan"
    );

}


// ========================================
// LOG
// ========================================

function logNumber() {

    calculateFunction(
        number => {

            if (number <= 0) {
                throw new Error("Invalid");
            }

            return Math.log10(number);

        },
        "log"
    );

}


// ========================================
// LN
// ========================================

function lnNumber() {

    calculateFunction(
        number => {

            if (number <= 0) {
                throw new Error("Invalid");
            }

            return Math.log(number);

        },
        "ln"
    );

}


// ========================================
// eˣ
// ========================================

function exponentialNumber() {

    calculateFunction(
        number =>
            Math.exp(number),
        "e^"
    );

}


// ========================================
// 10ˣ
// ========================================

function tenPowerNumber() {

    calculateFunction(
        number =>
            Math.pow(10, number),
        "10^"
    );

}


// ========================================
// ABSOLUTE VALUE
// ========================================

function absoluteNumber() {

    calculateFunction(
        number =>
            Math.abs(number),
        "abs"
    );

}


// ========================================
// FACTORIAL
// ========================================

function factorialNumber() {

    if (!expression) {
        return;
    }


    try {

        const number =
            Number(expression);


        if (
            !Number.isInteger(number) ||
            number < 0 ||
            number > 170
        ) {

            throw new Error("Invalid");

        }


        let answer = 1;


        for (
            let i = 2;
            i <= number;
            i++
        ) {

            answer *= i;

        }


        document.getElementById("history").textContent =
            number + "!";


        expression =
            formatResult(answer);


        updateDisplay();


    } catch (error) {

        showError();

    }

}


// ========================================
// RANDOM NUMBER
// ========================================

function randomNumber() {

    const answer =
        Math.random();


    document.getElementById("history").textContent =
        "RANDOM NUMBER";


    expression =
        formatResult(answer);


    updateDisplay();

}


// ========================================
// PI
// ========================================

function addPi() {

    expression +=
        Math.PI.toString();

    updateDisplay();

}


// ========================================
// E
// ========================================

function addE() {

    expression +=
        Math.E.toString();

    updateDisplay();

}


// ========================================
// PHI / GOLDEN RATIO
// ========================================

function addPhi() {

    const phi =
        (1 + Math.sqrt(5)) / 2;


    expression +=
        phi.toString();

    updateDisplay();

}


// ========================================
// GENERIC SCIENTIFIC FUNCTION
// ========================================

function calculateFunction(
    operation,
    label
) {

    if (!expression) {
        return;
    }


    try {

        const number =
            Number(expression);


        if (!Number.isFinite(number)) {
            throw new Error("Invalid");
        }


        const answer =
            operation(number);


        if (!Number.isFinite(answer)) {
            throw new Error("Invalid");
        }


        document.getElementById("history").textContent =
            label + "(" + expression + ")";


        expression =
            formatResult(answer);


        updateDisplay();


    } catch (error) {

        showError();

    }

}


// ========================================
// ERROR
// ========================================

function showError() {

    expression =
        "ERROR";


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


// ========================================
// KEYBOARD
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key;


        // ANGKA
        if (/[0-9]/.test(key)) {

            addNumber(key);

        }


        // OPERATOR
        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "%" ||
            key === "^"
        ) {

            addNumber(key);

        }


        // DESIMAL
        else if (key === ".") {

            addNumber(".");

        }


        // ENTER
        else if (key === "Enter") {

            calculate();

        }


        // BACKSPACE
        else if (key === "Backspace") {

            deleteNumber();

        }


        // ESCAPE
        else if (key === "Escape") {

            clearDisplay();

        }

    }
);
