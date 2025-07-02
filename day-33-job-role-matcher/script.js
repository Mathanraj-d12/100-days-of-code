document.getElementById("matchBtn").addEventListener("click", matchRole);

function matchRole() {
  const input = document.getElementById("skillsInput").value.toLowerCase();
  const resultBox = document.getElementById("resultBox");

  if (!input.trim()) {
    resultBox.textContent = "Please enter some skills.";
    return;
  }

  const inputSkills = input.split(",").map(skill => skill.trim());

  const roles = [
    {
      name: "Frontend Developer 👨‍🎨",
      match: ["html", "css", "javascript", "react", "vue"],
      description: "You love building beautiful interfaces!"
    },
    {
      name: "Backend Developer 🧠",
      match: ["node", "express", "mongodb", "sql", "api"],
      description: "You’re the brain behind the app."
    },
    {
      name: "Full Stack Developer 🧑‍💻",
      match: ["html", "css", "javascript", "node", "react", "mongodb"],
      description: "You manage both front and back like a pro!"
    },
    {
      name: "UI/UX Designer 🎨",
      match: ["figma", "adobe", "design", "ux", "ui"],
      description: "You craft amazing user experiences."
    },
    {
      name: "Data Analyst 📊",
      match: ["python", "sql", "excel", "pandas", "data"],
      description: "You find stories hidden in the numbers."
    },
    {
      name: "DevOps Engineer 🔧",
      match: ["docker", "kubernetes", "aws", "ci/cd", "linux"],
      description: "You build and manage powerful deployment pipelines."
    }
  ];

  let bestMatch = null;
  let bestScore = 0;

  roles.forEach(role => {
    const matches = role.match.filter(skill => inputSkills.includes(skill));
    if (matches.length > bestScore) {
      bestScore = matches.length;
      bestMatch = role;
    }
  });

  if (bestMatch) {
    resultBox.innerHTML = `
      <strong>${bestMatch.name}</strong><br/>
      ${bestMatch.description}<br/>
      ✅ Skill Match: ${bestScore} / ${bestMatch.match.length}
    `;
  } else {
    resultBox.innerHTML = "🤔 No perfect match found. Try adding more specific tech skills!";
  }
}
