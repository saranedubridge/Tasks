// Function to create a Bootstrap card element
function createCard(country) {
    const card = document.createElement('div');
    card.classList.add('card', 'col-lg-4', 'col-sm-12');
    card.style.width = '18rem';
  
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.textContent = country.name;
  
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerHTML = `<strong>Capital:</strong> ${country.capital}<br>
                          <strong>Latlng:</strong> ${country.latlng}<br>
                          <strong>Region:</strong> ${country.region}<br>
                          <strong>Country codes:</strong> ${country.alpha2Code}, ${country.alpha3Code}`;
  
    const flag = document.createElement('img');
    flag.classList.add('card-img-top');
    flag.src = "country.flag";
    flag.alt = country.name;
  
    const weatherButton = document.createElement('button');
    weatherButton.classList.add('btn', 'btn-primary');
    weatherButton.textContent = 'Click for Weather';
  
    cardBody.appendChild(cardHeader);
    cardBody.appendChild(cardText);
    cardBody.appendChild(weatherButton);
    card.appendChild(flag);
    card.appendChild(cardBody);
  
    return card;
  }
  
  // Fetch data from REST Countries API
fetch('https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json')
    .then(response => response.json())
    .then(data => {
      const countryList = document.getElementById('country-list');
  
      // Loop through the countries data
      data.forEach(country => {
        const card = createCard(country);
        countryList.appendChild(card);
  
        // Fetch weather data from OpenWeatherMap API
        const weatherButton = card.querySelector('.btn-primary');
        weatherButton.addEventListener('click', () => {
          fetch(`https://openweathermap.org/api=${country.capital}&appid=89aec0065e01812edf20023311f73ded`)
            .then(response => response.json())
            .then(weatherData => {
              // Display weather information in the card
              const weatherText = document.createElement('p');
              weatherText.classList.add('card-text');
              weatherText.innerHTML = `<strong>Weather:</strong> ${weatherData.weather[0].description}`;
  
              card.querySelector('.card-body').appendChild(weatherText);
              weatherButton.style.display = 'none'; // Hide the weather button after fetching the weather data
            })
            .catch(error => console.log('Error fetching weather data:', error));
        });
      });
    })
    .catch(error => console.log('Error fetching countries data:', error));
  