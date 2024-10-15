const myTasksSection = document.querySelector(".myTasks");
const userStatsSection = document.querySelector(".userStats");
const openListSection = document.querySelector(".openList");
const chosenTask = document.querySelector(".chosenTask");
const roadMap = document.querySelector(".roadMap");

const taskList = document.querySelector(".taskList");


// const task = document.getElementById("1");
//all thats missing from opening tasks from the list here atm is a reference to the 
// i'ds that are generated when a new task is added

var mapCanvas = document.getElementById("map");
var ctx = mapCanvas.getContext("2d");



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
    } else {
        myTasksSection.classList.remove("myTasksOpen");
        myTasksSection.classList.add("myTasks");

        openListSection.classList.add("openList");
        openListSection.classList.remove("closeList");

        // Show the userStats section
        userStatsSection.classList.remove("userStatsClosed");
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
  taskList.innerHTML = "";

  // Get tasks from localStorage
  let localTasks = JSON.parse(localStorage.getItem('tasks'));

  // Check if localTasks is not empty or null
  if (localTasks) {
      localTasks.forEach((task) => {
        
          // Create a task item for the DOM
          let item = document.createElement("div");
          item.className = "listTask";
          item.setAttribute("data-id", task.id);
          item.innerHTML = `
              <p id="text">
                  <strong>${task.taskName}</strong><br>
                  <em>${task.taskSection}</em>
                  <p>${task.taskDescription}</p>
                  <p>${task.taskDescription}</p>
                  <p>${task.taskDescription}</p>
                  
              </p>
          `;

          // Append the task item to the list
          taskList.appendChild(item);

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


function addTask(taskName, taskSection, taskStage, taskDescription, taskImage, taskDifficulty) {
    
  

    // Creating the object, directly passing in the input parameters. 
    // This is kept the same from the first time its introduced in the tutorial.
    let task = {
        taskName,
        taskSection,
        id: Date.now(),
        date: new Date().toISOString(),
        taskStage, 
        // stage as in whether its ideation or drafting or finalisation etc - maybe a number?
        taskDescription,
        taskImage,
        taskDifficulty,
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

    displayTasks();
}

function openTask(id) {
  // Find the task element using data-id instead of id
  var alreadyOpenTask = document.querySelector(".listTaskOpen");

  // Find the task element by its data-id
  var task = document.querySelector(`[data-id="${id}"]`);

  // Check if the task element exists to avoid the null error
  if (task) {
      // Toggle the class for the task
      if (task.classList.contains("listTask")) {
          task.classList.remove("listTask");
          task.classList.add("listTaskOpen");

          // Close any other tasks that are open
          if (alreadyOpenTask) {
              alreadyOpenTask.classList.remove("listTaskOpen");
              alreadyOpenTask.classList.add("listTask");
          }

          // Scroll to the newly opened task
          task.scrollIntoView({
              behavior: "smooth", // Smooth scrolling animation
              block: "start",    // Scroll the task to the center of the viewport
          });

      } else {
          task.classList.remove("listTaskOpen");
          task.classList.add("listTask");
      }
  } else {
      console.error("Task element not found for id:", id);
  }
}


// function closeOtherTasks(){

// }

addTask ("Draft Case Study 1", "Case Study 1", "Drafting", "Draft that shit","","3");

