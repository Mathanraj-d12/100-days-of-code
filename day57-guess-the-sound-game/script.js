const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const userAnswerEl = document.getElementById("userAnswer");
const aiAnswerEl = document.getElementById("aiAnswer");
const resultEl = document.getElementById("result");
const scoreboardEl = document.getElementById("scoreboard");
const nextBtn = document.getElementById("nextBtn");

let correctAnswer = "";
let userScore = 0;
let aiScore = 0;

async function loadQuestion() {
  userAnswerEl.textContent = "";
  aiAnswerEl.textContent = "";
  resultEl.textContent = "";
  optionsEl.innerHTML = "Loading...";
  questionEl.textContent = "Fetching question...";

  const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
  const data = await res.json();
  const questionData = data.results[0];

  const question = decodeHTML(questionData.question);
  correctAnswer = decodeHTML(questionData.correct_answer);
  const options = [...questionData.incorrect_answers.map(decodeHTML), correctAnswer].sort(() => 0.5 - Math.random());

  questionEl.textContent = question;
  optionsEl.innerHTML = "";

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, options);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(userChoice, options) {
  // disable options
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

  const aiChoice = options[Math.floor(Math.random() * options.length)];

  userAnswerEl.textContent = `🧑 You chose: ${userChoice}`;
  aiAnswerEl.textContent = `🤖 AI chose: ${aiChoice}`;

  let roundResult = "";

  const userCorrect = userChoice === correctAnswer;
  const aiCorrect = aiChoice === correctAnswer;

  if (userCorrect && !aiCorrect) {
    userScore++;
    roundResult = "✅ You win this round!";
  } else if (!userCorrect && aiCorrect) {
    aiScore++;
    roundResult = "❌ AI wins this round!";
  } else if (userCorrect && aiCorrect) {
    userScore++;
    aiScore++;
    roundResult = "🤝 Both got it right!";
  } else {
    roundResult = "😐 Both got it wrong!";
  }

  resultEl.textContent = roundResult;
  scoreboardEl.textContent = `You: ${userScore} | AI: ${aiScore}`;
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

nextBtn.addEventListener("click", loadQuestion);
window.onload = loadQuestion;
    