// Create the container element
const container = document.createElement('div');
container.classList.add('container');

// Create the pagination element
const pagination = document.createElement('div');
pagination.classList.add('pagination');

// Create the "Prev" button
const prevButton = document.createElement('button');
prevButton.classList.add('btn1');
prevButton.textContent = 'Prev';
prevButton.innerHTML = '<img src="https://previews.123rf.com/images/pavelstasevich/pavelstasevich1907/pavelstasevich190700143/127968417-arrow-back-icon-vector-illustration-flat.jpg">Prev';
prevButton.addEventListener('click', backBtn);

// Create the unordered list
const ul = document.createElement('ul');

// Create the list items
for (let i = 1; i <= 6; i++) {
  const li = document.createElement('li');
  li.classList.add('link');
  li.setAttribute('value', i);
  li.textContent = i;
  li.addEventListener('click', activeLink);
  if (i === 1) {
    li.classList.add('active');
  }
  ul.appendChild(li);
}

// Create the "Next" button
const nextButton = document.createElement('button');
nextButton.classList.add('btn2');
nextButton.textContent = 'Next';
nextButton.innerHTML = '<img src="https://previews.123rf.com/images/pavelstasevich/pavelstasevich1907/pavelstasevich190700143/127968417-arrow-back-icon-vector-illustration-flat.jpg">Prev';
nextButton.addEventListener('click', nextBtn);

// Append the elements to the container and pagination
pagination.appendChild(prevButton);
pagination.appendChild(ul);
pagination.appendChild(nextButton);
container.appendChild(pagination);

// Append the container to the document body or a specific element
document.body.appendChild(container);






let currentValue = 1;
function activeLink() {
  const links = document.querySelectorAll('.link');

  links.forEach((link) => {
    link.classList.remove('active');
    link.addEventListener('click', handleLinkClick);
  });

  function handleLinkClick(event) {
    links.forEach((link) => {
      link.classList.remove('active');
    });
    event.target.classList.add('active');
    currentValue = parseInt(event.target.getAttribute('value'));
  }
}

function backBtn() {
  const links = document.querySelectorAll('.link');

  if (currentValue > 1) {
    links.forEach((link) => {
      link.classList.remove('active');
    });
    currentValue--;
    links[currentValue - 1].classList.add('active');
  }
}

function nextBtn() {
  const links = document.querySelectorAll('.link');

  if (currentValue < links.length) {
    links.forEach((link) => {
      link.classList.remove('active');
    });
    currentValue++;
    links[currentValue - 1].classList.add('active');
  }
}
