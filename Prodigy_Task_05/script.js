const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const city = document.getElementById("city");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const error = document.getElementById("error");


searchBtn.addEventListener("click", function () {

    const cityName = cityInput.value.trim();

    if (cityName === "") {
        error.textContent = "Please enter a city name.";
        return;
    }

    getWeather(cityName);

});


cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


async function getWeather(cityName) {

    try {

        error.textContent = "Loading weather...";

        // Get city coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found.");
        }

        const location = geoData.results[0];

        // Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        );

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        // Update UI
        city.textContent = `${location.name}, ${location.country}`;

        temperature.textContent =
            `${Math.round(current.temperature_2m)}°C`;

        humidity.textContent =
            `${current.relative_humidity_2m}%`;

        wind.textContent =
            `${Math.round(current.wind_speed_10m)} km/h`;

        description.textContent =
            getWeatherDescription(current.weather_code);

        weatherIcon.textContent =
            getWeatherIcon(current.weather_code);

        error.textContent = "";

    } catch (err) {

        error.textContent = err.message;

    }

}


// Weather description
function getWeatherDescription(code) {

    if (code === 0) return "Clear sky";

    if (code === 1 || code === 2) return "Partly cloudy";

    if (code === 3) return "Overcast";

    if (code >= 45 && code <= 48) return "Foggy";

    if (code >= 51 && code <= 57) return "Drizzle";

    if (code >= 61 && code <= 67) return "Rain";

    if (code >= 71 && code <= 77) return "Snow";

    if (code >= 80 && code <= 82) return "Rain showers";

    if (code >= 95) return "Thunderstorm";

    return "Unknown";
}


// Weather icon
function getWeatherIcon(code) {

    if (code === 0) return "☀️";

    if (code === 1 || code === 2) return "🌤️";

    if (code === 3) return "☁️";

    if (code >= 45 && code <= 48) return "🌫️";

    if (code >= 51 && code <= 57) return "🌦️";

    if (code >= 61 && code <= 67) return "🌧️";

    if (code >= 71 && code <= 77) return "❄️";

    if (code >= 80 && code <= 82) return "🌧️";

    if (code >= 95) return "⛈️";

    return "🌤️";
}