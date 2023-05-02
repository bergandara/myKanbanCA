const { ipcRenderer } = require('electron');

document.getElementById('kanban-board').addEventListener('click', () => {
    ipcRenderer.send('navigate-to-kanban');
});

document.getElementById('pomodoro-timer').addEventListener('click', () => {
    ipcRenderer.send('open-pomodoro-window');
});
