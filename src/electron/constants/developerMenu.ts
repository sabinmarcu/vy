import {
  isDarwin,
} from '../../app/utils/platform';
import {
  getActiveWindow,
} from '../utils/windows';

export const developerMenu = {
  label: 'Development',
  submenu: [
    {
      label: 'Reload',
      accelerator: isDarwin ? 'Cmd+R' : 'Ctrl+R',
      click: () => getActiveWindow()?.window.reload(),
    },
    {
      label: 'Force Reload',
      accelerator: isDarwin ? 'Alt+Cmd+R' : 'Alt+Ctrl+R',
      click: () => getActiveWindow()?.window.webContents.reloadIgnoringCache(),
    },
    {
      label: 'Toggle DevTools',
      accelerator: isDarwin ? 'Alt+Cmd+I' : 'Alt+Ctrl+I',
      click: () => getActiveWindow()?.window.webContents.toggleDevTools(),
    },
  ],
};
