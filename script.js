const myTasksSection = document.querySelector(".myTasks");
const userStatsSection = document.querySelector(".userStats");
const openListSection = document.querySelector(".openList");
const chosenTask = document.querySelector(".chosenTask");
const chosenTaskContainer = document.querySelector(".chosenTaskContainer");
const chosenTaskOpen = document.querySelector(".chosenTaskOpen");


const roadMap = document.querySelector(".roadMap");

const myPortfolio = document.querySelector(".portfolioSections");

const taskIdeation = document.getElementById("taskItemsIdeation");
const taskDrafting = document.getElementById("taskItemsDrafting");
const taskFinalisation = document.getElementById("taskItemsFinalisation");
const taskInterview = document.getElementById("taskItemsInterview");

const taskModalIdeation = document.getElementById("taskModalTasksIdeation");
const taskModalDrafting = document.getElementById("taskModalTasksDrafting");
const taskModalFinalisation = document.getElementById("taskModalTasksFinalisation");
const taskModalInterview = document.getElementById("taskModalTasksInterview");
const taskModalComplete = document.getElementById("taskModalTasksComplete");



const taskExpandButton = document.querySelector(".taskExpandButton");
const taskExpandModal = document.querySelector(".taskExpandModal");
const taskExpandModalClose = document.querySelector(".taskModalClose");

const taskCompletionExpandButton = document.querySelector(".chosenTaskContainer");
const taskCompletionExpandModal = document.querySelector(".taskCompletionModal");
const taskCompletionExpandModalClose = document.querySelector(".taskCompletionModalClose");
const taskCompletionModalContainer = document.querySelector(".taskCompletionModalContainer");


const guidesExpandButton = document.querySelector(".guidesExpandButton");
const guidesExpandModal = document.querySelector(".guidesExpandModal");
const guidesExpandModalClose = document.querySelector(".guidesModalClose");

const statsExpandButton = document.querySelector(".statsExpandButton");
const statsExpandModal = document.querySelector(".statsExpandModal");
const statsExpandModalClose = document.querySelector(".statsModalClose");

const portfolioExpandButton = document.querySelector(".portfolioModalOpenButton");
const portfolioExpandModal = document.querySelector(".portfolioExpandModal");
const portfolioExpandModalClose = document.querySelector(".portfolioModalClose");

const myPortfolioModal = document.querySelector(".portfolioModalContent");



const modalBackground = document.querySelector(".modalBackground");



let currentTaskIndex = 0;



var mapCanvas = document.getElementById("map");

// The function for toggling expanding out the list. I'm still so proud of this thing.

function expandList() {
    // Toggle the class for myTasks section
    if (myTasksSection.classList.contains("myTasks")) {
        myTasksSection.classList.remove("myTasks");
        myTasksSection.classList.add("myTasksOpen");

        openListSection.classList.remove("openList");
        openListSection.classList.add("closeList");

        // Hide the userStats section
        userStatsSection.classList.add("userStatsClosed");

        // Hide the userStats expand button
        statsExpandButton.classList.add("statsExpandButtonClosed");
    } else {
        myTasksSection.classList.remove("myTasksOpen");
        myTasksSection.classList.add("myTasks");

        openListSection.classList.add("openList");
        openListSection.classList.remove("closeList");

        // Show the userStats section
        userStatsSection.classList.remove("userStatsClosed");

        // Show the userStats expand button
        statsExpandButton.classList.remove("statsExpandButtonClosed");
        statsExpandButton.classList.add("statsExpandButton");

    }
}



function openMap(){
        if (chosenTaskContainer.classList.contains("chosenTaskContainer")) {
          chosenTaskContainer.classList.remove("chosenTaskContainer");
          chosenTaskContainer.classList.add("chosenTaskHidden");
    
            roadMap.classList.remove("roadMap");
            roadMap.classList.add("roadMapOpen");

            chosenTaskOpen.classList.remove("chosenTaskOpen");
            chosenTaskOpen.classList.add("chosenTaskOpenHidden");


            // drawMap();
    
        } else {
          chosenTaskContainer.classList.remove("chosenTaskHidden");
          chosenTaskContainer.classList.add("chosenTaskContainer");

            roadMap.classList.remove("roadMapOpen");
            roadMap.classList.add("roadMap");

            chosenTaskOpen.classList.remove("chosenTaskOpenHidden");
            chosenTaskOpen.classList.add("chosenTaskOpen");
            
            closeMap();
            }
}




// The function for displaying tasks, which is mostly just creating a div element, injecting in html, then sorting them into appropriate places in the list and modal


