// @ts-ignore
const { BrowserWindow, app } = require('electron')
const isDev = require('electron-is-dev')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const url = isDev ? "http://localhost:3000" : ""
  mainWindow.loadURL(url)
})
