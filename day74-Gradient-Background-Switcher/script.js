document.getElementById("changeGradient").addEventListener("click", () => {
    const colors = [
        ["#ff7e5f", "#feb47b"],
        ["#6a11cb", "#2575fc"],
        ["#f7971e", "#ffd200"],
        ["#43cea2", "#185a9d"],
        ["#ff4b1f", "#1fddff"]
    ];
    const randomGradient = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = `linear-gradient(45deg, ${randomGradient[0]}, ${randomGradient[1]})`;
});
