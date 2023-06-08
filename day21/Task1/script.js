const API_KEY = '89aec0065e01812edf20023311f73ded'; 

// Function to retrieve weather data for a given country
async function getWeatherData(country) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Error:', error);
  }
}

// Function to display the weather data on the webpage
function displayWeatherData(data) {
  const weatherDisplay = document.getElementById('weatherDisplay');

  if (data.cod === '404') {
    weatherDisplay.innerHTML = `<p>${data.message}</p>`;
  } else {
    const { name, main, weather } = data;

    const weatherInfo = document.createElement('div');
    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <p>Temperature: ${main.temp} K</p>
      <p>Description: ${weather[0].description}</p>
    `;

    weatherDisplay.appendChild(weatherInfo);
  }
}

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', function() {
  const countryInput = document.getElementById('countryInput');
  const country = countryInput.value;

  getWeatherData(country)
    .then(data => {
      displayWeatherData(data);
    });

  countryInput.value = '';
});
