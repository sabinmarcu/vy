import {
  app,
  BrowserWindow,
} from 'electron';
import {
  createWindow,
} from '../bridge/createWindow';

const instanceLock = app.requestSingleInstanceLock();
if (!instanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
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
