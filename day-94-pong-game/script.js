const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Paddle setup
const paddleHeight = 100, paddleWidth = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;

// Ball setup
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 3;

// Draw paddle
function drawPaddle(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player paddle
  drawPaddle(0, playerY);

  // AI paddle
  drawPaddle(canvas.width - paddleWidth, aiY);

  // Ball
  drawBall(ballX, ballY);

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Wall collision (top & bottom)
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Player paddle collision
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > playerY &&
    ballY < playerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // AI paddle collision
  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > aiY &&
    ballY < aiY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // AI movement (simple)
  if (aiY + paddleHeight / 2 < ballY) {
    aiY += 3;
  } else {
    aiY -= 3;
  }

  // Reset if out of bounds
  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }
}

// Player movement
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && playerY > 0) playerY -= 30;
  if (e.key === "ArrowDown" && playerY < canvas.height - paddleHeight)
    playerY += 30;
});

// Game loop
setInterval(draw, 30);