function displayTasks() {
  // Clear the task list before displaying
  taskIdeation.innerHTML = "";
  taskDrafting.innerHTML = "";
  taskFinalisation.innerHTML = "";
  taskInterview.innerHTML = "";
  taskModalComplete.innerHTML = ""; // Clear the completed tasks section in the modal

  // Get tasks from localStorage
  let localTasks = JSON.parse(localStorage.getItem('tasks'));

  // Check if localTasks is not empty or null
  if (localTasks) {
      localTasks.forEach((task) => {
          // Create a task item for the DOM (for the main list)
          let item = document.createElement("div");
          item.className = "listTask";
          item.setAttribute("data-id", task.id);

          let starsHTML = `<img class="taskItemTaskStar" src="https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png">`.repeat(task.taskDifficulty);

          item.innerHTML = `
              <em class="listTaskSection">${task.taskSectionType} - ${task.taskSection}</em>
              
              <div class="taskHeader">
              <b class="listTaskTitle">${task.taskName}</b>
              <img class="listTaskImg" src="assets/working.jpg">
              
              </div>
              <p class="taskDescription">${task.taskDescription}</p>
              <ul>
              <li class="taskMainTask"><em>${task.taskMainTask}</em</li>
              </ul>
              <div class="taskFooter">
              <input type="checkbox" class="taskItemTaskTick">
              <p class="taskItemTaskText taskItemTaskTime">${task.taskCompletionTime} Minutes</p>
              <div class="taskItemTaskStars">${starsHTML}</div>
              </div>
          `;

          // Create a task item for the modal
          let modalItem = document.createElement("div");
          modalItem.className = "taskItemTask";
          modalItem.innerHTML = `
              <img class="taskItemTaskImg" src="assets/working.jpg">
              <p class="taskItemTaskBoldText taskItemTaskTitle">${task.taskName}</p>
              <input type="checkbox" class="taskItemTaskTick" ${task.complete === 1 ? "checked" : ""}>
              <p class="taskItemTaskBoldText taskItemTaskTime">${task.taskCompletionTime} mins</p>
              <div class="taskItemTaskStars">${starsHTML}</div>
              <div class="taskItemTaskExpandable">
                  <p class="taskItemTaskBoldText">${task.taskSectionType} - ${task.taskSection}</p>
                  <p class="taskItemTaskText">${task.taskDescription}</p>
                  <ul class="taskItemTaskList">
                      <li class="taskItemTaskText">${task.taskMainTask}</li>
                      <li class="taskItemTaskText">${task.taskSubTask}</li>
                  </ul>
              </div>
          `;

          // Append the task item to the main list only if it’s not complete
          if (task.complete !== 1) {
              switch (task.taskStage) {
                  case 'Ideation':
                      taskIdeation.appendChild(item);
                      break;
                  case 'Drafting':
                      taskDrafting.appendChild(item);
                      break;
                  case 'Finalisation':
                      taskFinalisation.appendChild(item);
                      break;
                  case 'Interview':
                      taskInterview.appendChild(item);
                      break;
                  default:
                      break;
              }

              // Add click event to open the task details
              item.addEventListener("click", function () {
                  openTask(task.id);
              });
          }

          // Append to the completed tasks modal section if complete, otherwise to task stage modal sections
          if (task.complete === 1) {
              taskModalComplete.appendChild(modalItem);
          } else {
              switch (task.taskStage) {
                  case 'Ideation':
                      taskModalIdeation.appendChild(modalItem);
                      break;
                  case 'Drafting':
                      taskModalDrafting.appendChild(modalItem);
                      break;
                  case 'Finalisation':
                      taskModalFinalisation.appendChild(modalItem);
                      break;
                  case 'Interview':
                      taskModalInterview.appendChild(modalItem);
                      break;
                  default:
                      break;
              }
          }
      });
  }
}


function displayMapDots() {
  var caseStudy1 = document.getElementById("cluster1");
  var caseStudy2 = document.getElementById("cluster4");
  var caseStudy3 = document.getElementById("cluster5");

  // Clear the task list before displaying
  caseStudy1.innerHTML = "";
  caseStudy2.innerHTML = "";
  caseStudy3.innerHTML = "";

  // Get tasks from localStorage
  let localTasks = JSON.parse(localStorage.getItem("tasks"));
  let localSections = JSON.parse(localStorage.getItem("sections"));

  let firstIncompleteDot = null; // Track the first incomplete task

  if (localSections) {
    localSections.forEach((section) => {
      let title = document.createElement("b");
      title.className = "mapClusterName";
      title.setAttribute("data-id", section.id);
      title.innerHTML = `${section.sectionName}`;

      switch (section.sectionName) {
        case "CoolProduct":
          caseStudy1.appendChild(title);
          break;
        case "FunCube":
          caseStudy2.appendChild(title);
          break;
        case "SmartClog":
          caseStudy3.appendChild(title);
          break;
        default:
          break;
      }
    });
  }

  if (localTasks) {
    localTasks.forEach((task) => {
      let item = document.createElement("div");
      item.className = "mapDot";
      item.setAttribute("data-id", task.id);

      item.innerHTML = `
        <div class="mapLine"></div>
        <div class="mapMarker"></div>
        <div class="mapMarkerText">${task.taskName}
        <button onclick="openMap()"></button>
        </div>
      `;

      // For incomplete tasks
      if (task.complete !== 1) {
        if (!firstIncompleteDot) {
          firstIncompleteDot = item; // Set the first incomplete task
        }

        switch (task.taskStage) {
          case "Ideation":
            switch (task.taskSection) {
              case "CoolProduct":
                caseStudy1.appendChild(item);
                break;
              case "FunCube":
                caseStudy2.appendChild(item);
                break;
              case "SmartClog":
                caseStudy3.appendChild(item);
                break;
            }

            // Add click event to each item
            item.addEventListener("click", function () {
              let alreadyOpenTaskMarker = document.querySelector(".mapDotCurrent");
              if (alreadyOpenTaskMarker) {
                alreadyOpenTaskMarker.classList.remove("mapDotCurrent");
                alreadyOpenTaskMarker.classList.add("mapDot");
              }
              item.classList.add("mapDotCurrent");
              item.classList.remove("mapDot");
              openTask(task.id);
            });
            break;
        }

      } else {
        // For complete tasks
        item.className = "mapDotComplete";
        switch (task.taskSection) {
          case "CoolProduct":
            caseStudy1.appendChild(item);
            break;
          case "FunCube":
            caseStudy2.appendChild(item);
            break;
          case "SmartClog":
            caseStudy3.appendChild(item);
            break;
        }
      }
    });

    // Set the first incomplete dot as the selected one if no dot is selected
    if (firstIncompleteDot) {
      firstIncompleteDot.classList.add("mapDotCurrent");
      firstIncompleteDot.classList.remove("mapDot");
      openTask(firstIncompleteDot.getAttribute("data-id"));
    }
  }
}



// The function for displaying chosen tasks, which works like the task displaying function but without the sorting, but with the ability to show from an ID
// So that it can be called by the opentasks function

