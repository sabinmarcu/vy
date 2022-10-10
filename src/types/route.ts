import {
  BrowserWindowConstructorOptions,
} from 'electron';
import {
  ComponentType,
} from 'react';
import {
  BridgeActions,
  BridgeActionType,
  CreateWindowAction,
  CustomBridgeActionDeps,
  ExtractFromBridgeActions,
  GenericBridgeActions,
} from './bridge/index';
import {
  CustomMenuParams,
} from './electron';

export interface Route<
  Actions extends GenericBridgeActions,
> {
  component: ComponentType;
  window?: Readonly<BrowserWindowConstructorOptions>;
  menu?: Readonly<CustomMenuParams<Actions>[]>;
}

export type CustomActions<
  Paths extends string = string,
> = BridgeActions<
  CustomBridgeActionDeps<CreateWindowAction, { path: Paths }>
>;

export type RoutesList<
  Paths extends string,
  Actions = CustomActions<Paths>,
> = Actions extends GenericBridgeActions
  ? Readonly<{
    [Key in Paths]: Route<Actions>;
  }>
  : never;

export type RoutesValid<
  Paths extends string,
  Actions = CustomActions<Paths>,
> = Actions extends RoutesList<Paths>
  ? RoutesList<Paths>
  : never;

export type RoutesListActions<
  List extends RoutesList<any>,
> = List extends RoutesList<any, infer Actions>
  ? Actions
  : never;

export type ExtractActionFromRoutesList<
  List extends RoutesList<any>,
  Action extends string,
> = List extends RoutesList<any, infer Actions>
  ? Actions extends BridgeActionType
    ? ExtractFromBridgeActions<Actions, Action>
    : never
  : never;
