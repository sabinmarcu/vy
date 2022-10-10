import {
  getActiveWindow,
} from './windows';

export const developerMenu = {
  label: 'Development',
  submenu: [
    {
      label: 'Reload',
      click: () => getActiveWindow()?.window.reload(),
    },
    {
      label: 'Force Reload',
      click: () => getActiveWindow()?.window.webContents.reloadIgnoringCache(),
    },
    {
      label: 'Toggle DevTools',
      click: () => getActiveWindow()?.window.webContents.toggleDevTools(),
    },
  ],
};
