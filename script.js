// ========================================================
// CUBES ADVENTURE KNIGHT
// FUTURISTIC CALCULATOR
// SCRIPT.JS - FULL VERSION
// ========================================================

let expression = "";
let result = "0";
let currentMode = "basic";


// ========================================================
// CUBE KNIGHT SYSTEM
// ========================================================

let knightXP = 0;
let knightLevel = 1;


// ========================================================
// UPDATE DISPLAY
// ========================================================

function updateDisplay() {

    const resultElement = document.getElementById("result");

    if (resultElement) {

        resultElement.textContent =
            expression || "0";

        // Animasi angka ringan
        resultElement.classList.remove("number-transition");

        void resultElement.offsetWidth;

        resultElement.classList.add("number-transition");
    }
}


// ========================================================
// FORMAT HASIL
// ========================================================

function formatResult(number) {

    if (!Number.isFinite(number)) {
        throw new Error("Invalid");
    }

    return String(
        parseFloat(number.toFixed(10))
    );
}


// ========================================================
// ADD NUMBER / OPERATOR
// ========================================================

function addNumber(value) {

    if (expression === "ERROR") {
        expression = "";
    }

    const lastChar =
        expression.slice(-1);

    // Cegah operator dobel
    if (
        ["+", "-", "*", "/", "%", "^"].includes(value) &&
        ["+", "-", "*", "/", "%", "^"].includes(lastChar)
    ) {
        return;
    }

    // Cegah titik dobel
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


// ========================================================
// CLEAR
// ========================================================

function clearDisplay() {

    expression = "";

    const history =
        document.getElementById("history");

    if (history) {
        history.textContent =
            "READY FOR CALCULATION";
    }

    updateDisplay();
}


// ========================================================
// DELETE
// ========================================================

function deleteNumber() {

    if (expression === "ERROR") {
        expression = "";
    }

    expression =
        expression.slice(0, -1);

    updateDisplay();
}


// ========================================================
// CALCULATE
// ENERGY PULSE
// CALCULATION
// +XP EFFECT
// ========================================================

function calculate() {

    if (
        !expression ||
        expression === "ERROR"
    ) {
        return;
    }

    const originalExpression =
        expression;

    // Efek kalkulator
    triggerCalculationEffect();

    // Beri sedikit waktu agar efek tampil
    setTimeout(() => {

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

            // Validasi
            if (
                !/^[0-9+\-*/().%\s*]+$/.test(
                    calculation
                )
            ) {
                throw new Error("Invalid");
            }

            const answer =
                Function(
                    '"use strict"; return (' +
                    calculation +
                    ')'
                )();

            if (!Number.isFinite(answer)) {
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

            saveHistory(
                originalExpression,
                formatted
            );

            // XP setelah berhasil
            setTimeout(() => {
                addKnightXP(10);
            }, 180);

        }

        catch (error) {

            showError();

        }

    }, 180);
}


// ========================================================
// CALCULATION EFFECT
// ========================================================

function triggerCalculationEffect() {

    const calculator =
        document.querySelector(
            ".calculator-panel"
        );

    const resultElement =
        document.getElementById(
            "result"
        );

    if (calculator) {

        calculator.classList.remove(
            "energy-pulse"
        );

        void calculator.offsetWidth;

        calculator.classList.add(
            "energy-pulse"
        );
    }

    if (resultElement) {

        resultElement.classList.remove(
            "calculation-active"
        );

        void resultElement.offsetWidth;

        resultElement.classList.add(
            "calculation-active"
        );
    }

    showKnightMessage(
        "ENERGY PULSE"
    );

    setTimeout(() => {

        showKnightMessage(
            "CALCULATION"
        );

    }, 120);

}


// ========================================================
// KNIGHT MESSAGE
// ========================================================

function showKnightMessage(message) {

    let messageElement =
        document.getElementById(
            "knight-effect-message"
        );

    if (!messageElement) {

        messageElement =
            document.createElement("div");

        messageElement.id =
            "knight-effect-message";

        document.body.appendChild(
            messageElement
        );
    }

    messageElement.textContent =
        message;

    messageElement.classList.remove(
        "knight-effect-show"
    );

    void messageElement.offsetWidth;

    messageElement.classList.add(
        "knight-effect-show"
    );
}


// ========================================================
// XP SYSTEM
// ========================================================

function addKnightXP(amount) {

    knightXP += amount;

    showXPEffect(amount);

    const knight =
        document.querySelector(
            ".cube-knight"
        );

    if (knight) {

        knight.classList.remove(
            "knight-xp"
        );

        void knight.offsetWidth;

        knight.classList.add(
            "knight-xp"
        );
    }

    // Level up
    if (knightXP >= knightLevel * 100) {

        knightXP -=
            knightLevel * 100;

        knightLevel++;

        showLevelUp();

    }
}


// ========================================================
// XP EFFECT
// ========================================================

function showXPEffect(amount) {

    let xp =
        document.createElement("div");

    xp.className =
        "xp-effect";

    xp.textContent =
        `+${amount} XP`;

    document.body.appendChild(xp);

    setTimeout(() => {

        xp.classList.add(
            "xp-show"
        );

    }, 10);

    setTimeout(() => {

        xp.remove();

    }, 1200);
}


// ========================================================
// LEVEL UP
// ========================================================

function showLevelUp() {

    let level =
        document.createElement("div");

    level.className =
        "level-up-effect";

    level.innerHTML = `
        <strong>LEVEL UP!</strong>
        <span>KNIGHT LEVEL ${knightLevel}</span>
    `;

    document.body.appendChild(level);

    setTimeout(() => {

        level.classList.add(
            "level-up-show"
        );

    }, 20);

    setTimeout(() => {

        level.remove();

    }, 1800);
}


// ========================================================
// SQUARE ROOT
// ========================================================

function squareRoot() {

    calculateFunction(
        Math.sqrt,
        "√"
    );
}


// ========================================================
// SQUARE
// ========================================================

function squareNumber() {

    calculateFunction(
        number =>
            Math.pow(number, 2),
        "²"
    );
}


// ========================================================
// POWER
// ========================================================

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


// ========================================================
// INVERSE
// ========================================================

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


// ========================================================
// PLUS MINUS
// ========================================================

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


// ========================================================
// SIN
// ========================================================

function sinNumber() {

    calculateFunction(
        number =>
            Math.sin(
                number *
                Math.PI /
                180
            ),
        "sin"
    );
}


// ========================================================
// COS
// ========================================================

function cosNumber() {

    calculateFunction(
        number =>
            Math.cos(
                number *
                Math.PI /
                180
            ),
        "cos"
    );
}


// ========================================================
// TAN
// ========================================================

function tanNumber() {

    calculateFunction(
        number =>
            Math.tan(
                number *
                Math.PI /
                180
            ),
        "tan"
    );
}


// ========================================================
// ASIN
// ========================================================

function asinNumber() {

    calculateFunction(
        number => {

            if (
                number < -1 ||
                number > 1
            ) {
                throw new Error("Invalid");
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


// ========================================================
// ACOS
// ========================================================

function acosNumber() {

    calculateFunction(
        number => {

            if (
                number < -1 ||
                number > 1
            ) {
                throw new Error("Invalid");
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


// ========================================================
// ATAN
// ========================================================

function atanNumber() {

    calculateFunction(
        number =>
            Math.atan(number) *
            180 /
            Math.PI,
        "atan"
    );
}


// ========================================================
// LOG
// ========================================================

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


// ========================================================
// LN
// ========================================================

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


// ========================================================
// E POWER
// ========================================================

function exponentialNumber() {

    calculateFunction(
        number =>
            Math.exp(number),
        "e^"
    );
}


// ========================================================
// 10 POWER
// ========================================================

function tenPowerNumber() {

    calculateFunction(
        number =>
            Math.pow(10, number),
        "10^"
    );
}


// ========================================================
// ABS
// ========================================================

function absoluteNumber() {

    calculateFunction(
        number =>
            Math.abs(number),
        "abs"
    );
}


// ========================================================
// FACTORIAL
// ========================================================

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

        saveHistory(
            number + "!",
            expression
        );

        addKnightXP(15);

    }

    catch (error) {

        showError();

    }
}


// ========================================================
// RANDOM
// ========================================================

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

    addKnightXP(5);
}


// ========================================================
// PI
// ========================================================

function addPi() {

    expression +=
        Math.PI.toString();

    updateDisplay();
}


// ========================================================
// E
// ========================================================

function addE() {

    expression +=
        Math.E.toString();

    updateDisplay();
}


// ========================================================
// PHI
// ========================================================

function addPhi() {

    const phi =
        (1 + Math.sqrt(5)) / 2;

    expression +=
        phi.toString();

    updateDisplay();
}


// ========================================================
// SCIENTIFIC FUNCTION
// ========================================================

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
            throw new Error("Invalid");
        }

        const answer =
            operation(number);

        if (
            !Number.isFinite(answer)
        ) {
            throw new Error("Invalid");
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

        saveHistory(
            label +
            "(" +
            oldExpression +
            ")",
            expression
        );

        addKnightXP(10);

    }

    catch (error) {

        showError();

    }
}


// ========================================================
// ERROR
// ========================================================

function showError() {

    expression =
        "ERROR";

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


// ========================================================
// KEYBOARD
// ========================================================

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key;

        if (/[0-9]/.test(key)) {

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


// ========================================================
// CALCULATOR MODE
// ========================================================

function switchMode(mode) {

    currentMode =
        mode;

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

    if (
        mode === "converter"
    ) {

        changeConverter();
    }

    if (
        mode === "programmer"
    ) {

        updateProgrammer();
    }
}


// ========================================================
// PROGRAMMER CALCULATOR
// ========================================================

function getProgrammerValue() {

    const input =
        document.getElementById(
            "programmer-input"
        );

    if (!input) {
        return 0;
    }

    let value =
        parseInt(input.value);

    if (isNaN(value)) {
        value = 0;
    }

    return value;
}


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


// ========================================================
// PROGRAMMER OPERATION
// ========================================================

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

    if (isNaN(second)) {
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

    saveHistory(
        `${value} ${operation} ${second}`,
        answer
    );

    addKnightXP(10);
}


// ========================================================
// PROGRAMMER NOT
// ========================================================

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

    saveHistory(
        `NOT ${value}`,
        answer
    );

    addKnightXP(10);
}


// ========================================================
// PROGRAMMER SHIFT
// ========================================================

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

    if (isNaN(amount)) {
        return;
    }

    let answer;

    if (
        direction === "left"
    ) {

        answer =
            value << amount;

    } else {

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

    saveHistory(
        `${value} ${
            direction === "left"
                ? "<<"
                : ">>"
        } ${amount}`,
        answer
    );

    addKnightXP(10);
}


// ========================================================
// CONVERTER
// ========================================================

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

        convert(
            value,
            from,
            to
        ) {

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

            return celsius + 273.15;
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

        convert(
            value,
            from,
            to
        ) {

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

        convert(
            value,
            from,
            to
        ) {

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

        convert(
            value,
            from,
            to
        ) {

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

        convert(
            value,
            from,
            to
        ) {

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

        convert(
            value,
            from,
            to
        ) {

            return value *
                this.units[from] /
                this.units[to];
        }
    }
};


// ========================================================
// LOAD CONVERTER
// ========================================================

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
    ).forEach(unit => {

        from.innerHTML +=
            `<option value="${unit}">
                ${unit}
            </option>`;

        to.innerHTML +=
            `<option value="${unit}">
                ${unit}
            </option>`;
    });

    if (
        to.options.length > 1
    ) {

        to.selectedIndex = 1;
    }

    convertValue();
}


// ========================================================
// CONVERT VALUE
// ========================================================

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

    if (isNaN(value)) {

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
}


// ========================================================
// FORMAT CONVERTER
// ========================================================

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


// ========================================================
// ADVENTURE HISTORY
// ========================================================

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
        history.slice(0, 50);

    localStorage.setItem(
        "cubesAdventureHistory",
        JSON.stringify(history)
    );

    displayHistory();
}


// ========================================================
// DISPLAY HISTORY
// ========================================================

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
        history.map(item => `

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

        `).join("");
}


// ========================================================
// CLEAR HISTORY
// ========================================================

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


// ========================================================
// SECURITY
// ========================================================

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


// ========================================================
// CUBE KNIGHT - REACTION
// ========================================================

function knightReact(type) {

    const knight =
        document.querySelector(
            ".cube-knight"
        );

    if (!knight) {
        return;
    }

    knight.classList.remove(
        "knight-attack",
        "knight-block",
        "knight-charge"
    );

    void knight.offsetWidth;

    if (
        type === "calculate"
    ) {

        knight.classList.add(
            "knight-attack"
        );

    }

    if (
        type === "clear"
    ) {

        knight.classList.add(
            "knight-block"
        );

    }

    if (
        type === "input"
    ) {

        knight.classList.add(
            "knight-charge"
        );
    }
}


// ========================================================
// INITIALIZE
// ========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        switchMode(
            "basic"
        );

        changeConverter();

        updateProgrammer();

        displayHistory();

        updateDisplay();

        // Cube Knight siap
        const knight =
            document.querySelector(
                ".cube-knight"
            );

        if (knight) {

            knight.setAttribute(
                "data-level",
                knightLevel
            );
        }
    }
);
