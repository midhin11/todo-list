//localStorage.js

import { Task } from "./task-class.js";

export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
  let parsedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (parsedTasks === null) {
    return [];
  }

  return parsedTasks.map((t) => {
    let task = new Task(t.title, t.desc, t.dueDate, t.priority);
    task.id = t.id;
    task.completed = t.completed;
    task.project = t.project;

    return task;
  });
}
