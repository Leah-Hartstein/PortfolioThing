const myTasksSection = document.querySelector(".myTasks");
const userStatsSection = document.querySelector(".userStats");
const openListSection = document.querySelector(".openList");
const chosenTask = document.querySelector(".chosenTask");
const roadMap = document.querySelector(".roadMap");

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

function openMap(){
        if (chosenTask.classList.contains("chosenTask")) {
            chosenTask.classList.remove("chosenTask");
            chosenTask.classList.add("chosenTaskHidden");
    
            roadMap.classList.remove("roadMap");
            roadMap.classList.add("roadMapOpen");
    
        } else {
            chosenTask.classList.remove("chosenTaskHidden");
            chosenTask.classList.add("chosenTask");

            roadMap.classList.remove("roadMapOpen");
            roadMap.classList.add("roadMap");
            }
}


// heres where all the map stuff is handled - I think you'd read all the tasks from localstorage, then run a for loop placing each task in clusters 
// according to if they're ideation/drafting/etc. 

var c = document.getElementById("map");
var ctx = c.getContext("2d");

// Get the canvas width and height
var canvasWidth = c.width;
var canvasHeight = c.height;

// Use percentages or ratios to position elements
var x1 = canvasWidth * 0.55;  // 50% of the width
var y1 = canvasHeight * 0.10;  // 4% of the height

var x2 = canvasWidth * 0.7;  // 30% of the width
var y2 = canvasHeight * 0.2;  // 30% of the height

// Draw the line using relative positions
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();