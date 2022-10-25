import {
  Opaque,
  RawOpaque,
  Unopaque,
} from './opaque';

type RA = RawOpaque<'/', 'awesome'>;
//   ^? type RA = "/" & OpaqueID<"awesome", typeof OpaqueSymbol>

type UnRA = Unopaque<RA>;
//   ^? type UnRA = "/"

type A = Opaque<'/', 'awesome'>;
//   ^? type A = "/" & OpaqueID<"awesome", typeof OpaqueSymbol>

type UnA = Unopaque<A>;
//   ^? type UnA = "/"

type B = Opaque<A, 'stuff'>;
//   ^? type B = "/" & OpaqueID<"awesome" | "stuff", typeof OpaqueSymbol>

type UnB = Unopaque<B>;
//   ^? type UnB = "/"

type C = Opaque<'/stuff', 'other' | 'stuff'>;
//   ^? type C = "/stuff" & OpaqueID<"stuff" | "other", typeof OpaqueSymbol>

type D = A | B | C;
//   ^? type D = A | B | C

type UnD = Unopaque<D>;
//   ^? type UnD = "/" | "/stuff"
