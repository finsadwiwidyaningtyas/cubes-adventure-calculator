"use strict";


/* =========================
   VARIABLES
========================= */

let current = "0";

let previous = null;

let operator = null;

let memory = 0;

let history = [];

let soundOn = false;


/* =========================
   ELEMENTS
========================= */

const display =
    document.getElementById("display");

const expression =
    document.getElementById("expression");

const scientificPanel =
    document.getElementById("scientific");

const mode =
    document.getElementById("mode");

const toast =
    document.getElementById("toast");


/* =========================
   LOCAL STORAGE
========================= */

history =
    JSON.parse(
        localStorage.getItem(
            "cubeHistory"
        ) || "[]"
    );

memory =
    Number(
        localStorage.getItem(
            "cubeMemory"
        ) || 0
    );


/* =========================
   UPDATE DISPLAY
========================= */

function updateDisplay() {

    display.textContent =
        current;

}


/* =========================
   NUMBER
========================= */

function numberInput(number) {

    playSound();

    if (current === "ERROR") {

        current = "0";

    }


    if (
        number === "." &&
        current.includes(".")
    ) {

        return;

    }


    if (
        current === "0" &&
        number !== "."
    ) {

        current = "";

    }


    if (
        current.length >= 16
    ) {

        return;

    }


    current += number;

    updateDisplay();

}


/* =========================
   OPERATOR
========================= */

function operatorInput(op) {

    playSound();

    if (
        current === "ERROR"
    ) {

        return;

    }


    if (
        previous !== null &&
        operator !== null
    ) {

        calculate(false);

    }


    previous =
        Number(
            current.replaceAll(",", "")
        );


    operator = op;


    expression.textContent =
        format(previous) +
        " " +
        getSymbol(op);


    current = "0";

    updateDisplay();

}


/* =========================
   CALCULATE
========================= */

function calculate(
    save = true
) {

    if (
        previous === null ||
        operator === null
    ) {

        return;

    }


    const second =
        Number(
            current.replaceAll(",", "")
        );


    let result;


    if (
        operator === "/" &&
        second === 0
    ) {

        current = "ERROR";

        expression.textContent =
            "Cannot divide by zero";

        previous = null;

        operator = null;

        updateDisplay();

        showToast(
            "⚠ Impossible move!"
        );

        return;

    }


    switch(operator) {

        case "+":

            result =
                previous + second;

            break;


        case "-":

            result =
                previous - second;

            break;


        case "*":

            result =
                previous * second;

            break;


        case "/":

            result =
                previous / second;

            break;

    }


    if (
        !Number.isFinite(result)
    ) {

        current = "ERROR";

        updateDisplay();

        return;

    }


    const equation =
        format(previous) +
        " " +
        getSymbol(operator) +
        " " +
        format(second);


    current =
        format(result);


    expression.textContent =
        equation + " =";


    previous = null;

    operator = null;


    if (save) {

        history.unshift({

            equation:
                equation,

            result:
                current

        });


        history =
            history.slice(0,30);


        saveHistory();


        showToast(
            "⚔ Calculation Complete!"
        );

    }


    updateDisplay();

}


/* =========================
   SYMBOL
========================= */

function getSymbol(op) {

    if (op === "+")
        return "+";

    if (op === "-")
        return "−";

    if (op === "*")
        return "×";

    if (op === "/")
        return "÷";

    return op;

}


/* =========================
   FORMAT
========================= */

function format(number) {

    if (
        !Number.isFinite(number)
    ) {

        return "ERROR";

    }


    return Number(
        number.toFixed(10)
    ).toLocaleString(
        "en-US"
    );

}


/* =========================
   CLEAR
========================= */

function clearCalculator() {

    current = "0";

    previous = null;

    operator = null;

    expression.textContent = "";

    updateDisplay();

}


/* =========================
   BACKSPACE
========================= */

function backspace() {

    if (
        current === "ERROR"
    ) {

        current = "0";

    }


    if (
        current.length > 1
    ) {

        current =
            current.slice(0,-1);

    } else {

        current = "0";

    }


    updateDisplay();

}


/* =========================
   PERCENT
========================= */

function percentage() {

    const value =
        Number(
            current.replaceAll(",", "")
        );


    current =
        format(
            value / 100
        );


    updateDisplay();

}


/* =========================
   NEGATIVE
========================= */

function negative() {

    const value =
        Number(
            current.replaceAll(",", "")
        );


    current =
        format(-value);


    updateDisplay();

}


/* =========================
   SCIENTIFIC
========================= */

