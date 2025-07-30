const morseCodeMap = {
  A: ".-",    B: "-...",  C: "-.-.",  D: "-..",
  E: ".",     F: "..-.",  G: "--.",   H: "....",
  I: "..",    J: ".---",  K: "-.-",   L: ".-..",
  M: "--",    N: "-.",    O: "---",   P: ".--.",
  Q: "--.-",  R: ".-.",   S: "...",   T: "-",
  U: "..-",   V: "...-",  W: ".--",   X: "-..-",
  Y: "-.--",  Z: "--.."
};

const words = ["code", "game", "morse", "light", "guess", "dash", "radio"];
let currentWord = "";
let score = 0;

const morseDisplay = document.getElementById("morseCodeDisplay");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const resultText = document.getElementById("resultText");
const scoreText = document.getElementById("scoreText");

function wordToMorse(word) {
  return word
    .toUpperCase()
    .split("")
    .map(letter => morseCodeMap[letter] || "")
    .join(" ");
}

function pickRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  morseDisplay.textContent = wordToMorse(currentWord);
  userInput.value = "";
  resultText.textContent = "";
}

submitBtn.addEventListener("click", () => {
  const guess = userInput.value.trim().toLowerCase();
  if (guess === currentWord) {
    resultText.textContent = "✅ Correct!";
    score++;
  } else {
    resultText.textContent = `❌ Wrong! It was "${currentWord}"`;
    score = 0;
  }
  scoreText.textContent = `Score: ${score}`;
  setTimeout(pickRandomWord, 1500);
});

window.onload = pickRandomWord;
