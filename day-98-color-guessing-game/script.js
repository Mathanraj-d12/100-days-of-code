const colorDisplay = document.getElementById("colorDisplay");
const colorContainer = document.getElementById("colorContainer");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let colors = [];
let pickedColor;

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function setupGame() {
  colors = generateColors(6);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;

  colorContainer.innerHTML = "";
  colors.forEach(color => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = color;
    square.addEventListener("click", () => {
      if (color === pickedColor) {
        message.textContent = "✅ Correct!";
        document.querySelectorAll(".square").forEach(sq => {
          sq.style.backgroundColor = pickedColor;
        });
      } else {
        message.textContent = "❌ Try Again!";
        square.style.visibility = "hidden";
      }
    });
    colorContainer.appendChild(square);
  });
  message.textContent = "";
}

resetBtn.addEventListener("click", setupGame);

// Start game
setupGame();
