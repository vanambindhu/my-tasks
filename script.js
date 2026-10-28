

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const remainingCount = document.getElementById("remaining-count");
const completedCount = document.getElementById("completed-count");
const totalCount = document.getElementById("total-count");
const clearCompletedButton = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function updateCounts() {
    totalCount.textContent = tasks.length + " total tasks";
remainingCount.textContent = (tasks.length - tasks.filter(task => task.completed).length) + " remaining";
completedCount.textContent = tasks.filter(task => task.completed).length + " completed";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (currentFilter === "active" && task.completed) return;
        if (currentFilter === "completed" && !task.completed) return;

        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) item.classList.add("completed");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const text = document.createElement("span");
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.className = "delete-button";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        item.append(checkbox, text, deleteButton);
        taskList.appendChild(item);
    });

    updateCounts();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const taskText = input.value.trim();
    if (!taskText) return;

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();

    input.value = "";
    input.focus();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        renderTasks();
    });
});

clearCompletedButton.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

renderTasks();
