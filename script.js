const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const taskCount = document.getElementById("taskCount");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");
  const task = { text: taskText, completed: false };
  addTaskToDOM(task);
  saveTask(task);
  taskInput.value = "";
  updateCount();
});

// Add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.className = task.completed ? "completed" : "";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    updateTaskStatus(task.text, checkbox.checked);
    updateCount();
  });

  const span = document.createElement("span");
  span.textContent = task.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTask(task.text);
    updateCount();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Load tasks on page load
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => addTaskToDOM(task));
  updateCount();
}

// Update completion status in localStorage
function updateTaskStatus(text, completed) {
  const tasks = getTasks();
  const updated = tasks.map(t =>
    t.text === text ? { ...t, completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(updated));
}

// Remove task from localStorage
function removeTask(text) {
  const tasks = getTasks().filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
  updateCount();
});

// Update completed/total count
function updateCount() {
  const tasks = getTasks();
  const completed = tasks.filter(t => t.completed).length;
  taskCount.textContent = `Completed: ${completed} / ${tasks.length}`;
}
