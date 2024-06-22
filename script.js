document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('numberInput');

    // Append number to the display
    function appendNumber(number) {
        if (numberInput.value === '0' || numberInput.value === resultShown) {
            numberInput.value = number;
        } else {
            numberInput.value += number;
        }
        resultShown = false;
    }

    // Store current number and operation
    let currentOperation = null;
    let storedNumber = null;
    let resultShown = false;

    function applyOperator(operator) {
        if (!resultShown && storedNumber !== null) {
            calculateResult();
        }
        storedNumber = numberInput.value;
        currentOperation = operator;
        resultShown = false;
    }

    // Calculate and display the result
    function calculateResult() {
        if (currentOperation && storedNumber !== null) {
            const currentNumber = numberInput.value;
            const result = eval(`${storedNumber} ${currentOperation} ${currentNumber}`);
            numberInput.value = result;
            storedNumber = null;
            resultShown = true;
        }
    }

    // Attach event listeners to number buttons
    document.querySelectorAll('.number-keys button').forEach(button => {
        button.addEventListener('click', () => appendNumber(button.textContent));
    });

    // Attach event listeners to operator buttons
    document.querySelectorAll('.operator-keys button').forEach(button => {
        button.addEventListener('click', () => applyOperator(button.textContent));
    });

    // Equals button
    document.querySelector('.operator-keys button[onclick*="calculateResult"]').addEventListener('click', calculateResult);

    // Switching modes if implemented
    function switchMode(mode) {
        console.log("Switching mode to:", mode);
        // Mode switching logic goes here
    }

    // Attach event listeners to mode buttons
    document.querySelectorAll('.mode-keys button').forEach(button => {
        button.addEventListener('click', () => switchMode(button.textContent.toLowerCase()));
    });
});

