const task = document.getElementById("task");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const status = document.getElementById("status");

let score = 0;
let correctShape = "";

function getRandomShape() {
  const shapes = ["circle", "square", "triangle","Rectangle"];
  return shapes[Math.floor(Math.random() * shapes.length)];
}

function startRound() {
  game.innerHTML = "";
  correctShape = getRandomShape();
  task.textContent = `Click the ${correctShape.charAt(0).toUpperCase() + correctShape.slice(1)}!`;

  const shapesToShow = ["circle", "square", "triangle","Rectangle"].sort(() => Math.random() - 0.5);

  shapesToShow.forEach(shape => {
    const div = document.createElement("div");
    div.classList.add("shape", shape);
    div.addEventListener("click", () => handleClick(shape));
    game.appendChild(div);
  });
}

function handleClick(shape) {
  if (shape === correctShape) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    startRound();
  } else {
    status.textContent = "❌ Game Over! Refresh to try again.";
    game.innerHTML = "";
  }
}

startRound();
