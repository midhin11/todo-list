import "./styles.css";

export let addTask = document.querySelectorAll(".add-task");
let modal = document.querySelector("#modal");
let inputDialog = document.querySelector(".input-dialog");
let tasks = [];

//Task input modal pop-up

modal.addEventListener("click", function(){
    modal.classList.add("hidden");
})
inputDialog.addEventListener("click", function(e){
    e.stopPropagation();
})


let deleteTask = document.querySelectorAll(".delete-task");
deleteTask.forEach(btn => {
    btn.addEventListener("click", function(e){
        e.target.closest(".task-card").remove();
    })
})


//Add task
class Task{
    constructor(title, desc, dueDate, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

addTask.forEach(btn => {
    btn.addEventListener("click", function(){
        modal.classList.remove("hidden");
    })
})

let submit = document.querySelector(".submit-btn");
submit.addEventListener("click", function(){
    let taskNameInput = document.querySelector(`input[type="text"]`);
    let taskName = taskNameInput.value;

    let taskDescInput = document.querySelector("textarea");
    let taskDesc = taskDescInput.value;

    let taskDueDateInput = document.querySelector(`input[type="datetime-local"]`);
    let taskDueDateUnformatted = taskDueDateInput.value;
    let taskDueDate = new Date(taskDueDateUnformatted).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })

    let taskPriorityInput = document.querySelector("select");
    let taskPriority = taskPriorityInput.value;

    let newTask = new Task(taskName, taskDesc, taskDueDate, taskPriority);
    console.log(newTask);

    tasks.push(newTask);
    renderTasks();
    modal.classList.add("hidden");
    // taskNameInput.value = "";
    // taskDescInput.value = "";
    // taskDueDateInput.value = "";
    // taskPriorityInput.value = "";
}) 

let cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener("click", function() {
    modal.classList.add("hidden");
})


//Adding task-cards

 function renderTasks() {
    let taskCards = document.querySelector(".main-content");
    taskCards.innerHTML = "";
    tasks.forEach(task => {
    let newTaskCard = document.createElement("div");
    newTaskCard.classList.add("task-card");
    
    let taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");
    let taskDue = document.createElement("div");
    taskDue.classList.add("task-due");
    taskDue.textContent = task.dueDate;
    let taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.title;
    taskDetails.append(taskDue, taskTitle);

    let actions = document.createElement("div");
        actions.classList.add("actions");
        actions.innerHTML = `
            <svg class="edit-task" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Edit Task</title><path d="M19.71,8.04L17.37,10.37L13.62,6.62L15.96,4.29C16.35,3.9 17,3.9 17.37,4.29L19.71,6.63C20.1,7 20.1,7.65 19.71,8.04M3,17.25L13.06,7.18L16.81,10.93L6.75,21H3V17.25M16.62,5.04L15.08,6.58L17.42,8.92L18.96,7.38L16.62,5.04M15.36,11L13,8.64L4,17.66V20H6.34L15.36,11Z" /></svg>
            <svg class="expand-task" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Expand Task Details</title><path d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z" /></svg>
            <svg class="complete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Mark Completed</title><path d="M19.78,2.2L24,6.42L8.44,22L0,13.55L4.22,9.33L8.44,13.55L19.78,2.2M19.78,5L8.44,16.36L4.22,12.19L2.81,13.55L8.44,19.17L21.19,6.42L19.78,5Z" /></svg>
            <svg class="delete-task" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete Task</title><path d="M18,19C18,20.66 16.66,22 15,22H8C6.34,22 5,20.66 5,19V7H4V4H8.5L9.5,3H13.5L14.5,4H19V7H18V19M6,7V19C6,20.1 6.9,21 8,21H15C16.1,21 17,20.1 17,19V7H6M18,6V5H14L13,4H10L9,5H5V6H18M8,9H9V19H8V9M14,9H15V19H14V9Z" /></svg>`;
        
    newTaskCard.append(taskDetails, actions);
    taskCards.append(newTaskCard);
    })
}
