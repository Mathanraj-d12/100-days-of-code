function checkStrength() {
  const pwd = document.getElementById("password").value;
  const emoji = document.getElementById("emojiDisplay");
  const tip = document.getElementById("tip");

  if (pwd.length === 0) {
    emoji.textContent = "💤";
    tip.textContent = "Start typing to test your password!";
    return;
  }

  let score = 0;

  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  switch (score) {
    case 0:
    case 1:
      emoji.textContent = "😬"; // Very weak
      tip.textContent = "Too weak. Use more characters.";
      break;
    case 2:
      emoji.textContent = "😐"; // Weak
      tip.textContent = "Add uppercase, numbers or symbols.";
      break;
    case 3:
      emoji.textContent = "🙂"; // Medium
      tip.textContent = "Almost there. Add a symbol!";
      break;
    case 4:
      emoji.textContent = "💪"; // Strong
      tip.textContent = "Awesome! This password is strong.";
      break;
  }
}
