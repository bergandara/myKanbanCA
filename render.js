const { ipcRenderer } = require('electron');


// Load the Kanban board
document.getElementById('kanban-board').addEventListener('click', loadKanbanBoard);

// Load the Pomodoro Timer
document.getElementById('pomodoro-timer').addEventListener('click', () => {
  ipcRenderer.send('navigate-to-pomodoro');
});


//function to load the kanban board to the main window
function loadKanbanBoard() {
  fetch('kanban.html')
    .then((response) => response.text())
    .then((html) => {
      //replace the content of the current window with the Kanban board html
      document.body.innerHTML = html;

      //Add the kanban board style to the current window
      const kanbanStyles = document.createElement('link');
      kanbanStyles.rel = 'stylesheet';
      kanbanStyles.href = 'kanban.css';
      document.head.appendChild(kanbanStyles);

      // Load the kanban JavaScript files
      const dragScript = document.createElement('script');
      dragScript.src = 'drag.js';
      document.body.appendChild(dragScript);

      const todoScript = document.createElement('script');
      todoScript.src = 'todo.js';
      document.body.appendChild(todoScript);
    })
    .catch((err) => {
      console.warn('Error loading KanbanBoard:', err);
    });
}
//Add a click event listener to the kanban button
document.getElementById('kanban-board').addEventListener('click', loadKanbanBoard);

//Add a click event listener to the pomodoro timer
document.getElementById('pomodoro-timer').addEventListener('click', () => {
  ipcRenderer.send('navigate-to-pomodoro');
});
