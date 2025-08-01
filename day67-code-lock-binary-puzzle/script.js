const targetCodeSpan = document.getElementById("targetCode");
const switchesDiv = document.getElementById("switches");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

let targetCode = "";
let switches = [];

function generateCode(length = 5) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += Math.round(Math.random()); // 0 or 1
  }
  return code;
}

function createSwitches(length = 5) {
  switchesDiv.innerHTML = "";
  switches = [];

  for (let i = 0; i < length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("switch");
    btn.textContent = "0";

    btn.addEventListener("click", () => {
      btn.textContent = btn.textContent === "0" ? "1" : "0";
      btn.classList.toggle("active");
      checkMatch();
    });

    switchesDiv.appendChild(btn);
    switches.push(btn);
  }
}

function checkMatch() {
  const current = switches.map(btn => btn.textContent).join("");
  if (current === targetCode) {
    result.textContent = "🎉 Code Unlocked!";
  } else {
    result.textContent = "";
  }
}

function resetGame() {
  targetCode = generateCode();
  targetCodeSpan.textContent = targetCode;
  createSwitches();
  result.textContent = "";
}

resetBtn.addEventListener("click", resetGame);

window.onload = resetGame;
