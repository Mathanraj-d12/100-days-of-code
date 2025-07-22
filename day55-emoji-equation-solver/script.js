const equations = [
  {
    lines: [
      "🍎 + 🍎 + 🍎 = 30",
      "🍎 + 🍌 + 🍌 = 20",
      "🍌 + 🍌 - 🍎 = ❓"
    ],
    solution: 10
  },
  {
    lines: [
      "🍇 + 🍇 + 🍇 = 15",
      "🍇 + 🍉 + 🍉 = 25",
      "🍇 + 🍉 - 🍉 = ❓"
    ],
    solution: 5
  },
  {
    lines: [
      "🍓 + 🍓 + 🍒 = 18",
      "🍓 + 🍒 + 🍒 = 24",
      "🍓 - 🍒 + 🍒 = ❓"
    ],
    solution: 6
  }
];

let currentPuzzle;
const equationBox = document.getElementById("equationBox");
const answerInput = document.getElementById("answer");
const resultDisplay = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

function loadPuzzle() {
  equationBox.innerHTML = "";
  resultDisplay.textContent = "";
  answerInput.value = "";

  currentPuzzle = equations[Math.floor(Math.random() * equations.length)];

  currentPuzzle.lines.forEach(line => {
    const p = document.createElement("p");
    p.textContent = line;
    equationBox.appendChild(p);
  });
}

submitBtn.addEventListener("click", () => {
  const userAnswer = parseInt(answerInput.value);

  if (isNaN(userAnswer)) {
    resultDisplay.textContent = "❌ Please enter a valid number.";
    return;
  }

  if (userAnswer === currentPuzzle.solution) {
    resultDisplay.textContent = "✅ Correct! You're a genius!";
  } else {
    resultDisplay.textContent = `❌ Incorrect. The correct answer was ${currentPuzzle.solution}.`;
  }
});

restartBtn.addEventListener("click", loadPuzzle);

// Load one puzzle on page load
loadPuzzle();
