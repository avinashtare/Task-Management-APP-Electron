// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './src/preload.js'),
            nodeIntegration: true, // Allow Node.js in renderer
            contextIsolation: true, // used to comunicate scripts and html 
            devTools: true, // show dev tools like console or etc...
        },
        frame: false, // don't show max min close bar
        icon: path.join(__dirname, './src/assets/icons/icon.ico')
    });

    mainWindow.loadFile('./src/index.html'); // main html file

    mainWindow.setMenuBarVisibility(false); // don't show toolbar
    return mainWindow;
}

app.whenReady().then(() => {
    let mainWindow = createWindow();

    app.on('activate', () => {
        // The 'activate' event is emitted when the application is activated on macOS.
        // This happens when the user clicks on the app's dock icon or switches back to the app.

        // Check if there are no open windows in the application
        if (BrowserWindow.getAllWindows().length === 0) {
            // If no windows are open, create a new window by calling the createWindow() function
            createWindow();
        }
    });

    // minimize window
    ipcMain.on("minimizeScreen", () => {
        mainWindow.minimize()
    })

    // maximize window
    ipcMain.on("maximizeScreen", () => {
        // previousBounds = mainWindow.getBounds(); //get current x y w h
        // mainWindow.setBounds(previousBounds, true); // ({ x: 560, y: 216, width: 800, height: 600 },animation: boolan)
        mainWindow.maximize()
    })

    // Resize window back to previous bounds
    ipcMain.on('resizeScreen', () => {
        mainWindow.restore() // resore to previus screen
    });

    // Get screen stare
    ipcMain.handle('isMaximized', () => {
        console.log(mainWindow.isMaximized())
        return mainWindow.isMaximized()
    });
});

// if all window close then quit from app 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});