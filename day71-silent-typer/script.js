const sentenceList = [
  "The eagle flies at midnight",
  "Operation stealth is a go",
  "Meet at the shadow gate",
  "Green light for silent strike"
];

const eye = document.getElementById("eye");
const sentenceEl = document.getElementById("sentence");
const inputBox = document.getElementById("inputBox");
const statusEl = document.getElementById("status");

let currentSentence = "";
let eyeOpen = false;
let gameOver = false;

function randomSentence() {
  return sentenceList[Math.floor(Math.random() * sentenceList.length)];
}

function updateEye() {
  if (Math.random() < 0.5) {
    eye.className = "closed";
    eye.textContent = "🙈";
    eyeOpen = false;
  } else {
    eye.className = "open";
    eye.textContent = "👁️";
    eyeOpen = true;
  }
}

function endGame(message, color = "red") {
  statusEl.textContent = message;
  statusEl.style.color = color;
  inputBox.disabled = true;
  clearInterval(eyeInterval);
}

const eyeInterval = setInterval(updateEye, 1500);

currentSentence = randomSentence();
sentenceEl.textContent = `Secret: "${currentSentence}"`;

inputBox.addEventListener("input", () => {
  if (gameOver) return;
  if (eyeOpen) {
    gameOver = true;
    endGame("You were seen! Mission failed.");
  } else if (inputBox.value === currentSentence) {
    gameOver = true;
    endGame("Mission Success! 🥷", "lime");
  }
});
