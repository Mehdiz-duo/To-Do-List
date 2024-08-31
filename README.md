# To-Do List Application

This repository contains the code for a simple to-do list application built using HTML, CSS, and JavaScript. It demonstrates various JavaScript concepts related to DOM manipulation, event handling, local storage, and more.

## Features

* **Add Tasks:**  Users can enter new tasks into an input field and add them to the list.
* **Delete Tasks:**  Users can remove individual tasks from the list by clicking a "Delete" button next to each task.
* **Edit Tasks:**  Users can modify the text of existing tasks by clicking an "Edit" button and entering a new value in a prompt.
* **Mark Tasks as Completed:**  Users can mark tasks as complete by clicking on them. This toggles a checkmark icon and styles the task text to indicate completion.
* **Filter Completed Tasks:**  A "Hide Completed" button allows users to filter the list to show only incomplete tasks. Clicking the button again will toggle back to showing all tasks.
* **Clear Completed Tasks:** A "Clear Completed" button removes all completed tasks from the list.
* **Persistence:**  The to-do list is saved in the browser's local storage, meaning that tasks will be retained even after the browser is closed and reopened.

## Project Structure

The project is organized into three main files:

* **`index.html`:** Contains the HTML structure of the to-do list application. This includes the input fields, buttons, the list container, and the initial setup.
* **`script.js`:** Contains all the JavaScript code that implements the application's functionality. This includes event handlers for adding, deleting, editing, and marking tasks, as well as functions for handling local storage persistence and filtering.
* **`style.css`:** Provides the styling for the to-do list application. This includes visual elements like colors, fonts, and layout.

## Code Walkthrough - `script.js`

The `script.js` file is the core of the application, handling all the dynamic behavior. Here's a breakdown of the key JavaScript concepts used:

### 1. DOM Manipulation

* **`document.querySelector()`:**  Selects HTML elements based on CSS selectors.
    * Used to get references to the input field, buttons, and the list container.
    * Example:
        ```javascript
        const addBtn = document.querySelector("#add-btn"); // Selects the button with id "add-btn"
        ```
* **`document.createElement()`:**  Creates new HTML elements dynamically.
    * Used to create new list items (`<li>`) for each task.
    * Example:
        ```javascript
        const newTask = document.createElement("li"); 
        ```
* **`appendChild()`:** Adds an element as a child of another element.
    * Used to add new list items to the `listContainer`.
    * Example:
        ```javascript
        listContainer.appendChild(newTask); 
        ```
* **`insertBefore()`:** Inserts a new element before a specified existing child element.
    * Used to add new tasks at the beginning of the list.
    * Example:
        ```javascript
        listContainer.insertBefore(newTask, listContainer.firstChild); 
        ```
* **`remove()`:**  Removes an element from the DOM.
    * Used to delete tasks from the list.
    * Example:
        ```javascript
        newTask.remove(); 
        ```
* **`innerHTML`:** Sets or gets the HTML content of an element.
    * Used to load tasks from local storage and display them in the list.
    * Example:
        ```javascript
        listContainer.innerHTML = localStorage.getItem('tasks');
        ```
* **`textContent`:**  Sets or gets the plain text content of an element.
    * Used to set the text of a task and for editing tasks.
    * Example:
        ```javascript
        taskText.textContent = inputValue; 
        ```
* **`classList.add()`:** Adds a class to an element.
    * Used to add the "checked" class to indicate a completed task.
    * Example:
        ```javascript
        event.target.classList.add("checked");
        ```
* **`classList.remove()`:** Removes a class from an element.
    * Used to remove the "checked" class when a task is marked incomplete.
    * Example:
        ```javascript
        item.classList.remove("hidden"); 
        ```
* **`classList.contains()`:** Checks if an element has a specific class.
    * Used to determine if a task is marked as completed.
    * Example:
        ```javascript
        if (item.classList.contains("checked")) {
            // Hide the completed task
        }
        ```
* **`style.display`:**  Controls the visibility of an element.
    * Used to hide completed tasks when filtering and to show all tasks when filtering is turned off.
    * Example:
        ```javascript
        item.style.display = "none"; // Hide the task
        item.style.display = "block"; // Show the task
        ```

### 2. DOM Traversal

DOM traversal is the process of navigating through the structure of the Document Object Model (DOM) to access and manipulate elements. Here are some key methods:

* **`parentElement`:**  Gets the parent element of a given element. Used to access elements that are one level above the current element.
    * Example:
        ```javascript
        const parentListItem = event.target.parentElement; // Gets the <li> element that contains the clicked button
        ```
* **`children`:** Returns a live HTMLCollection of the child elements of the given element. Used to access all direct child elements.
    * Example:
        ```javascript
        const children = listItem.children; // Gets all child elements of the <li> element
        ```
