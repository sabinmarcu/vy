export type UnionToIntersection<U> =
  (U extends any
    ? (k: U) => void
    : never
  ) extends ((k: infer I) => void)
    ? I
    : never;

export type RawFunc<R extends any = any, A extends any[] = any[]> = (
  ...args: A
) => R;

export type ToAsync<T extends RawFunc> = T extends RawFunc<infer R, infer A>
  ? R extends Promise<any>
    ? RawFunc<R, A>
    : RawFunc<Promise<R>, A>
  : never;

export type Includes<T extends string, K extends string> = Exclude<
  T | '__FAKE__',
  K
> extends '__FAKE__'
  ? unknown
  : never;

export type OptionalPropertyNames<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type SpreadProperties<L, R, K extends (keyof L & keyof R)> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

export type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
  Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
  Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
  SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

export type Spread<A extends any> = A extends [infer L, ...infer R]
  ? SpreadTwo<L, Spread<R>>
  : unknown;

export type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

export type IsEmpty<T extends Record<any, any>> =
  | keyof T
  | '__FAKE__' extends '__FAKE__'
    ? unknown
    : never;

export type IsntEmpty<T extends Record<any, any>> = IsEmpty<T> extends never
  ? unknown
  : never;

export type HasOne<T extends Record<any, any>> = IsntEmpty<T> &
{
  [K in keyof T]: IsEmpty<Omit<T, K>>;
}[keyof T];

export type HasMaxOne<T extends Record<any, any>> =
  | IsEmpty<T>
  | {
    [K in keyof T]: IsEmpty<Omit<T, K>>;
  }[keyof T];

export type Modify<T, R> = Omit<T, keyof R> & R;

export type Flat<T extends Record<PropertyKey, any>> = {
  [K in keyof T]: T[K]
};
