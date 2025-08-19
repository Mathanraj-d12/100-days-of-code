const emojis = ["😀","😂","😍","🤯","😎","👑","🤡","🐱","🐶","🐼","🍕","🍔","🍺","🍦","☕","🚗",
"🚀","🗿","🧠","🎩","💼","🎯","🏋️‍♂️","⚽","🏆","🏖️","🌋","🌕"];

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

document.getElementById("makeBtn").addEventListener("click", () => {
    let sentence = "";
    const length = Math.floor(Math.random() * 8) + 3; // length between 3–10 emojis
    for(let i=0;i<length;i++){
        sentence += getRandomEmoji();
    }
    document.getElementById("output").textContent = sentence;
});
