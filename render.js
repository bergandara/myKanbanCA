const { ipcRenderer } = require('electron');

function loadKanbanBoard() {
  fetch('kanban.html')
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML = html;
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

document.getElementById('kanban-board').addEventListener('click', loadKanbanBoard);

document.getElementById('pomodoro-timer').addEventListener('click', () => {
  ipcRenderer.send('open-pomodoro-window');
});
