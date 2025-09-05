const game = document.getElementById("game");
const player = document.getElementById("player");
const timeEl = document.getElementById("time");

let startTime = Date.now();
let obstacles = [];
let gameOver = false;

// Move player with mouse
game.addEventListener("mousemove", (e) => {
  const rect = game.getBoundingClientRect();
  const x = e.clientX - rect.left - player.offsetWidth / 2;
  const y = e.clientY - rect.top - player.offsetHeight / 2;
  player.style.left = `${x}px`;
  player.style.top = `${y}px`;
});

// Generate obstacles
function spawnObstacle() {
  if (gameOver) return;
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.top = Math.random() * 350 + "px";
  obstacle.style.left = "0px";
  game.appendChild(obstacle);

  let posX = 0;
  const speed = 2 + Math.random() * 3;

  const move = setInterval(() => {
    if (gameOver) {
      clearInterval(move);
      return;
    }
    posX += speed;
    obstacle.style.left = posX + "px";

    // Collision detection
    const playerRect = player.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();
    if (
      playerRect.left < obsRect.right &&
      playerRect.right > obsRect.left &&
      playerRect.top < obsRect.bottom &&
      playerRect.bottom > obsRect.top
    ) {
      endGame();
    }

    // Remove off-screen obstacles
    if (posX > 600) {
      obstacle.remove();
      clearInterval(move);
    }
  }, 20);

  obstacles.push(obstacle);
}

// Update survival time
function updateTime() {
  if (gameOver) return;
  const time = Math.floor((Date.now() - startTime) / 1000);
  timeEl.innerText = time;
  requestAnimationFrame(updateTime);
}

function endGame() {
  gameOver = true;
  alert("💀 Game Over! You survived " + timeEl.innerText + " sec.");
  location.reload();
}

setInterval(spawnObstacle, 1500);
updateTime();
