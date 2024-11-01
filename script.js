const myTasksSection = document.querySelector(".myTasks");
const userStatsSection = document.querySelector(".userStats");
const openListSection = document.querySelector(".openList");
const chosenTask = document.querySelector(".chosenTask");
const roadMap = document.querySelector(".roadMap");

const taskItems = document.querySelector(".taskItems");

const taskExpandButton = document.querySelector(".taskExpandButton");
const taskExpandModal = document.querySelector(".taskExpandModal");
const taskExpandModalClose = document.querySelector(".taskModalClose");

const guidesExpandButton = document.querySelector(".guidesExpandButton");
const guidesExpandModal = document.querySelector(".guidesExpandModal");
const guidesExpandModalClose = document.querySelector(".guidesModalClose");

const statsExpandButton = document.querySelector(".statsExpandButton");
const statsExpandModal = document.querySelector(".statsExpandModal");
const statsExpandModalClose = document.querySelector(".statsModalClose");

const portfolioExpandButton = document.querySelector(".portfolioModalOpenButton");
const portfolioExpandModal = document.querySelector(".portfolioExpandModal");
const portfolioExpandModalClose = document.querySelector(".portfolioModalClose");


const modalBackground = document.querySelector(".modalBackground");


// const task = document.getElementById("1");
//all thats missing from opening tasks from the list here atm is a reference to the 
// i'ds that are generated when a new task is added

var mapCanvas = document.getElementById("map");

// IF anyone need to use the canvas function just bring it back
// var ctx = mapCanvas.getContext("2d");



// just giving the one task you can open an ID but this would be programatically generated
// a la advanced web dev

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

