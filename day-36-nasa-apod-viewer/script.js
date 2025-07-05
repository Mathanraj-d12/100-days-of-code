const apiKey = "UCCqiJLOxyeSIbubAXbb7vzEUCfhVjo6l54LzjPf"; // replace with your NASA key

function getAPOD() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  const box = document.getElementById("apodBox");
  box.innerHTML = "Fetching today’s picture...";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let mediaTag = "";

      if (data.media_type === "image") {
        mediaTag = `<img src="${data.url}" alt="NASA APOD" />`;
      } else if (data.media_type === "video") {
        mediaTag = `<iframe width="100%" height="315" src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
      }

      box.innerHTML = `
        <h2>${data.title}</h2>
        <p><strong>Date:</strong> ${data.date}</p>
        ${mediaTag}
        <p style="margin-top: 10px;">${data.explanation}</p>
      `;
    })
    .catch(() => {
      box.innerHTML = "<p style='color:red;'>Failed to fetch picture. Try again later.</p>";
    });
}
