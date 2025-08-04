const grid = document.getElementById("grid");
const resetBtn = document.getElementById("resetBtn");
const colorPicker = document.getElementById("colorPicker");

const gridSize = 16; // 16x16 = 256 cells

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mouseenter", () => {
      cell.style.backgroundColor = colorPicker.value;
    });
    grid.appendChild(cell);
  }
}

resetBtn.addEventListener("click", createGrid);

window.onload = createGrid;