// heres my unused advanced web dev function that just needs to be updated to instead
// drop all that shit in the expanded task from the list :)
function openfilmModal(taskId) {


  // Opening the tasks from local storage
  let localTasks = JSON.parse(localStorage.getItem('tasks'));

  // searching our tasks for the correct ID, if nothing is found, it returns -1
  let selectedTaskIndex = localTasks.findIndex(task => task.id === taskId);

  if (selectedTaskIndex !== -1) { //so lets check if it hasn't returned -1.
    const selectedTask = localTasks[selectedTaskIndex]; //if it's all good, then let's make a selectedtask object that we will build this modal from!

  // Populating the modal with the attributes of the selected film
  const filmDetails = document.getElementById("filmDetails");

  // EXPERIMENTAL POTENTIALLY FUCKED CONTENT

  // Constructing a string which will then be fed into the innerhtml at the end
  let entryContent = `<div class ="entry-row"><div class ="entry-label"><em>Title:</em></div><div class ="entry-text"><strong>${selectedTask.filmName}</strong></div></div>`;

  //each form element is checked with an if statement so it can be omitted if it wasn't submitted
  //since there is always at least one genre submitted, we will instead check if the second string in the array was left blank and omit the comma if it is
  
  if (selectedTask.filmGenre.length > 0) {
    entryContent += `<div class ="entry-row"><div class ="entry-label">Genre:</div><div class ="entry-text"> ${selectedTask.filmGenre[0]}`;
    
    if (selectedTask.filmGenre[1] !== "") {
      entryContent += `, ${selectedTask.filmGenre[1]}`;
    }
    
    entryContent += `</div></div>`;
  }
  
  if (selectedTask.filmRelease) {
    entryContent += `<div class ="entry-row"><div class ="entry-label">Release Date:</div><div class ="entry-text"> ${selectedTask.filmRelease}</div></div>`;
  }
  
  if (selectedTask.filmDirector) {
    entryContent += `<div class ="entry-row"><div class ="entry-label">Director:</div><div class ="entry-text"> ${selectedTask.filmDirector}</div></div>`;
  }
  
  //since the filmCast is supposed to be an entry with three arrays, we will instead check if the filmCast array only has a blank string as an entry
  if (selectedTask.filmCast[0] !== "") {
    //slicing the 'cast' array to omit entries past the third, for cleanliness
    const cast = selectedTask.filmCast.slice(0, 3).join(", ");
    entryContent += `<div class ="entry-row"><div class ="entry-label">Cast:</div><div class ="entry-text"> ${cast}</div></div>`;
  }
  
  if (selectedTask.filmOriginalTitle) {
    entryContent += `<div class ="entry-row"><div class ="entry-label">Original Title:</div><div class ="entry-text"> ${selectedTask.filmOriginalTitle}</div></div>`;
  }
  
  let taskrating = null;
      switch (selectedTask.filmRating) {
        case '1':
          taskrating = icons['blankhalf']
          break;
        case '2':
          taskrating = icons['blank1']
          break;
        case '3':
          taskrating = icons['blank1half']
          break;
        case '4':
          taskrating = icons['blank2']
          break;
        case '5':
          taskrating = icons['blank2half']
          break;
        case '6':
          taskrating = icons['blank3']
          break;
        case '7':
          taskrating = icons['blank3half']
          break;
        case '8':
          taskrating = icons['blank4']
          break;
        case '9':
          taskrating = icons['blank4half']
          break;
        case '10':
          taskrating = icons['blank5']
          break;
          default:
          break;
      }


  // if (selectedTask.filmRating) {
  //   entryContent += `<div class ="entry-row"><em class ="entry-label">Rating:</em><div class ="entry-text"> ${selectedTask.filmRating}</div></div>`;
  // }

  if (selectedTask.filmRating) {
    entryContent += `<div class ="entry-row"><em class ="entry-label">Rating:</em><div class ="entry-text"> <img src ="${taskrating}.png"></div></div>`;
  }

  // NON FUCKED JS

  // // Constructing a string which will then be fed into the innerhtml at the end
  // let entryContent = `<div class ="entry-row"><em class ="entry-label">Title:</em>${selectedTask.filmName}</div>`;

  // //each form element is checked with an if statement so it can be omitted if it wasn't submitted
  // //since there is always at least one genre submitted, we will instead check if the second string in the array was left blank and omit the comma if it is
  
  // if (selectedTask.filmGenre.length > 0) {
  //   entryContent += `<div class ="entry-row"><em class ="entry-label">Genre:</em> ${selectedTask.filmGenre[0]}`;
    
  //   if (selectedTask.filmGenre[1] !== "") {
  //     entryContent += `, ${selectedTask.filmGenre[1]}`;
  //   }
    
  //   entryContent += `</div>`;
  // }
  
  // if (selectedTask.filmRelease) {
  //   entryContent += `<div class ="entry-row"><em class ="entry-label">Release Date:</em> ${selectedTask.filmRelease}</div>`;
  // }
  
  // if (selectedTask.filmDirector) {
  //   entryContent += `<div class ="entry-row"><em class ="entry-label">Director:</em> ${selectedTask.filmDirector}</div>`;
  // }
  
  // //since the filmCast is supposed to be an entry with three arrays, we will instead check if the filmCast array only has a blank string as an entry
  // if (selectedTask.filmCast[0] !== "") {
  //   //slicing the 'cast' array to omit entries past the third, for cleanliness
  //   const cast = selectedTask.filmCast.slice(0, 3).join(", ");
  //   entryContent += `<div class ="entry-row"><em class ="entry-label">Cast:</em> ${cast}</div>`;
  // }
  
  // if (selectedTask.filmOriginalTitle) {
  //   entryContent += `<div class ="entry-row"><em class ="entry-label">Original Title:</em> ${selectedTask.filmOriginalTitle}</div>`;
  // }
  
  // if (selectedTask.filmRating) {
  //   entryContent += `<div class ="entry-row"><em class ="entry-label">Rating:</em> ${selectedTask.filmRating}</div>`;
  // }

  filmDetails.innerHTML = entryContent;
  
    // now let's add the delete button, adapted from the code given before 
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.appendChild(delButtonText);
    filmDetails.appendChild(delButton); // Adds a delete button to the modal

    // Listen for when the delete button is clicked
    delButton.addEventListener("click", function (event) {
      localTasks.splice(selectedTaskIndex, 1); // Remove the selected task from the localTasks array
      localStorage.setItem('tasks', JSON.stringify(localTasks)); // Update the localStorage
      filmModal.close(); // Close the modal
      displayTasks(); // Refresh the task list
    });

  filmModal.showModal();
} 
}

function openMap(){
        if (chosenTask.classList.contains("chosenTask")) {
            chosenTask.classList.remove("chosenTask");
            chosenTask.classList.add("chosenTaskHidden");
    
            roadMap.classList.remove("roadMap");
            roadMap.classList.add("roadMapOpen");
            drawMap();
    
        } else {
            chosenTask.classList.remove("chosenTaskHidden");
            chosenTask.classList.add("chosenTask");

            roadMap.classList.remove("roadMapOpen");
            roadMap.classList.add("roadMap");
            closeMap();
            }
}




// heres where all the map stuff is handled - I think you'd read all the tasks from localstorage, then run a for loop placing each task in clusters 
// according to if they're ideation/drafting/etc. 

// just whacking some bullshit on the frame atm

function drawMap(){

ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);

ctx.stroke();
}

// and u can call this one whenever u need to clean the thing off :)

function closeMap(){
ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
}

// here's my function from advanced web dev. I'm just trying to have it append the tasks to the taskList div but it's not quite ready yet
// and the language needs to be fixed. If u wanna get this to work u just need to refer to how I've named everything in the HTML :))


