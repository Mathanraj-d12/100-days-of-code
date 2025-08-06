const screen = document.getElementById("screen");
const message = document.getElementById("message");
const result = document.getElementById("result");

let startTime = 0;
let timeout = null;
let isWaiting = false;
let isReady = false;
let greenDuration = 600; // milliseconds

function startTest() {
  screen.classList.remove("ready", "too-soon");
  message.textContent = "Wait for green...";
  result.textContent = "";
  isWaiting = true;
  isReady = false;

  const delay = Math.floor(Math.random() * 3000) + 2000; // 2–5 sec

  timeout = setTimeout(() => {
    screen.classList.add("ready");
    message.textContent = "CLICK NOW!";
    startTime = Date.now();
    isReady = true;
    isWaiting = false;

    // Flash green briefly (then timeout!)
    setTimeout(() => {
      if (isReady) {
        isReady = false;
        screen.classList.remove("ready");
        screen.classList.add("too-soon");
        message.textContent = "Too Slow! ⏱️";
        result.textContent = "You missed the green.";
      }
    }, greenDuration);
  }, delay);
}

screen.addEventListener("click", () => {
  if (isWaiting) {
    clearTimeout(timeout);
    screen.classList.add("too-soon");
    message.textContent = "Too Soon! 😬";
    result.textContent = "You clicked before green.";
    isWaiting = false;
  } else if (isReady) {
    const reactionTime = Date.now() - startTime;
    message.textContent = "Your Reaction Time:";
    result.textContent = `${reactionTime} ms`;
    isReady = false;
  } else {
    startTest();
  }
});
