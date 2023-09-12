document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "4a7fd2627c90ddf92fcd339f100f367e"; // Replace with your OpenWeatherMap API key
    const weatherDataElement = document.querySelector(".weather-data");
  
    // Function to get the user's current location
    function getCurrentLocation() {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
          reject(new Error("Geolocation is not available in this browser."));
        }
      });
    }
  
    // Function to fetch weather data using the user's coordinates
    async function fetchWeatherData(latitude, longitude) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Error fetching weather data");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    // Function to update the weather data on the webpage
    function updateWeatherData() {
      getCurrentLocation()
        .then((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          return fetchWeatherData(latitude, longitude);
        })
        .then((data) => {
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const humidity = data.main.humidity;
  
          const weatherHtml = `
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
            <p>Humidity: ${humidity}%</p>
          `;
  
          weatherDataElement.innerHTML = weatherHtml;
        })
        .catch((error) => {
          weatherDataElement.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    }
  
    // Initial update
    updateWeatherData();
  });
  