"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const nextApp = (0, next_1.default)({ dev: electron_is_dev_1.default, dir: electron_1.app.getAppPath() + '/renderer' });
const handle = nextApp.getRequestHandler();
// Prepare the renderer once the app is ready
electron_1.app.on('ready', async () => {
    await nextApp.prepare();
    (0, http_1.createServer)((req, res) => {
        const parsedUrl = (0, url_1.parse)(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(3000, () => {
        console.log('> Ready on http://localhost:3000');
    });
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: (0, path_1.join)(__dirname, 'preload.js'),
        },
    });
    mainWindow.loadURL('http://localhost:3000/');
});
// Quit the app once all windows are closed
electron_1.app.on('window-all-closed', electron_1.app.quit);
// listen the channel `message` and resend the received message to the renderer process
electron_1.ipcMain.on('message', (event, message) => {
    console.log(message);
    setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
