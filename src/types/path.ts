import {
  Flat,
  OmitNever,
} from './generic';
import {
  Opaque,
  Unopaque,
} from './opaque';

export type Path<T extends string> = Opaque<T, 'Path'>;
export type ExtPath<T extends string | Path<any>> =
  Opaque<Path<Unopaque<T & string>>, 'Extensible'>;

export const PathOpaqueSymbol = Symbol('__params__');
export type PathOpaqueSymbolType = typeof PathOpaqueSymbol;
export type PathMatch<
  T extends string,
  SlotName extends string,
  SlotValue extends string,
> = Opaque<T, { [Key in SlotName]: SlotValue }, PathOpaqueSymbolType>;

export type MergePathMatch<
  A extends PathMatch<any, any, any>,
  B extends PathMatch<any, any, any>,
> = A extends PathMatch<infer APath, infer ASlotName, infer ASlotValue>
  ? B extends PathMatch<infer BPath, infer BSlotName, infer BSlotValue>
    ? Opaque<
      `${APath}${BPath}`,
      Flat<
        {
          [Key in ASlotName]: ASlotValue
        } & {
          [Key in BSlotName]: BSlotValue
        }
      >,
      PathOpaqueSymbolType
    >
    : never
  : A;

export type PathPrimitive = `/${string}`;
export type LongPathPrimitive = `/${string}/${string}`;
export type PathSlotPrimitive = `/:${string}`;

export type PathSlotName<T extends PathSlotPrimitive> =
  T extends `/:${infer SlotName}`
    ? SlotName
    : never;

export type PathOf<T extends string> = `/${T}`;
export type SlotPathOf<T extends string> = `/:${T}`;

export type MatchLongPartial<
  Match extends string,
  MatchWith extends ExtPath<any>,
  With = Unopaque<MatchWith>,
> = With extends PathSlotPrimitive
  ? With extends `/:${infer SlotName}/${infer Rest}`
    ? Match extends `/${infer SlotValue}/${infer RestMatch}`
      ? PathMatch<`${SlotPathOf<SlotName>}${MatchPartial<PathOf<RestMatch>, PathOf<Rest>>}`, SlotName, SlotValue>
      : never
    : never
  : With extends `/${infer PartialWith}/${infer RestWith}`
    ? Match extends `/${PartialWith}/${infer RestMatch}`
      ? MatchPartial<PathOf<RestMatch>, PathOf<RestWith>>
      : never
    : never;

export type MatchPartial<
  Match extends string,
  MatchWith extends ExtPath<any>,
  With = Unopaque<MatchWith>,
> = With extends PathPrimitive
  ? With extends LongPathPrimitive
    ? MatchLongPartial<Match, With>
    : Match extends LongPathPrimitive
      ? never
      : With extends PathSlotPrimitive
        ? With extends `/:${infer SlotName}`
          ? Match extends `/${infer SlotValue}`
            ? PathMatch<Match, SlotName, SlotValue>
            : never
          : never
        : Match extends With
          ? Match
          : never
  : never;

export type MatchMap<
  T extends string,
  Paths extends string,
> = {
  [K in Paths as Unopaque<K>]: MatchPartial<T, K>
};

export type MatchPartialPath<
  T extends string,
  Paths extends string,
  Map = OmitNever<MatchMap<T, Paths>>,
> = Map[keyof Map];

export type MatchPath<
  T extends string,
  Paths extends string,
> = T extends Unopaque<Paths>
  ? T
  : MatchPartialPath<T, Paths>;
