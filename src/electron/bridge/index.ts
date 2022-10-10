import {
  createWindowPackage,
} from './createWindow';
import {
  BridgeActionPackage,
} from '../../types/index';

export const bridgeActions = [
  createWindowPackage,
] as const;

type ExtractBridgeActionType<T> = T extends BridgeActionPackage<infer U>
  ? U
  : never;

export type BridgeActionTypes = ExtractBridgeActionType<typeof bridgeActions[number]>;
