const wordsContainer = document.getElementById("words");
const input = document.getElementById("input");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");

let score = 0;
let lives = 3;
let words = ["code", "fire", "game", "type", "fast", "crazy", "angry", "hero", "blast", "keyboard"];
let activeWords = [];

function spawnWord() {
  let word = document.createElement("div");
  word.className = "word";
  word.innerText = words[Math.floor(Math.random() * words.length)];
  word.style.top = Math.random() * 60 + "%";
  word.style.left = "100%";
  wordsContainer.appendChild(word);

  activeWords.push({ element: word, text: word.innerText, x: 100 });
}

function moveWords() {
  activeWords.forEach((w, index) => {
    w.x -= 0.3; // speed
    w.element.style.left = w.x + "%";

    if (w.x <= 0) {
      w.element.remove();
      activeWords.splice(index, 1);
      loseLife();
    }
  });
}

function loseLife() {
  lives--;
  livesEl.innerText = lives;
  if (lives <= 0) {
    alert("Game Over! Your score: " + score);
    location.reload();
  }
}

input.addEventListener("input", () => {
  let typed = input.value.trim();
  activeWords.forEach((w, index) => {
    if (w.text === typed) {
      score++;
      scoreEl.innerText = score;
      w.element.remove();
      activeWords.splice(index, 1);
      input.value = "";
    }
  });
});

setInterval(spawnWord, 2000);
setInterval(moveWords, 50);
