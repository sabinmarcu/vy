import {
  GenericBridgeActions,
} from './bridge/index';
import {
  CustomMenuParams,
} from './electron';

type MenuParams = CustomMenuParams<GenericBridgeActions>;
//    ^? type MenuParams = Electron.MenuItemConstructorOptions & {
//           bridgeAction?: CreateWindowAction<string>;
//           submenu?: CustomMenuParams<CreateWindowAction<string>>[];
//       }
