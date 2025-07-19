const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");

const cols = 20;
const rows = 20;
const cellSize = canvas.width / cols;

let grid = [];
let stack = [];

let player = {};
let goal = {};

// Cell constructor
function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.walls = [true, true, true, true]; // top, right, bottom, left
  this.visited = false;

  this.checkNeighbors = function () {
    const neighbors = [];

    const top = grid[index(x, y - 1)];
    const right = grid[index(x + 1, y)];
    const bottom = grid[index(x, y + 1)];
    const left = grid[index(x - 1, y)];

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    if (neighbors.length > 0) {
      return neighbors[Math.floor(Math.random() * neighbors.length)];
    } else {
      return undefined;
    }
  };

  this.highlight = function () {
    const x = this.x * cellSize;
    const y = this.y * cellSize;
    ctx.fillStyle = "purple";
    ctx.fillRect(x, y, cellSize, cellSize);
  };

  this.show = function () {
    const x = this.x * cellSize;
    const y = this.y * cellSize;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    if (this.walls[0]) drawLine(x, y, x + cellSize, y); // top
    if (this.walls[1]) drawLine(x + cellSize, y, x + cellSize, y + cellSize); // right
    if (this.walls[2]) drawLine(x + cellSize, y + cellSize, x, y + cellSize); // bottom
    if (this.walls[3]) drawLine(x, y + cellSize, x, y); // left

    if (this.visited) {
      ctx.fillStyle = "#eee";
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  };
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function index(x, y) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;
  return x + y * cols;
}

function removeWalls(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  if (dx === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (dx === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  if (dy === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (dy === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

// Maze generation
function setup() {
  grid = [];
  stack = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid.push(new Cell(x, y));
    }
  }

  const start = grid[0];
  start.visited = true;
  stack.push(start);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const next = current.checkNeighbors();

    if (next) {
      next.visited = true;
      stack.push(next);
      removeWalls(current, next);
    } else {
      stack.pop();
    }
  }

  // Randomize start and goal
  const startX = Math.floor(Math.random() * cols);
  const startY = Math.floor(Math.random() * rows);
  const goalX = Math.floor(Math.random() * cols);
  const goalY = Math.floor(Math.random() * rows);

  player = { x: startX, y: startY };
  goal = { x: goalX, y: goalY };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  grid.forEach(cell => cell.show());

  // Draw goal
  ctx.fillStyle = "green";
  ctx.fillRect(goal.x * cellSize + 5, goal.y * cellSize + 5, cellSize - 10, cellSize - 10);

  // Draw player
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x * cellSize + 5, player.y * cellSize + 5, cellSize - 10, cellSize - 10);

  if (player.x === goal.x && player.y === goal.y) {
    setTimeout(() => {
      alert("🎉 You escaped the maze!");
      setup(); // Reset
    }, 100);
  }
}

function movePlayer(dx, dy) {
  const current = grid[index(player.x, player.y)];
  const next = grid[index(player.x + dx, player.y + dy)];

  if (!next) return;

  if (dx === -1 && !current.walls[3]) player.x--;
  if (dx === 1 && !current.walls[1]) player.x++;
  if (dy === -1 && !current.walls[0]) player.y--;
  if (dy === 1 && !current.walls[2]) player.y++;
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
  draw();
});

// Start
setup();
draw();
