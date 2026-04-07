//all-tasks.js

import { loadTasks } from "./localStorage.js";
import { Task } from "./task-class.js";

let tasks = loadTasks();

export { tasks };

