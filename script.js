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

        const oldExpression = expression;

expression = String(answer);

saveHistory(
    oldExpression,
    answer
);

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

/* ========================================
   CALCULATOR MODE
======================================== */

let currentMode = "basic";

function switchMode(mode) {

    // ==============================
    // SEMBUNYIKAN SEMUA MODE
    // ==============================

    const modes = document.querySelectorAll('.calculator-mode');

    modes.forEach(function(section) {
        section.classList.remove('active');
        section.style.display = 'none';
    });


    // ==============================
    // TAMPILKAN MODE YANG DIPILIH
    // ==============================

    const selectedMode = document.getElementById(mode + '-mode');

    if (selectedMode) {
        selectedMode.classList.add('active');
        selectedMode.style.display = 'block';
    }


    // ==============================
    // UPDATE TOMBOL MODE
    // ==============================

    const modeButtons = document.querySelectorAll('.mode-btn');

    modeButtons.forEach(function(button) {
        button.classList.remove('active');
    });


    // Cari tombol yang sesuai dengan mode
    modeButtons.forEach(function(button) {

        const onclickValue = button.getAttribute('onclick');

        if (onclickValue === switchMode('${mode}')) {
            button.classList.add('active');
        }

    });


    // ==============================
    // KHUSUS CONVERTER
    // ==============================

    if (mode === 'converter') {

        if (typeof changeConverter === 'function') {
            changeConverter();
        }

    }


    // ==============================
    // KHUSUS PROGRAMMER
    // ==============================

    if (mode === 'programmer') {

        if (typeof updateProgrammer === 'function') {
            updateProgrammer();
        }

    }
}

/* ========================================
   PROGRAMMER CALCULATOR
======================================== */

function getProgrammerValue() {

    const input =
        document.getElementById("programmer-input");

    let value = parseInt(input.value);

    if (isNaN(value)) {
        value = 0;
    }

    return value;
}


function updateProgrammer() {

    const value =
        getProgrammerValue();

    document.getElementById(
        "programmer-dec"
    ).textContent = value;

    document.getElementById(
        "programmer-bin"
    ).textContent =
        (value >>> 0).toString(2);

    document.getElementById(
        "programmer-hex"
    ).textContent =
        (value >>> 0).toString(16).toUpperCase();

    document.getElementById(
        "programmer-oct"
    ).textContent =
        (value >>> 0).toString(8);
}


function programmerOperation(operation) {

    const value =
        getProgrammerValue();

    const second =
        parseInt(
            prompt(`Masukkan angka untuk ${operation}:`)
        );

    if (isNaN(second)) {
        return;
    }

    let result;

    switch (operation) {

        case "AND":
            result = value & second;
            break;

        case "OR":
            result = value | second;
            break;

        case "XOR":
            result = value ^ second;
            break;

        default:
            return;
    }

    document.getElementById(
        "programmer-input"
    ).value = result;

    updateProgrammer();

    saveHistory(
        `${value} ${operation} ${second}`,
        result
    );
}


function programmerNOT() {

    const value =
        getProgrammerValue();

    const result =
        ~value;

    document.getElementById(
        "programmer-input"
    ).value = result;

    updateProgrammer();

    saveHistory(
        `NOT ${value}`,
        result
    );
}


function programmerShift(direction) {

    const value =
        getProgrammerValue();

    const amount =
        parseInt(
            prompt(
                direction === "left"
                    ? "Berapa bit SHIFT LEFT?"
                    : "Berapa bit SHIFT RIGHT?"
            )
        );

    if (isNaN(amount)) {
        return;
    }

    let result;

    if (direction === "left") {
        result = value << amount;
    } else {
        result = value >> amount;
    }

    document.getElementById(
        "programmer-input"
    ).value = result;

    updateProgrammer();

    saveHistory(
        `${value} ${direction === "left" ? "<<" : ">>"} ${amount}`,
        result
    );
}


/* ========================================
   CONVERTER
======================================== */

