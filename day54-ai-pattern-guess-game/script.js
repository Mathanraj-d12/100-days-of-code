document.addEventListener("DOMContentLoaded", () => {
  const patterns = [
    { sequence: [2, 4, 6], answer: 8 },
    { sequence: [1, 4, 9], answer: 16 },  // Squares
    { sequence: [3, 6, 12], answer: 24 }, // Multiply by 2
    { sequence: [2, 3, 5, 8], answer: 13 }, // Fibonacci
    { sequence: [10, 7, 4], answer: 1 },  // Decreasing by 3
  ];

  let currentPattern;
  let score = 0;

  const patternText = document.getElementById("pattern");
  const input = document.getElementById("guessInput");
  const submitBtn = document.getElementById("submitBtn");
  const resultMsg = document.getElementById("resultMsg");
  const scoreDisplay = document.getElementById("score");
  const startBtn = document.getElementById("startGameBtn");

  function pickRandomPattern() {
    currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
    patternText.textContent = `Pattern: ${currentPattern.sequence.join(", ")} , ?`;
    input.value = "";
    resultMsg.textContent = "";
  }

  function checkAnswer() {
    const userGuess = parseInt(input.value);
    if (isNaN(userGuess)) {
      resultMsg.textContent = "❌ Please enter a number.";
      return;
    }

    if (userGuess === currentPattern.answer) {
      score++;
      resultMsg.textContent = "✅ Correct! Well done!";
    } else {
      resultMsg.textContent = `❌ Wrong! The answer was ${currentPattern.answer}`;
    }

    scoreDisplay.textContent = `Score: ${score}`;
    setTimeout(pickRandomPattern, 2000); // load new question
  }

  submitBtn.addEventListener("click", checkAnswer);
  startBtn.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    pickRandomPattern();
  });

  // Auto start game on load
  pickRandomPattern();
});
