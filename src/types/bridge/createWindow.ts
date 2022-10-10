import {
  BridgeAction,
} from './actions';

export interface CreateWindowAction<
  Paths extends string = string,
>
  extends BridgeAction<'createWindow'> {
  path: Paths
}
