const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;

let snake;
let direction;
let food;
let bomb;
let score;
let game;

function randomPos() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

function resetBomb() {
  do {
    bomb = randomPos();
  } while (
    (bomb.x === food.x && bomb.y === food.y) ||
    snake.some((s) => s.x === bomb.x && s.y === bomb.y)
  );
}

function startGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null; // wait for key press
  score = 0;
  food = randomPos();
  resetBomb();
  clearInterval(game);
  game = setInterval(draw, 150);
  document.getElementById("score").textContent = "Score: 0";
}

function restartGame() {
  startGame();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let s of snake) {
    ctx.fillStyle = "lime";
    ctx.fillRect(s.x, s.y, box, box);
  }

  // Draw food & bomb
  ctx.fillText("🍏", food.x + 2, food.y + 16);
  ctx.fillText("💣", bomb.x + 2, bomb.y + 16);

  // If no direction yet → don’t move
  if (!direction) return;

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Game over checks
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    snake.some((part) => part.x === headX && part.y === headY) ||
    (headX === bomb.x && headY === bomb.y)
  ) {
    clearInterval(game);
    alert("💥 Game Over! Final Score: " + score);
    return;
  }

  // Eat food
  if (headX === food.x && headY === food.y) {
    score++;
    food = randomPos();
    resetBomb();
  } else {
    snake.pop();
  }

  let newHead = { x: headX, y: headY };
  snake.unshift(newHead);

  document.getElementById("score").textContent = "Score: " + score;
}

// Start game at load
startGame();
