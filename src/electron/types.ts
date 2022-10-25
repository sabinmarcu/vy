import {
  BrowserWindow,
} from 'electron';

import {
  Routes,
} from '../routes/index';
import {
  CustomMenuParams,
} from '../types/electron';

export interface WindowConfig {
  window: BrowserWindow,
  route: Routes[keyof Routes],
}

export interface MenuCreator {
  pre: () => CustomMenuParams<any>[],
  post: () => CustomMenuParams<any>[],
}

export interface WindowUpdate {
  (win: WindowConfig): void;
}

export interface PlatformMap<T>
  extends Partial<Record<typeof process.platform | 'all', T>> {}
