let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const guess = parseInt(document.getElementById("guess").value);
  const message = document.getElementById("message");
  const attemptsText = document.getElementById("attempts");

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "Please enter a valid number (1-100)";
    return;
  }

  attempts++;
  attemptsText.textContent = `Attempts: ${attempts}`;

  if (guess === secretNumber) {
    message.textContent = `🎉 Correct! The number was ${secretNumber}`;
  } else if (guess < secretNumber) {
    message.textContent = "📉 Too low! Try again.";
  } else {
    message.textContent = "📈 Too high! Try again.";
  }
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("message").textContent = "";
  document.getElementById("attempts").textContent = "Attempts: 0";
  document.getElementById("guess").value = "";
}
