import {
  isDarwin,
} from '../../app/utils/platform';
import {
  getActiveWindow,
} from '../utils/windows';

export const windowMenu = {
  label: 'Window',
  submenu: [
    {
      label: 'Close Window',
      accelerator: isDarwin ? 'Cmd+W' : 'Ctrl+W',
      click: () => getActiveWindow()?.window.close(),
    },
  ],
};
