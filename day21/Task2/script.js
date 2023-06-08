// Function to create an HTML element
function createElement(tag, attributes = {}, text = '') {
    const element = document.createElement(tag);
    for (let attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }
    if (text) {
      element.textContent = text;
    }
    return element;
  }
  
  // Function to display the breweries
  function displayBreweries(breweries) {
    const breweriesList = document.getElementById('breweriesList');
    breweriesList.innerHTML = '';
  
    if (breweries.length === 0) {
      breweriesList.appendChild(createElement('p', {}, 'No breweries found.'));
    } else {
      breweries.forEach(brewery => {
        const breweryDiv = createElement('div');
        const name = createElement('h2', {}, brewery.name);
        const type = createElement('p', {}, `Type: ${brewery.brewery_type}`);
        const address = createElement('p', {}, `Address: ${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`);
        const website = createElement('p', {}, `Website: ${brewery.website_url}`);
        const phone = createElement('p', {}, `Phone: ${brewery.phone}`);
  
        breweryDiv.appendChild(name);
        breweryDiv.appendChild(type);
        breweryDiv.appendChild(address);
        breweryDiv.appendChild(website);
        breweryDiv.appendChild(phone);
  
        breweriesList.appendChild(breweryDiv);
      });
    }
  }
  
  // Function to fetch and process the API data
  async function fetchBreweries() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    const url = `https://api.openbrewerydb.org/breweries?by_name=${searchTerm}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch breweries');
      }
      const data = await response.json();
      displayBreweries(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Event listener for the search input
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', fetchBreweries);
  