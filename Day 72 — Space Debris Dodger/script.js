/* Space Debris Dodger
   - Canvas game
   - Keyboard + touch controls
   - Asteroids spawn and fall; player must dodge
   - Best score saved to localStorage
*/

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const levelEl = document.getElementById("level");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

const leftPad = document.getElementById("leftPad");
const rightPad = document.getElementById("rightPad");
const touchControls = document.getElementById("touchControls");

let width, height, dpr;
function resizeCanvas(){
  dpr = window.devicePixelRatio || 1;
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* GAME STATE */
let running = false;
let paused = false;
let lastTime = 0;
let spawnTimer = 0;
let spawnInterval = 1200; // ms initial
let asteroids = [];
let score = 0;
let best = parseInt(localStorage.getItem("sd_best") || "0", 10);
bestEl.textContent = best;
let level = 1;

/* PLAYER */
const ship = {
  x: 100,
  y: 0,
  radius: 18,
  speed: 260, // px/sec
  vx: 0
};

/* Input */
const keys = { left:false, right:false };
let touchLeft = false, touchRight = false;

/* Difficulty scaling */
const difficulty = {
  spawnDecreasePerLevel: 80,   // ms less per level
  minSpawn: 350,
  asteroidSpeedInc: 0.08,      // % increase per level
  levelUpInterval: 12_000      // ms to increase level (~12s)
};
let levelTimer = 0;

/* Utility */
function rand(min, max){ return Math.random() * (max - min) + min; }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* Asteroid structure: {x,y,r,vx,vy,rot,rotSpeed,color} */
function spawnAsteroid(){
  const r = rand(12, 46);
  // spawn at top or from sides occasionally
  const spawnFromSide = Math.random() < 0.12;
  let x = rand(r, width - r);
  let y = -r;

  if (spawnFromSide) {
    if (Math.random() < 0.5) { // left
      x = -r;
      y = rand(0, height * 0.5);
    } else { // right
      x = width + r;
      y = rand(0, height * 0.5);
    }
  }

  const baseSpeed = rand(60, 160);
  // scale with level
  const speedMultiplier = 1 + (level - 1) * difficulty.asteroidSpeedInc;
  const vy = baseSpeed * speedMultiplier;
  const vx = spawnFromSide ? (x < 0 ? rand(40,120) : -rand(40,120)) : rand(-30,30);

  const rot = Math.random() * Math.PI * 2;
  const rotSpeed = rand(-1.2, 1.2);
  const color = `hsl(${Math.floor(rand(10,50))} 80% ${rand(35,55)}%)`;

  asteroids.push({x,y,r,vx,vy,rot,rotSpeed,color});
}

/* Player draw: triangle ship which we approximate as circle for collision */
function drawShip(){
  const {x,y,radius} = ship;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#a6e3ff";
  // draw triangle pointing up
  ctx.beginPath();
  ctx.moveTo(0, -radius);
  ctx.lineTo(radius*0.8, radius);
  ctx.lineTo(-radius*0.8, radius);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/* Asteroids draw */
function drawAsteroid(a){
  ctx.save();
  ctx.translate(a.x, a.y);
  ctx.rotate(a.rot);
  ctx.fillStyle = a.color;
  ctx.beginPath();
  // draw irregular rocky circle
  const spikes = 8;
  for (let i=0;i<spikes;i++){
    const ang = (i/spikes) * Math.PI*2;
    const rr = a.r * (0.75 + Math.random()*0.45);
    if (i===0) ctx.moveTo(Math.cos(ang)*rr, Math.sin(ang)*rr);
    else ctx.lineTo(Math.cos(ang)*rr, Math.sin(ang)*rr);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/* Basic circle-circle collision (ship approximated as circle) */
function checkCollision(a){
  const dx = a.x - ship.x;
  const dy = a.y - ship.y;
  const dist = Math.hypot(dx, dy);
  return dist < (a.r + ship.radius - 4); // -4 for forgiving margin
}

/* Reset game state */
function resetGameState(){
  asteroids = [];
  score = 0;
  spawnInterval = 1200;
  level = 1;
  levelTimer = 0;
  spawnTimer = 0;
  ship.x = width/2;
  ship.y = height - 80;
  ship.vx = 0;
  scoreEl.textContent = score;
  levelEl.textContent = level;
}

/* Start / Pause / Restart handlers */
startBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    paused = false;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    restartBtn.disabled = false;
    lastTime = performance.now();
    resetGameState();
    loop(lastTime);
  }
});

pauseBtn.addEventListener("click", () => {
  if (!running) return;
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
  if (!paused) {
    lastTime = performance.now();
    loop(lastTime);
  }
});

restartBtn.addEventListener("click", () => {
  running = false;
  paused = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  restartBtn.disabled = true;
  pauseBtn.textContent = "Pause";
  resetGameState();
  // clear canvas
  ctx.clearRect(0,0,width,height);
});

/* Input listeners (keyboard) */
window.addEventListener("keydown", e=>{
  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.left=true;
  if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.right=true;
});
window.addEventListener("keyup", e=>{
  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.left=false;
  if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.right=false;
});

/* Touch pads */
leftPad.addEventListener("pointerdown", ()=>{ touchLeft=true; });
leftPad.addEventListener("pointerup", ()=>{ touchLeft=false; });
leftPad.addEventListener("pointercancel", ()=>{ touchLeft=false; });
rightPad.addEventListener("pointerdown", ()=>{ touchRight=true; });
rightPad.addEventListener("pointerup", ()=>{ touchRight=false; });
rightPad.addEventListener("pointercancel", ()=>{ touchRight=false; });

/* Main loop */
function loop(timestamp){
  if (!running || paused) return;
  const dt = Math.min(50, timestamp - lastTime); // ms
  lastTime = timestamp;

  update(dt/1000);
  render();

  requestAnimationFrame(loop);
}

/* Update physics & game state */
function update(dt){
  // move ship
  ship.vx = 0;
  if (keys.left || touchLeft) ship.vx = -ship.speed;
  if (keys.right || touchRight) ship.vx = ship.speed;
  ship.x += ship.vx * dt;
  // constrain
  ship.x = Math.max(ship.radius, Math.min(width - ship.radius, ship.x));

  // spawn asteroids
  spawnTimer += dt*1000;
  if (spawnTimer >= spawnInterval){
    spawnTimer = 0;
    spawnAsteroid();
  }

  // update asteroids
  for (let i = asteroids.length - 1; i >= 0; i--){
    const a = asteroids[i];
    a.x += a.vx * dt;
    a.y += a.vy * dt;
    a.rot += a.rotSpeed * dt;

    // remove off-screen
    if (a.y - a.r > height + 200 || a.x + a.r < -300 || a.x - a.r > width + 300){
      asteroids.splice(i,1);
      score += 1; // reward for dodging (survived asteroid)
      scoreEl.textContent = score;
      if (score > best) {
        best = score;
        localStorage.setItem("sd_best", best);
        bestEl.textContent = best;
      }
    } else {
      // collision check
      if (checkCollision(a)){
        // GAME OVER
        running = false;
        pauseBtn.disabled = true;
        startBtn.disabled = false;
        restartBtn.disabled = false;
        pauseBtn.textContent = "Pause";
        // draw explosion or message
        showGameOver();
        break;
      }
    }
  }

  // difficulty scaling by time
  levelTimer += dt*1000;
  if (levelTimer >= difficulty.levelUpInterval){
    levelTimer = 0;
    level++;
    // speed up spawn
    spawnInterval = Math.max(difficulty.minSpawn, spawnInterval - difficulty.spawnDecreasePerLevel);
    levelEl.textContent = level;
  }
}

/* Render everything to canvas */
function render(){
  ctx.clearRect(0,0,width,height);

  // background stars (parallax)
  drawStars();

  // draw ship near bottom
  drawShip();

  // asteroids
  for (const a of asteroids) drawAsteroid(a);

  // HUD overlay (hint)
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.fillRect(12,12,220,38);
  ctx.font = "12px Inter, Arial";
  ctx.fillStyle = "#dbeafe";
  ctx.fillText("Avoid the debris — survive & score!", 22,36);
  ctx.restore();
}

/* Simple background stars renderer (light weight) */
let starSeed = [];
function drawStars(){
  if (starSeed.length === 0){
    const count = Math.floor((width*height)/40000);
    for (let i=0;i<count;i++){
      starSeed.push({
        x: Math.random()*width,
        y: Math.random()*height,
        r: Math.random()*1.6,
        alpha: rand(0.2,0.9)
      });
    }
  }
  for (const s of starSeed){
    ctx.beginPath();
    ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  }
}

/* Show game over overlay and explosion effect */
function showGameOver(){
  // brief explosion circle
  ctx.save();
  ctx.fillStyle = "rgba(255,80,50,0.9)";
  ctx.beginPath();
  ctx.arc(ship.x, ship.y, 64, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  // overlay text
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0,0,width,height);
  ctx.fillStyle = "#ffebee";
  ctx.font = "36px Inter, Arial";
  ctx.textAlign = "center";
  ctx.fillText("💥 You Crashed!", width/2, height/2 - 10);
  ctx.font = "20px Inter, Arial";
  ctx.fillText(`Score: ${score}  •  Best: ${best}`, width/2, height/2 + 30);
  ctx.restore();
}

/* initialize ship start pos */
function init(){
  resizeCanvas();
  ship.x = width/2;
  ship.y = height - 80;
  resetGameState();
  // show initial frame
  render();
}
init();
