const comandante = require('./comandante')
const path = require('path')
const { app, BrowserWindow, ipcMain, screen } = require('electron')

let mainWindow

const createWindow = () => {
  const display = screen.getPrimaryDisplay()
  const width = display.bounds.width
  const height = display.bounds.height
  mainWindow = new BrowserWindow({
    height: height,
    width: width,
    icon: path.join(__dirname, '../assets/icons/png/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile(path.join(__dirname, '..', 'frontend', 'index.html'))
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  mainWindow.setMenuBarVisibility(false)
})

ipcMain.on('abort', () => {
  comandante.kill()
})

ipcMain.on('command', (event, command) => {
  comandante.command(command)
})

comandante.onLogs = (log) => {
  mainWindow.webContents.send('logs', log)
}

comandante.onExit = () => {
  mainWindow.webContents.send('exit')
}