function displayChosenTask(taskId) {
  // Clear the task display area before adding the chosen task
  chosenTaskContainer.innerHTML = "";

  // Get tasks from localStorage
  let localTasks = JSON.parse(localStorage.getItem('tasks'));

  // Check if there are tasks to display
  if (localTasks && localTasks.length > 0) {
      // If taskId is provided, find the task with that ID; otherwise, use the first incomplete task
      let task = null;
      if (taskId) {
          task = localTasks.find(t => t.id === taskId && t.complete !== 1);
      }

      // If no valid task is found with the given ID, find the first incomplete task
      if (!task) {
          task = localTasks.find(t => t.complete !== 1);
      }

      // If the task is found, display it
      if (task) {
          // Create a task item for the DOM
          let item = document.createElement("div");
          item.className = "chosenTask";
          item.setAttribute("data-id", task.id + "infocus");

          // Generate stars based on task difficulty
          let starsHTML = '';
          for (let i = 0; i < task.taskDifficulty; i++) {
              starsHTML += `<img class="taskItemTaskStar" src="https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png">`;
          }

          // Set the inner HTML for the task item
          item.innerHTML = `
              <h3 class="mainTaskSection">${task.taskSection}</h3>
              <h2 class="mainTaskName">${task.taskName}</h2>
              <div class="chosenTaskText">
                  <p class="mainTextDesc">${task.taskDescription}</p>
                  <ul>
                      <li class="mainTaskMainTask">${task.taskMainTask}</li>
                      <ul>
                        <li class="mainTaskSubTask">${task.taskSubTask}</li>
                      </ul>
                  </ul>
              </div>
              <div class="chosenTaskFooter">
                <p class="taskItemTaskBoldText taskItemTaskTime">${task.taskCompletionTime} Minutes</p>
                <p class="chosenTaskType">${task.taskStage}</p>
                <div class="taskItemTaskStars">${starsHTML}</div>
              </div>
          `;

          // Append the task item to the chosenTask container
          chosenTaskContainer.appendChild(item);

          // Optionally open the task if needed
          // openTask(task.id);
      } else {
          // No valid task was found
          chosenTaskContainer.innerHTML = "<p>No incomplete tasks available.</p>";
      }
  } else {
      // No tasks available
      chosenTaskContainer.innerHTML = "<p>No tasks available.</p>";
  }
}

// The function for displaying chosen tasks in the task completion modal, which works similarly to the previous function but with the addition of a task completion button.

function displayChosenTaskModal(taskId) {
  // Clear the task display area before adding the chosen task
  taskCompletionModalContainer.innerHTML = "";

  // Get tasks from localStorage
  let localTasks = JSON.parse(localStorage.getItem('tasks'));

  // Check if there are tasks to display
  if (localTasks && localTasks.length > 0) {
      // If taskId is provided, find the task with that ID; otherwise, use the first incomplete task
      let task = null;
      if (taskId) {
          task = localTasks.find(t => t.id === taskId && t.complete !== 1);
      }

      // If no valid task is found with the given ID, find the first incomplete task
      if (!task) {
          task = localTasks.find(t => t.complete !== 1);
      }

      // If the task is found, display it
      if (task) {
          // Create a task item for the DOM
          let item = document.createElement("div");
          item.className = "taskCompletionModalContent";
          item.setAttribute("data-id", task.id + "infocus");

          // Generate stars based on task difficulty
          let starsHTML = '';
          for (let i = 0; i < task.taskDifficulty; i++) {
              starsHTML += `<img class="taskItemTaskStar" src="https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png">`;
          }

          // Set the inner HTML for the task item
          item.innerHTML = `
              <h3>${task.taskSection}</h3>
              <div class="taskCompletionModalTextInput">
                  <input type="text"></input>
              </div>
              <h2>${task.taskName}</h2>
              <div class ="taskCompletionModalText">
                  <p>${task.taskDescription}</p>
                  <ul>
                    <li><b>${task.taskMainTask}</b></li>
                    <ul>
                      <li>${task.taskSubTask}</li>
                    </ul>
                  </ul>
              </div>
              <div class="taskCompletionModalFooter">
                  <p class="taskItemTaskBoldText taskItemTaskTime">${task.taskCompletionTime} Minutes</p>
                  <p class="chosenTaskType">${task.taskStage}</p>
                  <button class="taskCompletionModalSubmit" onclick="completeTask('${task.id}')">Complete Task</button>
              </div>
          `;

          // Append the task item to the chosenTask container
          taskCompletionModalContainer.appendChild(item);

          // Optionally open the task if needed
          // openTask(task.id);
      } else {
          // No valid task was found
          chosenTaskContainer.innerHTML = "<p>No incomplete tasks available.</p>";
      }
  } else {
      // No tasks available
      chosenTaskContainer.innerHTML = "<p>No tasks available.</p>";
  }
}




function displaySectionWidget() {
  // Clear the task list before displaying
  myPortfolio.innerHTML = "";





  // Get tasks from localStorage
  let localSections = JSON.parse(localStorage.getItem('sections'));

// Check if localTasks is not empty or null
if (localSections) {
  localSections.forEach((section) => {
      
        // Create a task item for the DOM
        let item = document.createElement("div");
        item.className = "portfolioSection";
        item.setAttribute("data-id", section.id);


      item.innerHTML = `

              <div class = "portfolioSectionHeader">

                <div class ="portfolioSectionTitle"><h3>'${section.sectionName}'</h3>
                  <br><b>${section.sectionType}</b>
                </div>    
                
              </div>

              <div class ="portfolioSectionContent">
                <div class = "portfolioSectionContentThumbnailLarge" id ="thumbnail1">
                  <span class="thumbnailLabel">Image</span>
                </div>
                <div class = "portfolioSectionContentThumbnailSmall" id ="thumbnail2">
                  <span class="thumbnailLabel">Text</span>
                </div>
              </div>
              
              <div class ="portfolioSectionFooter">
                <div class = "portfolioSectionProgressBar" id = "section1">
                <div class = "portfolioSectionProgress" 
                style="width:${section.sectionCompletion}%; background-color:#745a67;   border-radius: 15px; z-index: 1;"></div>

                <p class ="portfolioSectionProgressBarNumber">${section.sectionCompletion}% Complete</p>
                </div>

            <button type="button" class="sectionExpandButton" id = "${section.id}" >Open <img src="new window.png"> </button>
            </div>


`;


          // Append the task item to the list
            myPortfolio.appendChild(item);


      });
  }
}

