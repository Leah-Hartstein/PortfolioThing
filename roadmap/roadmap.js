// Task Management Code

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
      color = '#4c6591';
      break;
    default:
      color = '#807b93';
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


// Feedback Expansion
$(document).ready(function() {
  // Handle the feedback expansion
  $(".is-expandable").on('click', function(){
    const $that = $(this);
    const $content = $that.find(".content");
    const $contentSpan = $content.find("span");

    if(!$that.hasClass("is-expanded")) {
        // Set initial states
        gsap.set($content, {height: "auto"});
        gsap.set($contentSpan, {opacity: 1});
        gsap.from($content, {height: 0, duration: 0.4, ease: "expo.out"});
        gsap.from($contentSpan, {opacity: 0, duration: 0.4, ease: "expo.out"});
        $that.addClass("is-expanded");
    } else {
        //collapse view
        gsap.to($contentSpan, {opacity: 0, duration: 0.3, ease: "expo.inOut"});
        gsap.to($content, {height: 0, duration: 0.4, ease: "expo.inOut"});
        $that.removeClass("is-expanded");
    }
  });


  // Share Feedback Button
  $('#share-feedback').on('click', function() {
    var link = $('#feedback-link');
    link.show();
    navigator.clipboard.writeText(link.text());
    alert('Link copied to clipboard: ' + link.text());
  });
});

// Close Button
document.querySelector('.close-button').addEventListener('click', function() {
  if (confirm('Are you sure you want to return to the dashboard?')) {
    window.location.href = 'index.html'; // Replace actual dashboard path
  }
});


// Handle the adding new milestone on roadmap
document.addEventListener('DOMContentLoaded', function() {
  const addMilestoneButton = document.querySelector('.add-milestone-button');
  const newMilestoneForm = document.querySelector('.new-milestone-form');
  const cancelButton = document.querySelector('.cancel-button');
  const milestonesContainer = document.querySelector('.milestones');

  console.log(addMilestoneButton, newMilestoneForm, cancelButton, milestonesContainer);

  addMilestoneButton.addEventListener('click', function() {
    console.log('Add Milestone Button Clicked');
    newMilestoneForm.style.display = 'flex';
    addMilestoneButton.style.display = 'none';
  });


  cancelButton.addEventListener('click', function() {
    console.log('Cancel Button Clicked');
    newMilestoneForm.style.display = 'none';
    addMilestoneButton.style.display = 'inline-block';
  });

  newMilestoneForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const milestoneTitle = newMilestoneForm.elements['milestoneTitle'].value;

    const newMilestone = document.createElement('div');
    newMilestone.classList.add('milestone');
    newMilestone.innerHTML = `
      <div class="text"><div class="align-bottom">${milestoneTitle}</div></div>
      <div class="point"></div>
      <div class="line"></div>
    `;

    milestonesContainer.appendChild(newMilestone);

    newMilestoneForm.reset();
    newMilestoneForm.style.display = 'none';
    addMilestoneButton.style.display = 'inline-block';
  });
});
