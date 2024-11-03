function nextScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.style.display = 'none');
  document.getElementById(screenId).style.display = 'block';
}

let selectedType = '';

function selectType(type) {
  selectedType = type;
  alert(`Selected section type: ${type}`);
}

// add sections to localStorage
function addSectionToLocalStorage(section) {

  // get all sections from local storage
  let localSections = JSON.parse(localStorage.getItem('sections')) || [];

  // add new section to local storage
    localSections.push(section);

    // update local storage with new sections
    localStorage.setItem('sections', JSON.stringify(localSections));
}
 
function addSection() {
  const title = document.getElementById('title').value;
  const completionLevel = document.getElementById('completionLevel').value;
  const fileUpload = document.getElementById('fileUpload').files[0];

  if (title && selectedType) {
    const newSection = {
      id: Date.now(),
      sectionName: title,
      sectionType: selectedType,
      sectionCompletion: completionLevel,
      file: fileUpload ? fileUpload.name : null
    };

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

    if (newSection) {
      addSectionToLocalStorage(newSection);
    }

  } else {
    alert('Please fill out all fields.');
  }
} 

function dashboardPage(screen) {
  if (screen === 'dashboardScreen') {
    // direct page to dashboard from onboarding 
    window.location.href = '/index.html';
  }
}