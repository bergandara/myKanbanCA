// Get the form, input, and todo-lane elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

// Add a submit event listener to the form element
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;

    // If the input is empty, don't create a new task
    if (!value) return;

    // Create a new task element and set its properties
    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;

    // Add dragstart and dragend event listeners to the new task element
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });

    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
        //Save tasks to localStorage when a task is moved
        saveTasks();
    });

    // Append the new task element to the todo-lane
    todoLane.appendChild(newTask);

    //Save tasks to localStorage
    saveTasks();

    // Clear the input value
    input.value = "";
});

// Function to save tasks to localStorage
function saveTasks() {
    const todoLane = document.querySelector('#todo-lane');
    const wipLane = document.querySelector('#wip-lane');
    const doneLane = document.querySelector('#done-lane');
    
    const todoTasks = Array.from(todoLane.querySelectorAll('.task')).map(task => task.innerText);
    const wipTasks = Array.from(wipLane.querySelectorAll('.task')).map(task => task.innerText);
    const doneTasks = Array.from(doneLane.querySelectorAll('.task')).map(task => task.innerText);

    const tasks = {todoTasks, wipTasks, doneTasks};
    
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

window.dispatchEvent(new Event('script-loaded'));
