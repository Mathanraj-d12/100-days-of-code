async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;
  const result = document.getElementById("result");

  if (!amount || amount <= 0) {
    result.innerHTML = "<p style='color: red;'>Enter a valid amount</p>";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    result.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.textContent = "Something went wrong. Try again!";
  }
}
