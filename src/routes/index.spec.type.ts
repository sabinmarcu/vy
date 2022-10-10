import {
  ExtractFromBridgeActions,
} from '../types/index';
import {
  ExtractActionFromRoutesList,
} from '../types/route';
import {
  BridgeActions,
  routes,
// eslint-disable-next-line import/extensions
} from './index';

type CreateWindowType = ExtractFromBridgeActions<BridgeActions, 'createWindow'>;
//   ^? type CreateWindowType = never
