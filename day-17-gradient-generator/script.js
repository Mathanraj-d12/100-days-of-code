function getRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return "#" + hex.padStart(6, "0");
}

function generateGradient() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const direction = "to right"; // Can change to "to left", "to bottom", etc.

  const gradient = `linear-gradient(${direction}, ${color1}, ${color2})`;
  const box = document.getElementById("gradient-box");
  const code = document.getElementById("code");

  box.style.background = gradient;
  code.textContent = `background: ${gradient};`;
}

function copyCSS() {
  const code = document.getElementById("code").textContent;
  navigator.clipboard.writeText(code);
  alert("CSS copied to clipboard!");
}

// Auto-generate on load
generateGradient();
