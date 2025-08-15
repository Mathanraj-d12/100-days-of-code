const quotes = [
  { quote: "May the Force be with you.", movie: "Star Wars" },
  { quote: "I'm going to make him an offer he can't refuse.", movie: "The Godfather" },
  { quote: "Why so serious?", movie: "The Dark Knight" },
  { quote: "To infinity and beyond!", movie: "Toy Story" },
  { quote: "Life is like a box of chocolates.", movie: "Forrest Gump" },
  { quote: "I'll be back.", movie: "The Terminator" },
  { quote: "You talking to me?", movie: "Taxi Driver" }
];

document.getElementById("generateBtn").addEventListener("click", () => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = `"${random.quote}"`;
  document.getElementById("movie").textContent = `— ${random.movie}`;
});
