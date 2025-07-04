function getProfile() {
  const username = document.getElementById("username").value.trim();
  const resultDiv = document.getElementById("profileResult");

  if (!username) {
    resultDiv.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then(data => {
      resultDiv.innerHTML = `
        <div class="profile-card">
          <img src="${data.avatar_url}" alt="${data.login}">
          <h2>${data.name || data.login}</h2>
          <p>${data.bio || "No bio provided"}</p>
          <p>📦 Public Repos: ${data.public_repos}</p>
          <p>🌟 Followers: ${data.followers} | Following: ${data.following}</p>
          <p>📅 Joined: ${new Date(data.created_at).toDateString()}</p>
          <p>🔗 <a href="${data.html_url}" target="_blank">View Profile</a></p>
        </div>
      `;
    })
    .catch(err => {
      resultDiv.innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
    });
}