function displaySectionModal() {
  // Clear the task list before displaying
  myPortfolioModal.innerHTML = "";





  // Get tasks from localStorage
  let localSections = JSON.parse(localStorage.getItem('sections'));

// Check if localTasks is not empty or null
if (localSections) {
  localSections.forEach((section) => {
      
        // Create a task item for the DOM
        let item = document.createElement("div");
        item.className = "portfolioSection";
        item.setAttribute("data-id", section.id);


      item.innerHTML = `

          <div class = "portfolioSectionHeader">

          <div class ="portfolioSectionTitle"><h3>${section.sectionName}</h3>
            <br><b>${section.sectionType}</b>
          </div>    
          
        </div>

        <div class ="portfolioSectionContent">
          <div class = "portfolioSectionContentThumbnailLarge" id ="thumbnail1">
                            <span class="thumbnailLabel">Text</span>
</div>
          <div class = "portfolioSectionContentThumbnailSmall" id ="thumbnail2">
                            <span class="thumbnailLabel">Text</span>
</div>
          <div class = "portfolioSectionContentThumbnailSmall" id ="thumbnail3">
                            <span class="thumbnailLabel">Text</span>
</div>
          <div class = "portfolioSectionContentThumbnailLarge" id ="thumbnail4">
                            <span class="thumbnailLabel">Text</span>
</div>

        </div>
        
        <div class ="portfolioSectionFooter">
<div class = "portfolioSectionProgressBar" id = "section1">
                <div class = "portfolioSectionProgress" 
                style="width:${section.sectionCompletion}%; background-color:#745a67;   border-radius: 15px; z-index: 1;"></div>

                <p class ="portfolioSectionProgressBarNumber">${section.sectionCompletion}% Complete</p>
                </div>

      <button type="button" class="sectionExpandButton" id = "${section.id}" >Open <img src="new window.png"> </button>
      </div>
`;


          // Append the task item to the list
            myPortfolioModal.appendChild(item);


      });
  }
}

// The function for adding sections, which is just a very simple object created by a form and then an absolutely enourmous if statement to add 3-30 tasks 
// Depending on the type of section. Case studies have the most obviously

