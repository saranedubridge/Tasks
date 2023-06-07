function getCatFact() {
    return new Promise((resolve, reject) => {
      fetch('https://cat-fact.herokuapp.com/facts/random')
        .then(response => response.json())
        .then(data => resolve(data.text))
        .catch(error => reject(error));
    });
  }
  
  function displayCatFact() {
    const factContainer = document.getElementById('factContainer');
    factContainer.innerHTML = 'Loading...';
  
    getCatFact()
      .then(fact => {
        factContainer.innerHTML = fact;
      })
      .catch(error => {
        factContainer.innerHTML = 'An error occurred while fetching the cat fact.';
        console.error(error);
      });
  }
  
  const getFactButton = document.getElementById('getFactButton');
  getFactButton.addEventListener('click', displayCatFact);
  