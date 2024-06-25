document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('numberInput');
    let currentOperation = null;
    let previousInput = '';

    function appendNumber(number) {
        if (currentOperation === null) {
            numberInput.value += number;
        } else {
            if (previousInput === numberInput.value) {
                numberInput.value += number;
            } else {
                numberInput.value = previousInput + ' ' + currentOperation + ' ' + number;
            }
        }
        updateConversions();
    }

    function appendOperation(operation) {
        if (currentOperation !== null) {
            calculateResult();
        }
        previousInput = numberInput.value;
        currentOperation = operation;
    }

    function calculateResult() {
        const parts = numberInput.value.split(' ');
        const result = eval(parts.join(''));  // Simple evaluation, replace with safer method in production
        numberInput.value = result;
        previousInput = '';
        currentOperation = null;
        updateConversions();
    }

    function updateConversions() {
        const decimalValue = parseInt(numberInput.value, 16); // Assuming hex input for simplicity, adjust as needed
        document.getElementById('decimalOutput').textContent = decimalValue;
        document.getElementById('hexOutput').textContent = decimalValue.toString(16);
        document.getElementById('binaryOutput').textContent = decimalValue.toString(2);
        document.getElementById('floatOutput').textContent = parseFloat(decimalValue).toFixed(2);
    }

    // Setup buttons for numbers and operations
});

