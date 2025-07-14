const btn = document.getElementById('dog-btn');
const img = document.getElementById('dog-img');

btn.addEventListener('click', async () => {
  img.src = ''; // Clear previous image
  const res = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await res.json();
  img.src = data.message;
});
