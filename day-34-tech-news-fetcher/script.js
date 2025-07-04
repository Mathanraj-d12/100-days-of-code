const apiKey = "pub_fdd06e1481fd4b42a772cc5b9aa1fa28";

function fetchNews() {
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=technology&language=en`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.results;
      const newsContainer = document.getElementById("newsContainer");
      newsContainer.innerHTML = ""; // clear previous

      if (!articles || articles.length === 0) {
        newsContainer.innerHTML = "<p>No news found.</p>";
        return;
      }

      articles.slice(0, 5).forEach(article => {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
          <a href="${article.link}" target="_blank">${article.title}</a>
          <p>${article.pubDate}</p>
        `;
        newsContainer.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById("newsContainer").innerHTML = "<p>Error fetching news. Please try again later.</p>";
    });
}
