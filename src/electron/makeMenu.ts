import {
  Menu,
} from 'electron';
import {
  CustomMenuParams,
} from '../types/electron';
import {
  normalizeMenuParams,
} from './normalizeMenuParams';
import {
  getActiveWindow,
} from './windows';

export const makeMenu = (menuParams: Readonly<CustomMenuParams[]>) => {
  const extraMenuItems = [];

  if (process.env.DEV === 'true') {
    extraMenuItems.push({
      label: 'DevTools',
      click: () => {
        getActiveWindow()?.window.webContents.openDevTools();
      },
    });
  }

  const menu = Menu.buildFromTemplate([
    ...normalizeMenuParams(menuParams),
    ...extraMenuItems,
  ]);
  Menu.setApplicationMenu(menu);
};
