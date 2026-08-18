// =========================================================
// CUBES ADVENTURE KNIGHT
// FUTURISTIC CALCULATOR
// SCRIPT.JS - FULL VERSION
// BASIC + SCIENTIFIC + PROGRAMMER + CONVERTER
// + CUBE KNIGHT INTERACTION
// =========================================================

let expression = "";
let result = "0";
let currentMode = "basic";


// =========================================================
// CUBE KNIGHT
// =========================================================

function knightReact(type = "normal") {

    const knight = document.getElementById("cube-knight");

    if (!knight) {
        return;
    }

    knight.classList.remove(
        "knight-thinking",
        "knight-success",
        "knight-error",
        "knight-active"
    );

    void knight.offsetWidth;

    switch (type) {

        case "thinking":
            knight.classList.add("knight-thinking");
            break;

        case "success":
            knight.classList.add("knight-success");
            break;

        case "error":
            knight.classList.add("knight-error");
            break;

        case "active":
            knight.classList.add("knight-active");
            break;

        default:
            knight.classList.add("knight-active");
            break;
    }

    setTimeout(() => {

        knight.classList.remove(
            "knight-thinking",
            "knight-success",
            "knight-error",
            "knight-active"
        );

    }, 1200);
}


// =========================================================
// UPDATE DISPLAY
// =========================================================

function updateDisplay() {

    const resultElement =
        document.getElementById("result");

    if (resultElement) {

        resultElement.textContent =
            expression || "0";

    }

}


// =========================================================
// FORMAT HASIL
// =========================================================

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


// =========================================================
// TAMBAH ANGKA / OPERATOR
// =========================================================

function addNumber(value) {

    knightReact("active");

    if (expression === "ERROR") {

        expression = "";

    }

    const lastChar =
        expression.slice(-1);


    // -----------------------------------------
    // CEGAH OPERATOR DOBEL
    // -----------------------------------------

    if (
        ["+", "-", "*", "/", "%", "^"].includes(value) &&
        ["+", "-", "*", "/", "%", "^"].includes(lastChar)
    ) {

        return;

    }


    // -----------------------------------------
    // CEGAH TITIK DOBEL
    // -----------------------------------------

    if (value === ".") {

        const parts =
            expression.split(
                /[\+\-\*\/%\^]/
            );

        const currentNumber =
            parts[parts.length - 1];

        if (
            currentNumber.includes(".")
        ) {

            return;

        }

    }


    expression += value;

    updateDisplay();

}


// =========================================================
// CLEAR
// =========================================================

function clearDisplay() {

    expression = "";

    knightReact("active");

    const history =
        document.getElementById("history");

    if (history) {

        history.textContent =
            "READY FOR CALCULATION";

    }

    updateDisplay();

}


// =========================================================
// DELETE
// =========================================================

function deleteNumber() {

    knightReact("active");

    if (expression === "ERROR") {

        expression = "";

    }

    expression =
        expression.slice(0, -1);

    updateDisplay();

}


// =========================================================
// CALCULATE
// =========================================================

function calculate() {

    if (
        !expression ||
        expression === "ERROR"
    ) {

        return;

    }

    const originalExpression =
        expression;

    knightReact("thinking");


    try {

        let calculation =
            expression;


        // -----------------------------------------
        // PERSENTASE
        // -----------------------------------------

        calculation =
            calculation.replace(
                /(\d+(\.\d+)?)%/g,
                "($1/100)"
            );


        // -----------------------------------------
        // PANGKAT
        // -----------------------------------------

        calculation =
            calculation.replace(
                /\^/g,
                "**"
            );


        // -----------------------------------------
        // VALIDASI
        // -----------------------------------------

        if (
            !/^[0-9+\-*/().%\s*]+$/.test(
                calculation
            )
        ) {

            throw new Error("Invalid");

        }


        // -----------------------------------------
        // HITUNG
        // -----------------------------------------

        const answer =
            Function(
                '"use strict"; return (' +
                calculation +
                ')'
            )();


        if (
            !Number.isFinite(answer)
        ) {

            throw new Error("Invalid");

        }


        const formatted =
            formatResult(answer);


        const history =
            document.getElementById(
                "history"
            );


        if (history) {

            history.textContent =
                originalExpression + " =";

        }


        expression =
            formatted;

        result =
            formatted;


        updateDisplay();


        // -----------------------------------------
        // KNIGHT BERHASIL
        // -----------------------------------------

        knightReact("success");


        // -----------------------------------------
        // SIMPAN HISTORY
        // -----------------------------------------

        saveHistory(
            originalExpression,
            formatted
        );


    } catch (error) {

        showError();

    }

}


