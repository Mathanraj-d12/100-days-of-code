const tips = [
  { text: "Use `const` when the variable won’t change.", category: "variables" },
  { text: "`let` allows you to reassign values.", category: "variables" },
  { text: "Use `forEach()` to loop over arrays.", category: "arrays" },
  { text: "`push()` adds an item to an array.", category: "arrays" },
  { text: "Use `document.querySelector()` to select elements.", category: "dom" },
  { text: "`innerText` changes text content of an element.", category: "dom" },
  { text: "Functions can be stored in variables.", category: "functions" },
  { text: "Arrow functions have shorter syntax: `()=>{}`.", category: "functions" },
  { text: "Avoid global variables in large projects.", category: "variables" },
];

function showTip() {
  const category = document.getElementById("category").value;
  const filtered = category === "all" ? tips : tips.filter(t => t.category === category);

  const randomTip = filtered[Math.floor(Math.random() * filtered.length)];
  const tipBox = document.getElementById("tipBox");

  tipBox.style.opacity = 0;
  setTimeout(() => {
    tipBox.textContent = randomTip.text;
    tipBox.style.opacity = 1;
  }, 300);
}
