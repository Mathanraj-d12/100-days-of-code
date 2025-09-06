const ball = document.getElementById("ball");
const game = document.getElementById("game");
const timeEl = document.getElementById("time");

let gameOver = false;
let startTime = Date.now();
let velocityY = 0;
let gravity = 0.6;
let isOnGround = true;

// Make ball jump
function jump() {
  if (isOnGround) {
    velocityY = -12;
    isOnGround = false;
  }
}

// Ball physics
function updateBall() {
  if (gameOver) return;

  let ballY = parseInt(window.getComputedStyle(ball).bottom);
  velocityY += gravity;
  ball.style.bottom = Math.max(0, ballY - velocityY) + "px";

  if (parseInt(ball.style.bottom) <= 0) {
    ball.style.bottom = "0px";
    velocityY = 0;
    isOnGround = true;
  }
}

// Spawn spikes
function spawnSpike() {
  if (gameOver) return;
  const spike = document.createElement("div");
  spike.classList.add("spike");
  spike.style.left = "600px";
  game.appendChild(spike);

  let posX = 600;
  const move = setInterval(() => {
    if (gameOver) {
      clearInterval(move);
      return;
    }
    posX -= 5;
    spike.style.left = posX + "px";

    // Collision detection
    const ballRect = ball.getBoundingClientRect();
    const spikeRect = spike.getBoundingClientRect();
    if (
      ballRect.left < spikeRect.right &&
      ballRect.right > spikeRect.left &&
      ballRect.top < spikeRect.bottom &&
      ballRect.bottom > spikeRect.top
    ) {
      endGame();
    }

    if (posX < -30) {
      spike.remove();
      clearInterval(move);
    }
  }, 30);
}

// Timer
function updateTime() {
  if (gameOver) return;
  const time = Math.floor((Date.now() - startTime) / 1000);
  timeEl.innerText = time;
  requestAnimationFrame(updateTime);
}

// End game
function endGame() {
  gameOver = true;
  alert("💀 Game Over! You survived " + timeEl.innerText + " sec.");
  location.reload();
}

// Sound detection
navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  const audioContext = new AudioContext();
  const mic = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  mic.connect(analyser);
  const data = new Uint8Array(analyser.fftSize);

  function detectClap() {
    if (gameOver) return;
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      let v = (data[i] - 128) / 128;
      sum += v * v;
    }
    let volume = Math.sqrt(sum / data.length);
    if (volume > 0.2) {
      jump();
    }
    requestAnimationFrame(detectClap);
  }
  detectClap();
});

// Game loop
setInterval(updateBall, 30);
setInterval(spawnSpike, 2000);
updateTime();
