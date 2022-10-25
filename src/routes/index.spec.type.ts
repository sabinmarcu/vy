import {
  ExtractFromBridgeActions,
} from '../types/index';
import {
  ExtractActionFromRoutesList,
} from '../types/route';
import {
  BridgeActions,
  routes,
} from './index';

type CreateWindowType = ExtractFromBridgeActions<BridgeActions, 'createWindow'>;
//   ^? type CreateWindowType = {
//          path: "/" | "/settings";
//      } & BridgeActionType<"createWindow">

export type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

type OpaqueSymbol = '__TYPE__';

type OpaqueID<
  K extends PropertyKey,
  OpaqueKey extends PropertyKey = OpaqueSymbol,
> = {
  [Key in OpaqueKey]: K
};

type RawOpaque<
  T,
  K extends PropertyKey = string,
  OpaqueKey extends PropertyKey = OpaqueSymbol,
> = T & OpaqueID<K, OpaqueKey>;

type Opaque<
  T,
  K extends PropertyKey = string,
  OpaqueKey extends PropertyKey = OpaqueSymbol,
> = Unopaque<T, OpaqueKey> & OpaqueID<(
  T extends OpaqueID<infer U, OpaqueKey>
    ? U | K
    : K
), OpaqueKey>;

type Unopaque<
  T,
  OpaqueKey extends PropertyKey = OpaqueSymbol,
> = T extends RawOpaque<infer U, infer P, OpaqueKey>
  ? T extends RawOpaque<infer R, P, OpaqueKey>
    ? R
    : never
  : T;

type Path<T extends string> = Opaque<T, 'Path'>;
type ExtPath<T extends string | Path<any>> =
  Opaque<Path<T & string>, 'Extensible'>;

type A = Path<'/'>;
//   ^? type A = "/" & OpaqueID<"Path", "__TYPE__">

type B = ExtPath<'/settings'>;
//   ^? type B = "/settings" & OpaqueID<"Path" | "Extensible", "__TYPE__">

type UA = Unopaque<A>;
//   ^? type UA = "/"

type UB = Unopaque<B>;
//   ^? type UB = "/settings"

type Pths = '/whatever' | A | B;
type Map = {
  [K in Pths as Unopaque<K>]: K;
};

type Test = Map;
//   ^? type Test = {
//          "/": "/" & OpaqueID<"Path", "__TYPE__">;
//          "/settings": "/settings" & OpaqueID<"Path" | "Extensible", "__TYPE__">;
//          "/whatever": "/whatever";
//      }
