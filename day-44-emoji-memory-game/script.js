const emojis = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'];
let cards = [...emojis, ...emojis]; // Duplicate for pairs
let flippedCards = [];
let matchedCards = 0;
let moves = 0;

const board = document.getElementById("game-board");
const movesText = document.getElementById("moves");

// Shuffle cards
cards.sort(() => Math.random() - 0.5);

// Create cards
cards.forEach((emoji, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.innerHTML = "";

  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
});

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  card.innerHTML = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesText.textContent = `Moves: ${moves}`;

    const [first, second] = flippedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
      matchedCards += 2;
      flippedCards = [];

      if (matchedCards === cards.length) {
        setTimeout(() => {
          alert(`🎉 You win in ${moves} moves!`);
        }, 300);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => {
          card.classList.remove("flipped");
          card.innerHTML = "";
        });
        flippedCards = [];
      }, 1000);
    }
  }
}
