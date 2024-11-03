// Task Management Code

let card = {};

card.wrap = document.querySelector('.cards');
card.newButton = document.querySelector('.new-card');
const newTaskForm = document.getElementById('new-task-form');

card.wrap.addEventListener('click', (e) => {
  if (e.target.closest('.card__header') && !e.target.classList.contains('task-checkbox')) {
    let parentCard = e.target.closest('.card');
    parentCard.classList.toggle('is-active');
  }
});


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


newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();


  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-description').value.trim();
  const priority = document.getElementById('task-priority').value;


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

  $(".is-expandable").on('click', function(){
    const $that = $(this);
    const $content = $that.find(".content");
    const $contentSpan = $content.find("span");

    if(!$that.hasClass("is-expanded")) {

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
    window.location.href = '../index.html';
  }
});



document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("show-feedback-form").addEventListener("click", function() {
    const form = document.getElementById("feedback-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
  });

  // Handle new feedback submission
  document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const feedbackTitle = document.getElementById("feedback-title").value.trim();
    const feedbackText = document.getElementById("new-feedback").value.trim();

    // Create a new feedback list item
    const newFeedback = document.createElement("li");
    newFeedback.className = "feedback-milestone no-flicker is-current";

    if (feedbackTitle && feedbackText) {
      newFeedback.innerHTML = `
        <div class="feedback-action is-expandable">
          <h2 class="title">${feedbackTitle}</h2>
          <div class="content no-flicker" role="region" aria-expanded="false">
            <span>${feedbackText}</span>
          </div>
        </div>
      `;

      // Toggle expand/collapse functionality
      newFeedback.querySelector(".feedback-action").addEventListener("click", function() {
        const content = this.querySelector(".content");
        const expanded = content.getAttribute("aria-expanded") === "true";
        content.setAttribute("aria-expanded", !expanded);
        content.style.display = expanded ? "none" : "block";
      });
    } else {
      // Simple item if only description is provided
      newFeedback.innerHTML = `
        <div class="feedback-action">
          <h2 class="title">${feedbackText}</h2>
        </div>
      `;
    }

    // Append the new feedback to the feedback list
    const feedbackList = document.querySelector(".feedback");
    feedbackList.appendChild(newFeedback);

    // Clear the form and hide it
    document.getElementById("feedback-title").value = "";
    document.getElementById("new-feedback").value = "";
    document.getElementById("feedback-form").style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const addMilestoneButton = document.querySelector(".add-milestone-button");
  const milestoneForm = document.querySelector(".new-milestone-form");
  const milestoneInput = milestoneForm.querySelector("input[name='milestoneTitle']");
  const timelineContainer = document.querySelector(".milestones");

  // Show the form when "Add Milestone" button is clicked
  addMilestoneButton.addEventListener("click", function() {
    milestoneForm.style.display = "block";
    milestoneInput.focus();
  });

  // Hide the form when "Cancel" button is clicked
  milestoneForm.querySelector(".cancel-button").addEventListener("click", function() {
    milestoneForm.style.display = "none";
    milestoneInput.value = "";
  });

  // Add a new milestone to the timeline when the form is submitted
  milestoneForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const milestoneTitle = milestoneInput.value.trim();

    // Only proceed if there's input
    if (milestoneTitle) {
      const newMilestone = document.createElement("div");
      newMilestone.className = "milestone";
      newMilestone.innerHTML = `
        <div class="text"><div class="align-bottom">${milestoneTitle}</div></div>
        <div class="point"></div>
        <div class="line"></div>
      `;

      // Append new milestone to the timeline
      timelineContainer.appendChild(newMilestone);

      // Clear the form and hide it
      milestoneInput.value = "";
      milestoneForm.style.display = "none";
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');

  // Load saved checkbox states
  taskCheckboxes.forEach((checkbox, index) => {
    const savedState = localStorage.getItem(`taskCheckbox${index}`);
    checkbox.checked = savedState === 'true';
  });

  function updateProgress() {
    let completedTasks = 0;
    taskCheckboxes.forEach((checkbox, index) => {
      // Save checkbox state
      localStorage.setItem(`taskCheckbox${index}`, checkbox.checked);
      if (checkbox.checked) completedTasks++;
    });
    const totalTasks = taskCheckboxes.length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Debugging statements
    console.log(`Completed Tasks: ${completedTasks}`);
    console.log(`Total Tasks: ${totalTasks}`);
    console.log(`Progress Percentage: ${progressPercentage}%`);

    // Store progress data in localStorage
    localStorage.setItem('taskProgress', JSON.stringify({
      completedTasks,
      totalTasks,
      progressPercentage
    }));

    // Update progress bar and text
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');

    if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
      console.log(`Updated progress bar width to ${progressPercentage}%`);
    } else {
      console.error('Progress bar element not found.');
    }

    if (progressText) {
      progressText.textContent = `Progress: ${completedTasks}/${totalTasks} tasks completed (${Math.round(progressPercentage)}%)`;
      console.log(`Updated progress text.`);
    } else {
      console.error('Progress text element not found.');
    }
  }

  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });


  updateProgress();
});

