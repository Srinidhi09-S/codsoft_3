const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.btn'));

buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});

function handleClick(e) {
    const value = e.target.getAttribute('data-value');
    
    switch (value) {
        case 'C':
            clearDisplay();
            break;
        case '=':
            try {
                display.textContent = evaluateExpression(display.textContent);
            } catch (error) {
                display.textContent = 'Error';
            }
            break;
        default:
            updateDisplay(value);
            break;
    }
}

function clearDisplay() {
    display.textContent = '0';
}

function updateDisplay(value) {
    // Reset display on '0' if current display is '0' and new value is not a decimal point
    if (display.textContent === '0' && value !== '.') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function evaluateExpression(expression) {
    // Validate expression before evaluation
    const regex = /^[\d.+\-*\/\s]+$/; // Only digits, decimal point, and basic operators
    if (!regex.test(expression)) {
        throw new Error('Invalid input');
    }
    
    // Evaluate expression safely
    try {
        return Function(`return (${expression})`)();
    } catch (error) {
        throw new Error('Invalid expression');
    }
}