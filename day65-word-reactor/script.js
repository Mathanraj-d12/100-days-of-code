const wordBox = document.getElementById("wordBox");
const letterDisplay = document.getElementById("letter");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let currentWord = "Apple";
let score = 0;
let time = 10;
let timer;

const wordList = [
  "apple", "eagle", "earth", "hat", "top", "pencil", "lamp", "mirror",
  "rat", "tank", "king", "ghost", "tree", "egg", "grape", "event"
];

function startGame() {
  currentWord = getRandomWord();
  wordBox.textContent = currentWord;
  letterDisplay.textContent = currentWord.slice(-1).toUpperCase();
  score = 0;
  updateScore();
  resetTimer();
}

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function resetTimer() {
  clearInterval(timer);
  time = 10;
  timeDisplay.textContent = time;
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      result.textContent = "💥 Time's up! Game Over.";
      userInput.disabled = true;
      submitBtn.disabled = true;
    }
  }, 1000);
}

submitBtn.addEventListener("click", () => {
  const userWord = userInput.value.trim().toLowerCase();
  const expectedLetter = currentWord.slice(-1);

  if (userWord.length > 1 && userWord[0] === expectedLetter) {
    result.textContent = "✅ Correct!";
    currentWord = userWord;
    wordBox.textContent = currentWord;
    letterDisplay.textContent = currentWord.slice(-1).toUpperCase();
    userInput.value = "";
    score++;
    updateScore();
    resetTimer();
  } else {
    result.textContent = "❌ Wrong word! Try again.";
  }
});

function updateScore() {
  scoreDisplay.textContent = `🔥 Streak: ${score}`;
}

window.onload = () => {
  startGame();
};
