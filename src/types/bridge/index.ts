import {
  ApplyCustomBridgeActions,
  ApplyCustomBridgeDeps,
  BridgeActionFromList,
  MergeBridgeActionsDeps,
} from './actions';
import {
  CreateWindowAction,
} from './createWindow';

export * from './actions';
export * from './createWindow';

export type BridgeActionsList = [
  CreateWindowAction,
];

export type GenericBridgeActionsDeps = MergeBridgeActionsDeps<
  BridgeActionsList
>;

export type GenericBridgeActions = BridgeActionFromList<BridgeActionsList>;

export type BridgeActionsDeps<
  Deps extends GenericBridgeActionsDeps,
> = ApplyCustomBridgeDeps<BridgeActionsList, Deps>;

export type BridgeActions<
  Deps extends GenericBridgeActionsDeps,
> = ApplyCustomBridgeActions<BridgeActionsList, Deps>;
