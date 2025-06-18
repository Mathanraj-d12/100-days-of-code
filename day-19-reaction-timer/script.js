let startTime;
let timeout;
let isGreen = false;

function handleClick() {
  const screen = document.getElementById("screen");
  const message = document.getElementById("message");
  const result = document.getElementById("result");

  if (!startTime) {
    message.textContent = "Wait for Green...";
    screen.style.backgroundColor = "#facc15";

    timeout = setTimeout(() => {
      screen.style.backgroundColor = "#4ade80"; // green
      message.textContent = "CLICK!";
      startTime = new Date().getTime();
      isGreen = true;
    }, Math.floor(Math.random() * 3000) + 2000); // 2-5 sec
  } else if (isGreen) {
    const endTime = new Date().getTime();
    const reactionTime = endTime - startTime;
    message.textContent = "Click to Start";
    result.textContent = `⏱️ Your Reaction Time: ${reactionTime} ms`;
    reset();
  } else {
    clearTimeout(timeout);
    screen.style.backgroundColor = "#f87171";
    message.textContent = "❌ Too Soon! Click to Try Again";
    result.textContent = "";
    reset();
  }
}

function reset() {
  startTime = null;
  isGreen = false;
}
