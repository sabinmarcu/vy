import {
  MenuItemConstructorOptions,
} from 'electron';
import {
  GenericBridgeActions,
} from './bridge/index';

export type CustomMenuParams<
  Actions = GenericBridgeActions,
> =
  & MenuItemConstructorOptions
  & {
    bridgeAction?: Actions,
    submenu?: CustomMenuParams<Actions>[]
  };
