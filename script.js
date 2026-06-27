const display = document.querySelector("#taskInput");
const button = document.querySelector("#addBtn");
const addTask = document.querySelector("#taskList");

// Save tasks
function saveData() {
  localStorage.setItem("tasks", addTask.innerHTML);
}

// Show saved tasks
function showTask() {
  addTask.innerHTML = localStorage.getItem("tasks") || "";

  // পুরোনো Delete button-এ আবার event যোগ করা
  const deleteButtons = addTask.querySelectorAll("button");

  deleteButtons.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      deleteBtn.parentElement.remove();
      saveData();
    });
  });
}

// Add Task
button.addEventListener("click", () => {
  let data = display.value.trim();

  if (data === "") {
    alert("Write something");
    return;
  }

  const li = document.createElement("li");
  li.textContent = data;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveData();
  });

  li.appendChild(deleteBtn);
  addTask.appendChild(li);

  display.value = "";
  saveData();
});

// Enter key support
display.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

// Load tasks when page refreshes
showTask();