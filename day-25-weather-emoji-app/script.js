const apiKey = "9042a2361dd696b1d98b82c5fa5c431c";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Enter a city name!");

  const fullCityIN = `${city},IN`;
  const globalUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const indiaUrl = `https://api.openweathermap.org/data/2.5/weather?q=${fullCityIN}&appid=${apiKey}&units=metric`;

  fetch(indiaUrl)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        // Try global version
        return fetch(globalUrl).then(res => res.json());
      }
      return data;
    })
    .then(data => {
      if (data.cod === "404") {
        alert("City not found! Try a nearby bigger city.");
        return;
      }

      const temp = data.main.temp;
      const weather = data.weather[0].main;
      let emoji = "❓";

      if (temp > 30) emoji = "🔥";
      else if (temp > 20) emoji = "😎";
      else if (temp > 10) emoji = "🌤️";
      else if (temp > 0) emoji = "🥶";
      else emoji = "❄️";

      if (weather.includes("Rain")) emoji = "🌧️";
      if (weather.includes("Thunderstorm")) emoji = "⛈️";
      if (weather.includes("Snow")) emoji = "❄️";

      document.getElementById("location").textContent = data.name;
      document.getElementById("temp").textContent = `🌡️ Temp: ${temp}°C`;
      document.getElementById("status").textContent = `Condition: ${weather}`;
      document.getElementById("emoji").textContent = emoji;
    })
    .catch(() => {
      alert("Something went wrong. Please try again later.");
    });
}
