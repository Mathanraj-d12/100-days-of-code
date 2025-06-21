const dot = document.getElementById("dot");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let score = 0;
let timeLeft = 30;
let gameInterval;
let moveInterval;

function moveDot() {
  const maxWidth = window.innerWidth - 60;
  const maxHeight = window.innerHeight - 60;
  const x = Math.random() * maxWidth;
  const y = Math.random() * maxHeight;

  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 30s";

  moveDot();
  moveInterval = setInterval(moveDot, 800);
  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(moveInterval);
      alert(`⏱️ Time's up! Final Score: ${score}`);
    }
  }, 1000);
}

dot.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  moveDot();
});

// Start game when page loads
window.onload = startGame;
