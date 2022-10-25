import {
  MenuItemConstructorOptions,
} from 'electron';
import {
  GenericBridgeActions,
} from './bridge/index';

export type CustomMenuParams<
  Actions = GenericBridgeActions,
> =
  & Omit<MenuItemConstructorOptions, 'submenu'>
  & {
    bridgeAction?: Actions,
    submenu?: Readonly<CustomMenuParams<Actions>[]>
  };