function displayTasks() {
    // Clear the task list before displaying
    taskItems.innerHTML = "";

    // Get tasks from localStorage
    let localTasks = JSON.parse(localStorage.getItem('tasks'));

    // Check if localTasks is not empty or null
    if (localTasks) {
        localTasks.forEach((task) => {
            // Create a task item for the DOM
            let item = document.createElement("div");
            item.className = "taskItemTask";
            item.setAttribute("data-id", task.id);
            item.innerHTML = `
                <img class="taskItemTaskImg" src="assets/working.jpg">
                <p class="taskItemTaskBoldText taskItemTaskTitle">${task.taskName}</p>
                <input type="checkbox" class="taskItemTaskTick" >
                <p class="taskItemTaskBoldText taskItemTaskTime">${task.taskCompletionTime} mins</p>
                <div class="taskItemTaskStars">${task.taskDifficulty}
                    <img class="taskItemTaskStar" src="https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png">
                </div>
                <div class="taskItemTaskExpandable">
                    <p class="taskItemTaskBoldText">${task.taskSection}</p>
                    <p class="taskItemTaskText">${task.taskDescription}</p>
                    <ul class="taskItemTaskList">
                        <li class="taskItemTaskText">${task.taskMainTask}</li>
                        <li class="taskItemTaskText">${task.taskSubTask}</li>
                    </ul>
                </div>
            `;

            // Append the task item to the list
            taskItems.appendChild(item);

            // Handle task difficulty rating and add icons if necessary
            // let taskRatingIcon = null;
            // switch (task.taskDifficulty) {
            //     case '1': taskRatingIcon = icons['half']; break;
            //     case '2': taskRatingIcon = icons['1']; break;
            //     case '3': taskRatingIcon = icons['1half']; break;
            //     case '4': taskRatingIcon = icons['2']; break;
            //     case '5': taskRatingIcon = icons['2half']; break;
            //     case '6': taskRatingIcon = icons['3']; break;
            //     case '7': taskRatingIcon = icons['3half']; break;
            //     case '8': taskRatingIcon = icons['4']; break;
            //     case '9': taskRatingIcon = icons['4half']; break;
            //     case '10': taskRatingIcon = icons['5']; break;
            //     default: break;
            // }

            // Append rating icon to the task item, if available
            // if (taskRatingIcon) {
            //     let ratingIcon = document.createElement("img");
            //     ratingIcon.src = taskRatingIcon;
            //     ratingIcon.id = "dbRating";
            //     item.appendChild(ratingIcon);
            // }

            // Optionally add genre stickers (if task.filmGenre has values)
            let genreIcon1 = task.genreImage || "";
            if (genreIcon1) {
                let genreIcon = document.createElement("img");
                genreIcon.src = genreIcon1;
                genreIcon.id = "sticker1";
                item.appendChild(genreIcon);
            }

            let genreIcon2 = task.genreImage2 || "";
            if (genreIcon2) {
                let genreIconTwo = document.createElement("img");
                genreIconTwo.src = genreIcon2;
                genreIconTwo.id = "sticker2";
                item.appendChild(genreIconTwo);
            }

            // Add click event to open the task details
            item.addEventListener("click", function () {
                openTask(task.id);
            });
        });
    }
}


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
      console.log(section);

 
    // if it isnt then check if the task is already there 
    // and add if not


    if (sectionType === 'casestudy') {

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
        3,
        "Communication",
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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
        "Communication",
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
        3,
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
        3,
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
        3,
        "Communication",
        4,
        "Visual Design",
        2,
        30,
      )

    } if (sectionType === 'aboutme') {

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
        3,
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
        3,
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
        3,
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
        3,
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
        3,
        "Visual Design",
        2,
        "Time Management",
        1,
        30,
      )
    } if (sectionType === 'index') {
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
        3,
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
        3,
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
        3,
        "Visual Design",
        2,
        "Communication",
        1,
        30,
      )
    } if (sectionType === 'resume') {

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
        3,
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
        3,
        "Visual Design",
        2,
        "Communication",
        1,
        30,
      )

    }

}

