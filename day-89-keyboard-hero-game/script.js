const letterDisplay = document.getElementById("letter");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let score = 0;
let currentLetter = "";
let gameActive = false;

const correctSound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
const failSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

function getRandomLetter() {
  const letters = "ASDFGHJKLQWERTYUIOPZXCVBNM";
  return letters[Math.floor(Math.random() * letters.length)];
}

function showLetter() {
  if (!gameActive) return;
  currentLetter = getRandomLetter();
  letterDisplay.textContent = currentLetter;
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = "Score: " + score;
  gameActive = true;
  showLetter();
  startBtn.style.display = "none";
}

document.addEventListener("keydown", (e) => {
  if (!gameActive) return;

  if (e.key.toUpperCase() === currentLetter) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    correctSound.play();
    showLetter();
  } else {
    score--;
    scoreDisplay.textContent = "Score: " + score;
    failSound.play();
  }
});

startBtn.addEventListener("click", startGame);
