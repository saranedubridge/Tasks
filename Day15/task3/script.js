// Get the result input field
const resultField = document.getElementById('result');

// Get all the number buttons
const numberButtons = document.querySelectorAll('.number');

// Get all the operator buttons
const operatorButtons = document.querySelectorAll('.operator');

// Get the clear button
const clearButton = document.getElementById('clear');

// Get the calculate button
const calculateButton = document.getElementById('calculate');

// Get the calculate button
const backButton = document.getElementById('back');

// Store the current expression
let expression = '';

// Event listener for number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    expression += value;
    resultField.value = expression;
  });
});

// Event listener for operator buttons
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    expression += value;
    resultField.value = expression;
  });
});

// Event listener for clear button
clearButton.addEventListener('click', () => {
  expression = '';
  resultField.value = '';
});

// Event listener for calculate button
calculateButton.addEventListener('click', () => {
  try {
    const result = eval(expression);
    resultField.value = result;
    expression = '';
  } catch (error) {
    resultField.value = 'Error';
  }
});

// Event listener for back button
backButton.addEventListener('click', () => {
    expression = expression.slice(0, -1);
    resultField.value = expression;
  });

// Event listener for keyboard input
document.addEventListener('keydown', event => {
  const key = event.key;
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', 'Enter'];
  
  if (allowedKeys.includes(key)) {
    event.preventDefault();
    
    if (key === 'Enter') {
      calculateButton.click();
    } else {
      expression += key;
      resultField.value = expression;
    }
  } else {
    alert('Only numbers are allowed');
  }


});
