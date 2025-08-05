const grid = document.getElementById("grid");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");

let pattern = [];
let userSelection = [];
const gridSize = 5;
let totalCells = gridSize * gridSize;

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => {
      if (checkBtn.disabled) return;
      cell.classList.toggle("user-selected");
      const idx = Number(cell.dataset.index);
      if (userSelection.includes(idx)) {
        userSelection = userSelection.filter(n => n !== idx);
      } else {
        userSelection.push(idx);
      }
    });
    grid.appendChild(cell);
  }
}

function generatePattern(count = 5) {
  pattern = [];
  while (pattern.length < count) {
    const rand = Math.floor(Math.random() * totalCells);
    if (!pattern.includes(rand)) {
      pattern.push(rand);
    }
  }
}

function showPattern() {
  pattern.forEach(i => {
    const cell = grid.children[i];
    cell.classList.add("active");
  });

  setTimeout(() => {
    pattern.forEach(i => {
      const cell = grid.children[i];
      cell.classList.remove("active");
    });
    message.textContent = "Now select the pattern!";
    checkBtn.disabled = false;
  }, 2000);
}

startBtn.onclick = () => {
  message.textContent = "Memorize the green squares!";
  checkBtn.disabled = true;
  nextBtn.disabled = true;
  userSelection = [];
  createGrid();
  generatePattern(5);
  showPattern();
};

checkBtn.onclick = () => {
  const correct = pattern.every(idx => userSelection.includes(idx)) &&
                  userSelection.length === pattern.length;

  if (correct) {
    message.textContent = "✅ Correct! Well done!";
  } else {
    message.textContent = "❌ Incorrect! Try again or click Next.";
  }
  checkBtn.disabled = true;
  nextBtn.disabled = false;
};

nextBtn.onclick = () => {
  startBtn.click(); // restart with new pattern
};
