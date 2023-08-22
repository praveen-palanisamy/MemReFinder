// Packages
import { BrowserWindow, app } from 'electron'
import isDev from 'electron-is-dev'

import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const nextApp = next({ dev: isDev, dir: app.getAppPath() + '/renderer' })
const handle = nextApp.getRequestHandler()

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await nextApp.prepare();
  const port = process.argv[2] || 3000;

  createServer((req: any, res: any) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1050,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
    },
  })

  mainWindow.loadURL(`http://localhost:${port}/`)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
