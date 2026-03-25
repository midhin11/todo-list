//index.js

import "./styles.css";
import { Task } from "./JS/task-class.js"
;
import { tasks } from "./JS/all-tasks.js";
import { renderTasks } from "./JS/render-tasks.js";


let addTask = document.querySelectorAll(".add-task");
let modal = document.querySelector("#modal");   
let inputDialog = document.querySelector(".input-dialog");

//Task input modal pop-up

modal.addEventListener("click", function(){
    modal.classList.add("hidden");
})
inputDialog.addEventListener("click", function(e){
    e.stopPropagation();
})

// Delete task

let container = document.querySelector(".main-content");
container.addEventListener("click", function(e){
    let deleteBtn = e.target.closest(".delete-task");
    if(!deleteBtn) return;

    let card = deleteBtn.closest(".task-card");
    // let index = card.getAttribute("data-index");
    // tasks.splice(index, 1);

    let id = card.dataset.id;
    let index = tasks.findIndex(task => task.id === id);
    if(index !== -1){
        tasks.splice(index, 1);
    }

    renderTasks(tasks, mainHeader.textContent);
})

//Add task

addTask.forEach(btn => {
    btn.addEventListener("click", function(){
        modal.classList.remove("hidden");
    })
})

// Submit Btn in Input Dialog

let submit = document.querySelector(".submit-btn");
submit.addEventListener("click", function(){
    let taskNameInput = document.querySelector(`input[type="text"]`);
    let taskName = taskNameInput.value;

    let taskDescInput = document.querySelector("textarea");
    let taskDesc = taskDescInput.value;

    let taskDueDateInput = document.querySelector(`input[type="datetime-local"]`);
    let taskDueDateUnformatted = taskDueDateInput.value;
    let taskDueDate = taskDueDateUnformatted;
    // let taskDueDate = new Date(taskDueDateUnformatted).toLocaleString("en-IN", {
    //     day: "2-digit",
    //     month: "short",
    //     year: "2-digit",
    //     hour: "2-digit",
    //     minute: "2-digit"
    // })

    let taskPriorityInput = document.querySelector("select");
    let taskPriority = taskPriorityInput.value;

    let newTask = new Task(taskName, taskDesc, taskDueDateUnformatted, taskPriority);

    tasks.push(newTask);
    renderTasks(tasks, mainHeader.textContent); 
    modal.classList.add("hidden");
    // taskNameInput.value = "";
    // taskDescInput.value = "";
    // taskDueDateInput.value = "";
    // taskPriorityInput.value = "";
}) 

// Cancel Btn in Input Dialog

let cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener("click", function() {
    modal.classList.add("hidden");

    let taskNameInput = document.querySelector(`input[type="text"]`);
    let taskDescInput = document.querySelector("textarea");
    let taskDueDateInput = document.querySelector(`input[type="datetime-local"]`);
    let taskPriorityInput = document.querySelector("select");
    taskNameInput.value = "Research articles on food blog";
    taskDescInput.value = "Lorem ipsum dolor sit amet consectetur, adipisicing elit.";
    taskDueDateInput.value = "2025-06-01T08:30";
    taskPriorityInput.value = "Low";
})


// Sidebar by date Btns 

let byDateBtns = document.querySelector(".by-date");
let mainHeader = document.querySelector(".type");
mainHeader.textContent = "All"
byDateBtns.addEventListener("click", function(e){
    let validTypeBtns = e.target.closest(".by-date-type");
    if(!validTypeBtns) return;
    mainHeader.textContent = validTypeBtns.querySelector("div").textContent;
    renderTasks(tasks, mainHeader.textContent);
})

