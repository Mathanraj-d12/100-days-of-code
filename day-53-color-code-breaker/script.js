const grid = document.getElementById("grid");
const message = document.getElementById("message");
const levelText = document.getElementById("level");
const restartBtn = document.getElementById("restart");

let level = 1;

function generateColors(level) {
  grid.innerHTML = "";
  const gridSize = level + 1;
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  // Base color
  const baseHue = Math.floor(Math.random() * 360);
  const baseColor = `hsl(${baseHue}, 70%, 50%)`;

  // Slightly different color
  const diffIndex = Math.floor(Math.random() * (gridSize * gridSize));
  const diffColor = `hsl(${baseHue}, 70%, ${50 + (level < 10 ? 10 - level : 2)}%)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const block = document.createElement("div");
    block.style.backgroundColor = i === diffIndex ? diffColor : baseColor;

    block.addEventListener("click", () => {
      if (i === diffIndex) {
        level++;
        levelText.textContent = `Level: ${level}`;
        message.textContent = "✅ Correct!";
        setTimeout(() => {
          generateColors(level);
        }, 800);
      } else {
        message.textContent = "❌ Wrong! Try again.";
        level = 1;
        levelText.textContent = `Level: ${level}`;
        setTimeout(() => {
          generateColors(level);
        }, 1000);
      }
    });

    grid.appendChild(block);
  }
}

restartBtn.addEventListener("click", () => {
  level = 1;
  levelText.textContent = `Level: ${level}`;
  message.textContent = "";
  generateColors(level);
});

generateColors(level);
