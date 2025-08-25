let score1 = 0;
let score2 = 0;

const diceFaces = ["⚀","⚁","⚂","⚃","⚄","⚅"];

function rollDice() {
  let dice1 = Math.floor(Math.random() * 6);
  let dice2 = Math.floor(Math.random() * 6);

  document.getElementById("dice1").textContent = diceFaces[dice1];
  document.getElementById("dice2").textContent = diceFaces[dice2];

  let result = document.getElementById("result");

  if (dice1 > dice2) {
    result.innerText = "🏆 Player 1 Wins!";
    score1++;
  } else if (dice2 > dice1) {
    result.innerText = "🏆 Player 2 Wins!";
    score2++;
  } else {
    result.innerText = "🤝 It's a Draw!";
  }

  document.getElementById("score1").innerText = score1;
  document.getElementById("score2").innerText = score2;
}