// =========================================================
// SQUARE ROOT
// =========================================================

function squareRoot() {

    calculateFunction(
        Math.sqrt,
        "√"
    );

}


// =========================================================
// X²
// =========================================================

function squareNumber() {

    calculateFunction(
        number =>
            Math.pow(number, 2),
        "²"
    );

}


// =========================================================
// Xʸ
// =========================================================

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

    knightReact("thinking");

    updateDisplay();

}


// =========================================================
// 1/X
// =========================================================

function inverseNumber() {

    calculateFunction(
        number => {

            if (number === 0) {

                throw new Error(
                    "Invalid"
                );

            }

            return 1 / number;

        },
        "1/"
    );

}


// =========================================================
// PLUS MINUS
// =========================================================

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

    knightReact("active");

    updateDisplay();

}


// =========================================================
// SIN
// =========================================================

function sinNumber() {

    calculateFunction(
        number =>
            Math.sin(
                number * Math.PI / 180
            ),
        "sin"
    );

}


// =========================================================
// COS
// =========================================================

function cosNumber() {

    calculateFunction(
        number =>
            Math.cos(
                number * Math.PI / 180
            ),
        "cos"
    );

}


// =========================================================
// TAN
// =========================================================

function tanNumber() {

    calculateFunction(
        number =>
            Math.tan(
                number * Math.PI / 180
            ),
        "tan"
    );

}


// =========================================================
// ASIN
// =========================================================

function asinNumber() {

    calculateFunction(
        number => {

            if (
                number < -1 ||
                number > 1
            ) {

                throw new Error(
                    "Invalid"
                );

            }

            return (
                Math.asin(number) *
                180 /
                Math.PI
            );

        },
        "asin"
    );

}


// =========================================================
// ACOS
// =========================================================

function acosNumber() {

    calculateFunction(
        number => {

            if (
                number < -1 ||
                number > 1
            ) {

                throw new Error(
                    "Invalid"
                );

            }

            return (
                Math.acos(number) *
                180 /
                Math.PI
            );

        },
        "acos"
    );

}


// =========================================================
// ATAN
// =========================================================

function atanNumber() {

    calculateFunction(
        number =>
            Math.atan(number) *
            180 /
            Math.PI,
        "atan"
    );

}


// =========================================================
// LOG
// =========================================================

function logNumber() {

    calculateFunction(
        number => {

            if (number <= 0) {

                throw new Error(
                    "Invalid"
                );

            }

            return Math.log10(number);

        },
        "log"
    );

}


// =========================================================
// LN
// =========================================================

function lnNumber() {

    calculateFunction(
        number => {

            if (number <= 0) {

                throw new Error(
                    "Invalid"
                );

            }

            return Math.log(number);

        },
        "ln"
    );

}


// =========================================================
// Eˣ
// =========================================================

function exponentialNumber() {

    calculateFunction(
        number =>
            Math.exp(number),
        "e^"
    );

}


// =========================================================
// 10ˣ
// =========================================================

function tenPowerNumber() {

    calculateFunction(
        number =>
            Math.pow(10, number),
        "10^"
    );

}


// =========================================================
// ABS
// =========================================================

function absoluteNumber() {

    calculateFunction(
        number =>
            Math.abs(number),
        "abs"
    );

}


// =========================================================
// FACTORIAL
// =========================================================

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

            throw new Error(
                "Invalid"
            );

        }


        let answer = 1;


        for (
            let i = 2;
            i <= number;
            i++
        ) {

            answer *= i;

        }


        const history =
            document.getElementById(
                "history"
            );


        if (history) {

            history.textContent =
                number + "!";

        }


        expression =
            formatResult(answer);


        updateDisplay();


        knightReact("success");


        saveHistory(
            number + "!",
            expression
        );


    } catch (error) {

        showError();

    }

}


// =========================================================
// RANDOM
// =========================================================

function randomNumber() {

    const answer =
        Math.random();


    const history =
        document.getElementById(
            "history"
        );


    if (history) {

        history.textContent =
            "RANDOM NUMBER";

    }


    expression =
        formatResult(answer);


    updateDisplay();


    knightReact("success");

}


