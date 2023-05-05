const { ipcRenderer } = require('electron');


// Load the Kanban board
document.getElementById('kanban-board').addEventListener('click', loadKanbanBoard);


// Load the Pomodoro Timer
document.getElementById('pomodoro-timer').addEventListener('click', loadPomodoroTimer);

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

      document.getElementById('go-back').addEventListener('click', loadHomePage);


    })
    .catch((err) => {
      console.warn('Error loading KanbanBoard:', err);
    });
}

//function to load the Pomodoro Timer to the main window
function loadPomodoroTimer() {
  fetch('PomodoroTimer/pomodoro.html')
    .then((response) => response.text())
    .then((html) => {
      //replace the content of the current window with the Pomodoro Timer html
      document.body.innerHTML = html;

      //Add the Pomodoro style to the current window
      const pomodoroStyles = document.createElement('link');
      pomodoroStyles.rel = 'stylesheet';
      pomodoroStyles.href = 'PomodoroTimer/pomodoro.css';
      document.head.appendChild(pomodoroStyles);

      // Load the pomodoro JavaScript files
      const pomodoroScript = document.createElement('script');
      pomodoroScript.src = 'PomodoroTimer/pomodoro.js';
      document.body.appendChild(pomodoroScript);

      document.getElementById('go-back').addEventListener('click', loadHomePage);

    })
    .catch((err) => {
      console.warn('Error loading PomodoroTimer:', err);
    });
}

function loadHomePage() {
  fetch('index.html')
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML = html;
      const indexScript = document.createElement('script');
      indexScript.src = 'render.js';
      document.body.appendChild(indexScript);
    })
    .catch((err) => {
      console.warn('Error loading HomePage:', err);
    });
}
