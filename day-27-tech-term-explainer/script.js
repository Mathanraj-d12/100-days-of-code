const explanations = {
  api: "API stands for Application Programming Interface. It allows different software to communicate with each other.",
  react: "React is a JavaScript library for building user interfaces, maintained by Meta.",
  html: "HTML stands for HyperText Markup Language. It's the standard markup for web pages.",
  css: "CSS is used to style HTML elements. It stands for Cascading Style Sheets.",
  javascript: "JavaScript is a programming language used to make web pages interactive.",
  sql: "SQL stands for Structured Query Language, used to manage databases.",
  node: "Node.js is a JavaScript runtime that lets you run JS outside a browser, often used for backend.",
  git: "Git is a version control system that tracks changes in your code and helps you collaborate."
};

function explain() {
  const term = document.getElementById("termInput").value.toLowerCase().trim();
  const output = document.getElementById("output");
  output.textContent = "";

  const text = explanations[term] || "Sorry, I don't know that term yet.";

  let i = 0;
  const interval = setInterval(() => {
    output.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 40); // typing speed
}
