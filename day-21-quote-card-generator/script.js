function extractVideoID(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function generateSummary() {
  const url = document.getElementById("videoUrl").value;
  const videoId = extractVideoID(url);
  const output = document.getElementById("output");

  if (!videoId) {
    output.innerHTML = "<p>❌ Invalid YouTube URL.</p>";
    return;
  }

  const fakeSummary = [
    "🧠 This video dives deep into the topic with real-world examples and practical tips.",
    "🚀 You’ll learn key takeaways and interesting insights in just a few minutes.",
    "💡 The content is perfect for beginners and professionals alike."
  ];

  const random = Math.floor(Math.random() * fakeSummary.length);

  output.innerHTML = `
    <h3>Video ID: ${videoId}</h3>
    <p><strong>Sample Summary:</strong> ${fakeSummary[random]}</p>
    <iframe width="100%" height="315" 
      src="https://www.youtube.com/embed/${videoId}" 
      frameborder="0" allowfullscreen></iframe>
  `;
}
