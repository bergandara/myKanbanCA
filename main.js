`use strict`

const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Create the Kanban window
ipcMain.on('navigate-to-kanban', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window.loadFile('kanban.html');
});


// Create the Pomodoro window
ipcMain.on('open-pomodoro-window', () => {
    let pomodoroWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    pomodoroWindow.loadFile('pomodoro.html');
});
