function getCountry() {
  const country = document.getElementById("countryInput").value.trim();
  const resultBox = document.getElementById("resultBox");

  if (!country) {
    resultBox.innerHTML = "<p>Please enter a country name.</p>";
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
      if (!res.ok) throw new Error("Country not found");
      return res.json();
    })
    .then(data => {
      const info = data[0];
      const languages = Object.values(info.languages || {}).join(", ");
      const currencies = Object.values(info.currencies || {})
        .map(c => `${c.name} (${c.symbol})`).join(", ");

      resultBox.innerHTML = `
        <h2>${info.name.common} ${info.flag}</h2>
        <img src="${info.flags.svg}" alt="Flag of ${info.name.common}" />
        <p><strong>Capital:</strong> ${info.capital}</p>
        <p><strong>Region:</strong> ${info.region} - ${info.subregion}</p>
        <p><strong>Population:</strong> ${info.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Currencies:</strong> ${currencies}</p>
        <p><strong>Calling Code:</strong> +${info.idd.root}${info.idd.suffixes?.[0] || ""}</p>
      `;
    })
    .catch(err => {
      resultBox.innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
    });
}
