//index.js

import "./styles.css";
import { Task } from "./JS/task-class.js";
import { tasks } from "./JS/all-tasks.js";
import { renderTasks } from "./JS/render-tasks.js";
import { saveTasks } from "./JS/localStorage.js";
import { dummyTasks } from "./JS/dummy-tasks.js";

if (localStorage.getItem("hasInitialized") !== "true") {
  dummyTasks(tasks);
  saveTasks(tasks);
  localStorage.setItem("hasInitialized", "true");
}
renderTasks(tasks, "All"); // To add cards in HTML to DOM

let addTask = document.querySelectorAll(".add-task");
let modal = document.querySelector("#modal");
let inputDialog = document.querySelector(".input-dialog");
let addProjectModal = document.querySelector("#add-project-modal");
let addProjectDialog = document.querySelector(".add-project-dialog");
let modalMode;
let currentTaskId;
let defaultProject = document.querySelector(
  ".projects > div:nth-of-type(1) > div",
);
let currentProject;

let taskNameInput = document.querySelector(`.add-task-input`);
let taskDescInput = document.querySelector("textarea");
let taskDueDateInput = document.querySelector(`input[type="datetime-local"]`);
let taskPriorityInput = document.querySelector("select");
let mainHeader = document.querySelector(".type");
mainHeader.textContent = "All";

//Task input modal pop-up

modal.addEventListener("click", function () {
  modal.classList.add("hidden");
});
inputDialog.addEventListener("click", function (e) {
  e.stopPropagation();
});

addProjectModal.addEventListener("click", function () {
  addProjectModal.classList.add("hidden");
});
addProjectDialog.addEventListener("click", function (e) {
  e.stopPropagation();
});

// Delete task

let container = document.querySelector(".main-content");
container.addEventListener("click", function (e) {
  let deleteBtn = e.target.closest(".delete-task");
  if (!deleteBtn) return;

  let card = deleteBtn.closest(".task-card");

  let id = card.dataset.id;
  let index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
  }

  saveTasks(tasks);
  renderTasks(tasks, mainHeader.textContent);
});

//Add task

addTask.forEach((btn) => {
  btn.addEventListener("click", function () {
    modalMode = "add";
    modal.classList.remove("hidden");
  });
});

// Submit Btn in Input Dialog

let submit = document.querySelector(".submit-btn");
modal.addEventListener("submit", function (e) {
  e.preventDefault();
  if (modalMode === "add") {
    add();
  } else if (modalMode === "edit") {
    edit();
  }
});

function add() {
  let taskName = taskNameInput.value;
  let taskDesc = taskDescInput.value;
  let taskDueDateUnformatted = taskDueDateInput.value;
  let taskPriority = taskPriorityInput.value;

  let selectedProject = currentProject || "";
  let newTask = new Task(
    taskName,
    taskDesc,
    taskDueDateUnformatted,
    taskPriority,
  );
  newTask.project = selectedProject;

  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks(tasks, mainHeader.textContent);
  modal.classList.add("hidden");
  taskNameInput.value = "";
  taskDescInput.value = "";
  taskDueDateInput.value = "";
  taskPriorityInput.value = "";
}

// Cancel Btn in Input Dialog

let cancelBtn = document.querySelector(".cancel-btn");
cancelBtn.addEventListener("click", function () {
  modal.classList.add("hidden");

  taskNameInput.value = "Research articles on food blog";
  taskDescInput.value =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit.";
  taskDueDateInput.value = "2025-06-01T08:30";
  taskPriorityInput.value = "Low";
});

// Sidebar by date Btns

let byDateBtns = document.querySelector(".by-date");
byDateBtns.addEventListener("click", function (e) {
  let validTypeBtns = e.target.closest(".by-date-type");
  if (!validTypeBtns) return;
  mainHeader.textContent = validTypeBtns.querySelector("div").textContent;
  renderTasks(tasks, mainHeader.textContent);
});

