const password = document.getElementById("password");
const strength = document.getElementById("strength");
const toggle = document.getElementById("toggle");

// Toggle password visibility
toggle.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    toggle.textContent = "🙈";
  } else {
    password.type = "password";
    toggle.textContent = "👁️";
  }
});

// Password strength checker
password.addEventListener("input", () => {
  const val = password.value;
  let score = 0;

  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  if (score === 0) {
    strength.textContent = "Strength: Empty";
    strength.style.color = "gray";
  } else if (score === 1) {
    strength.textContent = "Strength: Weak";
    strength.style.color = "red";
  } else if (score === 2) {
    strength.textContent = "Strength: Medium";
    strength.style.color = "orange";
  } else {
    strength.textContent = "Strength: Strong";
    strength.style.color = "limegreen";
  }
});
