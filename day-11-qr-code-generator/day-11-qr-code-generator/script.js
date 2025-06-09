function generateQRCode() {
  const input = document.getElementById("qr-input").value.trim();
  const output = document.getElementById("qr-output");

  if (input === "") {
    output.innerHTML = "<p style='color: red;'>Please enter something!</p>";
    return;
  }

  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(input)}&size=200x200`;

  output.innerHTML = `<img src="${qrURL}" alt="QR Code" />`;
}
