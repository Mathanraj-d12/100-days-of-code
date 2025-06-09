const jokeBox = document.getElementById("joke-box");

async function getJoke() {
  jokeBox.textContent = "Loading joke... 😂";

  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    jokeBox.innerHTML = `${data.setup}<br><strong>${data.punchline}</strong>`;
  } catch (err) {
    jokeBox.textContent = "Oops! Something went wrong 😅";
    console.error(err);
  }
}
