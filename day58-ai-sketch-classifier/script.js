const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const guessBtn = document.getElementById("guessBtn");
const clearBtn = document.getElementById("clearBtn");
const promptEl = document.getElementById("prompt");
const aiGuessEl = document.getElementById("aiGuess");

const prompts = ["cat", "house", "tree", "car", "fish", "flower", "star", "boat"];
let currentPrompt = "";

function getRandomPrompt() {
  currentPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  promptEl.textContent = currentPrompt;
}
getRandomPrompt();

// Drawing logic
let drawing = false;
canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);

canvas.addEventListener("mousemove", draw);
function draw(e) {
  if (!drawing) return;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, 5, 0, Math.PI * 2);
  ctx.fill();
}

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  aiGuessEl.textContent = "";
});

guessBtn.addEventListener("click", () => {
  aiGuessEl.textContent = "🤔 AI is thinking...";

  // Simulate sending image using fetch (mocked here)
  setTimeout(() => {
    const fakeGuesses = [currentPrompt, ...prompts].sort(() => 0.5 - Math.random());
    const guess = fakeGuesses[0];
    if (guess === currentPrompt) {
      aiGuessEl.textContent = `✅ I think it's a "${guess}"! Got it right!`;
    } else {
      aiGuessEl.textContent = `❌ I guessed "${guess}". Try again!`;
    }
  }, 1000);
});
