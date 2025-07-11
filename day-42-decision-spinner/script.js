function spinWheel() {
  const input = document.getElementById("choicesInput").value;
  if (!input.trim()) {
    alert("Please enter at least two options.");
    return;
  }

  const choices = input.split(",").map(c => c.trim()).filter(c => c !== "");
  if (choices.length < 2) {
    alert("Enter at least two valid choices.");
    return;
  }

  // Simulate spinning with delay
  document.getElementById("result").textContent = "Spinning... 🎡";

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const selected = choices[randomIndex];
    document.getElementById("result").textContent = `✅ Result: ${selected}`;
  }, 2000); // 2-second fake spin time
}
