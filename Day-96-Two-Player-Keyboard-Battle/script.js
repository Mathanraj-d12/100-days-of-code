const canvas = document.getElementById("battleCanvas");
const ctx = canvas.getContext("2d");

// Paddle setup
const paddleHeight = 100, paddleWidth = 10;
let p1Y = canvas.height / 2 - paddleHeight / 2;
let p2Y = canvas.height / 2 - paddleHeight / 2;
let paddleSpeed = 5;

// Ball setup
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 3;

// Scores
let p1Score = 0, p2Score = 0;

// Draw paddle
function drawPaddle(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Paddles
  drawPaddle(10, p1Y);
  drawPaddle(canvas.width - paddleWidth - 10, p2Y);

  // Ball
  drawBall(ballX, ballY);

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce on top/bottom
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Paddle collision
  if (
    ballX - ballRadius < 20 &&
    ballY > p1Y &&
    ballY < p1Y + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX + ballRadius > canvas.width - 20 &&
    ballY > p2Y &&
    ballY < p2Y + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Scoring
  if (ballX < 0) {
    p2Score++;
    resetBall();
  }
  if (ballX > canvas.width) {
    p1Score++;
    resetBall();
  }

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Player 1: " + p1Score, 50, 20);
  ctx.fillText("Player 2: " + p2Score, canvas.width - 150, 20);

  requestAnimationFrame(draw);
}

// Reset ball
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = (Math.random() > 0.5 ? 3 : -3);
}

// Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "w" && p1Y > 0) p1Y -= paddleSpeed * 5;
  if (e.key === "s" && p1Y < canvas.height - paddleHeight) p1Y += paddleSpeed * 5;
  if (e.key === "ArrowUp" && p2Y > 0) p2Y -= paddleSpeed * 5;
  if (e.key === "ArrowDown" && p2Y < canvas.height - paddleHeight) p2Y += paddleSpeed * 5;
});

draw();
