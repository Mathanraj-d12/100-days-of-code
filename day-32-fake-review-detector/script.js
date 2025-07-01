function analyzeReview() {
  const input = document.getElementById("reviewInput").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");

  if (!input) {
    resultBox.textContent = "❗ Please paste a review first.";
    return;
  }

  let score = 0;
  let messages = [];

  // Check length
  if (input.length < 30) {
    score -= 2;
    messages.push("Too short 🧐");
  }

  // Hype words
  const hypeWords = ["best", "awesome", "amazing", "life changing", "must buy"];
  let hypeCount = hypeWords.filter(word => input.includes(word)).length;
  if (hypeCount > 2) {
    score -= 2;
    messages.push("Too many hype words 🚨");
  }

  // Repetition
  if ((input.match(/very/g) || []).length > 3) {
    score -= 1;
    messages.push("Repeated words 🤔");
  }

  // Emojis and exclamations
  if ((input.match(/!/g) || []).length > 3) {
    score -= 1;
    messages.push("Too many exclamations ❗❗");
  }

  // Balanced words (positive + neutral)
  if (input.includes("however") || input.includes("but")) {
    score += 2;
    messages.push("Balanced opinion 👍");
  }

  // Final result
  let result = "";
  if (score <= -3) {
    result = "🚨 This review looks suspicious!";
  } else if (score <= 0) {
    result = "😐 Could be fake. Review looks generic.";
  } else {
    result = "✅ Looks like a genuine review!";
  }

  resultBox.innerHTML = `<strong>${result}</strong><br><br>${messages.join("<br>")}`;
}
