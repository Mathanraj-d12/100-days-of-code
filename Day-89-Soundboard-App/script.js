// Sound file links (online free sounds, replace with your own if needed)
const sounds = {
  applause: "https://www.fesliyanstudios.com/play-mp3/387",
  boo: "https://www.fesliyanstudios.com/play-mp3/438",
  laugh: "https://www.fesliyanstudios.com/play-mp3/6901",
  tada: "https://www.fesliyanstudios.com/play-mp3/6679",
  drum: "https://www.fesliyanstudios.com/play-mp3/3875"
};

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => {
    const soundKey = button.getAttribute("data-sound");
    playSound(soundKey);
  });
});

function playSound(key) {
  if (!sounds[key]) return;
  const audio = new Audio(sounds[key]);
  audio.play().catch(err => console.log("Playback error:", err));
}
