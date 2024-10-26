/* function nextScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => screen.style.display = 'none');
    // Show the target screen
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
    const fileUpload = document.getElementById('fileUpload').files[0]; // Get the uploaded file
    
    if (title && selectedType) {
      const sectionsList = document.getElementById('sectionsList');
      const listItem = document.createElement('li');
  
      // Create text content for the section
      listItem.textContent = `${title} - ${selectedType} (Completion: ${completionLevel}%)`;
      
      // If a file is uploaded, add file info to the list item
      if (fileUpload) {
        const fileInfo = document.createElement('span');
        fileInfo.textContent = ` - Uploaded file: ${fileUpload.name}`;
        listItem.appendChild(fileInfo);
      }
  
      sectionsList.appendChild(listItem);
      
      // Clear form fields after adding
      document.getElementById('title').value = '';
      document.getElementById('completionLevel').value = '0';
      document.getElementById('fileUpload').value = ''; // Clear the file input
      selectedType = '';
    } else {
      alert('Please fill out all fields.');
    }
  } 

  */

  function nextScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => screen.style.display = 'none');
    // Show the target screen
    document.getElementById(screenId).style.display = 'block';

  let selectedType = '';

  function selectType(type) {
    selectedType = type;
    alert(`Selected section type: ${type}`);
  }
  
  function addSection() {
    const title = document.getElementById('title').value;
    const completionLevel = document.getElementById('completionLevel').value;
    const fileUpload = document.getElementById('fileUpload').files[0]; // Optional file upload check
    
    if (title && selectedType) {
      const sectionsList = document.getElementById('sectionsList');
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${title}</strong> - ${selectedType} 
        <div class="progress">${completionLevel}% Complete</div>
      `;
  
      sectionsList.appendChild(listItem);
      
      // Clear form fields after adding
      document.getElementById('title').value = '';
      document.getElementById('completionLevel').value = '0';
      document.getElementById('fileUpload').value = ''; // Clear the file input
      selectedType = '';
    } else {
      alert('Please fill out all fields.');
    }
  }
  

  document.querySelector('.confirm-button').addEventListener('click', function() {
    // Capture the input values
    const title = document.querySelector('.text-input').value;
    const completionLevel = document.querySelector('input[type="range"]').value;
  
    // Check if title is provided
    if (title.trim() === "") {
      alert("Please enter a title.");
      return;
    }
  
    // Create a new list item
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${title}</span>
      <div class="progress">${completionLevel}% Complete</div>
    `;
  
    // Append to the sections list
    document.querySelector('.sections-list ul').appendChild(listItem);
  
    // Clear the form fields
    document.querySelector('.text-input').value = '';
    document.querySelector('input[type="range"]').value = '0';
  });
  
}