function addSection(sectionName, sectionType, sectionCompletion) {



    // Creating the object, directly passing in the input parameters. 
    // This is kept the same from the first time its introduced in the tutorial.
    let section = {
        sectionName,
        sectionType,
        sectionCompletion,
        id: Date.now(),
        date: new Date().toISOString(),
    }

    //first check localstorage to see if an item exists
      //fetching and parsing the localstorage value

      let localSections = JSON.parse(localStorage.getItem('sections'));


    //then place the value into a JS data structure
    //then check to see if its a null value (if localstorage is empty). If it is then add task.

      if (localSections == null) {

        localSections = [section];
      } else {
        //check for existing task. in this case using the ID bc u could have multiple tasks with the same name
        if (localSections.find(element => element.id === section.id)){
          console.log('Section ID already exists.');
        } else {
          //if theres no existing task then push the element to the array. this is a temporary array instead of the global one at the top
          localSections.push(section);
        }
      }

      //set the new item into localstorage
      localStorage.setItem('sections', JSON.stringify(localSections));
      // console.log(section); 

      

     /* document.addEventListener("DOMContentLoaded", () => {
        const myPortfolio = document.querySelector(".portfolioSections");
      
        // Retrieve sections from localStorage
        let localSections = JSON.parse(localStorage.getItem('sections'));

        console.log(localSections,'localsecs')
      
        if (localSections) {
          localSections.forEach((section) => {
            // Create the section item
            const sectionItem = document.createElement("div");
            sectionItem.className = "portfolioSection";
            sectionItem.setAttribute("data-id", section.id);
      
            sectionItem.innerHTML = `
              <div class="portfolioSectionHeader">
                <div class="portfolioSectionTitle"><h3>'${section.sectionName}'</h3>
                  <br><b>${section.sectionType}</b>
                </div>
              </div>
              <div class="portfolioSectionContent">
                <div class="portfolioSectionContentThumbnailLarge">
                  <span class="thumbnailLabel">Visualizations</span>
                </div>
                <div class="portfolioSectionContentThumbnailSmall">
                  <span class="thumbnailLabel">Text</span>
                </div>
              </div>
              <div class="portfolioSectionFooter">
                <div class="portfolioSectionProgressBar">
                  <div class="portfolioSectionProgress" style="width:${section.sectionCompletion}%; background-color:#745a67; border-radius: 15px;"></div>
                  <p class="portfolioSectionProgressBarNumber">${section.sectionCompletion}% Complete</p>
                </div>
                <button type="button" class="sectionExpandButton">Open <img src="new window.png"></button>
              </div>
            `;
      
            // Append the section item to the portfolioSections container
            myPortfolio.appendChild(sectionItem);
          });
        }
      }); */
      
    // if it isnt then check if the task is already there 
    // and add if not


    if (sectionType === 'Case Study') {

      // Ideation

      addTask(
        'Compile your existing documentation',
        sectionName,
        sectionType,
        'Ideation',
        "Before you get started on your case study, it's a good idea to look over the material you wrote with your original work.",
        "Compile your documentation from your original work",
        "Select your favourite pieces of writing",
        "./legs.png",
        1,
        "Communication",
        2,
        "Time Management",
        2,
        20,
      )

      addTask(
        'Compile your best images',
        sectionName,
        sectionType,
        'Ideation',
        "Now let's think about the visuals. Go through your work and choose the most eyecatching and interesting parts.",
        "Choose your best visual material from your original work",
        "Select the most important visuals from your original work",
        "./legs.png",
        1,
        "Visual Design",
        2,
        "Communication",
        1,
        10,
      )

      addTask(
        'Look over the feedback you originally received',
        sectionName,
        sectionType,
        'Ideation',
        "Nice work! now let's go over the feedback you recieved for your work.",
        "Review the original feedback for your case study.",
        "Find examples of work that contributed to iterations",
        "./legs.png",
        1,
        "Communication",
        1,
        "",
        0,
        10,
      )

      // Drafting

      addTask(
        'Draft case study overview.',
        sectionName,
        sectionType,
        'Drafting',
        "Write a brief draft overview for your case study. Just a few sentences is fine at this stage!",
        "Describe the core premise of your project.",
        "Describe your role in your team",
        "./legs.png",
        2,
        "Communication",
        1,
        "Teamwork",
        1,
        15,
      )

      addTask(
        'Draft research overview.',
        sectionName,
        sectionType,
        'Drafting',
        "Write a brief draft overview for your initial research.",
        "Describe your research approach.",
        "Outline your research methods.",
        "./legs.png",
        2,
        "Communication",
        1,
        15,
      )
      
      addTask(
        'Draft ideation overview.',
        sectionName,
        sectionType,
        'Drafting',
        "Write a brief draft overview for your ideation process.",
        "Describe your ideation methods.",
        "Outline your role in ideation.",
        "./legs.png",
        2,
        "Problem Solving",
        1,
        "Teamwork",
        1,
        15,
      )
      
      addTask(
        'Describe your first solution.',
        sectionName,
        sectionType,
        'Drafting',
        "Describe your first solution for your product.",
        "Outline initial key features.",
        "Compare with other solutions that weren't chosen.",
        "./legs.png",
        3,
        "Problem Solving",
        1,
        "Teamwork",
        1,
        15,
      )

      addTask(
        'Outline initial design process.',
        sectionName,
        sectionType,
        'Drafting',
        "Summarise your initial design process, where you decided on the basic flow of your design.",
        "Compile the best sketches.",
        "Outline your role in sketching.",
        "./legs.png",
        2,
        "Visual Design",
        2,
        "Problem Solving",
        1,
        20,
      )

      addTask(
        'Summarise Low-Fidelity Iterations.',
        sectionName,
        sectionType,
        'Drafting',
        "Talk about how you developed your sketches into your first wireframes.",
        "Summarise key iterations.",
        "Outline your role in wireframing.",
        "./legs.png",
        2,
        "Visual Design",
        2,
        "Teamwork",
        1,
        15,
      )

      addTask(
        'Describe your first prototype.',
        sectionName,
        sectionType,
        'Drafting',
        "Describe how you made your first prototype.",
        "Outline your goals in prototyping.",
        "Outline your initial testing results.",
        "./legs.png",
        2,
        "Problem Solving",
        1,
        "Visual Design",
        1,
        15,
      )

      addTask(
        'Summarise Mid-Fidelity Iterations.',
        sectionName,
        sectionType,
        'Drafting',
        "Talk about how you iterated to Mid-Fidelity mockups.",
        "Summarise key iterations from prototyping.",
        "Outline your role in creating mockups.",
        "./legs.png",
        2,
        "Visual Design",
        2,
        "Teamwork",
        1,
        20,
      )
      
      addTask(
        'Summarise High-Fidelity Iterations.',
        sectionName,
        sectionType,
        'Drafting',
        "Talk about how you iterated from your Mid-Fidelity mockups into your final High-Fidelity designs.",
        "Summarise key iterations from Mid-Fidelity mockups.",
        "Outline your role in High-Fidelity mockups.",
        "./legs.png",
        2,
        "Visual Design",
        2,
        "Teamwork",
        1,
        20,
      )
      
      addTask(
        'Describe your final prototype.',
        sectionName,
        sectionType,
        'Drafting',
        "Describe how you made your final prototype.",
        "Summarise major iterations from first prototypes.",
        "Outline changes from High-Fidelity mockups.",
        "./legs.png",
        3,
        "Visual Design",
        2,
        "Problem Solving",
        1,
        25,
      )
      
      addTask(
        'Write a draft conclusion.',
        sectionName,
        sectionType,
        'Drafting',
        "Great work! almost there now. Just write a draft conclusion for your case study.",
        "Reflect on your final prototype, and how your team worked together.",
        "Outline changes that could be made to future iterations.",
        "./legs.png",
        3,
        "Problem solving",
        2,
        "Teamwork",
        1,
        15,
      )
      
      addTask(
        'Consider the visual design of your case study.',
        sectionName,
        sectionType,
        'Drafting',
        "Nice one! now it's time for you to start thinking about how you will present this visually in your portfolio. Remember, this is design too!",
        "Consider a basic visual design for your case study and what elements you want to emphasise.",
        "Prepare some initial sketches for the layout of your case study.",
        "./legs.png",
        1,
        "Visual Design",
        3,
        30,
      )

      // Finalisation

      
      addTask(
        'Finalise case study overview.',
        sectionName,
        sectionType,
        'Finalisation',
        "Now its time to go over your drafted case study and write a more final iteration!",
        "Refine draft overview of your case study to a final iteration.",
        "Consider a shorter version you can deliver in an interview if necessary",
        "./legs.png",
        2,
        "Communication",
        1,
        "Teamwork",
        1,
        25,
      )

      addTask(
        'Finalise research overview.',
        sectionName,
        sectionType,
        'Finalisation',
        "Turn your drafted research overview into a final iteraton.",
        "Finalise your research overview.",
        "Prepare a brief summary of your methods for interviews.",
        "./legs.png",
        2,
        "Communication",
        1,
        "Problem Solving",
        1,
        25,
      )
      
      addTask(
        'Finalise ideation overview.',
        sectionName,
        sectionType,
        'Finalisation',
        "Finalise your drafted overview of your ideation methods.",
        "Finalise ideation overview",
        "Choose an ideation method to focus on that contributed the most to your first solution.",
        "./legs.png",
        3,
        "Problem Solving",
        1,
        "Teamwork",
        1,
        25,
      )
      
      addTask(
        'Finalise first solution.',
        sectionName,
        sectionType,
        'Finalisation',
        "Finalise your drafted summary of first solution for your product.",
        "Finalise first solution summary.",
        "Consider how to talk about your solution compared to other options.",
        "./legs.png",
        3,
        "Problem Solving",
        1,
        "Teamwork",
        1,
        25,
      )

      addTask(
        'Finalise summary of initial design process.',
        sectionName,
        sectionType,
        'Finalisation',
        "Finalise your summary of your initial design process.",
        "Write a final description of your sketching process.",
        "Choose a final set of sketches to show.",
        "./legs.png",
        3,
        "Visual Design",
        2,
        "Problem Solving",
        1,
        25,
      )

      addTask(
        'Finalise summary of Low-Fidelity Iterations.',
        sectionName,
        sectionType,
        'Finalisation',
        "Finalise your draft summary of the wireframing process.",
        "Write a final description of your wireframing process.",
        "Choose a final set of wireframes to show.",
        "./legs.png",
        3,
        "Visual Design",
        2,
        "Teamwork",
        1,
        25,
      )

      addTask(
        'Finalise description of first prototype.',
        sectionName,
        sectionType,
        'Finalisation',
        "Finalise your draft description of your first prototype.",
        "Finalise summary of prototyping.",
        "Choose key insights from the prototyping process.",
        "./legs.png",
        3,
        "Problem Solving",
        1,
        25,
      )

      addTask(
        'Finalise description of Mid-Fidelity Iterations.',
        sectionName,
        sectionType,
        'Finalisation',
        "Finalise your draft description of your Mid-Fidelity mockups.",
        "Finalise summary of mockup creation.",
        "Choose Mid-Fidelity mockups to show in your portfolios.",
        "./legs.png",
        3,
        "Visual Design",
        2,
        "Teamwork",
        1,
        25,
      )
      
      addTask(
        'Finalise description of High-Fidelity Iterations.',
        sectionName,
        sectionType,
        'Finalisation',
        "Finalise your draft description of your High-Fidelity mockups.",
        "Finalise summary of mockup creation.",
        "Choose High-Fidelity mockups to show in your portfolios.",
        "./legs.png",
        3,
        "Visual Design",
        2,
        "Teamwork",
        1,
        25,
      )
      
      addTask(
        'Finalise description of your final prototype.',
        sectionName,
        sectionType,
        'Drafting',
        "Finalise your draft description of your final prototype.",
        "Finalise summary of prototyping concept.",
        "Choose key insights from final prototype for interview.",
        "./legs.png",
        3,
        "Visual Design",
        2,
        "Problem Solving",
        1,
        25,
      )
      
      addTask(
        'Write a Final conclusion.',
        sectionName,
        sectionType,
        'Finalisation',
        "Wowee! that's so much finalisation you've just done. Almost there. Finalise your draft conclusion for your case study and you're done writing!.",
        "Finalise draft conclusion.",
        "Prepare concluding remarks for interview.",
        "./legs.png",
        4,
        "Problem solving",
        2,
        "Teamwork",
        1,
        20,
      )

      addTask(
        'Prepare final visual design.',
        sectionName,
        sectionType,
        'Finalisation',
        "Great work! Now that you've got all the writing ready, it's time for you to finalise the visual presentation.",
        "Finalise layout of case study.",
        "Prepare a 'Hero' Image for your case study.",
        "./legs.png",
        4,
        "Visual Design",
        4,
        "Communication",
        1,
        30
      )

      // INTERVIEW PREP

      addTask(
        'Prepare alternative case study versions.',
        sectionName,
        sectionType,
        'Interview',
        "Now that you've prepared your case study, it's a good idea to think about how you'll present it in an interview, where you might need to talk about some aspects in very exacting detail while quickly summarising others. You've already done this a bit, but it's good to do another pass.",
        "Think of a high-level summary of your piece that you can deliver if you are pressed for time.",
        "Prepare a quick overview of your role in the team.",
        "./legs.png",
        2,
        "Communication",
        4,
        "Visual Design",
        2,
        30,
      )

    } if (sectionType === 'About Me') {

      // IDEATION

      addTask(
        'Compile your past designer statements',
        sectionName,
        sectionType,
        'Ideation',
        "Talkling about yourself can be scary, but you've probably had to do it before. Find past examples of times when you've described yourself as a designer and your design process.",
        "Compile previous designer and personal statements",
        "Think about your strengths as a designer",
        "./legs.png",
        1,
        "Communication",
        2,
        "Time Management",
        1,
        15,
      )

      addTask(
        'Make a personal moodboard',
        sectionName,
        sectionType,
        'Ideation',
        "What inspires you as a designer? choose images of designs by yourself and other people",
        "Compile images of your favourite designs",
        "Think about why you enjoy your favourite designers",
        "./legs.png",
        1,
        "Visual design",
        1,
        "Communication",
        2,
        30,
      )

      // Drafting

      addTask(
        'Draft About me page',
        sectionName,
        sectionType,
        'Drafting',
        "Take your moodboard and past statements and use them to draft your About Me page",
        "Draft About Me page",
        "",
        "./legs.png",
        2,
        "Communication",
        2,
        "Time Management",
        1,
        20,

      )

      // Finalisation

      addTask(
        'Finalise About me page',
        sectionName,
        sectionType,
        'Finalisation',
        "Finalise your drafted About me page",
        "Finalise about me page from drafts",
        "Prepare a brief summary for interviews",
        "./legs.png",
        2,
        "Communication",
        2,
        "Problem Solving",
        1,
        30,
      )
      
      addTask(
        'Finalise visual design for About Me page',
        sectionName,
        sectionType,
        'Finalisation',
        "Design the visuals for your about me page. You should have a pretty good idea of how you want your portfolio to look at this point, but it might be a good idea to go back to that first moodboard you made.",
        "Finalise visual design for About me page",
        "Refer to past moodboard",
        "./legs.png",
        2,
        "Visual Design",
        2,
        "Time Management",
        1,
        30,
      )
    } if (sectionType === 'Index/Landing') {
      // Ideation
      
      addTask(
        'Prepare a moodboard for your index/landing page',
        sectionName,
        sectionType,
        'Ideation',
        "An index/landing page can be crucial for tying all of the different parts of your portfolio together, and to sell yourself as a designer. Before you get going, take a few moments to review some examples and other material to help inform the approach you'd like to take.",
        "Find example portfolio index/landing pages, as well as other designed material that inspires you.",
        "Combine materials into a moodboard.",
        "./legs.png",
        1,
        "Visual Design",
        2,
        "Communication",
        1,
        30,
      )

      // Drafting

            
      addTask(
        'Create a draft layout for your index/landing page',
        sectionName,
        sectionType,
        'Drafting',
        "Take the moodboard you made earlier and create a draft layout for your index/landing page.",
        "Create a draft layout for your index/landing pages.",
        "Consider alternate layouts for different screen sizes, if necessary.",
        "./legs.png",
        1,
        "Visual Design",
        2,
        "Communication",
        1,
        30,
      )

      // Finalisation

                  
      addTask(
        'Finalise your index/landing page',
        sectionName,
        sectionType,
        'Finalisation',
        "Finalise your drafted index/landing page.",
        "Create the final layout for your index/landing pages.",
        "Create alternate layouts for different screen sizes, if necessary.",
        "./legs.png",
        2,
        "Visual Design",
        2,
        "Communication",
        1,
        30,
      )
    } if (sectionType === 'Resume') {

      // Ideation

                  
      addTask(
        'Prepare initial resume',
        sectionName,
        sectionType,
        'Ideation',
        "Hiring managers love it when your resume ties into the design and content of your portfolio. Trust us! For now, let's just make a draft version.",
        "Write a rough draft of your resume.",
        "Consider alternate versions that convey different skills",
        "./legs.png",
        1,
        "Communication",
        1,
        "Time Management",
        1,
        30,
      )

      // Finalisation

                  
      addTask(
        'Finalise resume',
        sectionName,
        sectionType,
        'Finalisation',
        "Now that you've done all that other stuff, lets go back to that resume you drafted before! Try to make it match the design you've landed on for the rest of your portfolio.",
        "Create a final resume layout.",
        "Prepare alternate resumes for different roles, if necessary.",
        "./legs.png",
        2,
        "Visual Design",
        2,
        "Communication",
        1,
        30,
      )

    }

}

