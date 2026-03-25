//all-tasks.js

import { Task } from "./task-class.js";

let tasks = [];
let cards = document.querySelectorAll(".task-card");
cards.forEach(card => {
    let cardDue = card.querySelector(".task-due").textContent;
    let cardTitle = card.querySelector(".task-title").textContent;
    let cardPriority = card.querySelector(".priority").textContent;
    tasks.push(new Task(cardTitle, "Some Description", cardDue, cardPriority));
});

export { tasks };

