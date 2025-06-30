const textInput = document.getElementById("textInput");
const previewBox = document.getElementById("previewBox");

const fontSize = document.getElementById("fontSize");
const fontSizeVal = document.getElementById("fontSizeVal");

const fontWeight = document.getElementById("fontWeight");
const fontFamily = document.getElementById("fontFamily");
const letterSpacing = document.getElementById("letterSpacing");
const spacingVal = document.getElementById("spacingVal");
const textTransform = document.getElementById("textTransform");

function updatePreview() {
  previewBox.textContent = textInput.value || "Your styled text will appear here";
  previewBox.style.fontSize = fontSize.value + "px";
  previewBox.style.fontWeight = fontWeight.value;
  previewBox.style.fontFamily = fontFamily.value;
  previewBox.style.letterSpacing = letterSpacing.value + "px";
  previewBox.style.textTransform = textTransform.value;

  fontSizeVal.textContent = fontSize.value + "px";
  spacingVal.textContent = letterSpacing.value + "px";
}

textInput.addEventListener("input", updatePreview);
fontSize.addEventListener("input", updatePreview);
fontWeight.addEventListener("change", updatePreview);
fontFamily.addEventListener("change", updatePreview);
letterSpacing.addEventListener("input", updatePreview);
textTransform.addEventListener("change", updatePreview);

updatePreview(); // Initialize preview
