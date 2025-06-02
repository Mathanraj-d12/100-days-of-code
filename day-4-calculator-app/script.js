let display = document.getElementById('display');
let currentInput = '';

function appendNumber(num) {
  currentInput += num;
  display.textContent = currentInput;
}

function appendOperator(operator) {
  if (currentInput === '') return;
  const lastChar = currentInput.slice(-1);
  if ('+-*/'.includes(lastChar)) return;
  currentInput += operator;
  display.textContent = currentInput;
}

function clearDisplay() {
  currentInput = '';
  display.textContent = '0';
}

function calculate() {
  try {
    const result = eval(currentInput);
    display.textContent = result;
    currentInput = result.toString();
  } catch (error) {
    display.textContent = 'Error';
    currentInput = '';
  }
}
