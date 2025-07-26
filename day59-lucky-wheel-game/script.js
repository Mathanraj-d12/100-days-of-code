const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const rewards = [
  "💰 100",
  "🎁 Bonus",
  "❌ Lose",
  "💰 200",
  "🎉 Jackpot",
  "💰 50"
];

let currentRotation = 0;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  result.textContent = "Spinning...";

  const degreesPerSegment = 360 / rewards.length;
  const randomSpin = Math.floor(Math.random() * 360); // random stopping angle
  const extraRotation = 360 * 5; // extra full spins
  const totalRotation = extraRotation + randomSpin;

  currentRotation += totalRotation;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  // Delay until spin finishes
  setTimeout(() => {
    const actualAngle = currentRotation % 360;
    const index = Math.floor(((360 - actualAngle + degreesPerSegment / 2) % 360) / degreesPerSegment);
    result.textContent = `🎉 You won: ${rewards[index]}!`;
    spinBtn.disabled = false;
  }, 4200);
});
