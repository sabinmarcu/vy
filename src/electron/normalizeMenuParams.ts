import {
  CustomMenuParams,
} from '../types/electron';
import {
  bridgeActions,
  isBridgeAction,
} from './bridge/index';

export const normalizeMenuParams = (
  menuParams: Readonly<CustomMenuParams[]>,
): CustomMenuParams[] => (
  menuParams.map((it) => {
    const { bridgeAction, ...rest } = it;
    if (isBridgeAction(bridgeAction)) {
      const { type, ...actionProps } = bridgeAction;
      const { handler } = bridgeActions.find(
        ({ type: actionType }) => actionType === type,
      );
      return {
        ...rest,
        click: () => handler(actionProps),
      };
    }
    if (it.submenu) {
      return {
        ...it,
        submenu: normalizeMenuParams(it.submenu),
      };
    }
    return it;
  })
);
