// render-tasks.js

export function renderTasks(tasks, mainHeaderText) {
  let container = document.querySelector(".main-content");
  container.innerHTML = "";
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let filteredTasks = [];

  if (mainHeaderText === "Today") {
    filteredTasks = tasks.filter((task) => {
      let taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  } else if (mainHeaderText === "Upcoming") {
    filteredTasks = tasks.filter((task) => {
      let taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() > today.getTime();
    });
  } else if (mainHeaderText === "Past") {
    filteredTasks = tasks.filter((task) => {
      let taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() < today.getTime();
    });
  } else if (mainHeaderText === "All") {
    filteredTasks = tasks;
  } else {
    filteredTasks = tasks.filter((task) => task.project === mainHeaderText);
  }

  emptyTasksTextGen(container, filteredTasks);

  // tasks rendering
  filteredTasks.forEach((task, index) => {
    let newTaskCard = document.createElement("div");
    newTaskCard.classList.add("task-card");
    newTaskCard.setAttribute("data-index", index); // setting index number for each to-do card
    newTaskCard.dataset.id = task.id;

    let taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    let taskDue = document.createElement("div");
    taskDue.classList.add("task-due");
    let taskDueDateFormatted = new Date(task.dueDate).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    taskDue.textContent = taskDueDateFormatted;

    let taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.title;
    taskDetails.append(taskDue, taskTitle);

    let actions = document.createElement("div");
    actions.classList.add("actions");
    let taskPriority = document.createElement("div");
    taskPriority.classList.add("priority");
    taskPriority.textContent = task.priority;
    if (taskPriority.textContent === "Mid") {
      taskPriority.style.color = "gold";
    }
    if (taskPriority.textContent === "Low") {
      taskPriority.style.color = "lightgreen";
    }

    let icons = document.createElement("div");
    icons.innerHTML = `
            <svg class="expand-task" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Expand Task Details</title><path d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z" /></svg>
            <svg class="complete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Mark Completed</title><path d="M19.78,2.2L24,6.42L8.44,22L0,13.55L4.22,9.33L8.44,13.55L19.78,2.2M19.78,5L8.44,16.36L4.22,12.19L2.81,13.55L8.44,19.17L21.19,6.42L19.78,5Z" /></svg>
            <svg class="delete-task" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete Task</title><path d="M18,19C18,20.66 16.66,22 15,22H8C6.34,22 5,20.66 5,19V7H4V4H8.5L9.5,3H13.5L14.5,4H19V7H18V19M6,7V19C6,20.1 6.9,21 8,21H15C16.1,21 17,20.1 17,19V7H6M18,6V5H14L13,4H10L9,5H5V6H18M8,9H9V19H8V9M14,9H15V19H14V9Z" /></svg>`;
    actions.append(taskPriority, icons);

    if (task.completed) {
      taskTitle.classList.add("done");
      taskDue.classList.add("done");
      taskPriority.classList.add("done");
    }

    newTaskCard.append(taskDetails, actions);
    container.append(newTaskCard);
  });
}

function emptyTasksTextGen(container, tasks) {
  if (tasks.length === 0) {
    let noTaskMsg = document.createElement("div");
    let line1 = document.createElement("p");
    let line2 = document.createElement("p");
    line1.textContent = `There are no tasks left ☹`;
    line2.textContent =
      'Please add tasks using the "Add Task" on the top right corener or on the left';
    noTaskMsg.append(line1, line2);
    container.append(noTaskMsg);
    container.classList.add("empty-main-content");
  } else {
    container.classList.remove("empty-main-content");
  }
}