function scientific(type) {

    const value =
        Number(
            current.replaceAll(",", "")
        );


    let result;


    switch(type) {

        case "sqrt":

            result =
                Math.sqrt(value);

            break;


        case "square":

            result =
                value * value;

            break;


        case "inverse":

            if (value === 0) {

                current = "ERROR";

                updateDisplay();

                return;

            }

            result =
                1 / value;

            break;


        case "sin":

            result =
                Math.sin(
                    value * Math.PI / 180
                );

            break;


        case "cos":

            result =
                Math.cos(
                    value * Math.PI / 180
                );

            break;


        case "tan":

            result =
                Math.tan(
                    value * Math.PI / 180
                );

            break;


        case "log":

            result =
                Math.log10(value);

            break;


        case "ln":

            result =
                Math.log(value);

            break;


        case "pi":

            result =
                Math.PI;

            break;


        case "e":

            result =
                Math.E;

            break;

    }


    if (
        !Number.isFinite(result)
    ) {

        current = "ERROR";

        updateDisplay();

        return;

    }


    current =
        format(result);


    expression.textContent =
        type.toUpperCase();


    history.unshift({

        equation:
            type.toUpperCase(),

        result:
            current

    });


    history =
        history.slice(0,30);


    saveHistory();

    updateDisplay();

}


/* =========================
   MODE
========================= */

mode.addEventListener(
    "change",
    function() {

        if (
            this.value ===
            "scientific"
        ) {

            scientificPanel
                .classList
                .remove("hidden");

        } else {

            scientificPanel
                .classList
                .add("hidden");

        }

    }
);


/* =========================
   MEMORY
========================= */

function memoryClear() {

    memory = 0;

    localStorage.setItem(
        "cubeMemory",
        memory
    );

}


function memoryRecall() {

    current =
        format(memory);

    updateDisplay();

}


function memoryAdd() {

    memory +=
        Number(
            current.replaceAll(",", "")
        );

    localStorage.setItem(
        "cubeMemory",
        memory
    );

}


function memorySubtract() {

    memory -=
        Number(
            current.replaceAll(",", "")
        );

    localStorage.setItem(
        "cubeMemory",
        memory
    );

}


function memoryStore() {

    memory =
        Number(
            current.replaceAll(",", "")
        );

    localStorage.setItem(
        "cubeMemory",
        memory
    );

}


/* =========================
   HISTORY
========================= */

function saveHistory() {

    localStorage.setItem(
        "cubeHistory",
        JSON.stringify(history)
    );

}


function showHistory() {

    const modal =
        document.getElementById(
            "historyModal"
        );


    const list =
        document.getElementById(
            "historyList"
        );


    list.innerHTML = "";


    if (
        history.length === 0
    ) {

        list.innerHTML =
            "<p>Belum ada perhitungan.</p>";

    }


    history.forEach(
        function(item,index) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "history-row";


            row.innerHTML =
                "<strong>" +
                item.equation +
                "</strong><br>" +
                item.result;


            row.onclick =
                function() {

                    current =
                        item.result;

                    updateDisplay();

                    closeHistory();

                };


            list.appendChild(row);

        }
    );


    modal.classList.add(
        "active"
    );

}


function closeHistory() {

    document
        .getElementById(
            "historyModal"
        )
        .classList
        .remove("active");

}


function deleteHistory() {

    history = [];

    saveHistory();

    showHistory();

}


/* =========================
   THEME
========================= */

const savedTheme =
    localStorage.getItem(
        "cubeTheme"
    );


if (
    savedTheme === "light"
) {

    document.body
        .classList
        .add("light");

}


document
    .getElementById(
        "themeBtn"
    )
    .onclick =
    function() {

        document.body
            .classList
            .toggle("light");


        const light =
            document.body
                .classList
                .contains("light");


        localStorage.setItem(
            "cubeTheme",
            light
                ? "light"
                : "dark"
        );

    };


/* =========================
   SOUND
========================= */

function playSound() {

    if (!soundOn) {

        return;

    }


    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        const audio =
            new AudioContext();


        const oscillator =
            audio.createOscillator();


        const gain =
            audio.createGain();


        oscillator.frequency.value =
            500;


        oscillator.type =
            "sine";


        gain.gain.value =
            0.04;


        oscillator.connect(gain);

        gain.connect(
            audio.destination
        );


        oscillator.start();

        oscillator.stop(
            audio.currentTime + 0.05
        );

    } catch {

        // sound unavailable

    }

}


document
    .getElementById(
        "soundBtn"
    )
    .onclick =
    function() {

        soundOn =
            !soundOn;


        this.textContent =
            soundOn
                ? "🔊"
                : "🔇";

    };


/* =========================
   TOAST
========================= */

function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            1500
        );

}


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.target.tagName ===
            "INPUT"
        ) {

            return;

        }


        if (
            /^[0-9]$/.test(
                event.key
            )
        ) {

            numberInput(
                event.key
            );

        }


        else if (
            event.key === "."
        ) {

            numberInput(".");

        }


        else if (
            ["+","-","*","/"]
            .includes(event.key)
        ) {

            operatorInput(
                event.key
            );

        }


        else if (
            event.key === "Enter"
        ) {

            calculate();

        }


        else if (
            event.key === "Backspace"
        ) {

            backspace();

        }


        else if (
            event.key === "Escape"
        ) {

            clearCalculator();

        }


        else if (
            event.key === "%"
        ) {

            percentage();

        }

    }
);


/* =========================
   START
========================= */

updateDisplay();
