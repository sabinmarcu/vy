export const OpaqueSymbol = Symbol('opaque');
export type OpaqueSymbolType = typeof OpaqueSymbol;

export type OpaqueID<
  K extends any,
  OpaqueKey extends PropertyKey = OpaqueSymbolType,
> = {
  [Key in OpaqueKey]: K
};

export type RawOpaque<
  T,
  K extends any = string,
  OpaqueKey extends PropertyKey = OpaqueSymbolType,
> = T & OpaqueID<K, OpaqueKey>;

export type Opaque<
  T,
  K extends any = string,
  OpaqueKey extends PropertyKey = OpaqueSymbolType,
> = Unopaque<T, OpaqueKey> & OpaqueID<(
  T extends OpaqueID<infer U, OpaqueKey>
    ? U | K
    : K
), OpaqueKey>;

export type Unopaque<
  T,
  OpaqueKey extends PropertyKey = OpaqueSymbolType,
> = T extends RawOpaque<infer U, infer P, OpaqueKey>
  ? U extends RawOpaque<infer R, P, OpaqueKey>
    ? R
    : never
  : T;
