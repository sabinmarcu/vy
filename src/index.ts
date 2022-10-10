import {
  app,
  BrowserWindow,
} from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import {
  createWindow,
} from './electron/bridge/createWindow';
import {
  makeMenu,
} from './electron/makeMenu';
import {
  getWindow,
  setActiveWindow,
} from './electron/windows';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => createWindow());

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
});

const updateWindow = (window: BrowserWindow) => {
  const mainWindow = getWindow(window.id);
  if (mainWindow) {
    const { route: { menu } } = mainWindow;
    makeMenu(menu);
    setActiveWindow(window.id);
  }
};
app.on('browser-window-created', (e, window) => {
  updateWindow(window);
});

app.on('browser-window-focus', (e, window) => {
  updateWindow(window);
});

// app.on('browser-window-blur', (e, window) => {
//   console.log({ e, window: window.id, blur: true });
// });

app.setJumpList([
  {
    type: 'custom',
    name: 'Jump To',
    items: [
      {
        type: 'task',
        program: process.execPath,
        args: '',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'New Window',
        description: 'Create a new window',
      },
    ],
  },
]);

const instanceLock = app.requestSingleInstanceLock();
if (!instanceLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (BrowserWindow.getAllWindows().length > 0) {
      const window = BrowserWindow.getAllWindows()[0];
      if (window.isMinimized()) {
        window.restore();
      }
      window.focus();
    } else {
      createWindow();
    }
  });
}
