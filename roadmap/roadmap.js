let card = {};

    card.wrap = document.querySelector('.cards');
    card.newButton = document.querySelector('.new-card');
    const newTaskForm = document.getElementById('new-task-form');

    card.wrap.addEventListener('click', (e) => {
      // Handle clicks on the card header
      if (e.target.closest('.card__header') && !e.target.classList.contains('task-checkbox')) {
        let parentCard = e.target.closest('.card');
        parentCard.classList.toggle('is-active');
      }
    });

    // Handle checkbox changes
    card.wrap.addEventListener('change', (e) => {
      if (e.target.classList.contains('task-checkbox')) {
        let parentCard = e.target.closest('.card');
        parentCard.classList.toggle('completed', e.target.checked);
      }
    });

    card.newButton.addEventListener('click', () => {
      newTaskForm.style.display = 'block';
      card.newButton.style.display = 'none';
    });

    // Handle adding new tasks
    newTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const title = document.getElementById('task-title').value.trim();
      const description = document.getElementById('task-description').value.trim();
      const priority = document.getElementById('task-priority').value;

      // Validate input
      if (title === '' || description === '') {
        alert('Please fill in all required fields.');
        return;
      }

      // Create new card element
      const newCard = document.createElement('div');
      newCard.classList.add('card');

      let color;
      switch (priority) {
        case 'High':
      color = '#5a4b56';
      break;
    case 'Medium':
      color = '#7a7362';
      break;
    case 'Low':
      color = '#4c65914'; 
      break;
    default:
      color = '#807b93'; // Default color
      }
      newCard.style.backgroundColor = color;

      newCard.innerHTML = `
        <div class="card__header">
          <input type="checkbox" class="task-checkbox">
          <h2 class="card__title">${title}</h2>
        </div>
        <div class="schedules">
          <p class="task-description">${description}</p>
          <p class="task-priority"><strong>Priority:</strong> ${priority}</p>
        </div>
      `;

      // Append the new card to the cards container
      card.wrap.appendChild(newCard);

      // Reset the form
      newTaskForm.reset();
      newTaskForm.style.display = 'none';
      card.newButton.style.display = 'block';
    });