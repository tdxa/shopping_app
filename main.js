const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

//Listening for app to be ready
app.on('ready', function () {
    //Creating new window
    mainWindow = new BrowserWindow({});
    //Loading html file to window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    //Quting app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });
    //Building menu from template
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

//Handling create add window
function createAddWindow() {
    //Creating new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add shopping list item'
    });
    //Loading html file to window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    //Garbage collection handle
    addWindow.on('close', function() {
        addWindow = null;
    })
}

//Creating menu template
//It's just a array of objects in Electron :>
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add item',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Clear items'
            },
            {
                label: 'Quit app',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];



