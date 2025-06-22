function loadMockup() {
  const url = document.getElementById("urlInput").value.trim();
  const frame = document.getElementById("mockupFrame");

  if (!url.startsWith("http")) {
    alert("Please enter a full URL (https://...)");
    return;
  }

  frame.src = url;
}
