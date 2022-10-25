import {
  BrowserWindow,
  TouchBar,
  TouchBarButton as TouchBarButtonType,
} from 'electron';
import {
  normalizeMenuParams,
} from '../utils/normalizeMenuParams';
import {
  WindowConfig,
} from '../types';
import {
  isDev,
} from '../../app/utils/platform';
import {
  developerMenu,
} from '../constants/developerMenu';

const {
  TouchBarLabel,
  TouchBarButton,
} = TouchBar;

type MenuBarItems = ReturnType<typeof normalizeMenuParams>;
type MenuBarItem = MenuBarItems[number];

export const menuItemToTouchBar = (
  item: MenuBarItem,
) => {
  const { label, click } = item;
  if (click) {
    return new TouchBarButton({
      label,
      click: (click as any),
    });
  }
  return new TouchBarLabel({
    label,
  });
};

export const menuToTouchBar = (
  menu: Readonly<MenuBarItems>,
  win: BrowserWindow,
  toParent?: () => void,
): TouchBar => {
  let touchBar: TouchBar;
  const goBack = () => {
    win.setTouchBar(touchBar);
  };
  const items = menu.map((it) => {
    if (it.submenu) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return subMenuToTouchBar(it, win, goBack);
    }
    return menuItemToTouchBar(it);
  });
  if (toParent) {
    items.unshift(new TouchBarButton({
      label: 'Back',
      click: toParent,
    }));
  } else {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const devMenu = makeDeveloperMenu(win, goBack);
    if (devMenu) {
      items.push(devMenu);
    }
  }
  touchBar = new TouchBar({ items });
  return touchBar;
};

export const subMenuToTouchBar = (
  it: MenuBarItem,
  win: BrowserWindow,
  toParent: () => void,
) => {
  const { label, submenu } = it;
  const menu = menuToTouchBar(submenu, win, toParent);
  return new TouchBarButton({
    label,
    click: () => {
      win.setTouchBar(menu);
    },
  });
};

export const makeDeveloperMenu = (
  win: BrowserWindow,
  toParent: () => void,
): TouchBarButtonType | undefined => {
  if (isDev) {
    return subMenuToTouchBar(
      developerMenu,
      win,
      toParent,
    );
  }
  return undefined;
};

export const createTouchBarFromMenu = (config: WindowConfig) => {
  const { route, window: win } = config;
  if (!route) {
    return undefined;
  }
  const params = normalizeMenuParams(route.menu);
  const touchBar = menuToTouchBar(params, win);
  return touchBar;
};

export const setTouchBar = (config: WindowConfig) => {
  const touchBar = createTouchBarFromMenu(config);
  config.window.setTouchBar(touchBar);
};
