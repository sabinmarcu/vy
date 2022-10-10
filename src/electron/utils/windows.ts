import {
  BrowserWindow,
} from 'electron';
import {
  Routes,
} from '../../routes/index';
import {
  WindowConfig,
} from '../types';

export const windows = new Map<number, WindowConfig>();
export const addWindow = (
  window: BrowserWindow,
  route: Routes[keyof Routes],
) => {
  const config = { window, route };
  windows.set(window.id, config);
  return config;
};

export const removeWindow = (window: BrowserWindow) => {
  windows.delete(window.id);
  return window;
};

export const getWindow = (id: number) => windows.get(id);

let activeWindow: WindowConfig;
export const setActiveWindow = (
  id: number,
) => { activeWindow = getWindow(id); };
export const getActiveWindow = () => activeWindow;
