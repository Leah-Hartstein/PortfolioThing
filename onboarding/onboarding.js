function nextScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.style.display = 'none');
  document.getElementById(screenId).style.display = 'block';
}

let selectedType = '';

function selectType(type) {
  selectedType = type;
  alert(`Selected section type: ${type}`);
}

function addSection() {
  const title = document.getElementById('title').value;
  const completionLevel = document.getElementById('completionLevel').value;
  const fileUpload = document.getElementById('fileUpload').files[0];

  if (title && selectedType) {
    const sectionsList = document.getElementById('sectionsList');
    const listItem = document.createElement('li');

    listItem.textContent = `${title} - ${selectedType} (${completionLevel}% Complete)`;
    
    if (fileUpload) {
      const fileInfo = document.createElement('span');
      fileInfo.textContent = ` - Uploaded file: ${fileUpload.name}`;
      listItem.appendChild(fileInfo);
    }

    listItem.classList.add('section-box');
    sectionsList.appendChild(listItem);

    document.getElementById('title').value = '';
    document.getElementById('completionLevel').value = '0';
    document.getElementById('fileUpload').value = '';
    selectedType = '';
  } else {
    alert('Please fill out all fields.');
  }
}

function dashboardPage(screen) {
  if (screen === 'dashboardScreen') {
    // Adjust the path below to match the location of your other index.html file
    window.location.href = '/index.html';
  }
}