function saveMood(emoji) {
  const today = new Date().toLocaleDateString();
  const moodData = { date: today, mood: emoji };
  localStorage.setItem("todayMood", JSON.stringify(moodData));
  displayMood();
}

function displayMood() {
  const data = localStorage.getItem("todayMood");
  const output = document.getElementById("output");

  if (data) {
    const { date, mood } = JSON.parse(data);
    output.textContent = `🌤️ Your mood for ${date}: ${mood}`;
  } else {
    output.textContent = "No mood saved yet.";
  }
}

window.onload = displayMood;