// Expand task Btn

container.addEventListener("click", function (e) {
  let expandBtn = e.target.closest(".expand-task");
  if (!expandBtn) return;
  modalMode = "edit";
  modal.classList.remove("hidden");
  let card = expandBtn.closest(".task-card");
  let id = (currentTaskId = card.dataset.id);
  let tasktoExpand = tasks.find((task) => task.id === id);

  taskNameInput.value = tasktoExpand.title;
  taskDescInput.value = tasktoExpand.desc;
  taskDueDateInput.value = tasktoExpand.dueDate;
  taskPriorityInput.value = tasktoExpand.priority;
});

function edit() {
  let taskBeingEdited = tasks.find((task) => task.id === currentTaskId);

  taskBeingEdited.title = taskNameInput.value;
  taskBeingEdited.desc = taskDescInput.value;
  taskBeingEdited.dueDate = taskDueDateInput.value;
  taskBeingEdited.priority = taskPriorityInput.value;

  modal.classList.add("hidden");
  saveTasks(tasks);
  renderTasks(tasks, mainHeader.textContent);
}

// Check task Btn

container.addEventListener("click", function (e) {
  let completedBtn = e.target.closest(".complete");
  if (!completedBtn) return;
  let card = completedBtn.closest(".task-card");
  let id = card.dataset.id;
  let completedTask = tasks.find((task) => task.id === id);
  completedTask.completed = !completedTask.completed;
  saveTasks(tasks);
  renderTasks(tasks, mainHeader.textContent);
});

// Add Project

let addProject = document.querySelectorAll(".add-project");
addProject.forEach((btn) => {
  btn.addEventListener("click", function () {
    addProjectModal.classList.remove("hidden");
  });
});

let addProjectForm = document.querySelector("#add-project-modal");
let projects = document.querySelector(".projects");

addProjectForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let input = document.querySelector(".add-project-input");

  let newProject = document.createElement("div");
  let newProjectTitle = document.createElement("div");
  newProjectTitle.textContent = input.value;
  newProjectTitle.classList.add("project-title");
  let newProjectDeleteBtn = document.createElement("div");
  newProjectDeleteBtn.innerHTML = `<svg class="project-delete-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete Project</title><path d="M18,19C18,20.66 16.66,22 15,22H8C6.34,22 5,20.66 5,19V7H4V4H8.5L9.5,3H13.5L14.5,4H19V7H18V19M6,7V19C6,20.1 6.9,21 8,21H15C16.1,21 17,20.1 17,19V7H6M18,6V5H14L13,4H10L9,5H5V6H18M8,9H9V19H8V9M14,9H15V19H14V9Z" /></svg>`;
  newProject.classList.add("project");
  newProject.append(newProjectTitle, newProjectDeleteBtn);
  projects.append(newProject);

  addProjectForm.classList.add("hidden");
  input.value = "";
});

// Project delete

projects.addEventListener("click", function (e) {
  let deleteBtn = e.target.closest(".project-delete-btn");

  if (deleteBtn) {
    e.stopPropagation();
    let projectElement = deleteBtn.closest(".project");
    let projectTitle =
      projectElement.querySelector(".project-title").textContent;

    let updatedTasks = tasks.filter((task) => task.project !== projectTitle);

    tasks.length = 0;
    tasks.push(...updatedTasks);

    projectElement.remove();

    currentProject = null;
    mainHeader.textContent = "All";
    saveTasks(tasks);
    renderTasks(tasks, "All");

    return;
  }

  // 2️⃣ SELECT PROJECT LOGIC (this replaces newProject.addEventListener)
  let projectElement = e.target.closest(".project");

  if (projectElement) {
    let projectTitle =
      projectElement.querySelector(".project-title").textContent;

    currentProject = projectTitle;
    mainHeader.textContent = projectTitle;
    saveTasks(tasks);
    renderTasks(tasks, projectTitle);
  }
});
