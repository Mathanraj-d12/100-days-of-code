let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

function randomPosition() {
  const gameArea = document.getElementById("game-area");
  const bug = document.createElement("div");
  bug.className = "bug";

  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  bug.style.left = `${x}px`;
  bug.style.top = `${y}px`;

  bug.onclick = () => {
    score++;
    document.getElementById("score").textContent = score;
    bug.remove();
  };

  gameArea.appendChild(bug);

  setTimeout(() => {
    if (bug.parentNode) bug.remove();
  }, 1000);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = timeLeft;

  gameInterval = setInterval(randomPosition, 800);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      alert(`Game Over! You squashed ${score} bugs 🐛`);
    }
  }, 1000);
}
