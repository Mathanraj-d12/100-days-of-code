async function getMeme() {
  const memeBox = document.getElementById("meme-box");
  const titleEl = document.getElementById("meme-title");
  const imgEl = document.getElementById("meme-img");
  const upvoteEl = document.getElementById("upvotes");

  try {
    const response = await fetch("https://meme-api.com/gimme");
    const data = await response.json();

    titleEl.textContent = data.title;
    imgEl.src = data.url;
    upvoteEl.textContent = `👍 ${data.ups} upvotes`;

    memeBox.classList.remove("hidden");
  } catch (error) {
    titleEl.textContent = "Error loading meme 😞";
    imgEl.src = "";
    upvoteEl.textContent = "";
    memeBox.classList.remove("hidden");
  }
}
