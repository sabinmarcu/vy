import {
  GenericBridgeActionsDeps,
  BridgeActionsList,
  BridgeActions,
  GenericBridgeActions,
} from './index';
import {
  ApplyCustomBridgeActions,
} from './actions';

type Deps = GenericBridgeActionsDeps;
//   ^? type Deps = {
//          createWindow: BridgeActionProps<CreateWindowAction<string>>;
//      }

type CustomTest = {
  createWindow: { path: 'awesome' }
};

type CustomDeps = ApplyCustomBridgeActions<BridgeActionsList, CustomTest>;
//   ^? type CustomDeps = {
//          path: 'awesome';
//      } & BridgeActionType<"createWindow">

type BridgeActionsTest = BridgeActions<CustomTest>;
//   ^? type BridgeActionsTest = {
//          path: 'awesome';
//      } & BridgeActionType<"createWindow">

type BridgeActionsCheck1 = BridgeActionsTest extends CustomDeps ? true : false;
//     ^? type BridgeActionsCheck1 = true

type BridgeActionsCheck2 = CustomDeps extends BridgeActionsTest ? true : false;
//     ^? type BridgeActionsCheck2 = true

type BridgeActionsCheckGeneric = BridgeActionsTest extends GenericBridgeActions ? true : false;
//     ^? type BridgeActionsCheckGeneric = true
