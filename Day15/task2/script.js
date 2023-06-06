// Function to validate the choice of food
function validateFoodChoice() {
  var checkboxes = document.getElementsByName('foodChoice');
  var checkedCount = 0;

  // Count the number of checkboxes that are checked
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkedCount++;
    }
  }

  // Validate if at least two options are selected
  if (checkedCount < 2) {
    alert('Please select at least 2 food options.');
    return false;
  }

  return true;
}

// Function to append form values to the table
function appendToTable(event) {
  event.preventDefault();
  
  // Prevent form submission from refreshing the page

  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var address = document.getElementById('address').value;
  var pincode = document.getElementById('pincode').value;
  var gender = document.getElementById('gender').value;
  var foodChoices = [];
  var checkboxes = document.getElementsByName('foodChoice');

  // Get the selected food choices
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      foodChoices.push(checkboxes[i].value);
    }
  }

  var state = document.getElementById('state').value;
  var country = document.getElementById('country').value;

  // Create a new row in the table
  var table = document.getElementById('userTable');
  var newRow = table.insertRow(-1);

  // Insert cells into the new row
  var firstNameCell = newRow.insertCell(0);
  var lastNameCell = newRow.insertCell(1);
  var addressCell = newRow.insertCell(2);
  var pincodeCell = newRow.insertCell(3);
  var genderCell = newRow.insertCell(4);
  var foodCell = newRow.insertCell(5);
  var stateCell = newRow.insertCell(6);
  var countryCell = newRow.insertCell(7);

  // Set the cell values to the form values
  firstNameCell.textContent = firstName;
  lastNameCell.textContent = lastName;
  addressCell.textContent = address;
  pincodeCell.textContent = pincode;
  genderCell.textContent = gender;
  foodCell.textContent = foodChoices.join(', ');
  stateCell.textContent = state;
  countryCell.textContent = country;

  // Reset the form fields for the next submission
  document.getElementById('registrationForm').reset();
}

// Function to clear the table
function clearTable() {
  var table = document.getElementById('userTable');

  // Clear all rows except the table header
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

// Event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  if (!validateFoodChoice()) {
    event.preventDefault(); // Prevent form submission if validation fails
  } else {
    appendToTable(event); // Append form values to the table
  }
});

// Event listener for clear button
document.getElementById('clearButton').addEventListener('click', clearTable);
