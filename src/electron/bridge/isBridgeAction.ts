import {
  BridgeActionTypes,
} from './index';

export const isBridgeAction = (
  action: unknown,
): action is BridgeActionTypes => (
  !!action
  && typeof action === 'object'
  && Object.prototype.hasOwnProperty.call(action, 'type')
  && typeof (action as any).type === 'string'
);
