const words = ["fast", "battle", "fire", "crazy", "power", "type", "speed", "keyboard", "warrior", "duel"];

const p1WordsEl = document.getElementById("p1-words");
const p2WordsEl = document.getElementById("p2-words");
const p1Input = document.getElementById("p1-input");
const p2Input = document.getElementById("p2-input");
const p1ScoreEl = document.getElementById("p1-score");
const p2ScoreEl = document.getElementById("p2-score");

let p1Word = "";
let p2Word = "";
let p1Score = 0;
let p2Score = 0;

function newWord(player) {
  let word = words[Math.floor(Math.random() * words.length)];
  if (player === 1) {
    p1Word = word;
    p1WordsEl.innerText = word;
  } else {
    p2Word = word;
    p2WordsEl.innerText = word;
  }
}

function checkWin() {
  if (p1Score >= 10) {
    alert("🎉 Player 1 Wins!");
    location.reload();
  }
  if (p2Score >= 10) {
    alert("🎉 Player 2 Wins!");
    location.reload();
  }
}

p1Input.addEventListener("input", () => {
  if (p1Input.value.trim() === p1Word) {
    p1Score++;
    p1ScoreEl.innerText = p1Score;
    p1Input.value = "";
    newWord(1);
    checkWin();
  }
});

p2Input.addEventListener("input", () => {
  if (p2Input.value.trim() === p2Word) {
    p2Score++;
    p2ScoreEl.innerText = p2Score;
    p2Input.value = "";
    newWord(2);
    checkWin();
  }
});

newWord(1);
newWord(2);
