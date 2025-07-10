const wordList = [
  "serendipity", "ephemeral", "solitude", "aesthetic", "resilience",
  "euphoria", "nostalgia", "eloquent", "benevolent", "meticulous"
];

let learnedWords = JSON.parse(localStorage.getItem("learnedWords")) || [];

function getNewWord() {
  const unusedWords = wordList.filter(w => !learnedWords.includes(w));
  if (unusedWords.length === 0) {
    alert("🎉 You’ve learned all words!");
    return;
  }

  const word = unusedWords[Math.floor(Math.random() * unusedWords.length)];
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => {
      const entry = data[0];
      document.getElementById("word").textContent = entry.word;
      document.getElementById("part").textContent = `Part of Speech: ${entry.meanings[0].partOfSpeech}`;
      document.getElementById("definition").textContent = `Definition: ${entry.meanings[0].definitions[0].definition}`;
      document.getElementById("example").textContent = `Example: ${entry.meanings[0].definitions[0].example || "N/A"}`;
    })
    .catch(() => {
      alert("Failed to fetch word. Try again.");
    });
}

function markAsLearned() {
  const word = document.getElementById("word").textContent;
  if (!learnedWords.includes(word)) {
    learnedWords.push(word);
    localStorage.setItem("learnedWords", JSON.stringify(learnedWords));
    alert(`✅ "${word}" marked as learned!`);
  }
  getNewWord();
}

window.onload = getNewWord;
