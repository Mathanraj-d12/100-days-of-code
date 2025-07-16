const wordEl = document.getElementById("word");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

// List of medium-level words
const wordList = ["elaborate", "precise", "vague", "efficient", "hesitate", "obstacle", "pursue", "relevant", "significant", "assume"];

// Wrong definitions (generic)
const wrongDefs = [
  "A type of fruit found in Asia",
  "The act of painting with water",
  "A machine used for space travel",
  "A festival celebrated under the sea",
  "The noise made by large mountains",
  "A color between red and blue",
  "A cooking style using lasers",
  "The shape of a 100-sided dice"
];

// Load a new word
async function loadWord() {
  resultEl.textContent = "Loading...";
  optionsEl.innerHTML = "";
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  wordEl.textContent = randomWord;

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
    const data = await res.json();
    const definition = data[0]?.meanings[0]?.definitions[0]?.definition;

    if (!definition) {
      resultEl.textContent = "❌ No definition found. Try again.";
      return;
    }

    const options = shuffle([
      definition,
      ...getRandomWrongDefinitions(3)
    ]);

    options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => {
        if (option === definition) {
          resultEl.textContent = "✅ Correct!";
          resultEl.style.color = "green";
        } else {
          resultEl.textContent = `❌ Wrong! Correct: ${definition}`;
          resultEl.style.color = "red";
        }
        Array.from(optionsEl.children).forEach(b => b.disabled = true);
      };
      optionsEl.appendChild(btn);
    });

    resultEl.textContent = "";

  } catch (error) {
    resultEl.textContent = "❌ Error loading word.";
    console.error(error);
  }
}

// Shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Pick wrong options
function getRandomWrongDefinitions(count) {
  const shuffled = shuffle(wrongDefs);
  return shuffled.slice(0, count);
}

// Next button handler
nextBtn.addEventListener("click", loadWord);

// Load first word
loadWord();
