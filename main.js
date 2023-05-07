const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
    width: 600,
    height: 530,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
    resizeable: false
  })

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function() {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

// Add any necessary IPC listeners here
