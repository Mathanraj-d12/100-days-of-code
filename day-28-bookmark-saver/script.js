let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function saveBookmark() {
  const name = document.getElementById("siteName").value.trim();
  const url = document.getElementById("siteURL").value.trim();

  if (!name || !url) return alert("Please fill in both fields!");
  if (!isValidURL(url)) return alert("Enter a valid URL!");

  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  document.getElementById("siteName").value = "";
  document.getElementById("siteURL").value = "";
  renderBookmarks();
}

function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks();
}

function renderBookmarks() {
  const list = document.getElementById("bookmarkList");
  list.innerHTML = "";

  bookmarks.forEach((b, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${b.url}" target="_blank">${b.name}</a>
      <button class="delete" onclick="deleteBookmark(${i})">Delete</button>
    `;
    list.appendChild(li);
  });
}

renderBookmarks(); // Initial load
