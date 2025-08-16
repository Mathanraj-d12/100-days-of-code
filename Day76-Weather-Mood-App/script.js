const weathers = [
  { icon: "☀️", mood: "Bright day, bright mood!" },
  { icon: "🌧️", mood: "Rain brings calm vibes." },
  { icon: "⛈️", mood: "Stormy outside, strong inside." },
  { icon: "☁️", mood: "Cloudy thoughts are okay too." },
  { icon: "🌈", mood: "After rain comes the rainbow!" }
];

document.getElementById("changeBtn").addEventListener("click", () => {
  const random = weathers[Math.floor(Math.random() * weathers.length)];
  document.getElementById("weatherIcon").textContent = random.icon;
  document.getElementById("moodText").textContent = random.mood;
});
