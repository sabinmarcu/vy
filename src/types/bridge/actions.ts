import {
  UnionToIntersection,
} from '../generic';

export type GenericObject<
  Value = any,
> = {
  [key: string]: Value,
};

export type BridgeActionType<
  Name extends string = string,
> = {
  type: Name
};

export type BridgeAction<
  Name extends string = string,
  Custom extends GenericObject = {},
> = Custom & BridgeActionType<Name>;

export type BridgeActionProps<
  Action extends BridgeAction,
> = Omit<Action, keyof BridgeActionType>;

export interface BridgeActionHandler<
  Action extends BridgeAction,
> {
  (action: BridgeActionProps<Action>): void;
}

export interface BridgeActionPackage<
  Action extends BridgeAction,
> {
  type: Action['type'],
  handler: BridgeActionHandler<Action>,
}

export type BridgeActionDeps<
  Action extends BridgeAction,
> = {
  [Key in Action['type'] & string]: BridgeActionProps<Action>;
};

export type CustomBridgeActionDeps<
  Action extends BridgeAction,
  Deps extends BridgeActionProps<Action>,
> = {
  [Key in Action['type'] & string]: Deps;
};

export type MergeBridgeActionsDeps<
  Actions extends BridgeAction[],
> = UnionToIntersection<
{
  [Action in Actions[number] as Action['type']]: BridgeActionDeps<Action>;
}[Actions[number]['type']]
>;

export type BridgeActionFromList<
  Actions extends BridgeAction[],
> = {
  [Action in Actions[number] as Action['type']]: Action;
}[Actions[number]['type']];

export type ExtractFromBridgeActions<
  Actions extends BridgeActionType,
  Type extends string,
> = Extract<Actions, BridgeActionType<Type>>;

export type ApplyCustomBridgeAction<
  Action extends BridgeAction<any, any>,
  Exact extends GenericObject = GenericObject,
> = Action extends BridgeAction<infer Name, infer Custom>
  ? Exact extends Omit<Custom, keyof BridgeActionType>
    ? BridgeAction<Name, Exact>
    : never
  : never;

export type MapBridgeActions<
  Actions extends BridgeAction[],
> = {
  [Action in Actions[number] as Action['type']]: {
    [Key in Action['type']]: Action
  };
}[Actions[number]['type']];

export type ApplyCustomBridgeDeps<
  Actions extends BridgeAction[],
  Exact extends MergeBridgeActionsDeps<Actions>,
  List = MapBridgeActions<Actions>,
> = UnionToIntersection<{
  [Key in keyof List]: Key extends keyof Exact
    ? ApplyCustomBridgeAction<List[Key], Exact[Key]>
    : never
}>;

export type ApplyCustomBridgeActions<
  Actions extends BridgeAction[],
  Exact extends MergeBridgeActionsDeps<Actions>,
  Merge = ApplyCustomBridgeDeps<Actions, Exact>,
> = Merge[keyof Merge];
