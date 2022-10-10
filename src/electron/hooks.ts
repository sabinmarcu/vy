import {
  app,
  BrowserWindow,
} from 'electron';
import {
  onWindowUpdate,
} from './darwin/index';
import {
  PlatformMap,
  WindowUpdate,
} from './types';
import {
  makeMenu,
} from './utils/makeMenu';
import {
  perPlatform,
} from './utils/perPlatform';
import {
  getWindow,
  setActiveWindow,
} from './utils/windows';

const updateForge: PlatformMap<WindowUpdate> = {
  darwin: onWindowUpdate,
  all: ({
    window: { id },
    route: { menu },
  }) => {
    makeMenu(menu);
    setActiveWindow(id);
  },
};

const updateWindow = (window: BrowserWindow) => {
  const mainWindow = getWindow(window.id);
  if (mainWindow) {
    perPlatform(updateForge, mainWindow);
  }
};

app.on('browser-window-created', (e, window) => {
  updateWindow(window);
});

app.on('browser-window-focus', (e, window) => {
  updateWindow(window);
});
