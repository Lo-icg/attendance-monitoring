// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYTDG-ME3rTzsYYYV3R_IIdOwXiPkIGek",
  authDomain: "attendance-3b8a3.firebaseapp.com",
  databaseURL: "https://attendance-3b8a3-default-rtdb.firebaseio.com",
  projectId: "attendance-3b8a3",
  storageBucket: "attendance-3b8a3.appspot.com",
  messagingSenderId: "62516432895",
  appId: "1:62516432895:web:0a011253441dd18bff61ca"
};

//initialize firebase
firebase.initializeApp(firebaseConfig)
//reference your database
const attendanceForm = firebase.database().ref('studentForm');


document.getElementById("studentForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var fullname = getElementVal("fullname");
  var section = getElementVal("section");
  var studnum = getElementVal("studnum");
  var subcode = getElementVal("subcode");

  saveMessages(fullname, section, studnum, section);
  // enable alert
  document.querySelector('.submit').style.display = 'block';

}


const saveMessages = (fullname, section, studentnum, subcode) => {
  var attendance_form = attendanceForm.push();

  attendance_form.set({
    fullname: fullname,
    section: section,
    studentnum: studentnum,
    section: section,
  });

};


const getElementVal = (id) => {
  return document.getElementById(id).value;
}


var clickedBoxId; // variable to store the ID of the clicked box
var clickedSection; // variable to store the section of the clicked box

function showForm(boxId) {
  var formContainer = document.getElementById('formContainer');
  var form = document.getElementById('studentForm');
  var tableContainer = document.getElementById('recordsTable');

  if (tableContainer.style.display === 'block') {
      return; // Exit the function if the table is already visible
  }

  
  // Check if the box already contains the full name, section, student number, and subject code
  var clickedBox = document.getElementById(boxId);
  var pElement = clickedBox.querySelector('p');
  if (pElement.textContent.trim() !== '') {
      var alertDiv = document.createElement('div');
      alertDiv.classList.add('alert');
      alertDiv.textContent = 'Someone already seats here';
      document.body.appendChild(alertDiv);

      // Disappear after one second
      setTimeout(function() {
          alertDiv.remove();
      }, 2000);
      return; // Exit the function if the box already contains the required information
  }

  // Set formContainer to display:block to make it visible
  formContainer.style.display = 'block';

  // Store the ID of the clicked box
  clickedBoxId = boxId;

  // Store the section of the clicked box
  clickedSection = document.getElementById(boxId).querySelector('p');




  

  // Assign the id to the <p> element
  var pElement = document.createElement('p');
  pElement.id = 'person_' + boxId;

  // Position the formContainer in the center of the screen
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var formWidth = formContainer.offsetWidth;
  var formHeight = formContainer.offsetHeight;
  var scrollX = window.scrollX || window.pageXOffset;
  var scrollY = window.scrollY || window.pageYOffset;
  var leftPos = scrollX + (screenWidth - formWidth) / 2;
  var topPos = scrollY + (screenHeight - formHeight) / 2;

  formContainer.style.left = leftPos + 'px';
  formContainer.style.top = topPos + 'px';
  

}


function hideForm() {
    var formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'none';
}

var form = document.getElementById('studentForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

   // Validate the form
   if (!validateForm()) {
    return; // Do not proceed if form is not valid
  }

  // Get the fullname value from the input element
  var fullname = document.getElementById('fullname').value;
  var section = document.getElementById('section').value;
  var studnum = document.getElementById('studnum').value;
  var subcode = document.getElementById('subcode').value;
  
  // Display the fullname in the clicked box
    var clickedBox = document.getElementById(clickedBoxId);
    var pElement = clickedBox.querySelector('p');
    
    // Change the background color of the div box
    clickedBox.style.backgroundColor = '#FFD700'; // Set your desired color here

    // Get the current time
  var currentTime = getCurrentTime();

    pElement.innerHTML = fullname + "<br>" + section + "<br>" + studnum + "<br>" + subcode + "<br>" + currentTime;
    




     // Reset the form fields
  document.getElementById('fullname').value = '';
  document.getElementById('section').value = '';
  document.getElementById('studnum').value = '';
  document.getElementById('subcode').value = '';


    // Call the 'hideForm' function to hide the form after submission
    hideForm();

});