const converterUnits = {

    length: {
        units: {
            Meter: 1,
            Kilometer: 1000,
            Centimeter: 0.01,
            Millimeter: 0.001,
            Mile: 1609.344,
            Yard: 0.9144,
            Foot: 0.3048,
            Inch: 0.0254
        },

        convert(value, from, to) {
            return value *
                this.units[from] /
                this.units[to];
        }
    },


    weight: {
        units: {
            Kilogram: 1,
            Gram: 0.001,
            Milligram: 0.000001,
            Ton: 1000,
            Pound: 0.45359237,
            Ounce: 0.0283495
        },

        convert(value, from, to) {
            return value *
                this.units[from] /
                this.units[to];
        }
    },


    temperature: {

        units: {
            Celsius: "C",
            Fahrenheit: "F",
            Kelvin: "K"
        },

        convert(value, from, to) {

            let celsius;

            if (from === "Celsius") {
                celsius = value;
            }

            else if (from === "Fahrenheit") {
                celsius = (value - 32) * 5 / 9;
            }

            else {
                celsius = value - 273.15;
            }

            if (to === "Celsius") {
                return celsius;
            }

            if (to === "Fahrenheit") {
                return celsius * 9 / 5 + 32;
            }

            return celsius + 273.15;
        }
    },


    area: {
        units: {
            "Square Meter": 1,
            "Square Kilometer": 1000000,
            "Square Centimeter": 0.0001,
            "Hectare": 10000,
            "Acre": 4046.856
        },

        convert(value, from, to) {
            return value *
                this.units[from] /
                this.units[to];
        }
    },


    volume: {
        units: {
            Liter: 1,
            Milliliter: 0.001,
            "Cubic Meter": 1000,
            "Cubic Centimeter": 0.001,
            Gallon: 3.78541
        },

        convert(value, from, to) {
            return value *
                this.units[from] /
                this.units[to];
        }
    },


    time: {
        units: {
            Second: 1,
            Minute: 60,
            Hour: 3600,
            Day: 86400,
            Week: 604800
        },

        convert(value, from, to) {
            return value *
                this.units[from] /
                this.units[to];
        }
    },


    speed: {
        units: {
            "Meter/Second": 1,
            "Kilometer/Hour": 0.277777778,
            "Mile/Hour": 0.44704,
            Knot: 0.514444
        },

        convert(value, from, to) {
            return value *
                this.units[from] /
                this.units[to];
        }
    },


    data: {
        units: {
            Bit: 1,
            Byte: 8,
            KB: 8192,
            MB: 8388608,
            GB: 8589934592,
            TB: 8796093022208
        },

        convert(value, from, to) {
            return value *
                this.units[from] /
                this.units[to];
        }
    },


    energy: {
        units: {
            Joule: 1,
            Kilojoule: 1000,
            Calorie: 4.184,
            Kilocalorie: 4184,
            "Watt Hour": 3600,
            "Kilowatt Hour": 3600000
        },

        convert(value, from, to) {
            return value *
                this.units[from] /
                this.units[to];
        }
    }

};


/* ========================================
   LOAD CONVERTER
======================================== */

function changeConverter() {

    const type =
        document.getElementById(
            "converter-type"
        ).value;

    const data =
        converterUnits[type];

    const from =
        document.getElementById("from-unit");

    const to =
        document.getElementById("to-unit");

    from.innerHTML = "";
    to.innerHTML = "";

    Object.keys(data.units)
        .forEach(unit => {

            from.innerHTML +=
                `<option value="${unit}">
                    ${unit}
                </option>`;

            to.innerHTML +=
                `<option value="${unit}">
                    ${unit}
                </option>`;
        });

    if (to.options.length > 1) {
        to.selectedIndex = 1;
    }

    convertValue();
}


function convertValue() {

    const type =
        document.getElementById(
            "converter-type"
        ).value;

    const value =
        parseFloat(
            document.getElementById(
                "convert-value"
            ).value
        );

    const from =
        document.getElementById(
            "from-unit"
        ).value;

    const to =
        document.getElementById(
            "to-unit"
        ).value;

    if (isNaN(value)) {
        document.getElementById(
            "convert-result"
        ).value = "";

        return;
    }

    const result =
        converterUnits[type]
            .convert(value, from, to);

    document.getElementById(
        "convert-result"
    ).value =
        formatConverterResult(result);
}


function formatConverterResult(number) {

    if (!Number.isFinite(number)) {
        return "ERROR";
    }

    return Number(
        number.toFixed(10)
    ).toString();
}


/* ========================================
   ADVENTURE HISTORY
======================================== */

function saveHistory(expression, result) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "cubesAdventureHistory"
            )
        ) || [];

    history.unshift({

        expression: String(expression),

        result: String(result),

        date: new Date().toLocaleString(
            "id-ID"
        )

    });

    /*
     * Maksimal 50 history
     */

    history =
        history.slice(0, 50);

    localStorage.setItem(
        "cubesAdventureHistory",
        JSON.stringify(history)
    );

    displayHistory();
}


function displayHistory() {

    const container =
        document.getElementById(
            "history-list"
        );

    if (!container) {
        return;
    }

    const history =
        JSON.parse(
            localStorage.getItem(
                "cubesAdventureHistory"
            )
        ) || [];

    if (history.length === 0) {

        container.innerHTML = `
            <div class="empty-history">
                Belum ada petualangan...
            </div>
        `;

        return;
    }

    container.innerHTML =
        history.map(item => `

            <div class="history-item">

                <div class="history-expression">
                    ${escapeHTML(item.expression)}
                </div>

                <div class="history-result">
                    = ${escapeHTML(item.result)}
                </div>

            </div>

        `).join("");
}


function clearHistory() {

    const confirmClear =
        confirm(
            "Hapus semua Adventure History?"
        );

    if (!confirmClear) {
        return;
    }

    localStorage.removeItem(
        "cubesAdventureHistory"
    );

    displayHistory();
}


/* ========================================
   SECURITY
======================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ========================================
   INITIALIZE
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        switchMode("basic");

        changeConverter();

        updateProgrammer();

        displayHistory();

    }
);
