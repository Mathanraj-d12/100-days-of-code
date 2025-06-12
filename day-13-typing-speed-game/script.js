const quotes = [
  "Practice makes a person perfect.",
  "Never stop learning and growing.",
  "Success comes from hard work.",
  "Typing fast needs regular practice.",
  "Consistency is the key to mastery."
];

let startTime, endTime;
const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const resultEl = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");

function startGame() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = randomQuote;
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  resultEl.textContent = "";
  startTime = new Date().getTime();
  submitBtn.disabled = false;
}
function checkResult() {
  const typedText = inputEl.value.trim();
  const originalText = quoteEl.textContent.trim();

  if (typedText.toLowerCase() === originalText.toLowerCase()) {
    endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000; // seconds
    const wordCount = originalText.split(" ").length;
    const speed = Math.round((wordCount / timeTaken) * 60); // WPM

    resultEl.textContent = `✅ Speed: ${speed} WPM | Time: ${timeTaken.toFixed(2)}s`;
  } else {
    resultEl.textContent = "❌ Text doesn't match. Please try again.";
  }

  inputEl.disabled = true;
  submitBtn.disabled = true;
}

