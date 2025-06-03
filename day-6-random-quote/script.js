const quotes = [
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
  { text: "Dream bigger. Do bigger.", author: "Unknown" },
  { text: "Don't wish it were easier; wish you were better.", author: "Jim Rohn" }
];

function getQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById("quote").textContent = `"${quote.text}"`;
  document.getElementById("author").textContent = `– ${quote.author}`;
}
