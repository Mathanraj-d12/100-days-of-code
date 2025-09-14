const stopBtn = document.getElementById("stopBtn");
let gameInterval, gameFrame; // to stop loops

function startGame(game) {
  gameArea.innerHTML = "";
  stopBtn.style.display = "inline-block";

  if (game === "snake") startSnake();
  else if (game === "pong") startPong();
  else if (game === "mole") startMole();
}

function stopGame() {
  gameArea.innerHTML = "<p>Game stopped. Choose another above 👆</p>";
  stopBtn.style.display = "none";
  clearInterval(gameInterval);
  cancelAnimationFrame(gameFrame);
}

/* 🐍 Snake Game */
function startSnake() {
  const canvas = document.createElement("canvas");
  canvas.width = 500; canvas.height = 400;
  const ctx = canvas.getContext("2d");
  gameArea.appendChild(canvas);

  let snake = [{x:50, y:50}], dx=10, dy=0;
  let food = {x:200, y:200}, score=0, alive=true;

  document.addEventListener("keydown", e => {
    if (e.key==="ArrowUp" && dy===0){dx=0;dy=-10;}
    if (e.key==="ArrowDown" && dy===0){dx=0;dy=10;}
    if (e.key==="ArrowLeft" && dx===0){dx=-10;dy=0;}
    if (e.key==="ArrowRight" && dx===0){dx=10;dy=0;}
  });

  function gameLoop() {
    if (!alive) return;
    ctx.clearRect(0,0,500,400);
    snake.unshift({x:snake[0].x+dx,y:snake[0].y+dy});
    if (snake[0].x===food.x && snake[0].y===food.y) {
      score++; food={x:Math.floor(Math.random()*50)*10,y:Math.floor(Math.random()*40)*10};
    } else snake.pop();

    ctx.fillStyle="lime"; snake.forEach(s=>ctx.fillRect(s.x,s.y,10,10));
    ctx.fillStyle="red"; ctx.fillRect(food.x,food.y,10,10);

    if (snake[0].x<0||snake[0].y<0||snake[0].x>=500||snake[0].y>=400||
       snake.slice(1).some(s=>s.x===snake[0].x&&s.y===snake[0].y)) {
      alert("Game Over! Score: "+score);
      alive=false;
      stopGame();
      return;
    }
    gameInterval=setTimeout(gameLoop,100);
  }
  gameLoop();
}

/* 🏓 Pong Game */
function startPong() {
  const canvas=document.createElement("canvas");
  canvas.width=500; canvas.height=400;
  const ctx=canvas.getContext("2d");
  gameArea.appendChild(canvas);

  let paddle={x:200,y:380,w:100,h:10};
  let ball={x:250,y:200,dx:4,dy:-4,r:8};

  document.addEventListener("mousemove",e=>{
    let rect=canvas.getBoundingClientRect();
    paddle.x=e.clientX-rect.left-paddle.w/2;
  });

  function draw() {
    ctx.clearRect(0,0,500,400);
    ctx.fillStyle="white";
    ctx.fillRect(paddle.x,paddle.y,paddle.w,paddle.h);
    ctx.beginPath(); ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2); ctx.fill();

    ball.x+=ball.dx; ball.y+=ball.dy;
    if(ball.x<ball.r||ball.x>500-ball.r) ball.dx*=-1;
    if(ball.y<ball.r) ball.dy*=-1;
    if(ball.y>400-ball.r){ alert("Game Over!"); stopGame(); return; }
    if(ball.y+ball.r>paddle.y && ball.x>paddle.x && ball.x<paddle.x+paddle.w) {
      ball.dy*=-1;
    }
    gameFrame=requestAnimationFrame(draw);
  }
  draw();
}

/* 🐹 Mole Game */
function startMole() {
  let score=0;
  let mole=document.createElement("div");
  mole.style.fontSize="50px";
  mole.style.position="absolute";
  mole.textContent="🐹";
  gameArea.appendChild(mole);

  function moveMole(){
    mole.style.left=Math.random()*450+"px";
    mole.style.top=Math.random()*350+"px";
  }
  mole.addEventListener("click",()=>{score++;moveMole();});
  moveMole();
  gameInterval=setInterval(moveMole,1000);
}

stopBtn.addEventListener("click", stopGame);
