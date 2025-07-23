const artImage = document.getElementById("artImage");
const options = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

let correctArtist = "";

async function fetchArtwork() {
  feedback.textContent = "";
  options.innerHTML = "Loading...";
  artImage.src = "";

  try {
    // Step 1: Search for artworks with images
    const searchRes = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting"
    );
    const data = await searchRes.json();
    const randomIds = data.objectIDs.slice(0, 100);
    const randomId = randomIds[Math.floor(Math.random() * randomIds.length)];

    // Step 2: Get full object data
    const artRes = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`
    );
    const artData = await artRes.json();

    // If no artist, try again
    if (!artData.artistDisplayName || !artData.primaryImageSmall) {
      fetchArtwork();
      return;
    }

    correctArtist = artData.artistDisplayName;
    artImage.src = artData.primaryImageSmall;

    generateOptions(correctArtist);
  } catch (error) {
    options.innerHTML = "Error loading artwork. Try again.";
  }
}

function generateOptions(correct) {
  const allArtists = [
    "Leonardo da Vinci",
    "Pablo Picasso",
    "Claude Monet",
    "Vincent van Gogh",
    "Rembrandt",
    "Salvador Dalí",
    "Frida Kahlo",
    "Michelangelo",
    "Andy Warhol",
    correct
  ];

  // Shuffle and pick 4 including correct
  const shuffled = [...new Set(allArtists)].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);
  if (!selected.includes(correct)) selected.push(correct);

  const finalOptions = selected.sort(() => 0.5 - Math.random());

  options.innerHTML = "";
  finalOptions.forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.onclick = () => checkAnswer(name);
    options.appendChild(btn);
  });
}

function checkAnswer(choice) {
  if (choice === correctArtist) {
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = `❌ Wrong! It was ${correctArtist}`;
  }
}

nextBtn.addEventListener("click", fetchArtwork);

// Start first artwork
fetchArtwork();
