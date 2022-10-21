/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
//import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { SerialPort } from 'serialport'
import { exec } from 'child_process';

var sqlite3 = require('sqlite3');


export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}


let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

function InitializeDatabase() {
  new sqlite3.Database('./ProjectWData.db', sqlite3.OPEN_READWRITE, (err: any) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
    } 
  });
}

function createDatabase() {
  var db = new sqlite3.Database('ProjectWData.db');
  db.exec(`
  CREATE TABLE "User" (
    "ID"	INTEGER NOT NULL UNIQUE,
    "Username"	TEXT NOT NULL,
    "PIN"	INTEGER,
    "Height"	INTEGER NOT NULL,
    "Weight"	INTEGER NOT NULL,
    "Age"	INTEGER NOT NULL,
    "IconId"	INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("ID" AUTOINCREMENT)
  );

  CREATE TABLE "Activity" (
    "ID"	INTEGER NOT NULL UNIQUE,
    "UserID"	INTEGER NOT NULL,
    "CaloriesBurned"	REAL NOT NULL,
    "KilometersCycled"	REAL NOT NULL,
    "MaxSpeed"	REAL NOT NULL,
    "AvgSpeed"	REAL NOT NULL,
    FOREIGN KEY("UserID") REFERENCES "User"("ID"),
    PRIMARY KEY("ID" AUTOINCREMENT)
  );
  `);
}

ipcMain.on('createUser', (event, data) => {
  var db = new sqlite3.Database('ProjectWData.db');
  let dataToSave:User = data;
  db.exec(`INSERT INTO "main"."User" ("Username", "PIN", "Height", "Weight", "Age", "IconId") 
  VALUES ('${dataToSave.Username}', '${dataToSave.PIN}', '${dataToSave.Height}', '${dataToSave.Weight}', '${dataToSave.Age}', '${dataToSave.IconId}');`);
})

ipcMain.on('requestUsers', (event) => {
  var db = new sqlite3.Database('ProjectWData.db');
  var userData:User[] = [];
  db.all(`
  SELECT ID, Username, IconId FROM User`, (err:any, rows:any) => {
    rows.forEach((row:any) => {
      userData.push({
        ID: row.ID,
        Username: row.Username,
        IconId: row.IconId
      })
    })
    event.reply("returnUsers", userData)
  });
})

ipcMain.on('returnUserInfo', (event, data) => {

})

ipcMain.on('requestPorts', (event) => {
  requestPort();
  var portFound:boolean = false;
  function requestPort()
  {
    SerialPort.list().then((ports) => {
      ports.forEach((port) => {
        const portConnection = new SerialPort({
          path: port.path,
          baudRate: 9600,
        }).setEncoding('utf8');
        portConnection.on('readable', function () {
          let portData = portConnection.read();
          let portDataArr = portData.split(' | ');
          if(portDataArr[0] === 'ToWheelUI') {
            console.log('Found matching port: ' + port.path);
            portFound = true;
            event.reply("returnPort", port);  
          }
          else {
            console.log(`The port ${port.path} is not the target one. Searching for other ports...`);
          }
          portConnection.close();
        })
      });
    })

    setTimeout(() => {
      if(!portFound) {
        console.warn('No ports found, trying again after 1 second...');
        requestPort();
      }
    }, 1000)
  }
});

ipcMain.on('systemShutdown', () => {
  //app.quit(); //Disable shutdown in development
  exec("shutdown /p", () => {}); //Make the system shutdown
});

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    //fullscreen: true, (Enable this on prod version)
    width: 1765, //1280
    height: 840, //800
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    mainWindow?.setMenu(null);
    InitializeDatabase();
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  //const menuBuilder = new MenuBuilder(mainWindow);
  //menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });  

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.      
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
