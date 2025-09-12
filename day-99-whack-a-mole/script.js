const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let score = 0;
let lastHole;
let timeUp = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) return randomHole(holes);
  lastHole = hole;
  return hole;
}

function peep() {
  const holes = document.querySelectorAll(".hole");
  const time = randomTime(600, 1200);
  const hole = randomHole(holes);
  const mole = hole.querySelector(".mole");
  mole.classList.add("up");

  setTimeout(() => {
    mole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  timeUp = false;
  peep();
  setTimeout(() => (timeUp = true), 15000); // 15 seconds
}

function whack(e) {
  score++;
  scoreDisplay.textContent = score;
  this.classList.remove("up");
}

function setupBoard() {
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    const mole = document.createElement("div");
    mole.classList.add("mole");
    mole.textContent = "🐹"; // emoji mole
    mole.addEventListener("click", whack);
    hole.appendChild(mole);
    gameContainer.appendChild(hole);
  }
}

startBtn.addEventListener("click", startGame);
setupBoard();