// The function for adding tasks, which is also very simple but has quite a lot of attributes. Adapted from my advanced web dev function for adding tasks to a list
// Because I forgot how to do it

function addTask(taskName, taskSection, taskSectionType, taskStage, taskDescription, taskMainTask, taskSubTask, taskImage, taskDifficulty, taskStatsReward1, taskStatsReward1Percentage, taskStatsReward2, taskStatsReward2Percentage, taskCompletionTime) {
    
  

  // Creating the object, directly passing in the input parameters. 
  // This is kept the same from the first time its introduced in the tutorial.
  let task = {
    taskName,
    taskSection,
    taskSectionType,
    taskStage, 
    taskDescription,
    taskMainTask,
    taskSubTask,
    taskImage,
    taskDifficulty,
    // these next four would control which attributes are increased when the user completes a text
    taskStatsReward1,
    taskStatsReward1Percentage,
    taskStatsReward2,
    taskStatsReward2Percentage,
    taskCompletionTime,
    id: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
    // Previously in advanced web dev it was fine to just use the current time to make task IDs. However right now I'm trying to make more than a hundred of these at once, so chatgpt suggested adding some randomness to it to ensure uniqueness.
    date: new Date().toISOString(),
    complete: 0,
 }

  //first check localstorage to see if an item exists
    //fetching and parsing the localstorage value

    let localTasks = JSON.parse(localStorage.getItem('tasks'));


  //then place the value into a JS data structure 
  //then check to see if its a null value (if localstorage is empty). If it is then add task. 

    if (localTasks == null) {

      localTasks = [task];        
    } else {
      //check for existing task. in this case using the ID bc u could have multiple tasks with the same name
      if (localTasks.find(element => element.id === task.id)){
        console.log('Task ID already exists.');
      } else {
        //if theres no existing task then push the element to the array. this is a temporary array instead of the global one at the top
        localTasks.push(task); 
      }
    }

    //set the new item into localstorage
    localStorage.setItem('tasks', JSON.stringify(localTasks));

  // if it isnt then check if the task is already there 
  // and add if not

}

