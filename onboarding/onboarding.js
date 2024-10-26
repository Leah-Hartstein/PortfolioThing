function nextScreen(screenId) {
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