const words = ["python", "javascript", "github", "memory", "program", "developer", "function", "variable"];
let currentWord = "";
let scrambledWord = "";

function scramble(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

function nextWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambledWord = scramble(currentWord);
  document.getElementById("scrambled").innerText = scrambledWord;
  document.getElementById("result").innerText = "";
  document.getElementById("guessInput").value = "";
}

function checkGuess() {
  const guess = document.getElementById("guessInput").value.toLowerCase();
  if (guess === currentWord) {
    document.getElementById("result").innerText = "🎉 Correct!";
  } else {
    document.getElementById("result").innerText = "❌ Try Again!";
  }
}

// Start game with first word
nextWord();