* **`querySelector()`:**  Selects the first element that matches a CSS selector within the given element's descendants.
    * Example: 
        ```javascript
        const taskSpan = listItem.querySelector("span"); // Gets the <span> element within the <li> element
        ```
* **`querySelectorAll()`:**  Selects all elements that match a CSS selector within the given element's descendants. Returns a NodeList.
    * Example:
        ```javascript
        const deleteButtons = listContainer.querySelectorAll(".delete-btn"); // Selects all elements with the class "delete-btn" within the <ul> element
        ```

### 3. Event Handling

* **`addEventListener()`:**  Attaches event handlers to elements to respond to user interactions.
    * Used to handle clicks on buttons and list items.
    * Example:
        ```javascript
        addBtn.addEventListener("click", addTask); 
        ```
* **`event.target`:**  References the specific element that triggered the event.
    * Used to determine which button or list item was clicked within event handlers.
    * Example:
        ```javascript
        if (event.target.classList.contains("delete-btn")) { 
            // Handle the delete button click
        } 
        ```
* **`confirm()`:**  Displays a dialog box to confirm an action.
    * Used to confirm task deletion.
    * Example:
        ```javascript
        if (confirm("Are you sure you want to delete this task?")) {
            // Delete the task
        }
        ```
* **`prompt()`:**  Displays a dialog box to get user input.
    * Used to get the new text for editing tasks.
    * Example:
        ```javascript
        const newText = prompt("Edit task:", event.target.parentElement.querySelector("span").textContent); 
        ```

### 4. Event Delegation

* **`addEventListener` on a Parent Element:**  Attaching an event listener to a parent element to handle events on its child elements.
    * Used to handle clicks on delete and edit buttons within the list container, without having to add separate listeners to each button.
    * Example:
        ```javascript
        listContainer.addEventListener("click", (event) => {
            // Check if a delete or edit button was clicked
        });
        ```

### 5. Local Storage

* **`localStorage.setItem(key, value)`:**  Stores data in the browser's local storage.
    * Used to save the to-do list tasks.
    * Example:
        ```javascript
        localStorage.setItem('tasks', tasksHTML); 
        ```
* **`localStorage.getItem(key)`:** Retrieves data from local storage.
    * Used to load the to-do list tasks when the page loads.
    * Example:
        ```javascript
        listContainer.innerHTML = localStorage.getItem('tasks'); 
        ```

### 6. Functions

* **`addTask()`:**  Handles the logic for adding new tasks to the list.
* **`deleteTask()`:** Handles the logic for deleting tasks from the list.
* **`editTask()`:** Handles the logic for editing existing tasks.
* **`updateLocalStorage()`:**  Updates local storage with the current state of the to-do list.
* **`loadTasksFromLocalStorage()`:**  Loads tasks from local storage when the page loads.
* **`attachEventListenersToButtons(listItem)`:**  Re-attaches event listeners to buttons after editing a task.

### 7. Arrow Functions

* Concise syntax for creating functions.
    * Used to define event handlers and other functions.
    * Example:
        ```javascript
        deleteButton.addEventListener("click", () => {
            // Delete the task
        });
        ```

### 8. Conditional Statements (`if`, `else if`, `else`)

* Control the flow of execution based on conditions.
    * Used to determine if a task is completed, to filter tasks, and to handle different scenarios in event handlers.
    * Example:
        ```javascript
        if (showCompleted) {
            // Show all tasks
        } else {
            // Hide completed tasks
        }
        ```

### 9. Loops (`forEach`)

* Iterate over arrays or collections.
    * Used to update the tasks in local storage and to filter tasks.
    * Example:
        ```javascript
        visibleTasks.forEach(task => {
            tasksHTML += task.outerHTML;
        });
        ```

### 10. String Manipulation

* **`trim()`:**  Removes leading and trailing whitespace from a string.
    * Used to clean up user input before adding tasks.
    * Example:
        ```javascript
        let inputValue = inputBox.value.trim();
        ```

### 11. Variable Declaration

* **`const`:**  Declares a constant variable, whose value cannot be changed after it's initially assigned. Used for values that should remain fixed throughout the script's execution.
    * Example:
        ```javascript
        const pi = 3.14159; 
        // You cannot later do: pi = 4.2;  (This would cause an error)
        ```

* **`let`:**  Declares a variable that can be reassigned a new value later in the code.  More flexible than `const`, but use it carefully to avoid potential bugs.
    * Example:
        ```javascript
        let counter = 0; 
        counter = counter + 1; // Updates the value of counter to 1
        ```


## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/to-do-list-app.git
    ```
2. **Open `index.html` in a web browser.**

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to submit a pull request.

## License

This project is licensed under the MIT License.