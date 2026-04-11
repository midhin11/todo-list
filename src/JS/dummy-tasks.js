// dummy-tasks.js

import { Task } from "./task-class.js";

export function dummyTasks(tasks) {
  let d1 = new Date(2026, 11, 12).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  let d2 = new Date(2026, 11, 12).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  let t1 = new Task("Do Laundry", "Some Description", d1, "High");
  let t2 = new Task("Task 2", "Some Description", d2, "High");

  tasks.push(t1, t2);
}
