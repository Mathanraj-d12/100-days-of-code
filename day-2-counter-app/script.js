let count = 0;

const countElement = document.getElementById('count');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');

increaseBtn.addEventListener('click', () => {
  count++;
  updateCount();
});

decreaseBtn.addEventListener('click', () => {
  count--;
  updateCount();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateCount();
});

function updateCount() {
  countElement.textContent = count;
}
