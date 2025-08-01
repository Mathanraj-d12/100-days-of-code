const colors = ["Red", "Blue", "Green", "Yellow", "Purple"];
let secretCode = [];
let currentGuess = [];
let attempts = 5;

const guessBox = document.getElementById("guessBox");
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

function generateSecretCode() {
  secretCode = [];
  while (secretCode.length < 3) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    if (!secretCode.includes(color)) {
      secretCode.push(color);
    }
  }
  console.log("Secret:", secretCode); // remove or comment after testing
}

function updateGuessBox() {
  guessBox.innerHTML = "";
  currentGuess.forEach(color => {
    const div = document.createElement("div");
    div.className = "guess-color";
    div.style.background = color.toLowerCase();
    guessBox.appendChild(div);
  });
}

document.querySelectorAll(".color").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentGuess.length < 3) {
      currentGuess.push(btn.dataset.color);
      updateGuessBox();
    }
  });
});

submitBtn.addEventListener("click", () => {
  if (currentGuess.length < 3) {
    feedback.textContent = "Pick 3 colors!";
    return;
  }

  let correctPlace = 0;
  let correctColor = 0;

  const codeCopy = [...secretCode];
  const guessCopy = [...currentGuess];

  // Check correct place
  for (let i = 0; i < 3; i++) {
    if (guessCopy[i] === codeCopy[i]) {
      correctPlace++;
      codeCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // Check correct color wrong place
  for (let i = 0; i < 3; i++) {
    if (guessCopy[i] && codeCopy.includes(guessCopy[i])) {
      correctColor++;
      codeCopy[codeCopy.indexOf(guessCopy[i])] = null;
    }
  }

  if (correctPlace === 3) {
    feedback.textContent = "🎉 You cracked the code!";
    submitBtn.disabled = true;
  } else {
    feedback.textContent = `🎯 ${correctPlace} in right place, 🎨 ${correctColor} right color`;
    attempts--;
    attemptsText.textContent = `Attempts Left: ${attempts}`;
    if (attempts === 0) {
      feedback.textContent = `💥 Game Over! The code was: ${secretCode.join(", ")}`;
      submitBtn.disabled = true;
    }
  }

  currentGuess = [];
  updateGuessBox();
});

resetBtn.addEventListener("click", () => {
  currentGuess = [];
  attempts = 5;
  submitBtn.disabled = false;
  feedback.textContent = "";
  attemptsText.textContent = `Attempts Left: ${attempts}`;
  updateGuessBox();
  generateSecretCode();
});

window.onload = generateSecretCode;