function addTask(taskName, taskSection, taskSectionType, taskStage, taskDescription, taskMainTask, taskSubTask, taskImage, taskDifficulty, taskStatsReward1, taskStatsReward1Percentage, taskStatsReward2, taskStatsReward2Percentage, taskCompletionTime) {
    
  

  // Creating the object, directly passing in the input parameters. 
  // This is kept the same from the first time its introduced in the tutorial.
  let task = {
      taskName,
      taskSection,
      taskSectionType,
      taskStage, 
      // stage as in whether its ideation or drafting or finalisation etc - maybe a number?
      taskDescription,
      taskMainTask,
      taskSubTask,
      taskImage,
      taskDifficulty,
      taskStatsReward1,
      taskStatsReward1Percentage,
      taskStatsReward2,
      taskStatsReward2Percentage,
      taskCompletionTime,
      id: Date.now(),
      date: new Date().toISOString(),
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

  // displayTasks();
  console.log(task);
}


function openTask(id) {
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


// function closeOtherTasks(){

// }

// addTask ("Draft Case Study 1", "Case Study 1", "Drafting", "Draft that shit","","3");

// function expandHeader(id) {

//   var alreadyOpenGroup = document.querySelector("taskItemsActive");

//     let element = document.getElementById(id);
//     if (element.classList.contains("taskItemsActive")) {
//         element.classList.remove("taskItemsActive");
//     } else {
//         element.classList.add("taskItemsActive");

//       //   if (alreadyOpenGroup) {
//       //     alreadyOpenGroup.classList.remove("taskItemsActive");
//       //     alreadyOpenGroup.classList.add("taskItenms");
//       // }
//     }

//     element = document.getElementById(id + "Button");
//     if (element.classList.contains("taskHeaderExpandActive")) {
//         element.classList.remove("taskHeaderExpandActive");
//     } else {
//         element.classList.add("taskHeaderExpandActive");
//     }
// }

function expandHeader(id) {
  // Find any already open group
  let expandedGroups = document.querySelector(".taskItemsActive");
  let expandedButtons = document.querySelector(".taskHeaderExpandActive");

  // Find the element by ID
  let group = document.getElementById(id);
  let button = document.getElementById(id + "Button");

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
              top: groupPosition, // Optional offset of 8px
              behavior: "smooth"
          });
      }
  }
}




modalBackground.onclick = () => {
    taskExpandModal.classList.remove("active");
    guidesExpandModal.classList.remove("active");
    statsExpandModal.classList.remove("active");
    modalBackground.classList.remove("active");
    portfolioExpandModal.classList.remove("active");
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

// // Toggle Task/Map
// function openMap() {
//   const taskWindow = document.querySelector('.taskWindow');
//   const roadMap = document.querySelector('.roadMap');
//   const toggleButton = document.querySelector('.openMap');

//   console.log(toggleButton);

//   if (taskWindow.style.display === 'block') {
//     taskWindow.style.display = 'none';
//     roadMap.style.display = 'block';
//     toggleButton.textContent = 'Task';
//   } else {
//     taskWindow.style.display = 'block';
//     roadMap.style.display = 'none';
//     toggleButton.textContent = 'Map';
//   }
// }


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

// Array of messages
const cheerfulMessages = [
  "You're doing an amazing job! Keep it up! 🌟",
  "Embrace today’s little joys—they all add up to something big! 🎉",
  "Celebrate every small victory. Each step forward is worth celebrating! 🎈",
  "The best is yet to come, and you’re right on track. Keep shining! ✨", 
  "One step at a time, and you'll reach places you never imagined!", 
  "Every tiny action counts. Keep going—you’re making progress, even if it’s , little by little! 💪",
  "You’re closer to finishing than you think. Just keep that momentum going!",
  "It’s all about small wins. One checkbox at a time—let’s get it done! ✔️"
];

// Get references to elements
const cheerfulIcon = document.getElementById('cheerfulIcon');
const cheerfulMessageContainer = document.getElementById('cheerfulMessageContainer');
const cheerfulMessageText = document.getElementById('cheerfulMessageText');
const closeCheerfulMessage = document.getElementById('closeCheerfulMessage');

// Function to show message
function showCheerfulMessage() {
  // Prevent multiple clicks
  cheerfulIcon.style.pointerEvents = 'none';

  // Get random message
  const randomIndex = Math.floor(Math.random() * cheerfulMessages.length);
  const message = cheerfulMessages[randomIndex];

  // Display message
  cheerfulMessageText.innerText = message;
  cheerfulMessageContainer.classList.add('show');
  cheerfulMessageContainer.style.display = 'block';

  // Hide after 5 seconds
  setTimeout(() => {
    cheerfulMessageContainer.style.display = 'none';
    cheerfulIcon.style.pointerEvents = 'auto';
  }, 5000);
}

// Event listeners
cheerfulIcon.addEventListener('click', showCheerfulMessage);
closeCheerfulMessage.addEventListener('click', () => {
  cheerfulMessageContainer.style.display = 'none';
  cheerfulIcon.style.pointerEvents = 'auto';
});

localStorage.clear();

addSection('CoolProduct','casestudy',10);
addSection('FunCube','casestudy',20);
addSection('SmartClog','casestudy',69);
addSection('Main Resume','resume',69);
addSection('Website Landing','index',69);
addSection('My Design Philosophy','aboutme',69);


displayTasks();