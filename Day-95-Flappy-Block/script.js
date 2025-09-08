const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Block setup
let blockX = 50;
let blockY = 200;
let blockSize = 20;
let gravity = 0.6;
let lift = -10;
let velocity = 0;

// Pipes
let pipes = [];
let pipeWidth = 50;
let gap = 130;

// Score
let score = 0;
let gameOver = false;
let gameStarted = false;

// Start game on first Space press
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (!gameStarted) {
      gameStarted = true;
      startGame();
    }
    if (!gameOver) velocity = lift;
  }
});

// Create pipes
function createPipe() {
  let topHeight = Math.floor(Math.random() * (canvas.height - gap - 50)) + 20;
  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: canvas.height - (topHeight + gap),
    passed: false,
  });
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Block
  ctx.fillStyle = "red";
  ctx.fillRect(blockX, blockY, blockSize, blockSize);

  if (gameStarted && !gameOver) {
    // Physics
    velocity += gravity;
    blockY += velocity;

    // Ground & ceiling collision
    if (blockY + blockSize > canvas.height) {
      blockY = canvas.height - blockSize;
      endGame();
    }
    if (blockY < 0) blockY = 0;

    // Move & draw pipes
    ctx.fillStyle = "green";
    pipes.forEach((p) => {
      ctx.fillRect(p.x, 0, pipeWidth, p.top);
      ctx.fillRect(p.x, canvas.height - p.bottom, pipeWidth, p.bottom);
      p.x -= 3;

      // Collision check
      if (
        blockX < p.x + pipeWidth &&
        blockX + blockSize > p.x &&
        (blockY < p.top || blockY + blockSize > canvas.height - p.bottom)
      ) {
        endGame();
      }

      // Score update
      if (!p.passed && p.x + pipeWidth < blockX) {
        score++;
        p.passed = true;
      }
    });
  }

  // Score or Start text
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  if (!gameStarted) {
    ctx.fillText("Press SPACE to start", 100, 250);
  } else {
    ctx.fillText("Score: " + score, 10, 25);
  }

  if (!gameOver) requestAnimationFrame(draw);
}

function startGame() {
  setInterval(() => {
    if (gameStarted && !gameOver) createPipe();
  }, 2000);
}

function endGame() {
  gameOver = true;
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over! Final Score: " + score, 50, canvas.height / 2);
}

draw();
