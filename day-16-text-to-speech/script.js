function speakText() {
  const text = document.getElementById("text").value;
  if (text.trim() === "") {
    alert("Please enter some text!");
    return;
  }

  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
}
