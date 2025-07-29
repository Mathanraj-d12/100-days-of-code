const emojis = [
  { symbol: "😂", key: "l" },
  { symbol: "😴", key: "s" },
  { symbol: "😱", key: "a" }
];

let score = 0;
let lives = 3;
let currentEmoji = null;
let gameInterval = null;
let responseTimeout = null;
let speed = 2000;

const emojiBox = document.getElementById("emojiBox");
const statusEl = document.getElementById("status");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const startBtn = document.getElementById("startBtn");

function updateLives() {
  livesEl.textContent = `Lives: ${lives} ${"❤️".repeat(lives)}`;
}

function showEmoji() {
  clearTimeout(responseTimeout);

  const random = emojis[Math.floor(Math.random() * emojis.length)];
  currentEmoji = random;
  emojiBox.textContent = random.symbol;
  statusEl.textContent = "⏳ Waiting for your reaction...";

  responseTimeout = setTimeout(() => {
    lives--;
    updateLives();
    statusEl.textContent = `❌ Too slow! That was "${random.symbol}".`;

    if (lives <= 0) endGame();
  }, speed);
}

function handleKey(e) {
  if (!currentEmoji) return;

  if (e.key.toLowerCase() === currentEmoji.key) {
    clearTimeout(responseTimeout);
    score++;
    speed = Math.max(700, speed - 100); // increase difficulty
    statusEl.textContent = `✅ Correct for ${currentEmoji.symbol}`;
    scoreEl.textContent = `Score: ${score}`;
    currentEmoji = null;
  } else {
    lives--;
    updateLives();
    statusEl.textContent = `❌ Wrong key for ${currentEmoji.symbol}`;
    if (lives <= 0) endGame();
  }
}

function startGame() {
  score = 0;
  lives = 3;
  speed = 2000;
  currentEmoji = null;
  updateLives();
  scoreEl.textContent = "Score: 0";
  statusEl.textContent = "Game started! Get ready...";
  emojiBox.textContent = "🎯";

  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    showEmoji();
  }, speed + 500);
}

function endGame() {
  clearInterval(gameInterval);
  clearTimeout(responseTimeout);
  emojiBox.textContent = "💀";
  statusEl.textContent = `Game Over! Final Score: ${score}`;
  currentEmoji = null;
}

startBtn.addEventListener("click", startGame);
window.addEventListener("keydown", handleKey);
