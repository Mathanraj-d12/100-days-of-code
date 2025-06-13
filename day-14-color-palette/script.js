function generateColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return "#" + hex.padStart(6, "0");
}

function generatePalette() {
  const palette = document.getElementById("palette");
  palette.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const color = generateColor();
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;
    box.textContent = color;

    box.onclick = () => {
      navigator.clipboard.writeText(color);
      box.textContent = "Copied!";
      setTimeout(() => {
        box.textContent = color;
      }, 1000);
    };

    palette.appendChild(box);
  }
}

// Load palette on first load
generatePalette();