// The function for completing tasks, which just changes a single attribute from 0 to 1 so they can be removed from the list and chosen task and moved to the
// appropriate div in the modal

function completeTask(taskId) {
  // Fetch tasks from local storage
  let localTasks = JSON.parse(localStorage.getItem('tasks'));

  // Check if there are any tasks in local storage
  if (!localTasks || localTasks.length === 0) {
    console.log("No tasks available to complete.");
    return;
  }

  // Find the task with the specified ID
  let task = taskId ? localTasks.find(t => t.id.toString() === taskId.toString()) : localTasks[0];
  
  // If the task is found, mark it as complete
  if (task) {
    task.complete = 1;

    // Save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(localTasks));

    console.log(`Task "${task.taskName}" with ID ${task.id} marked as complete.`);
  } else {
    console.log(`Task with ID ${taskId} not found.`);
  }

  displayTasks();
  displayChosenTask();
  displayChosenTaskModal();
  displayMapDots();

  taskCompletionExpandModal.classList.remove("active");
  modalBackground.classList.remove("active");

}

// the functions for navigating through the list and scrolling

// this first one is used to control the chosentask

function openTask(id) {
  // Find the task element using data-id
  var alreadyOpenTask = document.querySelector(".listTaskOpen");
  var alreadyOpenTaskMarker = document.querySelector(".mapDotCurrent");


  // Find the task element by its data-id
  var taskDot = document.querySelector(`[data-id="${id}"].mapDot`);

  var task = document.querySelector(`[data-id="${id}"].listTask`);


  // Reference to the scrollable container (replace with your actual div's ID or class)
  var scrollContainer = document.querySelector(".taskList");

  // Check if the scrollContainer and task element exist
  if (scrollContainer && task) {

      // Toggle the class for the task
      if (task.classList.contains("listTask")) {
          task.classList.remove("listTask");
          task.classList.add("listTaskOpen");

          displayChosenTask(id);
          displayChosenTaskModal(id);
          // Close any already open tasks
          if (alreadyOpenTask) {
              alreadyOpenTask.classList.remove("listTaskOpen");
              alreadyOpenTask.classList.add("listTask");
          }


          // Calculate the task's position relative to the container
          const taskPosition = task.offsetTop - scrollContainer.offsetTop;

          // Set the scroll position with a 10px offset
          scrollContainer.scrollTo({
              top: taskPosition - 8, // Subtract 10 for the offset
              behavior: "smooth" // Smooth scrolling
          });

      } else {
          task.classList.remove("listTaskOpen");
          task.classList.add("listTask");
      }
  } else {
      if (!scrollContainer) {
          console.error("Scrollable container not found");
      }
      if (!task) {
          console.error("Task element not found for id:", id);
      }
  }
}

