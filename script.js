/* 
Bugs to fix:
1. if the tasks input is empty alert add new task
*/

const addBtn = document.querySelector("#add-btn");
const listContainer = document.querySelector(".list-container");
const filterBtn = document.querySelector("#filter-btn"); 
const clearCompletedBtn = document.querySelector("#clear-completed-btn"); 

function addTask() {
    const inputBox = document.querySelector("#input-box");
    let inputValue = inputBox.value.trim();

    if (!inputValue) {
        alert("Please enter a task");
        return;
    }

    const newTask = createTaskElement(inputValue);

    // Add event listener to delete button
    newTask.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this task?")) {
            newTask.remove(); 
            updateLocalStorage(); 
        }
    });

    // Add event listener to edit button
    newTask.querySelector(".edit-btn").addEventListener("click", () => {
        const newText = prompt("Edit task:", newTask.querySelector("span").textContent);
        if (newText !== null) {
            newTask.querySelector("span").textContent = newText;
            updateLocalStorage(); 
        }
    });

    listContainer.insertBefore(newTask, listContainer.firstChild);

    inputBox.value = "";
    updateLocalStorage(); 
}

function createTaskElement(inputValue) {
    const newTask = document.createElement("li");

    // Create a span element to hold the task text
    const taskText = document.createElement("span");
    taskText.textContent = inputValue;

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    // Create an edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");

    // Append the task text, edit button, and delete button to the list item
    newTask.appendChild(taskText);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    return newTask;
}

addBtn.addEventListener("click", addTask)

// Event Delegation for delete, toggle, and edit
listContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        // Confirm deletion (optional)
        if (confirm("Are you sure you want to delete this task?")) {
            event.target.parentElement.remove(); 
            updateLocalStorage(); 
        }
    } else if (event.target.classList.contains("edit-btn")) {
        // Prompt for new task text
        const newText = prompt("Edit task:", event.target.parentElement.querySelector("span").textContent);
        if (newText !== null) {
            // Update the text content of the span element
            event.target.parentElement.querySelector("span").textContent = newText; 
            updateLocalStorage(); 
        }
    } else if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        updateLocalStorage(); 
    }
});

// Filter functionality (Show/Hide completed tasks)
filterBtn.addEventListener("click", () => {
    const listItems = listContainer.querySelectorAll("li");
    const showCompleted = filterBtn.textContent === "Hide Completed"; 

    listItems.forEach(item => {
        if (showCompleted) {
            // Show all
            item.style.display = "block";
            item.classList.remove("hidden"); 
        } else {
            // Hide completed tasks
            if (item.classList.contains("checked")) {
                item.style.display = "none";
                item.classList.add("hidden"); 
            } else {
                item.style.display = "block";
                item.classList.remove("hidden"); 
            }
        }
    });

    // Toggle the button's text
    filterBtn.textContent = showCompleted ? "Show Completed" : "Hide Completed";
    updateLocalStorage();
});

// Clear Completed Tasks functionality
clearCompletedBtn.addEventListener("click", () => {
    const completedTasks = listContainer.querySelectorAll("li.checked");
    completedTasks.forEach(task => task.remove());
    updateLocalStorage(); 
});

function updateLocalStorage() {
    const visibleTasks = listContainer.querySelectorAll("li:not(.hidden)");
    let tasksHTML = "";
    visibleTasks.forEach(task => {
        tasksHTML += task.outerHTML;
    });
    localStorage.setItem('tasks', tasksHTML);
}

function loadTasksFromLocalStorage() {
    listContainer.innerHTML = localStorage.getItem('tasks');
}

// Function to attach event listeners to the buttons
function attachEventListenersToButtons(listItem) {
    const deleteButton = listItem.querySelector(".delete-btn");
    const editButton = listItem.querySelector(".edit-btn");

    deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this task?")) {
            listItem.remove(); 
            updateLocalStorage(); 
        }
    });

    editButton.addEventListener("click", () => {
        const newText = prompt("Edit task:", listItem.querySelector("span").textContent);
        if (newText !== null) {
            listItem.querySelector("span").textContent = newText;
            updateLocalStorage();
            attachEventListenersToButtons(listItem); 
        }
    });
}

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);