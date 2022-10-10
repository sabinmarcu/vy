import {
  Menu,
  MenuItemConstructorOptions,
} from 'electron';
import {
  CustomMenuParams,
} from '../../types/electron';
import {
  normalizeMenuParams,
} from './normalizeMenuParams';
import {
  MenuCreator,
  PlatformMap,
} from '../types';
import {
  createMenu as createDarwinMenu,
} from '../darwin/menu';
import {
  createMenu as createWin32Menu,
} from '../win32/menu';
import {
  perPlatform,
} from './perPlatform';
import {
  developerMenu,
} from './developerMenu';

export const menuForge: PlatformMap<MenuCreator> = {
  win32: createWin32Menu,
  darwin: createDarwinMenu,
};

export const makeMenu = (menuParams: Readonly<CustomMenuParams[]>) => {
  const postMenuItems: MenuItemConstructorOptions[] = [];
  const preMenuItems: MenuItemConstructorOptions[] = [];

  if (process.env.DEV === 'true') {
    postMenuItems.push(developerMenu);
  }

  const updatePerPlatform = (forge: MenuCreator) => {
    const { pre, post } = forge;
    preMenuItems.push(...pre());
    postMenuItems.push(...post());
  };

  perPlatform(
    Object.entries(menuForge)
      .reduce((acc, [platform, forge]) => ({
        ...acc,
        [platform]: updatePerPlatform.bind(undefined, forge),
      }), {}),
  );

  const menu = Menu.buildFromTemplate([
    ...preMenuItems,
    // @ts-ignore
    ...normalizeMenuParams(menuParams),
    ...postMenuItems,
  ]);
  Menu.setApplicationMenu(menu);
};
