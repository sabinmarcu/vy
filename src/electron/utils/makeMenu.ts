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
} from '../constants/developerMenu';
import {
  windowMenu,
} from '../constants/windowMenu';

export const menuForge: PlatformMap<MenuCreator> = {
  win32: createWin32Menu,
  darwin: createDarwinMenu,
};

export type GenericMenuParams = CustomMenuParams<any>;

export const normalizeTemplate = (
  items: GenericMenuParams[],
): MenuItemConstructorOptions[] => {
  const mapping = items
    .map(({ label }) => label)
    .reduce(
      (acc, label) => {
        const result = items.filter(({ label: l }) => l === label)
          .reduce(
            (resultAcc, it) => {
              const { submenu: currentSubmenu = [] } = it;
              const { submenu: prevSubmenu = [] } = resultAcc;
              let submenu: GenericMenuParams[];
              if (Array.isArray(currentSubmenu) && Array.isArray(prevSubmenu)) {
                if (currentSubmenu.length) {
                  submenu = [
                    ...currentSubmenu,
                    { type: 'separator' },
                    ...prevSubmenu,
                  ];
                } else {
                  submenu = prevSubmenu;
                }
              }
              return {
                ...resultAcc,
                ...it,
                submenu: submenu?.length ? submenu : undefined,
              };
            },
            {},
          );
        return {
          ...acc,
          [label]: result,
        };
      },
      {},
    );
  return Object.values(mapping);
};

export const makeMenu = (menuParams: Readonly<CustomMenuParams[]>) => {
  const postMenuItems: GenericMenuParams[] = [];
  const preMenuItems: GenericMenuParams[] = [];

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

  const template = normalizeTemplate([
    ...preMenuItems,
    ...normalizeMenuParams(menuParams),
    ...postMenuItems,
    windowMenu,
  ]);

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