function validateForm() {
  var fullname = document.getElementById('fullname').value;
  var section = document.getElementById('section').value;
  var studnum = document.getElementById('studnum').value;
  var subcode = document.getElementById('subcode').value;

  if (fullname.trim() === '' || section.trim() === '' || studnum.trim() === '' || subcode.trim() === '') {
    var alertDiv = document.createElement('div');
    alertDiv.classList.add('alert');
    alertDiv.textContent = 'Please fill in all fields';

    document.body.appendChild(alertDiv);

    // Disappear after one second
    setTimeout(function() {
      alertDiv.remove();
    }, 1000);

    return false;
  }

  return true;
}

function showRecords() {
  var tableContainer = document.getElementById('recordsTable');

  // Toggle the visibility of the table
  if (tableContainer.style.display === 'block') {
    tableContainer.style.display = 'none';
  } else {
    tableContainer.style.display = 'block';

    // You can add table rows dynamically here
    var tbody = document.querySelector('#records tbody');
    tbody.innerHTML = '';

    // Loop through each box to get the name, section, student number, and subject code
    for (var i = 1; i <= 60; i++) {
      var boxId = i.toString();
      var clickedBox = document.getElementById(boxId);
      var pElement = clickedBox.querySelector('p');
      var content = pElement.innerHTML.split('<br>');
      var fullname = content[0];
      var section = content[1] ? content[1] : '';
      var studentnum = content[2] ? content[2] : ''; // Check if student number exists
      var subcode = content[3] ? content[3] : ''; // Check if subject code exists
      var time = content[4] ? content[4] : '';

      // Add the data to the table
      var row = document.createElement('tr');
      row.innerHTML = `<td>${i}</td><td>${fullname}</td><td>${section}</td><td>${studentnum}</td><td>${subcode}</td><td>${time}</td>`;
      tbody.appendChild(row);

      
    }
  }
}



function getCurrentTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var timeString = hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + ampm;
  return timeString;
}

function printStudentData() {
  var table = document.getElementById('records');
  var printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write('<html><head><title>Student Data</title></head><body>');
  printWindow.document.write('<h1>Seat Plan</h1>');
  printWindow.document.write('<table border="1">');
  printWindow.document.write('<thead>');
  printWindow.document.write('<tr><th>No.</th><th>Full Name</th><th>Section</th><th>Student Number</th><th>Subject Code</th><th>Time Submitted</th></tr>');
  printWindow.document.write('</thead>');
  printWindow.document.write('<tbody>');
  for (var i = 1; i <= 60; i++) {
    var boxId = i.toString();
    var clickedBox = document.getElementById(boxId);
    var pElement = clickedBox.querySelector('p');
    var content = pElement.innerHTML.split('<br>');
    var fullname = content[0];
    var section = content[1] ? content[1] : '';
    var studentnum = content[2] ? content[2] : '';
    var subcode = content[3] ? content[3] : '';
    var time = content[4] ? content[4] : '';

    printWindow.document.write('<tr>');
    printWindow.document.write('<td>' + i + '</td>');
    printWindow.document.write('<td>' + fullname + '</td>');
    printWindow.document.write('<td>' + section + '</td>');
    printWindow.document.write('<td>' + studentnum + '</td>');
    printWindow.document.write('<td>' + subcode + '</td>');
    printWindow.document.write('<td>' + time + '</td>');
    printWindow.document.write('</tr>');
  }
  printWindow.document.write('</tbody>');
  printWindow.document.write('</table>');
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

// Update the event listener to use the new function
document.querySelector('.download').addEventListener('click', printStudentData);

// Get all input elements
var inputs = document.querySelectorAll('input[type="text"]');

// Add input event listener to each input element
inputs.forEach(function(input) {
  input.addEventListener('input', function() {
    this.value = this.value.toUpperCase();
  });
});



