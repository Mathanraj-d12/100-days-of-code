const colors = ["red", "blue", "green", "yellow", "purple"];
let colorToCount = "";
let actualCount = 0;
let totalFlashes = 15;

const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
const questionArea = document.getElementById("questionArea");
const question = document.getElementById("question");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

function createBoxes() {
  gameArea.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    const div = document.createElement("div");
    div.classList.add("box");
    gameArea.appendChild(div);
  }
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function flashBoxes() {
  let flashes = 0;
  actualCount = 0;
  const boxes = document.querySelectorAll(".box");

  const interval = setInterval(() => {
    boxes.forEach(box => {
      const color = getRandomColor();
      box.style.backgroundColor = color;
      if (color === colorToCount) actualCount++;
    });

    flashes++;
    if (flashes === totalFlashes) {
      clearInterval(interval);
      setTimeout(() => {
        gameArea.innerHTML = "";
        askQuestion();
      }, 500);
    }
  }, 700); // slower flashing: 700ms per flash
}

function askQuestion() {
  questionArea.style.display = "block";
  question.textContent = `How many times did you see the color "${colorToCount.toUpperCase()}"?`;
}

startBtn.addEventListener("click", () => {
  result.textContent = "";
  questionArea.style.display = "none";
  guessInput.value = "";

  createBoxes();
  colorToCount = getRandomColor();
  flashBoxes();
});

submitBtn.addEventListener("click", () => {
  const userGuess = parseInt(guessInput.value);
  if (isNaN(userGuess)) {
    result.textContent = "❌ Please enter a number!";
    return;
  }

  const diff = Math.abs(userGuess - actualCount);
  if (diff === 0) {
    result.textContent = `✅ Perfect! You got it right.`;
  } else if (diff <= 2) {
    result.textContent = `👌 Close! Actual was ${actualCount}. You guessed ${userGuess}.`;
  } else {
    result.textContent = `❌ Nope! Actual was ${actualCount}. You guessed ${userGuess}.`;
  }

  questionArea.style.display = "none";
});
