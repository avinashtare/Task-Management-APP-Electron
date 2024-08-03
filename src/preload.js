const { contextBridge, ipcRenderer } = require('electron');

// preload.js
window.addEventListener('DOMContentLoaded', () => {
    console.log('Preload script running!');
});

// expose to window variable in script 
contextBridge.exposeInMainWorld('electronAPI', {
    // bar fuctions 
    minimize: () => ipcRenderer.send('minimizeScreen'),
    maximize: () => ipcRenderer.send('maximizeScreen'),
    resize: () => ipcRenderer.send('resizeScreen'),
    isMaximized: async () => {
        return await ipcRenderer.invoke('isMaximized');
    }
});
