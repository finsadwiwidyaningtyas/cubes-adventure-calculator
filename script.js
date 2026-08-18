// ========================================
// CUBES ADVENTURE KNIGHT
// SCIENTIFIC CALCULATOR
// ========================================


// ========================================
// VARIABLE
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
// ADD NUMBER / OPERATOR
// ========================================

function addNumber(value) {


    // Jika sebelumnya ERROR

    if (expression === "ERROR") {

        expression = "";

    }


    // Karakter terakhir

    const lastChar =
        expression.slice(-1);


    // Mencegah operator ganda

    if (

        ["+", "-", "*", "/", "%"].includes(value) &&

        ["+", "-", "*", "/", "%"].includes(lastChar)

    ) {

        return;

    }


    // Mencegah titik desimal ganda

    if (value === ".") {


        const parts =
            expression.split(
                /[\+\-\*\/%]/
            );


        const currentNumber =
            parts[parts.length - 1];


        if (currentNumber.includes(".")) {

            return;

        }

    }


    // Tambahkan angka

    expression += value;


    updateDisplay();

}


// ========================================
// CLEAR
// ========================================

function clearDisplay() {


    expression = "";


    document.getElementById(
        "history"
    ).textContent =
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


        // Mengubah persen

        calculation =
            calculation.replace(

                /(\d+(\.\d+)?)%/g,

                "($1/100)"

            );


        // Menghitung

        let answer =
            Function(

                '"use strict"; return (' +
                calculation +
                ')'

            )();


        // Cek hasil

        if (!isFinite(answer)) {

            throw new Error("Invalid");

        }


        // Membulatkan angka

        answer =
            Number(
                parseFloat(
                    answer.toFixed(10)
                )
            );


        // History

        document.getElementById(
            "history"
        ).textContent =
            expression + " =";


        // Simpan hasil

        expression =
            String(answer);


        updateDisplay();


    } catch (error) {


        expression =
            "ERROR";


        document.getElementById(
            "history"
        ).textContent =
            "CALCULATION ERROR";


        updateDisplay();


        setTimeout(() => {


            expression = "";


            document.getElementById(
                "history"
            ).textContent =
                "READY FOR CALCULATION";


            updateDisplay();


        }, 1500);

    }

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

            key === "%"

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


// ========================================
// SCIENTIFIC CALCULATOR
// ========================================


// ========================================
// AKAR KUADRAT
// ========================================

function squareRoot() {


    if (!expression) {

        return;

    }


    try {


        let number =
            Number(expression);


        if (number < 0) {

            throw new Error("Invalid");

        }


        let answer =
            Math.sqrt(number);


        document.getElementById(
            "history"
        ).textContent =
            "√" + expression;


        expression =
            String(
                parseFloat(
                    answer.toFixed(10)
                )
            );


        updateDisplay();


    } catch (error) {

        showError();

    }

}


// ========================================
// KUADRAT
// ========================================

function squareNumber() {


    if (!expression) {

        return;

    }


    try {


        let number =
            Number(expression);


        let answer =
            Math.pow(number, 2);


        document.getElementById(
            "history"
        ).textContent =
            expression + "²";


        expression =
            String(
                parseFloat(
                    answer.toFixed(10)
                )
            );


        updateDisplay();


    } catch (error) {

        showError();

    }

}


// ========================================
// KEBALIKAN ANGKA
// ========================================

function inverseNumber() {


    if (!expression) {

        return;

    }


    try {


        let number =
            Number(expression);


        if (number === 0) {

            throw new Error("Invalid");

        }


        let answer =
            1 / number;


        document.getElementById(
            "history"
        ).textContent =
            "1/" + expression;


        expression =
            String(
                parseFloat(
                    answer.toFixed(10)
                )
            );


        updateDisplay();


    } catch (error) {

        showError();

    }

}


// ========================================
// POSITIF / NEGATIF
// ========================================

function plusMinus() {


    if (!expression) {

        return;

    }


    if (expression === "0") {

        return;

    }


    if (
        expression.startsWith("-")
    ) {


        expression =
            expression.substring(1);


    } else {


        expression =
            "-" + expression;

    }


    updateDisplay();

}


// ========================================
// PI
// ========================================

function addPi() {


    expression +=
        Math.PI;


    updateDisplay();

}


// ========================================
// ERROR
// ========================================

function showError() {


    expression =
        "ERROR";


    document.getElementById(
        "history"
    ).textContent =
        "INVALID CALCULATION";


    updateDisplay();


    setTimeout(() => {


        expression = "";


        document.getElementById(
            "history"
        ).textContent =
            "READY FOR CALCULATION";


        updateDisplay();


    }, 1500);

}
