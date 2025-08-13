const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

let basket = { x: 180, y: 450, width: 50, height: 20, speed: 5 };
let stars = [];
let score = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") basket.x -= basket.speed;
  if (e.key === "ArrowRight") basket.x += basket.speed;
});

function spawnStar() {
  let x = Math.random() * (canvas.width - 20);
  stars.push({ x: x, y: 0, size: 15, speed: 2 + Math.random() * 2 });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw basket
  ctx.fillStyle = "yellow";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

  // Update & draw stars
  ctx.fillStyle = "white";
  for (let i = stars.length - 1; i >= 0; i--) {
    let s = stars[i];
    s.y += s.speed;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Collision detection
    if (
      s.y + s.size > basket.y &&
      s.x > basket.x &&
      s.x < basket.x + basket.width
    ) {
      score++;
      document.getElementById("score").textContent = "Score: " + score;
      stars.splice(i, 1);
    } else if (s.y > canvas.height) {
      stars.splice(i, 1);
    }
  }

  requestAnimationFrame(update);
}

setInterval(spawnStar, 1000);
update();
