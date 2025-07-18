const game = document.getElementById("game");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let score = 0;
let gameInterval = null;

// Move basket
document.addEventListener("keydown", function (e) {
  const left = basket.offsetLeft;
  if (e.key === "ArrowLeft" && left > 0) {
    basket.style.left = left - 30 + "px";
  } else if (e.key === "ArrowRight" && left < game.clientWidth - basket.offsetWidth) {
    basket.style.left = left + 30 + "px";
  }
});

function dropEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.textContent = Math.random() < 0.8 ? "🍎" : "💣";

  emoji.style.left = Math.floor(Math.random() * (game.clientWidth - 30)) + "px";
  game.appendChild(emoji);

  let top = 0;
  const fall = setInterval(() => {
    top += 5;
    emoji.style.top = top + "px";

    if (top > game.clientHeight - 50) {
      const emojiRect = emoji.getBoundingClientRect();
      const basketRect = basket.getBoundingClientRect();

      if (
        emojiRect.left < basketRect.right &&
        emojiRect.right > basketRect.left &&
        emojiRect.bottom > basketRect.top
      ) {
        if (emoji.textContent === "🍎") score++;
        else score--;
        scoreDisplay.textContent = "Score: " + score;
      }

      emoji.remove();
      clearInterval(fall);
    }
  }, 30);
}

// Start and Stop
startBtn.onclick = () => {
  if (!gameInterval) {
    gameInterval = setInterval(dropEmoji, 1200);
  }
};

stopBtn.onclick = () => {
  clearInterval(gameInterval);
  gameInterval = null;
};
