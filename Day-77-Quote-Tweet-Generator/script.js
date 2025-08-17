const quotes = [
  "Success usually comes to those who are too busy to be looking for it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction."
];

document.getElementById("generateBtn").addEventListener("click", () => {
  const user = document.getElementById("username").value.trim();

  // show error if no name
  if (user === "") {
    alert("Please enter your name first!");
    return;
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  document.getElementById("tweetQuote").textContent = randomQuote;
  document.getElementById("tweetAuthor").textContent = user;
  document.getElementById("tweetCard").style.display = "block";
});
