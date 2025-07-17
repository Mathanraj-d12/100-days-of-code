const colors = ["Red", "Green", "Blue", "Orange", "Purple", "Brown"];
const colorCodes = {
  Red: "#e74c3c",
  Green: "#27ae60",
  Blue: "#2980b9",
  Orange: "#e67e22",
  Purple: "#8e44ad",
  Brown: "#8b4513",
};

const wordDisplay = document.getElementById("wordDisplay");
const colorButtons = document.getElementById("colorButtons");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

let score = 0;
let timer;
let timeLeft = 5;
let correctColor = "";

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  timeLeft = 5;
  startBtn.disabled = true;
  nextRound();
}

function nextRound() {
  colorButtons.innerHTML = "";
  timeLeft = 5;
  timeDisplay.textContent = timeLeft;
  startTimer();

  const randomWord = colors[Math.floor(Math.random() * colors.length)];
  correctColor = colors[Math.floor(Math.random() * colors.length)];
  wordDisplay.textContent = randomWord;
  wordDisplay.style.color = colorCodes[correctColor];

  shuffle(colors).forEach(color => {
    const btn = document.createElement("button");
    btn.textContent = color;
    btn.style.backgroundColor = colorCodes[color];
    btn.style.color = "white";
    btn.onclick = () => checkAnswer(color);
    colorButtons.appendChild(btn);
  });
}

function checkAnswer(selectedColor) {
  stopTimer();
  if (selectedColor === correctColor) {
    score++;
    scoreDisplay.textContent = score;
    nextRound();
  } else {
    endGame("Wrong choice!");
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      stopTimer();
      endGame("⏰ Time's up!");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function endGame(message) {
  alert(`${message} Your score: ${score}`);
  startBtn.disabled = false;
  wordDisplay.textContent = "Game Over!";
  colorButtons.innerHTML = "";
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

startBtn.addEventListener("click", startGame);
