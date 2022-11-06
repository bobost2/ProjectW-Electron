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
import { ReadlineParser, SerialPort } from 'serialport'
import { exec } from 'child_process';

var sqlite3 = require('sqlite3');
var foundPort:string = ""; 


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
    "MinutesTrained"	INTEGER NOT NULL,
    "KilometersCycled"	REAL NOT NULL,
    "AvgSpeed"	REAL NOT NULL,
    "Date"	INTEGER NOT NULL,
    FOREIGN KEY("UserID") REFERENCES "User"("ID"),
    PRIMARY KEY("ID" AUTOINCREMENT)
  );
  CREATE TABLE "Goal" (
    "UserId"	INTEGER NOT NULL UNIQUE,
    "KMGoal"	INTEGER DEFAULT 0,
    "TimeGoal"	INTEGER DEFAULT 0,
    "CaloriesGoal"	INTEGER DEFAULT 0,
    "KMLimit"	NUMERIC,
    "TimeLimitMinutes"	INTEGER,
    "CaloriesLimit"	NUMERIC,
    FOREIGN KEY("UserId") REFERENCES "User"("ID")
  );
  `);
}

ipcMain.on('createUser', (event, data) => {
  var db = new sqlite3.Database('ProjectWData.db');
  let dataToSave:User = data;
  db.exec(`INSERT INTO "main"."User" ("Username", "PIN", "Height", "Weight", "Age", "IconId") 
  VALUES ('${dataToSave.Username}', '${dataToSave.PIN}', '${dataToSave.Height}', '${dataToSave.Weight}', '${dataToSave.Age}', '${dataToSave.IconId}');`, () => {
    db.all(`SELECT ID FROM "main"."User" WHERE Username='${dataToSave.Username}';`, (err:any, rows:User[]) => {
      let userId = rows[rows.length - 1].ID;
      db.exec(`INSERT INTO "main"."Goal" ("UserId") VALUES (${userId});`, () => {
        event.reply("returnCreatedUserID", userId);
      })
    })
  });
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
  var db = new sqlite3.Database('ProjectWData.db');
  var targetUser:User;
  db.all(`SELECT * FROM User WHERE ID=${data}`, (err:any, rows:any) => {
    rows.forEach((row:any) => {
      targetUser = {
        ID: row.ID,
        Username: row.Username,
        Height: row.Height,
        Weight: row.Weight,
        Age: row.Age,
        IconId: row.IconId
      }
      event.reply("returnUser", targetUser)
    })
  })
})


ipcMain.on('returnUserGoals', (event, data) => {
  var db = new sqlite3.Database('ProjectWData.db');
  var userGoals:Goals;
  db.all(`SELECT * FROM Goal WHERE UserId=${data}`, (err:any, rows:any) => {
    rows.forEach((row:any) => {
      userGoals = row;
      event.reply("returnGoals", userGoals)
    })
  }) 
})



ipcMain.on('updateUserStats', (event, data) => {
  var db = new sqlite3.Database('ProjectWData.db');
  var user:User = data;
  db.exec(`
    UPDATE User
    SET (Username, Height, Weight, Age) = ('${user.Username}', ${user.Height}, ${user.Weight}, ${user.Age})
    WHERE "ID" = ${user.ID};
  `);
})

ipcMain.on('requestUserActivity', (event, data) => {
  var db = new sqlite3.Database('ProjectWData.db');
  var userActivity:Activity[] = [];
  db.all(`
  SELECT * FROM Activity WHERE UserId=${data}`, (err:any, rows:any) => {
    rows.forEach((row:Activity) => {
      userActivity.push(row);
    })
    event.reply("returnAllActivities", userActivity)
  });
})

ipcMain.on('setUserGoals', (event, data) => {
  var db = new sqlite3.Database('ProjectWData.db');
  var userGoals:Goals = data;
  db.exec(`
    UPDATE Goal
    SET (KMGoal,KMLimit,TimeGoal,TimeLimitMinutes,CaloriesGoal,CaloriesLimit) = (${+userGoals.KMGoal},${userGoals.KMLimit},${+userGoals.TimeGoal},${userGoals.TimeLimitMinutes},${+userGoals.CaloriesGoal},${userGoals.CaloriesLimit})
    WHERE "UserId" = ${userGoals.UserId};
  `);
})

ipcMain.on('deleteAccount', (event, data) => {
  var db = new sqlite3.Database('ProjectWData.db');
  db.exec(`
    DELETE FROM Activity WHERE "UserID" = ${data};
    DELETE FROM Goal WHERE "UserId" = ${data};
    DELETE FROM User WHERE "ID" = ${data};
  `);
})

var runTelemetry:boolean = false;

ipcMain.on('StartTelemetryFetching', (event, data) => {
  runTelemetry = true;
  if (foundPort === "") return;
  const port = new SerialPort({
    path: foundPort,
    baudRate: 9600,
  }).setEncoding('utf8');
  const parser = new ReadlineParser()
  port.pipe(parser);
  parser.on('data', function (data) {
    if(runTelemetry){
      console.log(data);
      event.reply('returnTelemetry', data.toString());
    } else {
      port.close();
      return;
    }
  })
})

ipcMain.on('StopTelemetryFetching', (event, data) => {
  runTelemetry = false;
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
        const parser = new ReadlineParser()
        portConnection.pipe(parser);
        parser.once('data', function (data:any) {
          let portData = data;
          console.log(portData);
          let portDataArr = portData.split('|');
          if(portDataArr[0] === 'PRJW') {
            console.log('Found matching port: ' + port.path);
            portFound = true;
            foundPort = port.path;
            event.reply("returnPort", port);  
            return;
          }
          else {
            console.log(`The port ${port.path} is not the target one. Searching for other ports...`);
          }
          portConnection.unpipe(parser);
          portConnection.close();
        })
      });
    })

    setTimeout(() => {
      if(!portFound) {
        //console.warn('No ports found, trying again after 1 second...'); maybe return it?
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
