import {
  WindowConfig,
} from '../types';
import {
  setTouchBar,
} from './touchbar';

export * from './menu';

export const onWindowUpdate = (win: WindowConfig) => {
  [
    setTouchBar,
  ].map((it) => it(win));
};
