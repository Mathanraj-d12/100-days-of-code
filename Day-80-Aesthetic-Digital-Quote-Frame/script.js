const quotes = [
  { text: "Create your own sunshine.", author: "Unknown" },
  { text: "Less is more.", author: "Ludwig Mies van der Rohe" },
  { text: "Design is intelligence made visible.", author: "Alina Wheeler" },
  { text: "Dreams don’t work unless you do.", author: "John C. Maxwell" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" }
];

const frame = document.getElementById("frame");
const quote = document.getElementById("quoteText");
const author = document.getElementById("author");

frame.addEventListener("click", ()=>{
  let random = quotes[Math.floor(Math.random()*quotes.length)];
  quote.textContent = `"${random.text}"`;
  author.textContent = "- "+random.author;
});
