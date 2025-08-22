const emojis = ["😀", "😎", "😂", "😍", "🤔", "😡", "😭", "😴", "👻", "🐱", "🐶", "🍕", "🍎", "⚽", "🚗", "🎲"];
let sequence = [];

const emojiDisplay = document.getElementById("emoji-sequence");
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

function startGame() {
  result.textContent = "";
  userInput.value = "";
  sequence = [];

  // Pick 4 random emojis
  for (let i = 0; i < 4; i++) {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    sequence.push(randomEmoji);
  }

  emojiDisplay.textContent = sequence.join(" ");

  // Hide after 3 seconds
  setTimeout(() => {
    emojiDisplay.textContent = "🤫 Remember the sequence!";
  }, 3000);
}

checkBtn.addEventListener("click", () => {
  if (userInput.value.trim() === sequence.join(" ")) {
    result.textContent = "✅ Correct! You have a great memory!";
    result.style.color = "green";
  } else {
    result.textContent = `❌ Wrong! The sequence was: ${sequence.join(" ")}`;
    result.style.color = "red";
  }
});

restartBtn.addEventListener("click", startGame);

// Start first game
startGame();
