let count = parseInt(localStorage.getItem("count")) || 0;

const counterEl = document.getElementById("counter");

function updateDisplay() {
  counterEl.textContent = count;
  localStorage.setItem("count", count);
}

function increase() {
  count++;
  updateDisplay();
}

function decrease() {
  count--;
  updateDisplay();
}

function reset() {
  count = 0;
  updateDisplay();
}

updateDisplay();
