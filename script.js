
const input = document.querySelector(".task-form input");
const addButton = document.querySelector(".task-form button");
const taskList = document.querySelector(".task-list");
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function loadSavedTasks() {
  const savedTasks = JSON.parse(
    localStorage.getItem("myTasks")
  ) || [];

  savedTasks.forEach(savedTask => {
    const task = document.createElement("div");
    task.className = "task-item";

    if (savedTask.completed) {
      task.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = savedTask.completed;

    const text = document.createElement("span");
    text.textContent = savedTask.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.className = "delete-button";

    checkbox.addEventListener("change", () => {
      task.classList.toggle("completed", checkbox.checked);
      updateCounts();
      saveTasks();
    });

    deleteButton.addEventListener("click", () => {
      task.remove();
      updateCounts();
      saveTasks();
    });

    task.append(checkbox, text, deleteButton);
    taskList.appendChild(task);
  });

  updateCounts();
}

loadSavedTasks();

const remainingCount = document.getElementById("remaining-count");
const completedCount = document.getElementById("completed-count");

function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = document.createElement("div");
  task.className = "task-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const text = document.createElement("span");
  text.textContent = taskText;

  checkbox.addEventListener("change", function () {
    task.classList.toggle("completed", checkbox.checked);
    updateCounts();
    function saveTasks() {
  const savedTasks = [];

  document.querySelectorAll(".task-item").forEach(task => {
    savedTasks.push({
      text: task.querySelector("span").textContent,
      completed: task.classList.contains("completed")
    });
  });

  localStorage.setItem("myTasks", JSON.stringify(savedTasks));
}
    function saveTasks() {
  const savedTasks = [];

  document.querySelectorAll(".task-item").forEach(task => {
    savedTasks.push({
      text: task.querySelector("span").textContent,
      completed: task.classList.contains("completed")
    });
  });

  localStorage.setItem("myTasks", JSON.stringify(savedTasks));
}
  });

  
const deleteButton = document.createElement("button");
deleteButton.textContent = "×";
deleteButton.className = "delete-button";

deleteButton.addEventListener("click", function () {
  task.remove();
  updateCounts();
  function saveTasks() {
  const savedTasks = [];

  document.querySelectorAll(".task-item").forEach(task => {
    savedTasks.push({
      text: task.querySelector("span").textContent,
      completed: task.classList.contains("completed")
    });
  });

  localStorage.setItem("myTasks", JSON.stringify(savedTasks));
}
});

task.appendChild(checkbox);
task.appendChild(text);
task.appendChild(deleteButton);
taskList.appendChild(task);

updateCounts();

  updateCounts();

  input.value = "";
}

addButton.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;
    const allTasks = document.querySelectorAll(".task-item");

    allTasks.forEach(task => {
      const isCompleted = task.classList.contains("completed");

      if (filter === "all") {
        task.style.display = "flex";
      } else if (filter === "active") {
        task.style.display = isCompleted ? "none" : "flex";
      } else {
        task.style.display = isCompleted ? "flex" : "none";
      }
    });
  });
});

function updateCounts() {
  const allTasks = document.querySelectorAll(".task-item");
  const completedTasks = document.querySelectorAll(
    ".task-item.completed"
  );

  remainingCount.textContent =
    `${allTasks.length - completedTasks.length} remaining`;

  completedCount.textContent =
    `${completedTasks.length} completed`;
}

updateCounts();
function saveTasks() {
  const savedTasks = [];

  document.querySelectorAll(".task-item").forEach(task => {
    savedTasks.push({
      text: task.querySelector("span").textContent,
      completed: task.classList.contains("completed")
    });
  });

  localStorage.setItem("myTasks", JSON.stringify(savedTasks));
}
