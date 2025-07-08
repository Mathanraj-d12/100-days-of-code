function searchBooks() {
  const query = document.getElementById("searchInput").value.trim();
  const resultBox = document.getElementById("bookResults");

  if (!query) {
    resultBox.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  resultBox.innerHTML = "Searching...";

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        resultBox.innerHTML = "<p>No books found.</p>";
        return;
      }

      resultBox.innerHTML = data.items.slice(0, 5).map(book => {
        const info = book.volumeInfo;
        const title = info.title || "No Title";
        const authors = info.authors ? info.authors.join(", ") : "Unknown Author";
        const description = info.description || "No description available.";
        const thumbnail = info.imageLinks?.thumbnail || "";
        const previewLink = info.previewLink || "#";

        return `
          <div class="book">
            <img src="${thumbnail}" alt="${title}">
            <div>
              <h3>${title}</h3>
              <p><strong>Author(s):</strong> ${authors}</p>
              <p>${description.slice(0, 150)}...</p>
              <a href="${previewLink}" target="_blank">🔗 Preview Book</a>
            </div>
          </div>
        `;
      }).join("");
    })
    .catch(() => {
      resultBox.innerHTML = "<p style='color:red;'>❌ Error fetching data. Try again later.</p>";
    });
}