// =========================================================
// PI
// =========================================================

function addPi() {

    expression +=
        Math.PI.toString();

    knightReact("active");

    updateDisplay();

}


// =========================================================
// E
// =========================================================

function addE() {

    expression +=
        Math.E.toString();

    knightReact("active");

    updateDisplay();

}


// =========================================================
// PHI
// =========================================================

function addPhi() {

    const phi =
        (1 + Math.sqrt(5)) / 2;


    expression +=
        phi.toString();


    knightReact("active");

    updateDisplay();

}


// =========================================================
// SCIENTIFIC FUNCTION
// =========================================================

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


        if (
            !Number.isFinite(number)
        ) {

            throw new Error(
                "Invalid"
            );

        }


        const answer =
            operation(number);


        if (
            !Number.isFinite(answer)
        ) {

            throw new Error(
                "Invalid"
            );

        }


        const oldExpression =
            expression;


        const history =
            document.getElementById(
                "history"
            );


        if (history) {

            history.textContent =
                label +
                "(" +
                oldExpression +
                ")";

        }


        expression =
            formatResult(answer);


        updateDisplay();


        knightReact("success");


        saveHistory(
            label +
            "(" +
            oldExpression +
            ")",
            expression
        );


    } catch (error) {

        showError();

    }

}


// =========================================================
// ERROR
// =========================================================

function showError() {

    expression =
        "ERROR";


    knightReact("error");


    const history =
        document.getElementById(
            "history"
        );


    if (history) {

        history.textContent =
            "INVALID CALCULATION";

    }


    updateDisplay();


    setTimeout(() => {

        expression = "";


        if (history) {

            history.textContent =
                "READY FOR CALCULATION";

        }


        updateDisplay();

    }, 1500);

}


// =========================================================
// KEYBOARD
// =========================================================

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key;


        if (
            /[0-9]/.test(key)
        ) {

            addNumber(key);

        }

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

        else if (
            key === "."
        ) {

            addNumber(".");

        }

        else if (
            key === "Enter"
        ) {

            event.preventDefault();

            calculate();

        }

        else if (
            key === "Backspace"
        ) {

            deleteNumber();

        }

        else if (
            key === "Escape"
        ) {

            clearDisplay();

        }

    }
);


// =========================================================
// CALCULATOR MODE
// =========================================================

