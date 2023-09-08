document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "aba6ff9d6de967d5eac6fd79114693cc";
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const cityName = document.getElementById("city-name");
  const weatherInfo = document.getElementById("weather-info");

  function updateWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          const temperature = Math.round(data.main.temp - 273.15);
          const feelsLike = Math.round(data.main.feels_like - 273.15); // Fetch "feels like" temperature
          cityName.textContent = data.name;
          weatherInfo.textContent = `${temperature}°C (Feels like ${feelsLike}°C), ${data.weather[0].description}`;
        } else {
          cityName.textContent = "City Not Found";
          weatherInfo.textContent = "";
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        cityName.textContent = "City Not Found";
        weatherInfo.textContent = "";
      });
  }

  function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
      updateWeather(city);
    }
  }

  searchButton.addEventListener("click", handleSearch);

  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  updateWeather("dibrugarh");
});

function updateDateTime() {
  const dateTimeElement = document.getElementById("datetime");
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDateTime = now.toLocaleDateString("en-US", options);
  dateTimeElement.textContent = formattedDateTime;
}

setInterval(updateDateTime, 1000);

updateDateTime();
