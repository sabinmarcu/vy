import {
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';

import {
  Routes,
} from '../routes/index';

export interface WindowConfig {
  window: BrowserWindow,
  route: Routes[keyof Routes],
}

export interface MenuCreator {
  pre: () => MenuItemConstructorOptions[],
  post: () => MenuItemConstructorOptions[],
}

export interface WindowUpdate {
  (win: WindowConfig): void;
}

export interface PlatformMap<T>
  extends Partial<Record<typeof process.platform | 'all', T>> {}