function switchMode(mode) {

    currentMode =
        mode;


    // -----------------------------------------
    // SEMBUNYIKAN SEMUA MODE
    // -----------------------------------------

    const modes =
        document.querySelectorAll(
            ".calculator-mode"
        );


    modes.forEach(
        function(section) {

            section.classList.remove(
                "active"
            );


            section.style.removeProperty(
                "display"
            );


            section.style.setProperty(
                "display",
                "none",
                "important"
            );

        }
    );


    // -----------------------------------------
    // TAMPILKAN MODE TERPILIH
    // -----------------------------------------

    const selectedMode =
        document.getElementById(
            mode + "-mode"
        );


    if (selectedMode) {

        selectedMode.classList.add(
            "active"
        );


        selectedMode.style.setProperty(
            "display",
            "block",
            "important"
        );

    }


    // -----------------------------------------
    // UPDATE BUTTON
    // -----------------------------------------

    const modeButtons =
        document.querySelectorAll(
            ".mode-btn"
        );


    modeButtons.forEach(
        function(button) {

            button.classList.remove(
                "active"
            );


            const onclick =
                button.getAttribute(
                    "onclick"
                );


            if (
                onclick &&
                onclick.includes(
                    `switchMode('${mode}')`
                )
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    // -----------------------------------------
    // CONVERTER
    // -----------------------------------------

    if (
        mode === "converter"
    ) {

        if (
            typeof changeConverter ===
            "function"
        ) {

            changeConverter();

        }

    }


    // -----------------------------------------
    // PROGRAMMER
    // -----------------------------------------

    if (
        mode === "programmer"
    ) {

        if (
            typeof updateProgrammer ===
            "function"
        ) {

            updateProgrammer();

        }

    }


    knightReact("active");

}


// =========================================================
// PROGRAMMER CALCULATOR
// =========================================================

function getProgrammerValue() {

    const input =
        document.getElementById(
            "programmer-input"
        );


    if (!input) {

        return 0;

    }


    let value =
        parseInt(
            input.value
        );


    if (
        isNaN(value)
    ) {

        value = 0;

    }


    return value;

}


// =========================================================
// UPDATE PROGRAMMER
// =========================================================

function updateProgrammer() {

    const value =
        getProgrammerValue();


    const dec =
        document.getElementById(
            "programmer-dec"
        );


    const bin =
        document.getElementById(
            "programmer-bin"
        );


    const hex =
        document.getElementById(
            "programmer-hex"
        );


    const oct =
        document.getElementById(
            "programmer-oct"
        );


    if (dec) {

        dec.textContent =
            value;

    }


    if (bin) {

        bin.textContent =
            (value >>> 0)
                .toString(2);

    }


    if (hex) {

        hex.textContent =
            (value >>> 0)
                .toString(16)
                .toUpperCase();

    }


    if (oct) {

        oct.textContent =
            (value >>> 0)
                .toString(8);

    }

}


// =========================================================
// PROGRAMMER OPERATION
// =========================================================

function programmerOperation(
    operation
) {

    const value =
        getProgrammerValue();


    const second =
        parseInt(
            prompt(
                `Masukkan angka untuk ${operation}:`
            )
        );


    if (
        isNaN(second)
    ) {

        return;

    }


    let answer;


    switch (operation) {

        case "AND":

            answer =
                value & second;

            break;


        case "OR":

            answer =
                value | second;

            break;


        case "XOR":

            answer =
                value ^ second;

            break;


        default:

            return;

    }


    const input =
        document.getElementById(
            "programmer-input"
        );


    if (input) {

        input.value =
            answer;

    }


    updateProgrammer();


    knightReact("success");


    saveHistory(
        `${value} ${operation} ${second}`,
        answer
    );

}


// =========================================================
// PROGRAMMER NOT
// =========================================================

function programmerNOT() {

    const value =
        getProgrammerValue();


    const answer =
        ~value;


    const input =
        document.getElementById(
            "programmer-input"
        );


    if (input) {

        input.value =
            answer;

    }


    updateProgrammer();


    knightReact("success");


    saveHistory(
        `NOT ${value}`,
        answer
    );

}


// =========================================================
// PROGRAMMER SHIFT
// =========================================================

function programmerShift(
    direction
) {

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


    if (
        isNaN(amount)
    ) {

        return;

    }


    let answer;


    if (
        direction === "left"
    ) {

        answer =
            value << amount;

    }

    else {

        answer =
            value >> amount;

    }


    const input =
        document.getElementById(
            "programmer-input"
        );


    if (input) {

        input.value =
            answer;

    }


    updateProgrammer();


    knightReact("success");


    saveHistory(
        `${value} ${
            direction === "left"
                ? "<<"
                : ">>"
        } ${amount}`,
        answer
    );

}


// =========================================================
// CONVERTER DATA
// =========================================================

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


        convert(
            value,
            from,
            to
        ) {

            return (
                value *
                this.units[from] /
                this.units[to]
            );

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


        convert(
            value,
            from,
            to
        ) {

            return (
                value *
                this.units[from] /
                this.units[to]
            );

        }

    },


    temperature: {

        units: {

            Celsius: "C",
            Fahrenheit: "F",
            Kelvin: "K"

        },


        convert(
            value,
            from,
            to
        ) {

            let celsius;


            if (
                from === "Celsius"
            ) {

                celsius =
                    value;

            }

            else if (
                from === "Fahrenheit"
            ) {

                celsius =
                    (value - 32) *
                    5 / 9;

            }

            else {

                celsius =
                    value - 273.15;

            }


            if (
                to === "Celsius"
            ) {

                return celsius;

            }


            if (
                to === "Fahrenheit"
            ) {

                return (
                    celsius * 9 / 5
                ) + 32;

            }


            return (
                celsius + 273.15
            );

        }

    },


    area: {

        units: {

            "Square Meter": 1,
            "Square Kilometer": 1000000,
            "Square Centimeter": 0.0001,
            Hectare: 10000,
            Acre: 4046.856

        },


        convert(
            value,
            from,
            to
        ) {

            return (
                value *
                this.units[from] /
                this.units[to]
            );

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


        convert(
            value,
            from,
            to
        ) {

            return (
                value *
                this.units[from] /
                this.units[to]
            );

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


        convert(
            value,
            from,
            to
        ) {

            return (
                value *
                this.units[from] /
                this.units[to]
            );

        }

    },


    speed: {

        units: {

            "Meter/Second": 1,
            "Kilometer/Hour": 0.277777778,
            "Mile/Hour": 0.44704,
            Knot: 0.514444

        },


        convert(
            value,
            from,
            to
        ) {

            return (
                value *
                this.units[from] /
                this.units[to]
            );

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


        convert(
            value,
            from,
            to
        ) {

            return (
                value *
                this.units[from] /
                this.units[to]
            );

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


        convert(
            value,
            from,
            to
        ) {

            return (
                value *
                this.units[from] /
                this.units[to]
            );

        }

    }

};


// =========================================================
// LOAD CONVERTER
// =========================================================

function changeConverter() {

    const typeElement =
        document.getElementById(
            "converter-type"
        );


    const from =
        document.getElementById(
            "from-unit"
        );


    const to =
        document.getElementById(
            "to-unit"
        );


    if (
        !typeElement ||
        !from ||
        !to
    ) {

        return;

    }


    const type =
        typeElement.value;


    const data =
        converterUnits[type];


    if (!data) {

        return;

    }


    from.innerHTML = "";

    to.innerHTML = "";


    Object.keys(
        data.units
    ).forEach(
        unit => {

            from.innerHTML +=
                `<option value="${unit}">
                    ${unit}
                </option>`;


            to.innerHTML +=
                `<option value="${unit}">
                    ${unit}
                </option>`;

        }
    );


    if (
        to.options.length > 1
    ) {

        to.selectedIndex =
            1;

    }


    convertValue();

}


// =========================================================
// CONVERT VALUE
// =========================================================

function convertValue() {

    const typeElement =
        document.getElementById(
            "converter-type"
        );


    const valueElement =
        document.getElementById(
            "convert-value"
        );


    const fromElement =
        document.getElementById(
            "from-unit"
        );


    const toElement =
        document.getElementById(
            "to-unit"
        );


    const resultElement =
        document.getElementById(
            "convert-result"
        );


    if (
        !typeElement ||
        !valueElement ||
        !fromElement ||
        !toElement ||
        !resultElement
    ) {

        return;

    }


    const type =
        typeElement.value;


    const value =
        parseFloat(
            valueElement.value
        );


    if (
        isNaN(value)
    ) {

        resultElement.value =
            "";

        return;

    }


    const from =
        fromElement.value;


    const to =
        toElement.value;


    const answer =
        converterUnits[type]
            .convert(
                value,
                from,
                to
            );


    resultElement.value =
        formatConverterResult(
            answer
        );


    knightReact("active");

}


// =========================================================
// FORMAT CONVERTER
// =========================================================

function formatConverterResult(
    number
) {

    if (
        !Number.isFinite(number)
    ) {

        return "ERROR";

    }


    return Number(
        number.toFixed(10)
    ).toString();

}


// =========================================================
// ADVENTURE HISTORY
// =========================================================

function saveHistory(
    expression,
    result
) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "cubesAdventureHistory"
            )
        ) || [];


    history.unshift({

        expression:
            String(expression),

        result:
            String(result),

        date:
            new Date()
                .toLocaleString(
                    "id-ID"
                )

    });


    history =
        history.slice(
            0,
            50
        );


    localStorage.setItem(
        "cubesAdventureHistory",
        JSON.stringify(history)
    );


    displayHistory();

}


// =========================================================
// DISPLAY HISTORY
// =========================================================

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


    if (
        history.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-history">
                Belum ada petualangan...
            </div>

        `;

        return;

    }


    container.innerHTML =
        history.map(
            item => `

                <div class="history-item">

                    <div class="history-expression">

                        ${escapeHTML(
                            item.expression
                        )}

                    </div>

                    <div class="history-result">

                        = ${escapeHTML(
                            item.result
                        )}

                    </div>

                </div>

            `
        ).join("");

}


// =========================================================
// CLEAR HISTORY
// =========================================================

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


    knightReact("active");

}


// =========================================================
// SECURITY
// =========================================================

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // BASIC
        switchMode(
            "basic"
        );


        // CONVERTER
        changeConverter();


        // PROGRAMMER
        updateProgrammer();


        // HISTORY
        displayHistory();


        // DISPLAY
        updateDisplay();


        // CUBE KNIGHT
        knightReact(
            "normal"
        );

    }
);
