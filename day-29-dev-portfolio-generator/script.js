function generate() {
  const name = document.getElementById("name").value.trim();
  const bio = document.getElementById("bio").value.trim();
  const skills = document.getElementById("skills").value.split(",").map(s => s.trim());
  const github = document.getElementById("github").value.trim();
  const project = document.getElementById("project").value.trim();

  const html = `
    <div style="font-family:sans-serif; max-width:600px; margin:auto;">
      <h1>${name}</h1>
      <p>${bio}</p>
      <h3>Skills:</h3>
      <ul>
        ${skills.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
      <p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>
      <p><strong>Project:</strong> <a href="${project}" target="_blank">${project}</a></p>
    </div>
  `;

  document.getElementById("preview").innerHTML = html;
  document.getElementById("output").value = html;
}
