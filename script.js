const myTasksSection = document.querySelector(".myTasks");
const userStatsSection = document.querySelector(".userStats");
const openListSection = document.querySelector(".openList");
const chosenTask = document.querySelector(".chosenTask");
const roadMap = document.querySelector(".roadMap");

const task = document.getElementById("1");

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


function openTask(){
        // Toggle the class for myTasks section
        if (task.classList.contains("listTask")) {
            task.classList.remove("listTask");
            task.classList.add("listTaskOpen");

        } else {
            task.classList.remove("listTaskOpen");
            task.classList.add("listTask");
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