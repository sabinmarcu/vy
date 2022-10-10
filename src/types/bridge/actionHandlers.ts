import {
  BridgeAction,
  BridgeActionProps,
} from './actions';

export interface BridgeActionPackage<
  Action extends BridgeAction,
> {
  type: Action['type'];
  handler: (action: BridgeActionProps<Action>) => void;
}
