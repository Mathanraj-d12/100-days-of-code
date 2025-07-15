const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

// Decode HTML entities in questions and answers
function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

// Shuffle function for answers
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load and display one question
async function loadQuestion() {
  try {
    questionEl.textContent = "Loading question...";
    answersEl.innerHTML = "";
    resultEl.textContent = "";

    const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    const data = await res.json();

    if (data.results.length === 0) {
      questionEl.textContent = "❌ Failed to load question. Please try again.";
      return;
    }

    const questionData = data.results[0];
    const question = decodeHTML(questionData.question);
    const correct = decodeHTML(questionData.correct_answer);
    const incorrect = questionData.incorrect_answers.map(decodeHTML);
    const options = shuffle([correct, ...incorrect]);

    questionEl.textContent = question;

    options.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.onclick = () => {
        if (answer === correct) {
          resultEl.textContent = "✅ Correct!";
          resultEl.style.color = "green";
        } else {
          resultEl.textContent = `❌ Wrong! Correct Answer: ${correct}`;
          resultEl.style.color = "red";
        }
        Array.from(answersEl.children).forEach(b => b.disabled = true);
      };
      answersEl.appendChild(btn);
    });
  } catch (error) {
    questionEl.textContent = "❌ Error loading question.";
    console.error("Fetch error:", error);
  }
}

nextBtn.addEventListener("click", loadQuestion);

// Load one question initially
loadQuestion();
