const names = [
  "The Silent Thinker", "The Midnight Dreamer", "The Chaos Creator",
  "The Lazy Genius", "The Secret Hero", "The Meme Lord"
];
const powers = [
  "Can turn coffee into genius ideas", "Can find humour in any situation",
  "Brings good luck", "Remembers every detail", "Becomes superhuman when hungry"
];
const weaknesses = [
  "Distracted by memes", "Falls asleep anywhere", "Overthinks everything",
  "Addicted to scrolling reels", "Can’t say no to food"
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const title = random(names);
  const power = random(powers);
  const weakness = random(weaknesses);

  document.getElementById("card").innerHTML = `
    <h2>${title}</h2>
    <p><strong>Power:</strong> ${power}</p>
    <p><strong>Weakness:</strong> ${weakness}</p>
  `;
});
