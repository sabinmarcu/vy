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

export interface BridgeActionGenerator<
  in Action extends BridgeAction,
  Props = BridgeActionProps<Action>,
> {
  (params: Omit<Props, 'type'>): Props;
}