function openGroup(id) {
  // Find the task element using data-id
  var alreadyOpenTask = document.querySelector(".listTaskOpen");

  // Find the task element by its data-id
  var task = document.querySelector(`[data-id="${id}"]`);

  // Reference to the scrollable container (replace with your actual div's ID or class)
  var scrollContainer = document.querySelector(".taskList");

  // Check if the scrollContainer and task element exist
  if (scrollContainer && task) {
      // Toggle the class for the task
      if (task.classList.contains("listTask")) {
          task.classList.remove("listTask");
          task.classList.add("listTaskOpen");

          // Close any already open tasks
          if (alreadyOpenTask) {
              alreadyOpenTask.classList.remove("listTaskOpen");
              alreadyOpenTask.classList.add("listTask");
          }

          // Calculate the task's position relative to the container
          const taskPosition = task.offsetTop - scrollContainer.offsetTop;

          // Set the scroll position with a 10px offset
          scrollContainer.scrollTo({
              top: taskPosition - 8, // Subtract 10 for the offset
              behavior: "smooth" // Smooth scrolling
          });

      } else {
          task.classList.remove("listTaskOpen");
          task.classList.add("listTask");
      }
  } else {
      if (!scrollContainer) {
          console.error("Scrollable container not found");
      }
      if (!task) {
          console.error("Task element not found for id:", id);
      }
  }
}


function expandHeader(stage) { 
 // Find any already open group
  let expandedGroups = document.querySelector(".taskItemsActive");
  let expandedButtons = document.querySelector(".taskHeaderExpandActive");

  // Find the element by ID
  let group = document.getElementById(stage);
  let button = document.getElementById(stage + "Button");

  let scrollContainer = document.querySelector(".taskList"); // Replace with your scrollable container

  if (group.classList.contains("taskItemsActive")) {
      // Close the active group if it's already open
      group.classList.remove("taskItemsActive");
      button.classList.remove("taskHeaderExpandActive");
  } else {
      // Open the selected group and close any others
      group.classList.add("taskItemsActive");
      button.classList.add("taskHeaderExpandActive");


      // Close any already open groups
      if (expandedGroups) {
          expandedGroups.classList.remove("taskItemsActive");
          expandedButtons.classList.remove("taskHeaderExpandActive")
      }

      // Scroll to the selected group
      if (scrollContainer && group) {
          const groupPosition = group.offsetTop - scrollContainer.offsetTop;

          scrollContainer.scrollTo({
              top: groupPosition - 72,
              behavior: "smooth"
          });
      }
  }
}

// task completion





modalBackground.onclick = () => {
    taskExpandModal.classList.remove("active");
    guidesExpandModal.classList.remove("active");
    statsExpandModal.classList.remove("active");
    modalBackground.classList.remove("active");
    portfolioExpandModal.classList.remove("active");
    taskCompletionExpandModal.classList.remove("active");
};

// task modal
taskExpandButton.onclick = () => {
    taskExpandModal.classList.add("active");
    modalBackground.classList.add("active");
};

taskExpandModalClose.onclick = () => {
    taskExpandModal.classList.remove("active");
    modalBackground.classList.remove("active");
};

// task completion modal

function openTaskCompletionModal() {
  taskCompletionExpandModal.classList.add("active");
  modalBackground.classList.add("active");
  console.log("hey!")
};

taskCompletionExpandModalClose.onclick = () => {
  taskCompletionExpandModal.classList.remove("active");
  modalBackground.classList.remove("active");
};

// guides modal
guidesExpandButton.onclick = () => {
    guidesExpandModal.classList.add("active");
    modalBackground.classList.add("active");
};

guidesExpandModalClose.onclick = () => {
    guidesExpandModal.classList.remove("active");
    modalBackground.classList.remove("active");
};


// stats modal
statsExpandButton.onclick = () => {
  statsExpandModal.classList.add("active");
  modalBackground.classList.add("active");
};

statsExpandModalClose.onclick = () => {
  statsExpandModal.classList.remove("active");
  modalBackground.classList.remove("active");
};

// my portfolio Modal

portfolioExpandButton.onclick = () => {
  portfolioExpandModal.classList.add("active");
  modalBackground.classList.add("active");
};

portfolioExpandModalClose.onclick = () => {
  portfolioExpandModal.classList.remove("active");
  modalBackground.classList.remove("active");
};



function move() {
  var elem = document.getElementById("stat1Bar");
  var width = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
      document.getElementById("number1").innerHTML = width * 1  + '%';
    }
  }
}

// slideshow

let currentSlideIndex = 0;
let currentSlideCategoryId = "Ideation";

function augmentSlide(num) {
    setSlide(currentSlideIndex + num);
}

function setSlide(num) {
    let slideCategory = document.getElementById("slideshow" + currentSlideCategoryId);
    let slides = slideCategory.getElementsByClassName("slideshowItem");
    let dots = document.getElementsByClassName("slideshowDot");

    slides[currentSlideIndex].classList.remove("slideshowItemActive");
    dots[currentSlideIndex].classList.remove("slideshowDotActive");

    currentSlideIndex = (num + dots.length) % dots.length;
    slides[currentSlideIndex].classList.add("slideshowItemActive");
    dots[currentSlideIndex].classList.add("slideshowDotActive");

}

function setSlideCategory(id) {
    let slideCategory = document.getElementById("slideshow" + currentSlideCategoryId);
    slideCategory.classList.remove("slideshowCategoryActive");

    currentSlideCategoryId = id;
    slideCategory = document.getElementById("slideshow" + currentSlideCategoryId);
    slideCategory.classList.add("slideshowCategoryActive");
    let slides = slideCategory.getElementsByClassName("slideshowItem");
    let dots = document.getElementById("slideshowDots");

    let newDots = [];
    for (let i = 0; i < slides.length; i++) {
        const button = document.createElement("button");
        button.classList.add("slideshowDot");
        button.onclick = () => setSlide(i);
        newDots.push(button);
    }
    dots.replaceChildren(...newDots);
    setSlide(0);
}

setSlideCategory("Ideation");

localStorage.clear();

// Placeholder sections. Comment these back in if you want to fill the page up in a pinch

addSection('CoolProduct','Case Study',10);
addSection('FunCube','Case Study',20);
addSection('SmartClog','Case Study',50);
addSection('Main Resume','Resume',60);
addSection('Website Landing','Index/Landing',69);
addSection('My Design Philosophy','About Me',90);



displayTasks();
displayChosenTask(0);
displayChosenTaskModal(0);
displaySectionWidget();
expandHeader("taskItemsIdeation");
displaySectionModal();
displayMapDots();

