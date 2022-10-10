import {
  BridgeActions,
  CreateWindowAction,
  CustomBridgeActionDeps,
  GenericBridgeActions,
} from './bridge/index';
import {
  ExtractActionFromRoutesList,
  Route,
  RoutesList,
} from './route';

type GBA = GenericBridgeActions;
//   ^? type GBA = CreateWindowAction<string>

type Route1 = Route<GenericBridgeActions>;
//   ^? type Route1 = Route<CreateWindowAction<string>>

type Route1Keys = keyof Route1 & string;
//   ^? type Route1Keys = "component" | "window" | "menu"

type Route1Menu = Route1['menu'];
//   ^? type Route1Menu = readonly CustomMenuParams<CreateWindowAction<string>>[]

type Route1MenuBridgeAction = Route1Menu[0]['bridgeAction'];
//   ^? type Route1MenuBridgeAction = CreateWindowAction<string>

type RoutePath = '/' | '/settings';
type Route2 = Route<CreateWindowAction<RoutePath>>;
//   ^? type Route2 = Route<CreateWindowAction<RoutePath>>

type Route2Keys = keyof Route2 & string;
//   ^? type Route2Keys = "component" | "window" | "menu"

type Route2Menu = Route2['menu'];
//   ^? type Route2Menu = readonly CustomMenuParams<CreateWindowAction<RoutePath>>[]

type Route2MenuBridgeAction = Route2Menu[0]['bridgeAction'];
//   ^? type Route2MenuBridgeAction = CreateWindowAction<RoutePath>

type Route3CustomDeps = CustomBridgeActionDeps<CreateWindowAction, { path: RoutePath }>;
//   ^? type Route3CustomDeps = {
//          createWindow: {
//              path: RoutePath;
//          };
//      }

type Route3Actions = BridgeActions<Route3CustomDeps>;
//   ^? type Route3Actions = {
//          path: RoutePath;
//      } & BridgeActionType<"createWindow">

type Route3 = Route<Route3Actions>;
//   ^? type Route3 = Route<BridgeAction<"createWindow", {
//          path: RoutePath;
//      }>>

type RoutesTest = RoutesList<'/'>;
//   ^? type RoutesTest = {
//          readonly "/": Route<BridgeAction<"createWindow", {
//              path: "/";
//          }>>;
//      }

type RoutesTestMenuAction = RoutesTest['/']['menu'][0]['bridgeAction'];
//   ^? type RoutesTestMenuAction = {
//          path: "/";
//      } & BridgeActionType<"createWindow">

type RoutesTestMenuActionPath = RoutesTestMenuAction['path'];
//   ^? type RoutesTestMenuActionPath = "/"

type RoutesTest2 = RoutesList<RoutePath>;
//   ^? type RoutesTest2 = {
//          readonly "/": Route<BridgeAction<"createWindow", {
//              path: RoutePath;
//          }>>;
//          readonly "/settings": Route<BridgeAction<"createWindow", {
//              path: RoutePath;
//          }>>;
//      }

type RoutesTest2MenuAction = RoutesTest2['/']['menu'][0]['bridgeAction'];
//   ^? type RoutesTest2MenuAction = {
//          path: RoutePath;
//      } & BridgeActionType<"createWindow">

type RoutesTest2MenuActionPath = RoutesTest2MenuAction['path'];
//   ^? type RoutesTest2MenuActionPath = "/" | "/settings"

type ExtractActionTest1 = ExtractActionFromRoutesList<RoutesTest, 'createWindow'>;
//   ^? type ExtractActionTest1 = {
//          path: "/";
//      } & BridgeActionType<"createWindow">

type ExtractActionTest1Path = ExtractActionTest1['path'];
//   ^? type ExtractActionTest1Path = "/"

type ExtractActionTest2 = ExtractActionFromRoutesList<RoutesTest2, 'createWindow'>;
//   ^? type ExtractActionTest2 = {
//          path: RoutePath;
//      } & BridgeActionType<"createWindow">

type ExtractActionTest2Path = ExtractActionTest2['path'];
//   ^? type ExtractActionTest2Path = "/" | "/settings"
