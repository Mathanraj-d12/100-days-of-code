const riddles = [
  {
    question: "What has to be broken before you can use it?",
    answer: "egg",
    hint: "You usually eat it for breakfast."
  },
  {
    question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    answer: "candle",
    hint: "I melt with time and give light."
  },
  {
    question: "What gets wetter the more it dries?",
    answer: "towel",
    hint: "You use it after a bath."
  },
  {
    question: "What has hands but can’t clap?",
    answer: "clock",
    hint: "It tells you the time."
  }
];

let currentRiddle = 0;
let score = 0;
let attempts = 0;

const riddleEl = document.getElementById("riddle");
const input = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const hint = document.getElementById("hint");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");

function loadRiddle() {
  const r = riddles[currentRiddle];
  riddleEl.textContent = `🧠 Riddle: ${r.question}`;
  input.value = "";
  feedback.textContent = "";
  hint.textContent = "";
  nextBtn.style.display = "none";
  attempts = 0;
}

document.getElementById("submitBtn").addEventListener("click", () => {
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = riddles[currentRiddle].answer.toLowerCase();

  if (!userAnswer) {
    feedback.textContent = "Please enter an answer!";
    return;
  }

  if (userAnswer === correctAnswer) {
    feedback.textContent = "🎉 Correct! Great job!";
    score++;
    scoreEl.textContent = `Score: ${score}`;
    nextBtn.style.display = "inline-block";
  } else {
    attempts++;
    feedback.textContent = `❌ Incorrect. Attempt ${attempts}/3.`;

    if (attempts === 3) {
      hint.textContent = `💡 Hint: ${riddles[currentRiddle].hint}`;
    }
  }
});

nextBtn.addEventListener("click", () => {
  currentRiddle = (currentRiddle + 1) % riddles.length;
  loadRiddle();
});

window.onload = loadRiddle;
