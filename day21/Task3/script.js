// Create the container element
const container = document.createElement('div');
container.classList.add('container');

// Create the heading element
const heading = document.createElement('h1');
heading.textContent = 'Dictionary';

// Create the label element
const label = document.createElement('label');
label.classList.add('small', 'text-muted');
label.setAttribute('for', 'wordinput');
label.textContent = "Enter a word below to find its meaning";

// Create the row element
const row = document.createElement('div');
row.classList.add('row');

// Create the column for the input field
const col8 = document.createElement('div');
col8.classList.add('col-8');

// Create the form element
const form = document.createElement('form');
form.classList.add('form-inline', 'dictform');

// Create the form group element
const formGroup = document.createElement('div');
formGroup.classList.add('form-group');

// Create the input field
const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Type a word here...');
input.classList.add('form-control', 'wordinput');

// Append the input field to the form group
formGroup.appendChild(input);

// Append the form group to the form
form.appendChild(formGroup);

// Append the form to the column
col8.appendChild(form);

// Create the column for the search button
const col4 = document.createElement('div');
col4.classList.add('col-4');

// Create the search button
const button = document.createElement('button');
button.setAttribute('type', 'submit');
button.classList.add('btn', 'btn-info', 'searchButton');
button.textContent = 'Search';

// Append the search button to the column
col4.appendChild(button);

// Append the columns to the row
row.appendChild(col8);
row.appendChild(col4);

// Create the div for displaying the meaning
const meaningDiv = document.createElement('div');
meaningDiv.classList.add('col-12', 'meaningforward', 'mt-4');

// Append the elements to the container
container.appendChild(heading);
container.appendChild(label);
container.appendChild(row);
container.appendChild(meaningDiv);

// Append the container to the body
document.body.appendChild(container);

// get all the references
// search form reference
let forms = document.querySelector('.dictform');

// input box -> search box
let wordInput = document.querySelector('.wordinput');

// word info div
let wordInfo = document.querySelector('.meaningforward');

// get the reference of the button
let searchButton = document.querySelector('.searchButton');

// getmeaning function
async function getmeaning(word) {
  // make an API request with the word
  try {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    // get the meaning
    // parse the JSON to a JS object
    let data = await response.json();

    // show the details below the input box
    // create a paragraph
    let paragraph = document.createElement('p');

    // reset the wordInfo
    wordInfo.innerHTML = '';

    // get the audio data
    let audioSource = data[0].phonetics[0].audio;

    // set the content of the paragraph element
    paragraph.innerHTML = `
      <span class='fas fa-volume-up audio-icon'></span>
      <audio class='audio'>
        <source src=${audioSource} type='audio/mpeg'>
      </audio>
      Word: <b>${data[0].word}</b>`;

    // append the created paragraph to the wordInfo
    wordInfo.appendChild(paragraph);

    document.querySelector('.audio-icon').addEventListener('click', () => {
      document.querySelector('.audio').play();
    });

    // create a list
    let list = document.createElement('ul');
    list.style.listStyleType = 'none';

    let meanings = data[0].meanings;

    for (let meaning of meanings) {
      // create a list item
      let listItem = document.createElement('li');

      // set the content of the list item
      listItem.innerHTML = `${meaning.partOfSpeech}`;

      // create a sublist to display the meanings in every category
      let subList = document.createElement('ul');
      subList.style.listStyleType = 'disc';

      // get the definitions
      let definitions = meaning.definitions;

      for (let definition of definitions) {
        // create a list item
        let subListItem = document.createElement('li');

        // set the content of the list item
        subListItem.innerHTML = `<em>${definition.definition}</em>`;

        // append the list item to the list
        subList.appendChild(subListItem);
      }

      listItem.appendChild(subList);
      // append the list item to the list
      list.appendChild(listItem);
    }

    wordInfo.appendChild(list);
  } catch (error) {
    console.error('Error fetching the meaning of the word');
  }
}

function handleSubmit(event) {
  event.preventDefault();

  let word = wordInput.value;

  // make an API request to get the meaning of the word
  // and show it below the input box
  getmeaning(word);
}

form.addEventListener('submit', handleSubmit);
searchButton.addEventListener('click', handleSubmit);

