import {
  BrowserWindow,
} from 'electron';
import {
  Routes,
} from '../routes/index';

export interface WindowConfig {
  window: BrowserWindow,
  route: Routes[keyof Routes],
}

export const windows = new Map<number, WindowConfig>();
export const addWindow = (
  window: BrowserWindow,
  route: Routes[keyof Routes],
) => {
  windows.set(window.id, { window, route });
};

export const removeWindow = (window: BrowserWindow) => {
  windows.delete(window.id);
};

export const getWindow = (id: number) => windows.get(id);

let activeWindow: WindowConfig;
export const setActiveWindow = (
  id: number,
) => { activeWindow = getWindow(id); };
export const getActiveWindow = () => activeWindow;
