const commandante = require('./commandante')
const path = require('path')
const { app, BrowserWindow, ipcMain, screen } = require('electron')

let mainWindow

const createWindow = () => {
  const display = screen.getPrimaryDisplay()
  const width = display.bounds.width
  const height = display.bounds.height
  mainWindow = new BrowserWindow({
    height: height,
    width: 600,
    x: width - 600,
    y: 0,
    icon: path.join(__dirname, '../assets/icons/png/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile(path.join(__dirname, '..', 'frontend', 'index.html'))
}

app.whenReady().then(() => {
  createWindow()
  mainWindow.setMenuBarVisibility(false)
})

ipcMain.on('abort', () => {
  commandante.kill()
})

ipcMain.on('command', (event, command) => {
  // todo
  // commandante.command(command)
  commandante.command('bash', ['-c', command])
})

commandante.onLogs = (log) => {
  console.log('...', log)
  mainWindow.webContents.send('logs', log)
}

commandante.onExit = () => {
  mainWindow.webContents.send('exit')
}
